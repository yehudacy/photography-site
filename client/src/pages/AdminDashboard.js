import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Button, Box } from "@mui/material";
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
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px", // Fixed width for the sidebar
          height: "100vh",
          overflowY: "hidden",
          position: "fixed", // Fix the sidebar
        }}
      >
        <Paper sx={{ padding: "16px", height: "100%" }}>
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
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          marginLeft: "250px", // Align main content next to the sidebar
          padding: "16px", // Add padding for better spacing
          flexGrow: 1, // Allow the main content to grow
        }}
      >
        {componentToRender === "Account details" && <AccountDetails />}
        {componentToRender === "orders" && <TableOfOrders />}
        {componentToRender === "contactMe" && <ContactRequestsTable />}
        {componentToRender === "pricing" && <PackagePrices />}
        {componentToRender === "categories" && <CategoryManagement />}
        {componentToRender === "portfolio" && <Portfolio />}
        {componentToRender === "user management" && <UserImageManager />}
      </Box>
    </Box>
  );
};

export default AdminDashboard;
