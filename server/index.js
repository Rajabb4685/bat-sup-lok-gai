require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express(); // ✅ app must be created BEFORE app.use()

// ---------- middleware ----------
app.use(cors());
app.use(express.json());

// Serve frontend static files
app.use("/src", express.static(path.join(__dirname, "..", "src")));
// Optional: allow /about.html (without /src) to work locally
app.use(express.static(path.join(__dirname, "..", "src")));

// ---------- database ----------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
});

// ---------- routes ----------
app.get("/api/health", async (req, res) => {
  try {
    const r = await pool.query("select 1 as ok");
    res.json({ ok: true, db: r.rows?.[0]?.ok === 1 });
  } catch (e) {
    console.error("health error:", e);
    res.status(500).json({ ok: false, error: "DB connection failed" });
  }
});

app.get("/api/businesses", async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;

    const where = [];
    const params = [];

    if (category) {
      params.push(category);
      where.push(`category = $${params.length}`);
    }

    if (search) {
      params.push(`%${search}%`);
      params.push(`%${search}%`);
      params.push(`%${search}%`);
      where.push(
        `(name ilike $${params.length - 2} or description ilike $${params.length - 1} or neighborhood ilike $${params.length})`
      );
    }

    const sql = `
      select id, name, category, description, address, neighborhood,
             phone, website, instagram, image_url, tags, created_at
      from businesses
      ${where.length ? "where " + where.join(" and ") : ""}
      order by created_at desc
      limit 200
    `;

    const result = await pool.query(sql, params);
    res.json(result.rows);
  } catch (e) {
    console.error("businesses error:", e);
    res.status(500).json({ error: "Failed to load businesses" });
  }
});

app.post("/api/submissions", async (req, res) => {
  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing name/email/message" });
    }

    await pool.query(
      "insert into submissions (name, email, message) values ($1, $2, $3)",
      [name, email, message]
    );

    res.json({ ok: true });
  } catch (e) {
    console.error("submissions error:", e);
    res.status(500).json({ ok: false, error: "Failed to save submission" });
  }
});

// ---------- start ----------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
