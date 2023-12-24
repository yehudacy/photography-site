const express = require("express");
const { getAllOrders, getOrder, addOrder, getOrderOfSingleClient } = require("../../database/orderDB");

const ordersRouter = express.Router();

//place a new order
ordersRouter.post('/', async (req, res) => {
    try {
        const newOrder = req.body;
        console.log(newOrder)
        //validation if failed send with status 400(bad request)
        const addedOrder = await addOrder(newOrder);
        //handle sending me an email
        res.status(201).json(addedOrder);
    } catch (error) {
        // console.log(error)
        res.status(500).json({message:"The server is down please try again later"}) 
    }
})

//route to get all orders
ordersRouter.get('/', async (req, res) => {
    try{
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
})

ordersRouter.get('/client/:clientId', async (req, res) => {
    try{
        const clientId = req.params.clientId;
        const orders = await getOrderOfSingleClient(clientId);
        // if(!order) {
        //     res.status(404).json({message: `An order with id of ${orderId} doesn't exist`});
        // }
        // console.log(orders)
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
})

//route for getting a specific order by id
ordersRouter.get('/:orderid', async (req, res) => {
    try{
        const orderId = req.params.orderid;
        const order = await getOrder(orderId);
        if(!order) {
            res.status(404).json({message: `An order with id of ${orderId} doesn't exist`});
        }
        // console.log(order)
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({message: "The server is down please try later"});
    }
})
module.exports = { ordersRouter };

