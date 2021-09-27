import React, { useState } from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import "./signup.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { signUpStart } from "../../redux/user/user.actions";
import { connect } from "react-redux";

const Signup = ({ signUp }) => {
  const [userCredentials, setUserCredentials] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { displayName, email, password, confirmPassword } = userCredentials;
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      signUp({ displayName, email, password });
      setUserCredentials({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      // ####### Depricated and moved to user saga
      // try {
      //   const { user } = await createUserWithEmailAndPassword(
      //     auth,
      //     email,
      //     password
      //   );
      //   user.displayName = displayName;
      //   await createUserProfileDocument(user);
      //   this.setState({
      //     displayName: "",
      //     email: "",
      //     password: "",
      //     confirmPassword: "",
      //   });
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I don't have an account</h2>
      <span className="title">Sign up using your email and password</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label="Display Name"
          value={displayName}
          name="displayName"
          onChange={handleChange}
          required
        />
        <FormInput
          type="email"
          label="Email"
          value={email}
          name="email"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          label="Password"
          value={password}
          name="password"
          onChange={handleChange}
          required
        />
        <FormInput
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
          required
        />
        <CustomButton type="submit"> Sign up </CustomButton>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signUp: (user) => dispatch(signUpStart(user)),
});

export default connect(null, mapDispatchToProps)(Signup);
