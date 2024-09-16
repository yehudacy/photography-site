const express = require("express");
const { addNonPaidOrder, getNonPaidOrder,  deleteOrder } = require("../../database/nonPaidOrdersDB.js");
const { authenticateToken } = require("../authentication/authentication");

const nonPaidOrdersRouter = express.Router();

//place a new order 
nonPaidOrdersRouter.post('/', authenticateToken ,async (req, res) => {
    try {
        const newOrder = req.body;
        //validation if failed send with status 400(bad request)
        const addedOrder = await addNonPaidOrder(newOrder);
        console.log(addedOrder) 
        //handle sending me an email
        res.status(201).json(addedOrder); 
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"The server is down please try again later"}) 
    }
})


//route for getting a specific order by id
nonPaidOrdersRouter.get('/:orderId', authenticateToken, async (req, res) => {
    try{        
        const orderId = req.params.orderId;        
        const order = await getNonPaidOrder(orderId);
        if(!order) {
            res.status(404).json({message: `An order with id of ${orderId} doesn't exist`});
        }
        // console.log(order)
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
});

//delete an order
nonPaidOrdersRouter.delete("/:orderId",authenticateToken, async (req, res) => {
    const orderId = req.params.orderId;
    try{
        const deletedOrder = await deleteOrder(orderId);
        console.log(deletedOrder)
        return res.status(200).json(deletedOrder); 
    } catch(error){
        let errorCode; 
        if(error.message === `No order with the Id of ${orderId}`){
            errorCode = 404;
        } else{
            errorCode = 500;
        }
        res.status(errorCode).json(error.message);
    }
})





module.exports = { nonPaidOrdersRouter };

