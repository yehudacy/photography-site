const mysql2 = require('mysql2/promise');

const pool = mysql2.createPool({
    host: process.env.DATA_BASE_HOST,
    user: process.env.DATA_BASE_USER,
    password: process.env.DATA_BASE_PASSWORD,
    database: process.env.DATA_BASE_NAME
});


const checkDataBaseConnection = async () => {
    try{
        const connection = await pool.getConnection();
        console.log('data base connected');
        connection.release();        
        return true;
    } catch(error) {
        const message = `The data base isn't connected ${error.message}`;
        console.log(message);
        return false;
    }
}



module.exports = { pool, checkDataBaseConnection };