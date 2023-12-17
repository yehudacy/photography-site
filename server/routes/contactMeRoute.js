const express = require('express');

const contactMeRouter = express.Router();


contactMeRouter.post('/', (req, res) => {
    try{
        console.log(req.body);
        //validation if failed send with status 400(bad request)
        //handle contact me table in sql
        //handle sending me an email
        //if success 
        res.status(200).json({message : "the message has been passed through"});
    } catch (error) {
        res.status(500).json({message: "The server didn't respond to the request please try later"});
    }
})

module.exports = {contactMeRouter};
