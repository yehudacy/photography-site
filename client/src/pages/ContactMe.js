import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Box, Alert, AlertTitle } from "@mui/material";
import MyDialog from "../components/MyDialog";
import axiosInstance from "../axiosInstance";

const ContactMe = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [dialog, setDialog] = useState(false);
  const [alert, setAlert] = useState("");
  const dialogText = {
    dialogContent: "Are you sure you want to send the request",
    dialogBtn1Text: "agree",
    dialogBtn2Text: "back",
  };

  const handleAgree = async () => {
    //send the request
    try {
      const body = { name, phoneNumber, email, message };
      const { data } = await axiosInstance.post("/contactme", body);
      // console.log(data);
      setDialog(false);
      setAlert("success");
      resetFields();
      setTimeout( () => setAlert(""), 5000);
    } catch (error) {
      setDialog(false);
      setAlert("error");
      setTimeout( () => setAlert(""), 5000);
    }
  };

  const resetFields = () => {
    setName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
  }

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
          handleAgree={handleAgree}
          handleCloseDialog={handleCloseDialog}
        />
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
                Contact Us
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src="https://cdn.pixabay.com/photo/2023/04/24/03/16/camping-7947056__340.jpg"
                        alt="Contact"
                        style={{ maxWidth: "100%" }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      margin="normal"
                      required
                    />
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      margin="normal"
                      required
                      type="email"
                    />
                    <TextField
                      fullWidth
                      label="Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      margin="normal"
                      required
                      multiline
                      rows={4}
                    />
                    <Button variant="contained" type="submit" sx={{ marginY: 2 }}>
                      Submit
                    </Button>
                    {alert && (alert === 'error' ? <Alert severity="error">
                      <AlertTitle>{alert}</AlertTitle>
                      It didn't work out — <strong>please try again!</strong>
                    </Alert> : 
                    <Alert severity="success">
                    <AlertTitle>{alert}</AlertTitle>
                    It went as planed — <strong>Thank you! we will be in touch</strong>
                  </Alert>)}
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
export default ContactMe;
