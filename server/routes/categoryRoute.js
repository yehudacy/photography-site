const express = require('express');
const {getAllCategoriesNames} = require('../../database/categoryDB');
const categoryRouter = express.Router();


//getting all category names;
categoryRouter.get('/', async (req, res) => {
    try {
        const categoryNames = await getAllCategoriesNames();
        // console.log(categoryNames)
        res.status(200).json(categoryNames);
    } catch(error){
        console.log(error);
        res.status(500).json({message: "the server is down please try later"});
    }
})


module.exports = {categoryRouter};