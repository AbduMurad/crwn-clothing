import React from "react";
import Signin from "../../components/signin/signin.component";
import Signup from "../../components/signup/signup.component";
import "./signin-and-signup-page.styles.scss";

const SigninAndSignupPage = () => {
  return (
    <div className="signin-and-signup">
      <Signin />
      <Signup />
    </div>
  );
};

export default SigninAndSignupPage;
