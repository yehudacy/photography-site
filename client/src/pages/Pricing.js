import React from 'react';
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
import { Link } from 'react-router-dom';



const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});



const Pricing = () => {
  return (
    <Container maxWidth="md" component="main" >
      <Grid container spacing={5} alignItems="flex-end" sx={{mt: 'auto', mb: 'auto'}}>
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Platinum" ? 12 : 6}
            md={4}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={tier.title === "Gold" ? <StarIcon /> : null}
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
                    NIS{tier.price}
                  </Typography>
                </Box>
                <PricingList>
                  {tier.description.map((line) => (
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
                <Button fullWidth variant={tier.buttonVariant} component={Link} to={'order'} state={{packagePrice: tier.price}}>
                  {tier.buttonText}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


const tiers = [
  {
    title: "Basic",
    price: "1000",
    description: [
      "15 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "order now",
    buttonVariant: "contained",
  },
  {
    title: "Gold",
    subheader: "Most popular",
    price: "1650",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "order now",
    buttonVariant: "contained",
  },
  {
    title: "Platinum",
    price: "2400",
    description: [
      "50 users included",
      "30 GB of storage",
      "Help center access",
      "Phone & email support",
    ],
    buttonText: "order now",
    buttonVariant: "contained",
  },
];

export default Pricing;