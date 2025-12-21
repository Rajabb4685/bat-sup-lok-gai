const path = require("path");
const Database = require("better-sqlite3");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "data", "app.db");
const SCHEMA_PATH = path.join(__dirname, "schema.sql");

function openDb() {
  fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");

  // Run schema on startup (idempotent)
  const schema = fs.readFileSync(SCHEMA_PATH, "utf-8");
  db.exec(schema);

  return db;
}

module.exports = { openDb };
