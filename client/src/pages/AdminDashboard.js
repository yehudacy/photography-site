import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Link, CircularProgress, IconButton, Button } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Details as DetailsIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import axiosInstance from '../axiosInstance';
import TableOfOrders from '../components/TableOfOrders';
import ContactRequestsTable from '../components/ContactRequestsTable';
import ImageUploadForm from '../components/ImageUploadForm';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [componentToRender, setComponentToRender] = useState("");





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
            Admin Panel
          </Typography>
          <Button fullWidth onClick={() => setComponentToRender('orders')} style={buttonStyle} color="primary">
            View all orders
          </Button>
          <Button fullWidth onClick={() => setComponentToRender('contactMe')} style={buttonStyle} color="primary">
            View all contact me
          </Button>
          <Button fullWidth onClick={() => setComponentToRender('upload')} style={buttonStyle} color="primary">
            Upload images
          </Button>
        </Paper>
      </Grid>
      {componentToRender === "orders" && <TableOfOrders type="admin" />}
      {componentToRender === "contactMe" && <ContactRequestsTable />}
      {componentToRender === "upload" && <ImageUploadForm />}
    </Grid>
  );
};

export default AdminDashboard;