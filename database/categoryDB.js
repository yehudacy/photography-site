const { pool } = require('./dbConnection');


//add a new category
const addCategory = async (categoryName, categoryImageId) => {
    const addCategoryQuery = `
    INSERT INTO categories (name, category_image_id) 
    VALUES (?, ?)`;
    const [addedCategories] = await pool.query(addCategoryQuery, [categoryName, categoryImageId]);
    console.log(addedCategories);
}


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

//get all category images
const getAllCategoryImages = async () => {
    const getAllCategoryImagesQuery = `
    SELECT * FROM images 
    INNER JOIN categories 
    ON images.image_id = categories.category_image_id`;
    const allCategoryImages = await pool.query(getAllCategoryImagesQuery);
    console.log(allCategoryImages);
    return allCategoryImages;
}

// getCategoryIdByName('new_born');
// const itemData = [
//     {
//       img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
//       title: "new_born",
//       author: "@bkristastucchio",
//       rows: 2,
//       cols: 2,
//       featured: true,
//       categoryId: 1,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
//       title: "Burger",
//       author: "@rollelflex_graphy726",
//       categoryId: 2,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
//       title: "Camera",
//       author: "@helloimnik",
//       categoryId: 3,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
//       title: "Coffee",
//       author: "@nolanissac",
//       cols: 2,
//       categoryId: 4,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
//       title: "Hats",
//       author: "@hjrc33",
//       cols: 2,
//       categoryId: 5,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
//       title: "Honey",
//       author: "@arwinneil",
//       rows: 2,
//       cols: 2,
//       featured: true,
//       categoryId: 5,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
//       title: "Basketball",
//       author: "@tjdragotta",
//       categoryId: 7,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
//       title: "Fern",
//       author: "@katie_wasserman",
//       categoryId: 8,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
//       title: "Mushrooms",
//       author: "@silverdalex",
//       rows: 2,
//       cols: 2,
//       categoryId: 9,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
//       title: "Tomato basil",
//       author: "@shelleypauls",
//       categoryId: 10,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
//       title: "Sea star",
//       author: "@peterlaster",
//       categoryId: 11,
//     },
//     {
//       img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
//       title: "Bike",
//       author: "@southside_customs",
//       cols: 2,
//       categoryId: 12,
//     },
//   ];


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


module.exports = { addCategory, getCategoryIdByName, getAllCategoryImages }