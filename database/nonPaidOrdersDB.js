const { pool } = require('./dbConnection');


//add a new order
const addNonPaidOrder = async ({clientId, orderDate, actionDate, time, price, currency, remarks, status}) => {    
    const addNonPaidOrderQuery = `
    INSERT INTO non_paid_orders (client_id, order_date, action_date, time, price, currency, remarks, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [{insertId}] = await pool.query(addNonPaidOrderQuery, [clientId, orderDate, actionDate, time, price, currency, remarks, status]);
    // console.log(insertId);
    return await getNonPaidOrder(insertId);
};

//get a order by id
const getNonPaidOrder = async (orderId) => {
    const getNonPaidOrderByIdQuery = `
    SELECT * FROM non_paid_orders
    WHERE order_id = ?`;
    const [[order]] = await pool.query(getNonPaidOrderByIdQuery, [orderId]);
    // console.log(order)
    return order;
};

//delete a order
const deleteOrder = async (orderId) => {
    const orderToDelete = await getNonPaidOrder(orderId);
    const deleteNonPaidOrderQuery = `
    DELETE FROM non_paid_orders WHERE order_id = ?;`
    const [{ affectedRows }] = await pool.query(deleteNonPaidOrderQuery, [orderId]);
    if(!affectedRows && !orderToDelete){
        throw new Error(`No order with the Id of ${orderId}`);
    }
    // console.log(orderToDelete)
    return orderToDelete
}


const newOrder = {
    clientId: 3,
    orderDate: '2023-12-20',
    actionDate: '2024-10-20',
    time: '12:54',
    price: 1650,
    currency: 'USD',
    remarks: "some remarks2",
    status: "waiting"
}

// addNonPaidOrder(newOrder);
// getNonPaidOrder(2);
// deleteOrder(2)


module.exports = {addNonPaidOrder, getNonPaidOrder,  deleteOrder };