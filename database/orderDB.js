const { pool } = require('./dbConnection');


//add a new order
const addOrder = async ({clientId, orderDate, actionDate, price, status}) => {
    const addOrderQuery = `
    INSERT INTO orders (client_id, order_date, action_date, price, status) 
    VALUES (?, ?, ?, ?, ?)`;
    const [{insertId}] = await pool.query(addOrderQuery, [clientId, orderDate, actionDate, price, status]);
    // console.log(insertId);
    return insertId;
};

//get all orders
const getAllOrders = async () => {
    const getOrdersQuery = `
    SELECT * FROM orders`;
    const [orders] = await pool.query(getOrdersQuery);
    console.log(orders)
    return orders;
};

//get a order by id
const getOrder = async (orderId) => {
    const getOrderByIdQuery = `
    SELECT * FROM orders
    WHERE order_id = ?`;
    const [[order]] = await pool.query(getOrderByIdQuery, [orderId]);
    // console.log(order)
    return order;
};

//edit a order
const editOrder = async () => {

};

//delete a order
const deleteOrder = async () => {

}


const newOrder = {
    clientId: 1,
    orderDate: '2023-12-20',
    actionDate: '2024-02-20',
    price: 1650,
    status: "waiting"
}

// addOrder(newOrder);
// getOrder(1);
// getAllOrders();