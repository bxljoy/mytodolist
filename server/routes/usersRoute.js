const router = require("express").Router();
// const { signup, signin } = require('../controllers/usersController');
const { signup, signin } = require("../controllers/usersController_supabase");

router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
