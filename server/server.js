const PORT = process.env.PORT || 3001;
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/tasks/:userEmail", async (req, res) => {
  const { userEmail } = req.params;
  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_email = $1",
      [userEmail]
    );
    res.json(tasks.rows);
  } catch (error) {
    console.log(error);
  }
});

// create new task

app.post("/tasks", async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const newTask = await pool.query(
      "INSERT INTO tasks (id, user_email, title, progress, date) VALUES ($1, $2, $3, $4, $5) ",
      [id, user_email, title, progress, date]
    );
    res.json(newTask.rows);
  } catch (error) {
    console.log(error);
  }
});

// edit a task

app.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  try {
    const updateTask = await pool.query(
      "UPDATE tasks SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
      [user_email, title, progress, date, id]
    );
    res.json(updateTask.rows);
  } catch (error) {
    console.log(error);
  }
});

//delete a task

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    res.json(deleteTask.rows);
  } catch (error) {
    console.log(error);
  }
});

//signup

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUP = await pool.query(
      "INSERT INTO users (email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret key", { expiresIn: "1h" });

    res.json({ email, token });
  } catch (error) {
    console.log(error);
    if (error) {
      res.json({ details: error.detail });
    }
  }
});

//login

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (!user.rows.length) return res.json({ details: "user not found" });
    const success = bcrypt.compareSync(password, user.rows[0].hashed_password);
    const token = jwt.sign({ email }, "secret key", { expiresIn: "1h" });
    if (success) {
      res.json({ email: user.rows[0].email, token });
    } else {
      res.json({ details: "password incorrect" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
