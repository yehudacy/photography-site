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
  Snackbar,
  Alert,
} from "@mui/material";
import StarIcon from "@mui/icons-material/StarBorder";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AddCircle as AddIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import PackageDialog from "../components/PackageDialog";

const PricingList = styled("ul")({
  margin: 0,
  padding: 0,
  listStyle: "none",
});

const PackagePrices = () => {
  const [editId, setEditId] = useState(null);
  const [packages, setPackages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(null);

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

  const HandleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSave = (isNew, packageDetails) => {
    isNew && saveNewPackage(packageDetails);
    !isNew && editPackage(packageDetails);
  };

  const saveNewPackage = async (packageDetails) => {
    try {
      const { data } = await axiosInstance.post("/pricing", packageDetails);
      HandleCloseDialog();
      setPackages((prev) => [...prev, data]);
    } catch (error) {
      // console.log(error);
      setError(`Failed to add the package please try again`);
    }
  };

  const editPackage = async (packageDetails) => {
    try {
      const { data } = await axiosInstance.put(
        `/pricing/${packageDetails.package_id}`,
        packageDetails
      );
      HandleCloseDialog();
      setPackages((prev) => {
        return prev.map((pack) =>
          pack.package_id === data.package_id ? data : pack
        );
      });
    } catch (error) {
      // console.log(error);
      setError(`Edit failed please try again`);
    }
  };

  const handleEdit = async (packageId) => {
    setEditId(packageId);
    setOpenDialog(true);
    setTimeout(() => setEditId(null), 100);
  };

  const handleDelete = async (packageId) => {
    try {
      const { data } = await axiosInstance.delete(`/pricing/${packageId}`);
      setPackages((prev) =>
        prev.filter((pack) => pack.package_id !== packageId)
      );
    } catch (error) {
      // console.log(error);
      setError(`Delete failed please try again`);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "16px",
        }}
      >
        <Grid
          item
          container
          xs={12}
          md={9}
          minWidth={"100%"}
          sx={{
            paddingTop: "16px",
            textAlign: "center",
            borderRadius: "8px",
            transition: "background-color 0.3s ease",
            height: "100%",
          }}
        >
          <Typography
            variant="h5"
            sx={{ marginBottom: "16px", width: "100%", textAlign: "center" }}
          >
            Packages
          </Typography>
          <Grid
            item
            container
            spacing={2}
            sx={{
              margin: "auto",
            }}
          >
            {packages.map((pack) => {
              return (
                <Grid
                  item
                  key={pack.package_id}
                  xs={12}
                  sm={6}
                  md={4}
                  sx={{
                    transition: "transform 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.05)",
                    },
                    p: 2,
                  }}
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
                          mb: 1,
                        }}
                      >
                        <Typography
                          component="h2"
                          variant="h3"
                          color="text.primary"
                        >
                          {pack.currency}-{pack.price}
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
                      <IconButton onClick={() => handleEdit(pack.package_id)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(pack.package_id)}>
                        <DeleteIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
          <Grid item sx={{ width: "100%" }}>
            <IconButton onClick={() => setOpenDialog(true)}>
              <AddIcon sx={{ fontSize: "50px" }} color="primary" />
            </IconButton>
          </Grid>
        </Grid>
        {openDialog && (
          <PackageDialog
            open={openDialog}
            handleClose={HandleCloseDialog}
            handleSave={handleSave}
            currentPackage={
              editId
                ? packages.filter((pack) => {
                    return pack.package_id === editId;
                  })
                : null
            }
          />
        )}
        {error && (
          <Snackbar
            open={Boolean(error)}
            onClose={() => setError(null)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert severity="error">{error}</Alert>
          </Snackbar>
        )}
      </Box>
    </>
  );
};

export default PackagePrices;
