import React, { useEffect, useState } from 'react';
import { Grid, Paper, Typography, Button } from '@mui/material';
import TableOfOrders from '../components/TableOfOrders';
import ContactRequestsTable from '../components/ContactRequestsTable';
import ImageUploadForm from '../components/ImageUploadForm';
import AdminImagesGallery from '../components/AdminImagesGallery';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';

const AdminDashboard = () => {

  const navigate = useNavigate();
  const {user} = useUser();


  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [componentToRender, setComponentToRender] = useState("");


  useEffect(() => {
    // if(!user) navigate('/login');
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
          <Button fullWidth onClick={() => setComponentToRender('viewImg')} style={buttonStyle} color="primary">
            View images
          </Button>
        </Paper>
      </Grid>
      {componentToRender === "orders" && <TableOfOrders type="admin" />}
      {componentToRender === "contactMe" && <ContactRequestsTable />}
      {componentToRender === "upload" && <ImageUploadForm />}
      {componentToRender === "viewImg" && <AdminImagesGallery />}
    </Grid>
  );
};

export default AdminDashboard;