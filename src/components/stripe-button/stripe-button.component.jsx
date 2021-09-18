import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51Jb4aZL1JqLLZK62dKr5mg2sNxGOmVvhSfioqYxaYmDFYlsuyf2iKsB3Sh13M7yiDG82IvOH9YpBazHC4FehpD2J00cNyrGCPS";

  const onToken = (token) => {
    console.log(token);
    alert("Payment successful.");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      bitcoin
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
