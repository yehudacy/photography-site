const { pool } = require('./dbConnection');

async function addImageTransaction(categoryId, clientId, src) {
    let connection;

    try {
        // Get a connection from the pool
        connection = await pool.getConnection();

        // Begin the transaction
        await connection.beginTransaction();

        const addImageQuery = `
        INSERT INTO images (category_id, client_id, src) 
        VALUES (?, ?, ?);`


        // Perform multiple queries within the transaction
        const [{insertId}] = await connection.query(addImageQuery, [categoryId, clientId, src]);

        const setMainImageQuery = `
        UPDATE categories
        SET category_image_id = ${insertId}
        WHERE category_id = ?`;

        await connection.query(setMainImageQuery, [categoryId]);

        // If everything went well, commit the transaction
        await connection.commit();

        console.log('Transaction committed successfully!');
        return "commit";
    } catch (error) {
        // If there was an error, rollback the transaction
        if (connection) {
            await connection.rollback();
        }

        console.error('Error in transaction:', error.message);
        return "rollback";
    } finally {
        // Release the connection back to the pool
        if (connection) {
            connection.release();
        }
    }
}


// addImageTransaction(7, null, 'https://res.cloudinary.com/dzjsaikk1/image/upload/v1704411348/15sdpy4q8lqzui02jIMG_3013.JPG.jpg')

module.exports = {addImageTransaction}