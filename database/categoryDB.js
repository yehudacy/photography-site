const { pool } = require("./dbConnection");

//add a new category
const addCategory = async (categoryName, categoryImageId) => {
  const addCategoryQuery = `
    INSERT INTO categories (name, category_image_id) 
    VALUES (?, ?)`;
  const [{ insertId }] = await pool.query(addCategoryQuery, [
    categoryName,
    categoryImageId,
  ]);
  console.log(insertId);
  return insertId;
};

//get all category names
const getAllCategoriesNames = async () => {
    const getCategoryNamesQuery = `SELECT name FROM categories`;
  const [queryResult] = await pool.query(getCategoryNamesQuery);
  const justNamesArr = queryResult.map(({ name }) => name);
//   console.log(justNamesArr)
  return justNamesArr;
};

//get category id by category name
const getCategoryIdByName = async (categoryName) => {
  const getCategoryIdQuery = `
    SELECT category_id 
    FROM categories 
    WHERE name = ?;`;
  const [[ result ]] = await pool.query(getCategoryIdQuery, [
    categoryName,
  ]);
  // console.log(result)
  return result?.category_id;
};

//get all images of citrin category
const getallImagesOfACategory = async (categoryName) => {
  let categoryId = await getCategoryIdByName(categoryName);
  if (categoryId === undefined) {
    throw new Error(`Category ${categoryName} does not exist`);
  }
  const getallImagesOfACategoryQuery = `
    SELECT * FROM images i
	WHERE i.category_id = ?`;
  const [imagesOfACategory] = await pool.query(getallImagesOfACategoryQuery, [
    categoryId,
  ]);
  // console.log(imagesOfACategory)
  return imagesOfACategory;
};

//get all category images
const getAllCategoryImages = async () => {
  const getAllCategoryImagesQuery = `
    SELECT * FROM images 
    INNER JOIN categories 
    ON images.image_id = categories.category_image_id`;
  const allCategoryImages = await pool.query(getAllCategoryImagesQuery);
  // console.log(allCategoryImages);
  return allCategoryImages;
};

// getCategoryIdByName('new_born')

// addCategory('new_born', 1);
// addCategory('burger', 2);
// addCategory('camera', 3);
// addCategory('coffee', 4);
// addCategory('hats', 5);
// addCategory('honey', 6);
// addCategory('basketball', 7);
// addCategory('fern', 8);
// addCategory('Mushrooms', 9);
// addCategory('Tomato_basil', 10);
// addCategory('sea_star', 11);
// addCategory('bike', 12);

// getAllCategoryImages();

// getCategoryIdByName('new_born');

// getAllCategoriesNames()

// getallImagesOfACategory("new_born");
module.exports = {
  addCategory,
  getCategoryIdByName,
  getAllCategoryImages,
  getallImagesOfACategory,
  getAllCategoriesNames
};
