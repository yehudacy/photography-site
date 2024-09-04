const express = require("express");
const axios = require("axios");
const qs = require("qs");
const paypalRouter = express.Router();


paypalRouter.post("/", async (req, res) => {
  // try {
  //   // use the cart information passed from the front-end to calculate the order amount details
  //   const { cart } = req.body;
  //   const { jsonResponse, httpStatusCode } = await createOrder(cart);
  //   res.status(httpStatusCode).json(jsonResponse);
  // } catch (error) {
  //   console.error("Failed to create order:", error);
  //   res.status(500).json({ error: "Failed to create order." });
  // }
});

paypalRouter.post("/:orderID/capture", async (req, res) => {
  // try {
  //   const { orderID } = req.params;
  //   const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
  //   res.status(httpStatusCode).json(jsonResponse);
  // } catch (error) {
  //   console.error("Failed to create order:", error);
  //   res.status(500).json({ error: "Failed to capture order." });
  // }
});

// serve index.html
paypalRouter.get("/", (req, res) => {
  // res.sendFile(path.resolve("./client/checkout.html"));
});

module.exports = {paypalRouter};