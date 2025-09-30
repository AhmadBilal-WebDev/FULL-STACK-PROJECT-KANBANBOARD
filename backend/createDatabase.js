const mongoose = require("mongoose");
require("dotenv").config();

const URL = process.env.MONGODB;
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("connected", () => console.log("MongoDB Connect Successfully ✅"));
db.on("disconnected", () => console.log("MongoDB Disconnect Successfully ✅"));
db.on("error", () => console.log("Error Connecting With MongoDB ❌"));

module.exports = db;
