const express = require("express");

const ordersRouter = express.Router();

//place a new order
ordersRouter.post('/', async (req, res) => {
    try{
        console.log(req.body);
        res.status(201).json({message: "the order processed as expected"});
    } catch(error) {

    }
})


module.exports = { ordersRouter };

