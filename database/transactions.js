const { pool } = require("./dbConnection");
const { addImage } = require("./imagesDB");

async function addImageTransaction(categoryId, clientId, src, publicId) {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();

    // Begin the transaction
    await connection.beginTransaction();

    const addImageQuery = `
        INSERT INTO images (category_id, client_id, src, cloud_public_id) 
        VALUES (?, ?, ?, ?);`;

    // Perform multiple queries within the transaction
    const [{ insertId }] = await connection.query(addImageQuery, [
      categoryId,
      clientId,
      src,
      publicId
    ]);

    const setMainImageQuery = `
        UPDATE categories
        SET category_image_id = ${insertId}
        WHERE category_id = ?`;

    await connection.query(setMainImageQuery, [categoryId]);

    // If everything went well, commit the transaction
    await connection.commit();

    console.log("Transaction committed successfully!");
    return "commit";
  } catch (error) {
    // If there was an error, rollback the transaction
    if (connection) {
      await connection.rollback();
    }

    console.error("Error in transaction:", error.message);
    return "rollback";
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}

async function addCategoryAndImageTransaction(category, imageUrl, publicId) {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    // Begin the transaction
    await connection.beginTransaction();
    // Perform multiple queries within the transaction
    const addCategoryQuery = `
    INSERT INTO categories (name, category_image_id) 
    VALUES (?, ?)`;

    const [{ insertId }] = await connection.query(addCategoryQuery, [
      category.name,
      0,
    ]);

    let addImageQuery = `
    INSERT INTO images (category_id, src, cloud_public_id) 
    VALUES (?, ?, ?);`;

    const [addedImageInfo] = await connection.query(addImageQuery, [
      insertId,
      imageUrl,
      publicId,
    ]);

    let editCategoryQuery = `
    UPDATE categories
    SET category_image_id = ?
    WHERE category_id = ?`;

    const [{ affectedRows }] = await connection.query(editCategoryQuery, [
      addedImageInfo.insertId,
      insertId,
    ]);
    // If everything went well, commit the transaction
    await connection.commit();

    console.log("Transaction committed successfully!");
    return { status: "commit", categoryId: insertId };
  } catch (error) {
    // If there was an error, rollback the transaction
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return { status: "rollback" };
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}

async function editCategoryTransaction(categoryId, category, imageUrl, publicId, imgChanged) {
  let connection;

  try {
    // Get a connection from the pool
    connection = await pool.getConnection();
    // Begin the transaction
    await connection.beginTransaction();
    // Perform multiple queries within the transaction
    let insertedId;
    if(category.imgChanged){      
      let addImageQuery = `
      INSERT INTO images (category_id, src, cloud_public_id) 
      VALUES (?, ?, ?);`;
      const [{insertId}] = await connection.query(addImageQuery, [
        categoryId,
        imageUrl,
        publicId,
      ]);
      insertedId = insertId;
    }    
    const categoryImageId = category.imgChanged ? insertedId : category.category_image_id;
    
    let editCategoryQuery = `
    UPDATE categories
    SET name = ?, 
      category_image_id = ?
    WHERE category_id = ?`;
    const  [{affectedRows}]  = await pool.query(editCategoryQuery, [
      category.name,
      categoryImageId,
      categoryId,
    ]);

    // If everything went well, commit the transaction
    await connection.commit();

    console.log("Transaction committed successfully!");
    return { status: "commit"};
  } catch (error) {
    // If there was an error, rollback the transaction
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return { status: "rollback" };
  } finally {
    // Release the connection back to the pool
    if (connection) {
      connection.release();
    }
  }
}

// addImageTransaction(7, null, 'https://res.cloudinary.com/dzjsaikk1/image/upload/v1704411348/15sdpy4q8lqzui02jIMG_3013.JPG.jpg')

module.exports = {
  addImageTransaction,
  addCategoryAndImageTransaction,
  editCategoryTransaction,
};
