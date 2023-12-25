import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.15)", // Adjust opacity here
        position: "fixed", // This ensures the overlay covers the entire screen
        top: 0,
        left: 0,
        pointerEvents: "none", // Allow events to pass through
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loading;
