const jwt = require('jsonwebtoken');


const generateToken = (userInfo) => {
    const payload = {
        userId : userInfo.isAdmin ? userInfo.administrator_id : userInfo.client_id,
        isAdmin: userInfo.isAdmin
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY_JWT);
    return token;
}

//function for authenticate the token

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET_KEY_JWT);
        req.user = decoded;
      next();
    } catch (error) {
      console.log(error)
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };

// const crypto = require('crypto');

// // Function to generate a random secret key
// function generateRandomKey() {
//   return crypto.randomBytes(32).toString('hex');
// }

// const secretKey = generateRandomKey();

// console.log('Generated Secret Key:', secretKey);

module.exports = {generateToken, authenticateToken}
