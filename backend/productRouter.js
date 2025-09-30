const express = require("express");
const { ensureAuthenticated } = require("./createValidation");
const router1 = express.Router();

router1.get("/", ensureAuthenticated, (req, res) => {
  res.status(200).json([
    {
      name: "mobile",
      price: 10000,
    },
    {
      name: "tv",
      price: 20000,
    },
  ]);
});

module.exports = router1;
