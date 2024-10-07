const express = require("express");
const {
  getAllCategoriesNames,
  getCategories,
} = require("../../database/categoryDB");
const { authenticateToken } = require("../authentication/authentication");
const categoryRouter = express.Router();

//getting all category objects including category image url;
categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    // console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "the server is down please try later" });
  }
});
//getting all category names;
categoryRouter.get("/names", authenticateToken, async (req, res) => {
  try {
    const categoryNames = await getAllCategoriesNames();
    // console.log(categoryNames)
    res.status(200).json(categoryNames);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "the server is down please try later" });
  }
});

module.exports = { categoryRouter };
