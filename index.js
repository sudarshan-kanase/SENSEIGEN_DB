const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());


// REGISTER API
app.post("/register", async (req, res) => {
  const {
    role, firstName, lastName, email, mobile,
    dob, gender, state, district, pin,
    college, purpose, qualification,
    profession, experience, password
  } = req.body;

  try {
    //  check duplicate email
    const checkUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (checkUser.rows.length > 0) {
      return res.json({ success: false, message: "Email already registered ❌" });
    }

    //  insert user
    await pool.query(
      `INSERT INTO users 
      (role, first_name, last_name, email, mobile, dob, gender, state, district, pin, college, purpose, qualification, profession, experience, password)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
      [
        role, firstName, lastName, email, mobile,
        dob, gender, state, district, pin,
        college, purpose, qualification,
        profession, experience, password
      ]
    );

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.json({ success: false, message: "Server error ❌" });
  }
});


// LOGIN API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.json({ success: false, message: "User not found ❌" });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password ❌" });
    }

    res.json({ success: true, user });

  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});


//  TEST
app.get("/", (req, res) => {
  res.send("Backend Running ✅");
});


// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});