import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button } from "@mui/material";
import TableOfOrders from "../components/TableOfOrders";
import ContactRequestsTable from "../components/ContactRequestsTable";
import ImageUploadForm from "../components/ImageUploadForm";
import AdminImagesGallery from "../components/AdminImagesGallery";
import AccountDetails from "../components/AccountDetails";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import PackagePrices from "./PackagePrices";
import CategoryManagement from "../components/CategoryManagement";
import Portfolio from "../components/Portfolio";
import UserImageManager from "../components/UserImageManager";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [componentToRender, setComponentToRender] = useState("");

  useEffect(() => {
    // console.log(user)
    if (!user || !user?.isAdmin) navigate("/login", { replace: true });
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
    justifyContent: "left",
  };

  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <Paper style={{ padding: "16px" }}>
          <Typography variant="h6" gutterBottom>
            Admin Panel
          </Typography>
          <Button
            fullWidth
            onClick={() => setComponentToRender("Account details")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            Account details
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("orders")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            View all orders
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("contactMe")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            View all contact me
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("pricing")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            Package prices
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("categories")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            Categories
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("portfolio")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            Portfolio
          </Button>
          <Button
            fullWidth
            onClick={() => setComponentToRender("user management")}
            style={buttonStyle}
            color="primary"
            sx={btnTextAlignment}
          >
            User Management
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={10}>
        {componentToRender === "Account details" && <AccountDetails />}
        {componentToRender === "orders" && <TableOfOrders />}
        {componentToRender === "contactMe" && <ContactRequestsTable />}
        {componentToRender === "portfolio" && <Portfolio />}
        {componentToRender === "pricing" && <PackagePrices />}
        {componentToRender === "categories" && <CategoryManagement />}
        {componentToRender === "user management" && <UserImageManager></UserImageManager>}
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
