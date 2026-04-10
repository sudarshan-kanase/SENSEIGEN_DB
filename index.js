const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

// test route
app.get("/", (req, res) => {
  res.send("Server Running 🚀");
});


// 🔥 LOGIN API
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      res.json({
        success: true,
        user: result.rows[0],
      });
    } else {
      res.json({
        success: false,
        message: "Invalid credentials",
      });
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});


// server start
app.listen(5000, () => {
  console.log("Server started on port 5000 🔥");
});