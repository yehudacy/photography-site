const express = require("express");
const multer = require('multer');
const {uploadImage} = require('../cloudinary/cloudinary')
const { getAllCategoryImages, getallImagesOfACategory } = require("../../database/categoryDB");

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
    //mock of all images to filter and send back only for a certain category
    // const itemData = [
    //   {
    //     img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    //     title: "newBorn",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    //     title: "newBorn",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    //     title: "newBorn",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    //     title: "Burger",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    //     title: "Burger",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    //     title: "Camera",
    //     author: "@arwinneil",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    //     title: "Camera",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    //     title: "Coffee",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    //     title: "Coffee",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    //     title: "Hats",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    //     title: "Hats",
    //   },
    //   {
    //     img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    //     title: "Honey",
    //   },
    // ];
    // what to return if i want to return mock data ---> itemData.filter((item) => item.title.toLowerCase() === category.toLowerCase().replaceAll("_", ""))
    res.status(200).json(categoryImages);
  } catch (error) {
    console.log(error)
  }
});


//add a new image to database
galleryRouter.post("/image", upload.single('file'), async (req, res) => {
  try{
    // console.log(req.file)
    // console.log(req.body)
    const publicId = await uploadImage(req.file.buffer);
    console.log(publicId)

  } catch(error){
    console.log(error)
    console.log("Error posting Image");
  }
})

module.exports = { galleryRouter };
