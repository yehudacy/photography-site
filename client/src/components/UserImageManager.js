import { Box, Grid, Paper, Tab, Tabs, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";
import ManageUsers from "./ManageUsers";

const UserImageManager = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box style={{ padding: "16px" }}>
          <Typography variant="h4" align="center" gutterBottom>
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
          {activeTab === 0 && <ImageUploadForm />}
          {activeTab === 1 && <ManageUsers />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserImageManager;