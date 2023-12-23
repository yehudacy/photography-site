import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, CircularProgress, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Details as DetailsIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import TableOfOrders from '../components/TableOfOrders';

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [componentToRender, setComponentToRender] = useState("");

  useEffect(() => {
  }, []);



  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderUpdated = () => {

  };

  const buttonStyle = {
    height: '50px', // Adjust the height as needed
    textTransform: 'none', // Ensure lowercase text
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={2}>
        <Paper style={{ padding: '16px' }}>
          <Typography variant="h6" gutterBottom>
            client Panel
          </Typography>
          <Button fullWidth onClick={() => setComponentToRender('orders')} style={buttonStyle} color="primary">
            my orders
          </Button>
          <Button fullWidth onClick={() => setComponentToRender('invoices')} style={buttonStyle} color="primary">
            my invoices
          </Button>
          <Button fullWidth onClick={() => setComponentToRender('images')} style={buttonStyle} color="primary">
            my images
          </Button>
          <Button fullWidth onClick={() => setComponentToRender('edit info')} style={buttonStyle} color="primary">
            edit info
          </Button>
        </Paper>
      </Grid>
      {componentToRender === "orders" && <TableOfOrders type="client" />}
    </Grid>
  );
};

export default ClientDashboard;