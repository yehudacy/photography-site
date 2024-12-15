import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
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
        <CardMedia
          component="img"
          height="200"
          image={`${job.src}?w=248&fit=crop&auto=format`}
          alt={job.name}
          sx={{
            objectFit: "cover",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            backgroundColor: "#e6f2ff",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h6">{job.title}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default JobCard;
