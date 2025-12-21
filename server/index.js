// server/index.js
require("dotenv").config({ path: require("path").join(__dirname, ".env") });
const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

/**
 * CORS:
 * - For simplest “make it work” with GitHub Pages, allow all origins.
 * - If you want to lock it down later, I included a commented whitelist example below.
 */
app.use(cors());
// Example whitelist (optional):
// app.use(cors({
//   origin: [
//     "http://localhost:3000",
//     "http://localhost:5173",
//     "https://YOURUSERNAME.github.io"
//   ]
// }));

app.use(express.json());

// ---- Postgres (Supabase) connection ----
if (!process.env.DATABASE_URL) {
  console.error("Missing DATABASE_URL env var. Set it in server/.env locally and on Render.");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Supabase needs SSL in production:
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

async function query(text, params) {
  return pool.query(text, params);
}

// ---- Health check ----
app.get("/api/health", async (req, res) => {
  try {
    const r = await query("select 1 as ok", []);
    res.json({ ok: true, db: r.rows[0].ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});

// ---- Businesses ----
// GET /api/businesses?category=Restaurant&search=sushi
app.get("/api/businesses", async (req, res) => {
  try {
    const { category, search } = req.query;

    const where = [];
    const params = [];
    let i = 1;

    if (category) {
      where.push(`category = $${i++}`);
      params.push(String(category));
    }
    if (search) {
      // ILIKE = case-insensitive search in Postgres
      where.push(`(name ILIKE $${i} OR description ILIKE $${i} OR address ILIKE $${i})`);
      params.push(`%${String(search)}%`);
      i++;
    }

    const sql = `
      SELECT
        id, name, category, description, address, neighborhood, phone, website, instagram,
        image_url, tags, created_at
      FROM businesses
      ${where.length ? `WHERE ${where.join(" AND ")}` : ""}
      ORDER BY created_at DESC
    `;

    const { rows } = await query(sql, params);
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load businesses" });
  }
});

// GET /api/businesses/:id
app.get("/api/businesses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const { rows } = await query(
      `SELECT id, name, category, description, address, neighborhood, phone, website, instagram, image_url, tags, created_at
       FROM businesses
       WHERE id = $1`,
      [id]
    );

    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to load business" });
  }
});

// POST /api/businesses
app.post("/api/businesses", async (req, res) => {
  try {
    const b = req.body || {};

    if (!b.name || !b.category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const tags = Array.isArray(b.tags) ? b.tags : [];

    const { rows } = await query(
      `INSERT INTO businesses
        (name, category, description, address, neighborhood, phone, website, instagram, image_url, tags)
       VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb)
       RETURNING id, name, category, description, address, neighborhood, phone, website, instagram, image_url, tags, created_at`,
      [
        String(b.name),
        String(b.category),
        String(b.description || ""),
        String(b.address || ""),
        String(b.neighborhood || ""),
        String(b.phone || ""),
        String(b.website || ""),
        String(b.instagram || ""),
        String(b.imageUrl || b.image_url || ""),
        JSON.stringify(tags),
      ]
    );

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create business" });
  }
});

// PUT /api/businesses/:id
app.put("/api/businesses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const b = req.body || {};
    if (!b.name || !b.category) {
      return res.status(400).json({ error: "name and category are required" });
    }

    const tags = Array.isArray(b.tags) ? b.tags : [];

    const { rows } = await query(
      `UPDATE businesses
       SET
         name=$1, category=$2, description=$3, address=$4, neighborhood=$5,
         phone=$6, website=$7, instagram=$8, image_url=$9, tags=$10::jsonb
       WHERE id=$11
       RETURNING id, name, category, description, address, neighborhood, phone, website, instagram, image_url, tags, created_at`,
      [
        String(b.name),
        String(b.category),
        String(b.description || ""),
        String(b.address || ""),
        String(b.neighborhood || ""),
        String(b.phone || ""),
        String(b.website || ""),
        String(b.instagram || ""),
        String(b.imageUrl || b.image_url || ""),
        JSON.stringify(tags),
        id,
      ]
    );

    if (!rows.length) return res.status(404).json({ error: "Not found" });
    res.json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to update business" });
  }
});

// DELETE /api/businesses/:id
app.delete("/api/businesses/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isFinite(id)) return res.status(400).json({ error: "Invalid id" });

    const result = await query(`DELETE FROM businesses WHERE id = $1`, [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: "Not found" });

    res.status(204).send();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to delete business" });
  }
});

// ---- Submissions (Get Involved form) ----
app.post("/api/submissions", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: "name, email, and message are required" });
    }

    const { rows } = await query(
      `INSERT INTO submissions (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING id, created_at`,
      [String(name), String(email), String(message)]
    );

    res.status(201).json(rows[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

// ---- Start server ----
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
