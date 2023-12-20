import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, CircularProgress, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Details as DetailsIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const AdminDashboard = () => {
 const [orders, setOrders] = useState([]);
 const [selectedOrder, setSelectedOrder] = useState(null);

 useEffect(() => {
    fetchOrders();
 }, []);

 const fetchOrders = async () => {
    const response = await fetch('api/orders');
    const data = await response.json();
    setOrders(data);
 };

 const handleSelectOrder = (order) => {
    setSelectedOrder(order);
 };

 const handleOrderUpdated = () => {
    fetchOrders();
 };

 return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper>
          <Typography variant="h6" gutterBottom>
            Admin Panel
          </Typography>
          <Link component={RouterLink} to="/admin/orders" color="primary">
            View all orders
          </Link>
        </Paper>
      </Grid>
      <Grid item xs={12} md={9}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Client ID</TableCell>
                <TableCell>Order Date</TableCell>
                <TableCell>Action Date</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.length > 0 ? (
                orders.map((order) => (
                 <TableRow key={order.id} onClick={() => handleSelectOrder(order)}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.clientId}</TableCell>
                    <TableCell>{order.orderDate}</TableCell>
                    <TableCell>{order.actionDate}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell>{order.remarks}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      <IconButton>
                        <DetailsIcon />
                      </IconButton>
                      <IconButton>
                        <EditIcon />
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                 </TableRow>
                ))
              ) : (
                <TableRow>
                 <TableCell colSpan={10} align="center">
                    <CircularProgress />
                 </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {selectedOrder && (
          <Typography variant="h5" gutterBottom>
            Order Details
          </Typography>
        )}
        {/* Display order details here */}
      </Grid>
    </Grid>
 );
};

export default AdminDashboard;