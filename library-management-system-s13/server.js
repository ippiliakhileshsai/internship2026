const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Debug (optional but helpful)
console.log("DB_USER =", process.env.DB_USER);
console.log("DB_NAME =", process.env.DB_NAME);

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
    return;
  }
  console.log("MySQL Connected");
});

// Home route
app.get("/", (req, res) => {
  res.send("Library Management Backend Running");
});

// GET all books API
app.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";

  db.query(sql, (err, result) => {
    if (err) {
      return res.json({ error: err });
    }
    res.json(result);
  });
});

// Start server
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});