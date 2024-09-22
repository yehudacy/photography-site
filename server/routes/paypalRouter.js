const express = require("express");
const axios = require("axios");
const qs = require("qs");
const paypal = require("paypal-rest-sdk");
const ordersRouter = require("./ordersRoute");
const { addNonPaidOrder, getNonPaidOrder, deleteOrder } = require("../../database/nonPaidOrdersDB");
const { addOrder } = require("../../database/orderDB");
const paypalRouter = express.Router();

paypal.configure({
  mode: "sandbox",
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET_KEY,
});

let price = 0;

paypalRouter.post("/", async ({body}, res) => {
  const nonPaidOrder = await addNonPaidOrder(body);
  price = nonPaidOrder.price;
  
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:3000/pay/success/${nonPaidOrder.order_id}`,
      cancel_url: "http://localhost:3000/pay/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: `${nonPaidOrder.price} Package`,
              sku: "001",
              price: `${nonPaidOrder.price}`,
              currency: "ILS",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "ILS",
          total: `${nonPaidOrder.price}`,
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
    async function (error, payment) {
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        // console.log(payment);
        try{
          const orderToAdd = await getNonPaidOrder(params.orderId);
          const addedOrder = await addOrder(orderToAdd);
          const deletedOrderFromNonPaidOrders = await deleteOrder(params.orderId);
          if(deletedOrderFromNonPaidOrders){
            price = 0;
            res.send({payment, addedOrder});
          } else {
            throw new Error(`can't delete temp order with the id ${params.orderId}`)
          }
        } catch(error) {
          console.log(error);
          price = 0;
          throw error;
        }
      
      }
    }
  );
});

paypalRouter.post("/api/cancel", (req, res) => {
  res.send("The payment has been canceled");
});

module.exports = { paypalRouter };
