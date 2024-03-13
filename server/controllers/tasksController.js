const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

const getTasks = async (req, res) => {
  const { userEmail } = req.params;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const tasks = await pool.query(
      "SELECT * FROM tasks WHERE user_email = $1",
      [userEmail]
    );
    res.json(tasks.rows);
  } catch (error) {
    console.log(error);
  }
};

const addTask = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

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
};

// edit a task

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const updateTask = await pool.query(
      "UPDATE tasks SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5",
      [user_email, title, progress, date, id]
    );
    res.json(updateTask.rows);
  } catch (error) {
    console.log(error);
  }
};

//delete a task

const deleteTask = async (req, res) => {
  const { id } = req.params;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    res.json(deleteTask.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
