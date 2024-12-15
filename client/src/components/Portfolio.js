import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import AdminImagesGallery from "./AdminImagesGallery";
import ImageUploadForm from "./ImageUploadForm";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box style={{ padding: "16px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Portfolio
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
            <Tab label="Upload Image" sx={{ textTransform: "none" }} />
            <Tab label="View Images" sx={{ textTransform: "none" }} />
          </Tabs>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box style={{ padding: "16px" }}>
          {activeTab === 0 && <ImageUploadForm />}
          {activeTab === 1 && <AdminImagesGallery />}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Portfolio;
