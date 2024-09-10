const express = require("express");
const axios = require("axios");
const qs = require("qs");
const paypal = require('paypal-rest-sdk');
const ordersRouter = require('./ordersRoute');
const paypalRouter = express.Router();

paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET_KEY,
})


paypalRouter.post("/", async (req, res) => {
  const item = req.body;
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:3000/client",
        "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
        "item_list": {
            "items": [{
                "name": `${item.price} Package`,
                "sku": "001",
                "price": `${item.price}`,
                "currency": "ILS",
                "quantity": 1
            }]
        },
        "amount": {
            "currency": "ILS",
            "total": `${item.price}`
        },
        "description": "Payment for a order of a package"
    }]
};

paypal.payment.create(
  create_payment_json,
  function (error, payment) {
      if (error) {
          throw error;
      } else {
          for (let i = 0; i < payment.links.length; i++) {
              if (payment.links[i].rel === 'approval_url') {                
                  res.status(200).send({paypalUrl: payment.links[i].href});
              }
          }
      }
  });
});

// paypalRouter.post("/:orderID/capture", async (req, res) => {
  // try {
  //   const { orderID } = req.params;
  //   const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
  //   res.status(httpStatusCode).json(jsonResponse);
  // } catch (error) {
  //   console.error("Failed to create order:", error);
  //   res.status(500).json({ error: "Failed to capture order." });
  // }
// });

// serve index.html
// paypalRouter.get("/", (req, res) => {
  // res.sendFile(path.resolve("./client/checkout.html"));
// });

module.exports = {paypalRouter};