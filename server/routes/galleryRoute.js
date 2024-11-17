const express = require("express");
const multer = require('multer');
const uniqid = require('uniqid');
const {uploadImage, deleteImageFromCloud} = require('../cloudinary/cloudinary')
const { getAllCategoryImages, getallImagesOfACategory, getCategoryIdByName } = require("../../database/categoryDB");
const { getClientByEmail } = require("../../database/usersDB");
const { addImage, getImage, deleteImage } = require("../../database/imagesDB");
const {addImageTransaction} = require('../../database/transactions');
const { authenticateToken } = require("../authentication/authentication");

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
galleryRouter.post("/image", authenticateToken, upload.single('file'), async (req, res) => {
  try{
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileName = `${uniqid()}${req.file.originalname}`
  const {secure_url, public_id} = await uploadImage(req.file.buffer, fileName);
    console.log(secure_url, public_id)
    const categoryId = await getCategoryIdByName(req.body.category);
    if(!categoryId){
       return res.status(400).json({message:"This Category does not exist"});
    }
    const clientId = await getClientByEmail(req.body.clientEmail);

    if(req.body.isMainImage){
      const result = await addImageTransaction(categoryId, clientId, secure_url, public_id);
      if(result === "commit"){
        res.status(201).json("The Image has been added as Main Image");
      } else {
        return res.status(500).json({message:"Something went wrong while trying to save the Image as main image in the Database"});
      }
    } else {
      const {affectedRows} = await addImage(categoryId, secure_url, clientId, public_id);
      if(!affectedRows){
        return res.status(500).json({message:"Something went wrong while trying to save the Image in the Database"});
      } else {
        return res.status(201).json({message:'The Image has been added'});
      }
    }
  } catch(error){
    console.log(error)
    res.status(500).send('Error uploading image to Cloudinary.');
  }
});


galleryRouter.delete( "/image/:imageId" , async (req, res) =>{
  try {    
    const imageId = req.params.imageId;
    const imageToDelete = await getImage(imageId);
    if(!imageToDelete){
      res.status(404).json({message: `No image with the id ${imageId} was found`});
    }
    const {result} = await deleteImageFromCloud(imageToDelete.cloud_public_id);
    if(!(result === 'not found')){
      const deletedImage = await deleteImage(imageToDelete.image_id);
      if(deletedImage){
        res.status(200).json(deletedImage);
      }

    } else {
      res.status(404).json({message: "The image doesn't exist on the cloud"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message: error.message});
    
  }
})

const removeFileExtension = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return fileName.substring(0, lastDotIndex);
  }
  return fileName; 
};

module.exports = { galleryRouter };
