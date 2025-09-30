const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const db = require("./createDatabase");

const router = require("./createRouter");
app.use("/auth", router);

const router1 = require("./productRouter");
app.use("/product", router1);

app.get("/", (req, res) => {
  res.send("HSHHSHS")
});

require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`);
});
