import { useState, useEffect } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import "../../style/payment/payment.css";
import { auth } from "../../firebase-config";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      setMessage(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment stataus: " + paymentIntent.status);
    } else {
      setMessage("Unexpected state");
    }
    setIsProcessing(false);
  };

  return (
    <div className="paymentWrapper">
      <form id="payment-form" onSubmit={handleSubmit} className="paymentForm">
        <PaymentElement />
        <button disabled={isProcessing} id="submit">
          <span id="button-text">{isProcessing ? "Processing ... " : "Pay now"}</span>
        </button>

        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      <h4>Welcome to the demo version!</h4>
      <h5>
        Please note that this is a simulated environment and no actual money will be transferred. To
        simulate a payment, you may need to enter the numbers 4 and 2 multiple times until all
        fields are filled.
      </h5>
      <h4>Card Number: 4242 4242 4242 4242</h4>
      <h4>Expiry: 424 (formatted as 04/24)</h4>
      <h4>CVC: 242</h4>
    </div>
  );
}
