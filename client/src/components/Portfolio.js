import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import ImageUploadForm from "./ImageUploadForm";
import AdminImagesGallery from "./AdminImagesGallery";

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const tabsStyle = {
    textTransform: "none",
  };

  return (
    <Box sx={{ marginTop: 3 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
        sx={{
          ".Mui-selected": {
            bgcolor: "#E0F7Fa",
          },
        }}
      >
        <Tab label="Upload Image" sx={tabsStyle} />
        <Tab label="View Images" sx={tabsStyle} />
      </Tabs>
      <Box sx={{ marginTop: 2 }}>
        {activeTab === 0 && <ImageUploadForm />}
        {activeTab === 1 && <AdminImagesGallery />}
      </Box>
    </Box>
  );
};

export default Portfolio;
