const express = require('express');

const usersRouter = express.Router();

//get all users route
usersRouter.get('/', (req, res) => {
    res.status(200).json({message: "This route works!"})
})

//get a specific user by id
usersRouter.get('/:clientId', (req, res) => {
    res.status(200).json({message: "This route works!"})
})
module.exports = { usersRouter };