const jwt = require('jsonwebtoken');


const generateToken = (userInfo) => {
    const payload = {
        userId : userInfo.isAdmin ? userInfo.administrator_id : userInfo.client_id,
        isAdmin: userInfo.isAdmin
    }


    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {expiresIn: '15s'});
    return token;
}

// const crypto = require('crypto');

// // Function to generate a random secret key
// function generateRandomKey() {
//   return crypto.randomBytes(32).toString('hex');
// }

// const secretKey = generateRandomKey();

// console.log('Generated Secret Key:', secretKey);

module.exports = {generateToken}
