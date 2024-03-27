const router = require('express').Router();
const {
  getTasks,
  addTask,
  deleteTask,
  updateTask,
} = require('../controllers/tasksController');
const auth = require('../middlewares/auth');

router.get('/:userEmail', auth, getTasks);
router.post('/', auth, addTask);
router.patch('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;
