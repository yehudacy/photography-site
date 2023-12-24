const express = require('express');
const { addUser, getUser } = require('../../database/usersDB');

const usersRouter = express.Router();

//get all users route
usersRouter.get('/', (req, res) => {
    res.status(200).json({message: "This route works!"})
})

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