const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./database/users.db", (err) => {
  if (err) {
    console.error("error connecting to SQLite database:", err.message);
  } else {
    console.log("connected to SQLite database.");
  }
});


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      ingredients TEXT NOT NULL,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )
  `);
})

module.exports = db;
