/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const getStripe = (secretKey) => {
  return require("stripe")(secretKey, {
    apiVersion: "2022-08-01",
  });
};

exports.stripeConfig = onRequest(
  { secrets: ["STRIPE_PUBLISHABLE_KEY"], cors: true },
  (request, response) => {
    logger.info("Sending stripe key!", { structuredData: true });

    response.send({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

exports.createPaymentIntent = onRequest(
  { secrets: ["STRIPE_SECRET_KEY"], cors: true },
  async (request, response) => {
    try {
      const stripe = getStripe(process.env.STRIPE_SECRET_KEY);
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "USD",
        amount: 1999,

        automatic_payment_methods: { enabled: true },
      });

      response.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      console.error(e);
      throw new HttpsError("internal", "Sorry, something went wrong");
    }
  }
);
