import { signInWithEmailAndPassword } from "@firebase/auth";
import React, { useState } from "react";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import CustomButton from "../custom-button/custom-button.component";
import FormInput from "../form-input/form-input.component";
import { connect } from "react-redux";

import "./signin.styles.scss";
import {
  emailSigninStart,
  googleSigninStart,
} from "../../redux/user/user.actions";

const Signin = ({ emailSigninStart, googleSigninStart }) => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();
    // ####### Depricated and moved to user saga
    // try {
    //   await signInWithEmailAndPassword(auth, email, password);
    //   this.setState({ email: "", password: "" });
    // } catch (error) {
    //   console.log(error);
    // }
    emailSigninStart({ email, password });
    setUserCredentials({ email: "", password: "" });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-in">
      <h1 className="title">I already have an account</h1>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          required
          value={email}
          handleChange={handleChange}
          label="Email"
        />
        <FormInput
          type="password"
          name="password"
          required
          value={password}
          handleChange={handleChange}
          label="Password"
        />
        <div className="buttons">
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton
            onClick={googleSigninStart}
            type="button"
            isGoogleSignin
          >
            Sign in with google
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  googleSigninStart: () => dispatch(googleSigninStart()),
  emailSigninStart: (email, password) =>
    dispatch(emailSigninStart(email, password)),
});

export default connect(null, mapDispatchToProps)(Signin);
