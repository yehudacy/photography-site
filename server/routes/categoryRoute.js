const express = require("express");
const uniqid = require("uniqid");
const multer = require("multer");
const {
  getAllCategoriesNames,
  getCategories,
  deleteCategory,
  addCategory,
  getCategory,
  editCategory,
} = require("../../database/categoryDB");
const { authenticateToken } = require("../authentication/authentication");
const { uploadImage } = require("../cloudinary/cloudinary");
const {
  addCategoryAndImageTransaction,
  editCategoryTransaction,
} = require("../../database/transactions");
const { login } = require("../../database/usersDB");
const categoryRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

categoryRouter.post(
  "/",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      // console.log(req.file);

      const fileName = `${uniqid()}${req.file.originalname}`;
      const { secure_url, public_id } = await uploadImage(
        req.file.buffer,
        fileName
      );

      const { status, categoryId } = await addCategoryAndImageTransaction(
        req.body,
        secure_url,
        public_id
      );
      // console.log(status, categoryId);
      if (status === "commit") {
        const addedCategory = await getCategory(categoryId);
        res.status(201).json({ ...addedCategory, src: secure_url });
      }
    } catch (error) {
      // console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

categoryRouter.put(
  "/:categoryId",
  authenticateToken,
  upload.single("image"),
  async ({ body, file, params: { categoryId } }, res) => {
    let imageUrl;
    let publicId;
    try {
      if (body.imgChanged === "true") {
        const fileName = `${uniqid()}${file.originalname}`;
        const { secure_url, public_id } = await uploadImage(
          file.buffer,
          fileName
        );
        imageUrl = secure_url;
        publicId = public_id;
      }

      const url = body.imgChanged === "true" ? imageUrl : body.image;

      const { status } = await editCategoryTransaction(
        categoryId,
        body,
        url,
        publicId
      );
      if (status === "commit") {
        const updatedCategory = await getCategory(categoryId);
        res.status(200).json({ ...updatedCategory, src: url });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

//changing only the main image
categoryRouter.put(
  "/img/:categoryId",
  authenticateToken,
  async ({ body, params: { categoryId } }, res) => {    
    try {
      const categoryToEdit = await getCategory(categoryId)
      if(categoryToEdit){
        const {category_id, name} = categoryToEdit;
        const data = await editCategory(category_id, name, body.image_id);
        console.log(data);
        res.status(200).json({message: "Added as main image successfully!"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  }
);

//delete a category
categoryRouter.delete(
  "/:categoryId",
  authenticateToken,
  async ({ params: { categoryId } }, res) => {
    try {
      const deletedCategory = await deleteCategory(categoryId);
      // console.log(deletedCategory);
      res.status(200).json(deletedCategory);
    } catch (error) {
      // console.log(error);
      let errorCode;
      if (error.message === `No category with the Id of ${categoryId}`) {
        errorCode = 404;
      } else {
        errorCode = 500;
      }
      res.status(errorCode).json(error.message);
    }
  }
);

module.exports = { categoryRouter };
