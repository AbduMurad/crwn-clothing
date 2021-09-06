import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ children, isGoogleSignin, ...otherProps }) => {
  return (
    <button
      {...otherProps}
      className={`${isGoogleSignin ? "google-sign-in" : ""} custom-button`}
    >
      {children}
    </button>
  );
};

export default CustomButton;
