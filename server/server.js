const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3002;
const bodyParser = require("body-parser");
const cors = require("cors");

const usersRoute = require("./routes/usersRoute");
const tasksRoute = require("./routes/tasksRoute");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", usersRoute);
app.use("/tasks", tasksRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
