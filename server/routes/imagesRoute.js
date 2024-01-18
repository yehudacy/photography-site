const express = require("express");
const {getAllImages, getImagesOfOneClient} = require('../../database/imagesDB');
const { authenticateToken } = require("../authentication/authentication");


const imagesRouter = express.Router();



//route to get all images for admin
imagesRouter.get('/', authenticateToken , async(req, res) => {
    try{
        const images = await getAllImages();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
});

//route to get all images for one client
imagesRouter.get('/:clientId', authenticateToken , async(req, res) => {
    const clientId = req.params.clientId;
    try{
        const images = await getImagesOfOneClient(clientId);
        res.status(200).json(images);
    } catch (error) {
        // console.log(error)
        res.status(500).json({message: "The server is down please try later"});
    }
});


module.exports = {imagesRouter}



