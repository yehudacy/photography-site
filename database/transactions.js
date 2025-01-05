const { pool } = require("./dbConnection");

/*
instructions for transactions
1.  Get a connection from the pool =  connection = await pool.getConnection();
2.  Begin the transaction =  await connection.beginTransaction();
3.  Perform the operations = e.g.  await connection.query("INSERT INTO ... (column 1, column 2) VALUES (value 1, value 2)";

  if everything went as expected
4.  Commit the transaction =  await connection.commit();
5.  Release the connection =  await connection.release();
  If an error occurred
4.  roll back the transaction =  await connection.rollback();
5.  Release the connection =  await connection.release();
*/

async function addImageTransaction(categoryId, clientId, src, publicId) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const addImageQuery = `
        INSERT INTO images (category_id, client_id, src, cloud_public_id) 
        VALUES (?, ?, ?, ?);`;
    const [{ insertId }] = await connection.query(addImageQuery, [
      categoryId,
      clientId,
      src,
      publicId,
    ]);

    const setMainImageQuery = `
        UPDATE categories
        SET category_image_id = ${insertId}
        WHERE category_id = ?`;
    await connection.query(setMainImageQuery, [categoryId]);

    await connection.commit();
    console.log("Transaction committed successfully!");
    return "commit";
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return "rollback";
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function addJobImagesTransaction(jobId, clientId, imagesDataArr) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const addJobImageQuery = `
        INSERT INTO job_images (job_id, client_id, src, cloud_public_id) 
        VALUES (?, ?, ?, ?);`;
    const results = imagesDataArr.map((image) =>
      connection.query(addJobImageQuery, [
        jobId,
        clientId,
        image.secure_url,
        image.public_id,
      ])
    );
    await connection.commit();
    console.log("Transaction committed successfully!");
    return "commit";
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return "rollback";
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function deleteJobImagesTransaction(jobId, imagesIds = []) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    const deleteJobImageQuery = `DELETE FROM job_images WHERE job_image_id = ?`;
    const results = imagesIds.map((imageId) =>
      connection.query(deleteJobImageQuery, [imageId])
    );
    const editJobQuery = `
    UPDATE jobs
    SET delete_date = ?, job_image_id = ?
    WHERE job_id = ?`;
    const result = connection.query(editJobQuery, [new Date(), null, jobId]);

    await connection.commit();
    console.log("Transaction committed successfully!");
    return "commit";
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return "rollback";
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
async function addCategoryAndImageTransaction(category, imageUrl, publicId) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

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

    await connection.commit();
    console.log("Transaction committed successfully!");
    return { status: "commit", categoryId: insertId };
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return { status: "rollback" };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

async function editCategoryTransaction(
  categoryId,
  category,
  imageUrl,
  publicId,
  imgChanged
) {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.beginTransaction();

    let insertedId;
    if (category.imgChanged) {
      let addImageQuery = `
      INSERT INTO images (category_id, src, cloud_public_id) 
      VALUES (?, ?, ?);`;
      const [{ insertId }] = await connection.query(addImageQuery, [
        categoryId,
        imageUrl,
        publicId,
      ]);
      insertedId = insertId;
    }
    const categoryImageId = category.imgChanged
      ? insertedId
      : category.category_image_id;

    let editCategoryQuery = `
    UPDATE categories
    SET name = ?, 
      category_image_id = ?
    WHERE category_id = ?`;
    const [{ affectedRows }] = await pool.query(editCategoryQuery, [
      category.name,
      categoryImageId,
      categoryId,
    ]);

    await connection.commit();
    console.log("Transaction committed successfully!");
    return { status: "commit" };
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    console.error("Error in transaction:", error.message);
    return { status: "rollback" };
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

module.exports = {
  addImageTransaction,
  addCategoryAndImageTransaction,
  editCategoryTransaction,
  addJobImagesTransaction,
  deleteJobImagesTransaction,
};
