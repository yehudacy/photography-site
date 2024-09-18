import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Grid,
  Box,
  Alert,
  AlertTitle,
  LinearProgress,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import MyDialog from "../components/MyDialog";
import axiosInstance from "../axiosInstance";
import { useUser } from "../hooks/useUser";

const Order = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  const [orderDate] = useState(dayjs());
  const [actionDate, setActionDate] = useState(dayjs());
  const [time, setTime] = useState("");
  const [price] = useState(state?.packagePrice);
  const [remarks, setRemarks] = useState("");
  const [dialog, setDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [alert, setAlert] = useState("");

  if (!state) {
    // console.log(1111)
    return <Navigate to={"/pricing"} />;
  }

  //content for dialog
  const dialogText = {
    dialogContent: "Do you want to check-out",
    dialogBtn1Text: "go to payment",
    dialogBtn2Text: "back",
  };

  const createOrderFromFields = () => {
    const newOrder = {
      clientId: user.client_id,
      orderDate: orderDate.format("YYYY-MM-DD"),
      actionDate: actionDate.format("YYYY-MM-DD"),
      time,
      price,
      remarks,
      status: "waiting",
    };
    // console.log(newOrder)
    return newOrder;
  };

  const handlepayments = async () => {
    setProcessing(true);
    const newOrder = createOrderFromFields();
    try {
      setDialog(false);
      const { data } = await axiosInstance.post("/pay", newOrder);
      console.log(data);
      if (data.paypalUrl !== undefined || data.paypalUrl !== "") {
        window.location.replace(data.paypalUrl);
      }
      setProcessing(false)

      // navigate('/client');
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDialog(true);
  };

  return (
    <>
      {dialog && (
        <MyDialog
          dialogText={dialogText}
          open={dialog}
          handleAgree={handlepayments}
          handleCloseDialog={handleCloseDialog}
        />
      )}
      {processing && (
        <Dialog open={processing}>
          <DialogTitle>Processing...</DialogTitle>
          <DialogContent>
            <LinearProgress/>
          </DialogContent>
        </Dialog>
      )}
      <Box sx={{ height: "100vh" }}>
        <Grid
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ height: "100%" }}
        >
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h4" align="center" mb={2}>
                Order details
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6} sx={{ m: "auto" }}>
                    <DatePicker
                      sx={{ width: "100%", marginY: 2 }}
                      label="order date"
                      value={orderDate}
                      readOnly
                    />
                    <DatePicker
                      sx={{ width: "100%", marginY: 2 }}
                      label="action date"
                      disablePast
                      value={actionDate}
                      onChange={(newDate) => setActionDate(newDate)}
                    />
                    <TimePicker
                      sx={{ width: "100%", marginY: 2 }}
                      label="execution time"
                      ampm={false}
                      value={time}
                      onChange={(newTime) => setTime(newTime)}
                    />
                    <TextField
                      fullWidth
                      label="Price"
                      value={`${price} NIS`}
                      margin="normal"
                      required
                      type="text"
                    />
                    <TextField
                      fullWidth
                      label="Remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      margin="normal"
                      required
                      multiline
                      rows={4}
                    />
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{ marginY: 2 }}
                      fullWidth
                    >
                      Place order
                    </Button>
                    {alert &&
                      (alert === "error" ? (
                        <Alert severity="error">
                          <AlertTitle>{alert}</AlertTitle>
                          It didn't work out —{" "}
                          <strong>please try again!</strong>
                        </Alert>
                      ) : (
                        <Alert severity="success">
                          <AlertTitle>{alert}</AlertTitle>
                          order has been placed! —{" "}
                          <strong>
                            Thank you! we will be in touch if there is any
                            problems
                          </strong>
                        </Alert>
                      ))}
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Order;
