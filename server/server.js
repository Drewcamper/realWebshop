const express = require("express");
const app = express();
const { resolve } = require("path");
// Replace if using a different env file or config
const env = require("dotenv").config({ path: "./.env" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

app.use(express.static(process.env.STATIC_DIR));

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       currency: "EUR",
//       amount: 1999,
//       automatic_payment_methods: { enabled: true },
//     });

//     // Send publishable key and PaymentIntent details to client
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     return res.status(400).send({
//       error: {
//         message: e.message,
//       },
//     });
//   }
// });


app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;
  const calculateOrderAmount = () => {
    // Calculate the total amount based on the items and quantities
    let totalAmount = 0;
    items.forEach((item) => {
      totalAmount += item.price * item.quantity;
    });
    return totalAmount;
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "EUR",
      amount: calculateOrderAmount(),
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

async function createPaymentIntent() {
  try {
    // Get the selected items and quantities
    const items = cart.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    // Send the selected items and quantities to the server
    const response = await fetch("/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const { clientSecret } = await response.json();
    return clientSecret;
  } catch (err) {
    console.error("Error creating payment intent: ", err);
  }
}








app.listen(5252, () =>
  console.log(`Node server listening at http://localhost:5252`)
);
