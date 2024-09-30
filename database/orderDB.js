const { pool } = require('./dbConnection');


//add a new order
const addOrder = async ({client_id, order_date, action_date, time, price, currency,  remarks, status}) => {    
    const addOrderQuery = `
    INSERT INTO orders (client_id, order_date, action_date, time, price, currency, remarks, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [{insertId}] = await pool.query(addOrderQuery, [client_id, order_date, action_date, time, price, currency, remarks, status]);
    // console.log(insertId);
    return await getOrder(insertId);
};

//get all orders
const getAllOrders = async () => {
    const getOrdersQuery = `
    SELECT * FROM orders`;
    const [orders] = await pool.query(getOrdersQuery);
    // console.log(orders)
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
//get orders of a client  by client id
const getOrderOfSingleClient = async (clientId) => {
    const getOrderOfSingleClientQuery = `
    SELECT * FROM orders
    WHERE client_id = ?`;
    const [orders] = await pool.query(getOrderOfSingleClientQuery, [clientId]);
    // console.log(orders)
    return orders;
};

//edit a order
const editOrder = async (orderId, {clientId, orderDate, actionDate, price, currency, status}) => {
    const editOrderQuery = `
    UPDATE orders
    SET client_id = ?, order_date = ?, action_date = ?, price = ?, currency = ?, status = ?
    WHERE order_id = ?;`;
    const [{affectedRows}] = await pool.query(editOrderQuery, [clientId, orderDate, actionDate, price, currency, status, orderId]);
    if(!affectedRows){
        throw new Error("no rows affected please check the order id if it exist");
    }
    return await getOrder(orderId);
};

//delete a order
const deleteOrder = async (orderId) => {
    const orderToDelete = await getOrder(orderId);
    const deleteOrderQuery = `
    DELETE FROM orders WHERE order_id = ?;`
    const [{ affectedRows }] = await pool.query(deleteOrderQuery, [orderId]);
    if(!affectedRows && !orderToDelete){
        throw new Error(`No order with the Id of ${orderId}`);
    }
    // console.log(orderToDelete)
    return orderToDelete
}


const newOrder = {
    clientId: 3,
    orderDate: '2023-12-20',
    actionDate: '2024-08-20',
    time: '12:54',
    price: 1650,
    currency: 'USD',
    remarks: "some remarks2",
    status: "waiting"
}

// addOrder(newOrder);
// getOrder(1);
// getAllOrders();
// editOrder(1, newOrder);
// deleteOrder(7)


module.exports = { addOrder, getAllOrders, getOrder, editOrder, deleteOrder, getOrderOfSingleClient };