import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  CircularProgress,
  IconButton,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Details as DetailsIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import TableOfOrders from "../components/TableOfOrders";
import ClientImageList from "../components/ClientImageList";
import AccountDetails from "../components/AccountDetails";

const ClientDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [componentToRender, setComponentToRender] = useState("");

  useEffect(() => {}, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleOrderUpdated = () => {};

  const buttonStyle = {
    height: "50px", // Adjust the height as needed
    textTransform: "none", // Ensure lowercase text
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={2}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            client Panel
          </Typography>
          <Button
            fullWidth
            onClick={() => setComponentToRender("account details")}
            style={buttonStyle}
            color="primary"
          >
            account details
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("orders")}
            style={buttonStyle}
            color="primary"
          >
            my orders
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("invoices")}
            style={buttonStyle}
            color="primary"
          >
            my invoices
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("images")}
            style={buttonStyle}
            color="primary"
          >
            my images
          </Button>
        </Paper>
      </Grid>
      {componentToRender === "account details" && <AccountDetails />}
      {componentToRender === "orders" && <TableOfOrders type="client" />}
      {componentToRender === "images" && <ClientImageList />}
    </Grid>
  );
};

export default ClientDashboard;
