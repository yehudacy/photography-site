const { pool } = require('./dbConnection');

//get category id by category name
const getCategoryIdByName = async (categoryName) => {
    const getCategoryIdQuery = `
    SELECT category_id 
    FROM categories 
    WHERE name = ?;`
    const [categoryId] = await pool.query(getCategoryIdQuery, [categoryName]);
    // console.log(categoryId)
    return categoryId;
}


//get all images of citrin category
const getallImagesOfACategory = async () => {

}

// getCategoryIdByName('new_born');