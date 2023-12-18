const express = require("express");

const ordersRouter = express.Router();

//place a new order
ordersRouter.post('/', async (req, res) => {
    try {
        //validation if failed send with status 400(bad request)
        //handle order table in sql
        //handle sending me an email
        //if success
        res.status(201).json({ message: "the order processed as expected" });
    } catch (error) {
        res.status(500).json({message:"The server is down please try again later"}) 
    }
})


module.exports = { ordersRouter };

