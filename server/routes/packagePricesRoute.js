const express = require("express");

const packagePriceRouter = express.Router();

packagePriceRouter.get('/', (req, res) => {
  res.status(200).json({ message: "Package Price API" });
});

module.exports = { packagePriceRouter };
