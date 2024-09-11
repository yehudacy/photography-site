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

let price = 0;


paypalRouter.post("/", async (req, res) => {
  const item = req.body;
  price = item.price;
  const create_payment_json = {
    "intent": "sale",
    "payer": {
        "payment_method": "paypal"
    },
    "redirect_urls": {
        "return_url": "http://localhost:4000/api/orders/success",
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

paypalRouter.get('/success', (req, res) => {
    console.log(111111);
    
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    
    console.log(payerId);
    console.log(paymentId);
    const execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "ILS",
                "total": `${price}`
            }
        }]
    };

    paypal.payment.execute(paymentId,
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
        });

})


module.exports = {paypalRouter};