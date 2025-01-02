import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Box,
} from "@mui/material";
import axiosInstance from "../axiosInstance";

const JobCard = ({ job, onClick }) => {
  const [jobImage, setJobImage] = useState(null);
  useEffect(() => {
    const fetchJobImage = async () => {
      try {
        const { data } = await axiosInstance.get(
          `/gallery/jobs/mainimg/${job.job_image_id}`
        );
        setJobImage(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchJobImage();
  }, [job]);
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
              borderRadius: 3,
            }}
          >
            {jobImage ? (
              <img
                src={jobImage.src}
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
