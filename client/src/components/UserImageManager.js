import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import BulkImageUploadForm from "./BulkImageUploadForm";
import ManageUsers from "./ManageUsers";
import axiosInstance from "../axiosInstance";

const UserImageManager = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const fetchClients = async () => {
    try {
      const { data } = await axiosInstance.get("/users/clientList");
      return data;
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box style={{ padding: "16px" }}>
          <Typography variant="h5" align="center" gutterBottom>
            User Image Manager
          </Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              ".Mui-selected": {
                backgroundColor: "#E0F7FA",
              },
            }}
          >
            <Tab label="Upload Images" sx={{ textTransform: "none" }} />
            <Tab label="Manage Users" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box style={{ padding: "16px" }}>
          {activeTab === 0 && (
            <BulkImageUploadForm fetchClients={fetchClients} />
          )}
          {activeTab === 1 && <ManageUsers fetchClients={fetchClients} />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserImageManager;
