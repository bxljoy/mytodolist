const supabase = require("../db_supabase");
const { v4: uuidv4 } = require("uuid");

const getTasks = async (req, res) => {
  const { userEmail } = req.params;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { data: tasks } = await supabase
      .from("tasks")
      .select()
      .eq("user_email", userEmail);
    res.status(200).json(tasks);
  } catch (error) {
    // error handling
    console.log(error);
    res.status(400).json({ details: error.detail });
  }
};

const addTask = async (req, res) => {
  const { user_email, title, progress, date } = req.body;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  console.log(user_email, title, progress, date);
  const id = uuidv4();
  try {
    const { data: newTask } = await supabase
      .from("tasks")
      .upsert({ id, user_email, title, progress, date })
      .select();

    res.status(201).json(newTask);
  } catch (error) {
    // error handling
    console.log(error);
    res.status(400).json({ details: error.detail });
  }
};

// edit a task

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { user_email, title, progress, date } = req.body;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { data: updateTask } = await supabase
      .from("tasks")
      .update({ user_email, title, progress, date })
      .eq("id", id)
      .select();

    res.status(200).json(updateTask);
  } catch (error) {
    // error handling
    console.log(error);
    res.status(400).json({ details: error.detail });
  }
};

//delete a task

const deleteTask = async (req, res) => {
  const { id } = req.params;
  //verify if the user is authorized
  if (!req.email) return res.status(401).json({ message: "Unauthorized" });

  try {
    const { data: deleteTask } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id)
      .select();
    res.status(200).json(deleteTask);
  } catch (error) {
    // error handling
    console.log(error);
    res.status(400).json({ details: error.detail });
  }
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
