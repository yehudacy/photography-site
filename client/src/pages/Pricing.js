import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { Login } from "@mui/icons-material";
import axiosInstance from "../axiosInstance";

const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const Pricing = () => {
  const { user } = useUser();
  // console.log(user);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const getPackages = async () => {
      const packages = await fetchPackages();
      setPackages(packages);
    };
    getPackages();
  });

  const fetchPackages = async () => {
    try {
      const { data } = await axiosInstance.get("/pricing");
      // console.log(data);
      return data;
    } catch (error) {
      // console.log(error);
      return [];
    }
  };

  const buttonStyle = {
    textTransform: "none",
  };

  return (
    <Container maxWidth="md" component="main">
      <Grid
        container
        spacing={5}
        alignItems="flex-end"
        sx={{ mt: "auto", mb: "auto" }}
      >
        {packages.map((pack) => (
          <Grid
            item
            key={pack.package_id}
            xs={12}
            sm={pack.title === "Platinum" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={pack.title}
                // subheader={pack.subheader}
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
                    {pack.currency}-{pack.price}
                  </Typography>
                </Box>
                <PricingList>
                  {pack.details.split(',').map((line) => (
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
              <CardActions>
                {user ? (
                  <Button
                    sx={buttonStyle}
                    fullWidth
                    variant={pack.button_variant}
                    component={Link}
                    to={"order"}
                    state={{ packagePrice: pack.price, currency: pack.currency }}
                  >
                    order now
                  </Button>
                ) : (
                  <Button
                    sx={buttonStyle}
                    fullWidth
                    variant={pack.button_variant}
                    component={Link}
                    to={"/login"}
                    state={{
                      moveTo: "/Pricing/order",
                      packagePrice: pack.price,
                    }}
                  >
                    log-in to order
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// const tires = [
//   {
//     title: "Basic",
//     price: "1000",
//     description: [
//       "15 users included",
//       "2 GB of storage",
//       "Help center access",
//       "Email support",
//     ],
//     buttonText: "order now",
//     buttonVariant: "contained",
//   },
//   {
//     title: "Gold",
//     subheader: "Most popular",
//     price: "1650",
//     description: [
//       "20 users included",
//       "10 GB of storage",
//       "Help center access",
//       "Priority email support",
//     ],
//     buttonText: "order now",
//     buttonVariant: "contained",
//   },
//   {
//     title: "Platinum",
//     price: "2400",
//     description: [
//       "50 users included",
//       "30 GB of storage",
//       "Help center access",
//       "Phone & email support",
//     ],
//     buttonText: "order now",
//     buttonVariant: "contained",
//   },
// ];

export default Pricing;
