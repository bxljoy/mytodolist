const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const secret = process.env.SECRET_KEY;

//signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUP = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    res.json({ email, token });
  } catch (error) {
    console.log(error);
    if (error) {
      res.json({ details: error.detail });
    }
  }
};

//Signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user.rows.length) return res.json({ details: "user not found" });
    const success = bcrypt.compareSync(password, user.rows[0].hashed_password);
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    if (success) {
      res.json({ email: user.rows[0].email, token });
    } else {
      res.json({ details: "password incorrect" });
    }
  } catch (error) {
    console.log(error);
    res.json({
      details:
        "An error occurred while trying to sign in. Please try again later.",
    });
  }
};

module.exports = { signup, signin };
