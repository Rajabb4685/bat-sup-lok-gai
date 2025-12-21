require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { openDb } = require("./db");
const { BusinessCreateSchema, SubmissionCreateSchema } = require("./validate");

const app = express();
const db = openDb();

app.use(cors());
app.use(express.json());

// ---- Simple API-key protection for write endpoints ----
function requireApiKey(req, res, next) {
  const key = req.header("x-api-key");
  if (!process.env.ADMIN_API_KEY) return res.status(500).json({ error: "Missing ADMIN_API_KEY" });
  if (key !== process.env.ADMIN_API_KEY) return res.status(401).json({ error: "Unauthorized" });
  next();
}

// ---- Health check ----
app.get("/api/health", (req, res) => res.json({ ok: true }));

// ---- Businesses ----
// GET /api/businesses?category=Restaurant&search=sushi
app.get("/api/businesses", (req, res) => {
  const { category, search } = req.query;

  let sql = `SELECT * FROM businesses WHERE 1=1`;
  const params = {};

  if (category) {
    sql += ` AND category = @category`;
    params.category = String(category);
  }

  if (search) {
    sql += ` AND (name LIKE @q OR description LIKE @q OR address LIKE @q)`;
    params.q = `%${String(search)}%`;
  }

  sql += ` ORDER BY createdAt DESC`;

  const rows = db.prepare(sql).all(params).map(r => ({
    ...r,
    tags: r.tags ? JSON.parse(r.tags) : [],
  }));

  res.json(rows);
});

app.get("/api/businesses/:id", (req, res) => {
  const id = Number(req.params.id);
  const row = db.prepare(`SELECT * FROM businesses WHERE id = ?`).get(id);

  if (!row) return res.status(404).json({ error: "Not found" });

  res.json({ ...row, tags: row.tags ? JSON.parse(row.tags) : [] });
});

// Create
app.post("/api/businesses", requireApiKey, (req, res) => {
  const parsed = BusinessCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const b = parsed.data;
  const stmt = db.prepare(`
    INSERT INTO businesses (name, category, description, address, neighborhood, phone, website, instagram, imageUrl, tags)
    VALUES (@name, @category, @description, @address, @neighborhood, @phone, @website, @instagram, @imageUrl, @tags)
  `);

  const info = stmt.run({ ...b, tags: JSON.stringify(b.tags) });
  const created = db.prepare(`SELECT * FROM businesses WHERE id = ?`).get(info.lastInsertRowid);

  res.status(201).json({ ...created, tags: created.tags ? JSON.parse(created.tags) : [] });
});

// Update
app.put("/api/businesses/:id", requireApiKey, (req, res) => {
  const id = Number(req.params.id);

  const existing = db.prepare(`SELECT * FROM businesses WHERE id = ?`).get(id);
  if (!existing) return res.status(404).json({ error: "Not found" });

  const parsed = BusinessCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const b = parsed.data;

  db.prepare(`
    UPDATE businesses
    SET name=@name, category=@category, description=@description, address=@address, neighborhood=@neighborhood,
        phone=@phone, website=@website, instagram=@instagram, imageUrl=@imageUrl, tags=@tags
    WHERE id=@id
  `).run({ ...b, tags: JSON.stringify(b.tags), id });

  const updated = db.prepare(`SELECT * FROM businesses WHERE id = ?`).get(id);
  res.json({ ...updated, tags: updated.tags ? JSON.parse(updated.tags) : [] });
});

// Delete
app.delete("/api/businesses/:id", requireApiKey, (req, res) => {
  const id = Number(req.params.id);
  const info = db.prepare(`DELETE FROM businesses WHERE id = ?`).run(id);
  if (info.changes === 0) return res.status(404).json({ error: "Not found" });
  res.status(204).send();
});

// ---- Submissions (Get Involved form) ----
app.post("/api/submissions", (req, res) => {
  const parsed = SubmissionCreateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const s = parsed.data;
  const info = db.prepare(`
    INSERT INTO submissions (name, email, message)
    VALUES (?, ?, ?)
  `).run(s.name, s.email, s.message);

  res.status(201).json({ id: info.lastInsertRowid });
});

// ---- Serve your existing frontend (/src) ----
// This serves files like /src/index.html
const repoRoot = path.join(__dirname, "..");
app.use(express.static(repoRoot));

// Optional: make "/" go to your existing homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(repoRoot, "src", "index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
