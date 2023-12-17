const express = require('express');

const contactMeRouter = express.Router();


contactMeRouter.post('/', (req, res) => {
    try{
        console.log(req.body);
        //handle sending me an email
        //handle contact me table in sql
        res.status(200).json({message : "the message has been passed through"});
    } catch (error) {

    }
})

module.exports = {contactMeRouter};
