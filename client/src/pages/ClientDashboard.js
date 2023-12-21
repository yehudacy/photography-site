import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, CircularProgress, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Details as DetailsIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import TableOfOrders from '../components/TableOfOrders';

const ClientDashboard = () => {
 const [orders, setOrders] = useState([]);
 const [selectedOrder, setSelectedOrder] = useState(null);

 useEffect(() => {
 }, []);



 const handleSelectOrder = (order) => {
    setSelectedOrder(order);
 };

 const handleOrderUpdated = () => {
  
 };

 return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={2}>
        <Paper>
          <Typography variant="h6" gutterBottom>
            client Panel
          </Typography>
          
          <Link component={RouterLink} to="/admin/orders" color="primary">
            <Button fullWidth>
            my orders
          </Button>
          </Link>
         
          
          <Button fullWidth>
          <Link component={RouterLink} to="/admin/orders" color="primary">
            my invoices
          </Link>
          </Button>
       
          
          <Button fullWidth>
          <Link component={RouterLink} to="/admin/orders" color="primary">
            my images
          </Link>
          </Button>
       
          <Button fullWidth>
          <Link component={RouterLink} to="/admin/orders" color="primary">
            edit info
          </Link>
          </Button>
        </Paper>
      </Grid>
      {/* <Grid item xs={12} md={9}>
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
                 <TableRow key={order.order_id} onClick={() => handleSelectOrder(order)}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.client_id}</TableCell>
                    <TableCell>{order.order_date}</TableCell>
                    <TableCell>{order.action_date}</TableCell>
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
        )} */}
        {/* Display order details here */}
      {/* </Grid> */}
      <TableOfOrders type="client"/>
    </Grid>
 );
};

export default ClientDashboard;