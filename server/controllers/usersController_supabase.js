const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const supabase = require("../db_supabase");

const secret = process.env.SECRET_KEY;

//signup
const signup = async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const { data: user } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (user.length) {
      return res.status(400).json({ details: "User already exists" });
    }

    const { error } = await supabase
      .from("users")
      .insert({ email: email, hashed_password: hashedPassword });
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });

    res.status(201).json({ email, token });
  } catch (error) {
    // error handling
    console.log(error);
    if (error) {
      res.status(400).json({ details: error.detail });
    }
  }
};

//Signin
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { data: user } = await supabase
      .from("users")
      .select()
      .eq("email", email);
    if (!user.length) return res.json({ details: "user not found" });
    const success = bcrypt.compareSync(password, user[0].hashed_password);
    const token = jwt.sign({ email }, secret, { expiresIn: "1h" });
    if (success) {
      res.status(200).json({ email: user[0].email, token });
    } else {
      res.status(400).json({ details: "password incorrect" });
    }
  } catch (error) {
    // error handling
    console.log(error);
    res.status(400).json({
      details:
        "An error occurred while trying to sign in. Please try again later.",
    });
  }
};

module.exports = { signup, signin };
