import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import TableOfOrders from "../components/TableOfOrders";
import ClientImageList from "../components/ClientImageList";
import AccountDetails from "../components/AccountDetails";
import { useUser } from "../hooks/useUser";
import { useLocation } from 'react-router-dom';


const ClientDashboard = () => {
  const navigate = useNavigate();
  const {user} = useUser();

  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const componentToRender = location?.search.split('?')[1]

  useEffect(() => {
    // console.log(user);
    if(!user || user?.isAdmin) navigate('/login');
  }, [navigate, user]);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderUpdated = () => {};

  const buttonStyle = {
    height: "50px", // Adjust the height as needed
    textTransform: "none", // Ensure lowercase text
  };

  const btnTextAlignment = {
    display: "flex",
    justifyContent: "left"
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={2}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            client Panel
          </Typography>
          <Button
            fullWidth
            component={RouterLink}
            to={'?account-details'}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            account details
          </Button>
          <Button
            fullWidth
            component={RouterLink}
            to={'?orders'}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            my orders
          </Button>
          <Button
            fullWidth
            component={RouterLink}
            to={'?invoices'}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            my invoices
          </Button>
          <Button
            fullWidth
            component={RouterLink}
            to={'?images'}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            my images
          </Button>
        </Paper>
      </Grid>
      {componentToRender === "account-details" && <AccountDetails />}
      {componentToRender === "orders" && <TableOfOrders  />}
      {componentToRender === "images" && <ClientImageList />}
    </Grid>
  );
};

export default ClientDashboard;
