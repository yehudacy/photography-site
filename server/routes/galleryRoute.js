const express = require("express");
const multer = require('multer');
const uniqid = require('uniqid');
const {uploadImage} = require('../cloudinary/cloudinary')
const { getAllCategoryImages, getallImagesOfACategory, getCategoryIdByName } = require("../../database/categoryDB");
const { getClientByEmail } = require("../../database/usersDB");
const { addImage } = require("../../database/imagesDB");

const galleryRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//route for getting all the category images for the gallery page
galleryRouter.get("/", async (req, res) => {
  const [categoryImages] = await getAllCategoryImages();
  res.status(200).json(categoryImages);
});


//route for getting all the images foe a certain category
galleryRouter.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const categoryImages = await getallImagesOfACategory(category);
    // console.log(categoryImages)
    res.status(200).json(categoryImages);
  } catch (error) {
    console.log(error)
  }
});


//add a new image to database
galleryRouter.post("/image", upload.single('file'), async (req, res) => {
  try{
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // console.log(req.file)
    // console.log(req.body)

    const fileName = `${uniqid()}${req.file.originalname}`
    const imageUrl = await uploadImage(req.file.buffer, fileName);
    // console.log(imageUrl)
    const categoryId = await getCategoryIdByName(req.body.category);
    if(!categoryId){
       return res.status(400).json({message:"This Category does not exist"});
    }
    const clientId = await getClientByEmail(req.body.clientEmail);


    const {affectedRows} = await addImage(categoryId, imageUrl, clientId);
    if(!affectedRows){
      return res.status(500).json({message:"Something went wrong while trying to save the Image in the Database"});
    } else {
      return res.status(201).json({message:'The Image has been added'});
    }
  } catch(error){
    console.log(error)
    res.status(500).send('Error uploading image to Cloudinary.');
  }
})

module.exports = { galleryRouter };
