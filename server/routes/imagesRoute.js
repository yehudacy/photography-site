const express = require("express");
const {getAllImages} = require('../../database/imagesDB');


const imagesRouter = express.Router();

//route to get all images for admin
imagesRouter.get('/', async(req, res) => {
    try{
        const images = await getAllImages();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
});


module.exports = {imagesRouter}


