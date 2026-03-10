const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "https://kanbanboardhub.vercel.app"],
  }),
);

const db = require("./createDatabase");

const router = require("./createRouter");
app.use("/auth", router);
app.use("/task", router);
app.use("/getTask", router);
app.use("/deleteTask", router);
app.use("/updateTask", router);
app.use("/updateTaskStatus", router);

app.post("/task", (req, res) => {
  res.send("Task Checking!");
});

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
