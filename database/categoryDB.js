const { pool } = require("./dbConnection");

//add a new category
const addCategory = async ({name, category_image_id}) => {
  const addCategoryQuery = `
    INSERT INTO categories (name, category_image_id) 
    VALUES (?, ?)`;
  const [{ insertId }] = await pool.query(addCategoryQuery, [
    name,
    category_image_id,
  ]);
  console.log(insertId);
  return getCategory(insertId);
};

//edit a category
const editCategory = async (categoryId, name, categoryImageId) => {
  let editCategoryQuery = `
  UPDATE categories
  SET name = ? 
    category_image_id = ?
  WHERE category_id = ?`;
  const [{ affectedRows }] = await pool.query(editCategoryQuery, [
    name,
    categoryImageId,
    categoryId,
  ]);
  // console.log(affectedRows);
  return affectedRows;
};

const getCategory = async (categoryId) => {
  const getCategoryByIdQuery = `
    SELECT * FROM categories
    WHERE category_id = ?`;
  const [[category]] = await pool.query(getCategoryByIdQuery, [categoryId]);
    // console.log(category);
  return category;
};

//delete a category
const deleteCategory = async (categoryId) => {
  const categoryToDelete = await getCategory(categoryId);
  if (!categoryToDelete) {
    throw new Error(`No category with the Id of ${categoryId}`);
  }
  const removeCategoryQuery = `
  DELETE FROM categories 
  WHERE category_id = ?;`;
  const [result] = await pool.query(removeCategoryQuery, [categoryId]);
  if (result.affectedRows === 1) {
    return categoryToDelete;
  } else {
    throw "Delete failed";
  }
};
//get all category objects including image urls and names
const getCategories = async () => {
  const getCategoriesQuery = `
 SELECT 
  categories.category_id, 
  categories.name, 
  categories.category_image_id, 
  images.src
FROM 
  photography_site.categories
LEFT JOIN 
  photography_site.images
ON 
  categories.category_image_id = images.image_id;`;
  const [result] = await pool.query(getCategoriesQuery);
  // console.log(result);
  return result;
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
  const [[result]] = await pool.query(getCategoryIdQuery, [categoryName]);
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
// editCategory(5, 28);
// getCategories();
// getCategory(5)
// deleteCategory(11)
module.exports = {
  addCategory,
  getCategoryIdByName,
  getAllCategoryImages,
  getallImagesOfACategory,
  getAllCategoriesNames,
  getCategories,
  getCategory,
  deleteCategory,
  editCategory,
};
