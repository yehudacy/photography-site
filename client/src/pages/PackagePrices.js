import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  styled,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";

const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});


const PackagePrices = () => {
  const [editId, setEditId] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      try {
        const { data } = await axiosInstance.get("/pricing");
        // console.log(data)
        setPackages(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPackages();
  }, []);

  const handleEdit = async () => {};

  const handleDelete = async () => {};

  return (
    <Grid
      item
      container
      xs={12}
      md={9}
      sx={{
        margin: "auto",
        padding: "16px",
        textAlign: "center",
        border: "2px solid #ccc",
        borderRadius: "8px",
        transition: "background-color 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        marginTop: "104px", // Adjust this value to lower the form
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: "16px" }}>
        Packages
      </Typography>
      <Grid item container spacing={3} xs={12} sx={{ border: "2px solid lightblue" }}>
        {packages.map((pack) => {
          return (<Grid
            item
            key={pack.package_id}
            xs={12}
            sm={pack.title === "Platinum" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={pack.title}
                titleTypographyProps={{ align: "center" }}
                action={pack.title === "Gold" ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    NIS{pack.price}
                  </Typography>
                </Box>
                <PricingList>
                  {pack.details.split(",").map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </PricingList>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconButton onClick={handleEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>);
        })}
      </Grid>
    </Grid>
  );
};

export default PackagePrices;
