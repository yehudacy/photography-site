import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";

const JobCard = ({ job, onClick }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.005)",
          boxShadow: 3,
        },
      }}
      elevation={1}
    >
      <CardActionArea>
        <CardContent
          sx={{
            flexGrow: 1,
            backgroundColor: "#e6f2ff",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">{job.title}</Typography>
          <Box
            sx={{
              width: "100%",
              height: "175px",
              backgroundColor: job.src ? "transparent" : "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
              overflow: "hidden",
            }}
          >
            {job.src ? (
              <img
                src={job.src}
                alt={job.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography variant="body2" color="textSecondary">
                No Image Available
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;
