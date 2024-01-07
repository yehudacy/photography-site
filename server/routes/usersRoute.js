const express = require('express');
const { addUser, getUser, login } = require('../../database/usersDB');
const {generateToken} = require('../authentication/authentication');

const usersRouter = express.Router();

//get all users route
usersRouter.get('/', (req, res) => {
    res.status(200).json({message: "This route works!"})
});

//get a user for login clients or administrators
usersRouter.post('/login', async (req, res) => {
  try{
    const credentials = req.body;
    if(!credentials.email || !credentials.password){
      return res.status(401).json({ message: 'Missing email and/or password' });
    } 
    const user = await login(credentials, 'clients');
    // console.log(user)
    if(user){
      user.isAdmin = false;
      user.token = generateToken(user);
      res.status(200).json(user);
    } else {
      const admin = await login(credentials, 'administrators');
      if(admin){
        admin.isAdmin = true;
        admin.token = generateToken(admin);
        return res.status(200).json(admin);
      } 
      return res.status(404).json({ message: 'No account found with the provided email address or the provided password.'});
    }
  }catch(error) {
    console.log(error)
  }
});

//get a specific user by id
usersRouter.get('/:clientId', (req, res) => {
    res.status(200).json({message: "This route works!"})
});

//add a new user
usersRouter.post('/', async (req, res) => {
    try {
      const newClient = req.body;
      const addedClient = await addUser(newClient);
      console.log(addedClient);
      if (!addedClient) {
        return res.status(400).json({ message: "Bad request, the user was not added. Please try again later." });
      }
      return res.status(201).json(addedClient);
    } catch (error) {
    //   console.log(error);
      return res.status(409).json({ message: error.sqlMessage, errorCode: error.errno });
    }
  });
  
module.exports = { usersRouter }; 