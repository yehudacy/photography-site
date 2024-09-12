const express = require("express");
const axios = require("axios");
const qs = require("qs");
const paypal = require("paypal-rest-sdk");
const ordersRouter = require("./ordersRoute");
const paypalRouter = express.Router();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

let price = 0;

paypalRouter.post("/", async (req, res) => {
  const order = req.body;
  price = order.price;
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3000/pay/success",
      cancel_url: "http://localhost:3000/pat/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: `${order.price} Package`,
              sku: "001",
              price: `${order.price}`,
              currency: "ILS",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "ILS",
          total: `${order.price}`,
        },
        description: "Payment for a order of a package",
      },
    ],
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.status(200).send({ paypalUrl: payment.links[i].href });
        }
      }
    }
  });
});

paypalRouter.post("/api/success", (req, res) => {
  const params = req.body;
  const payerId = params.payerId;
  const paymentId = params.paymentId;
  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "ILS",
          total: `${price}`,
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(payment);

        price = 0;
        res.send(payment);
      }
    }
  );
});

paypalRouter.post("/api/cancel", (req, res) => {
  res.send("The payment has been canceled");
});

module.exports = { paypalRouter };
