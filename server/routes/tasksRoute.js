const router = require("express").Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require("../controllers/tasksController");

router.get("/:userEmail", getTasks);
router.post("/", addTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
