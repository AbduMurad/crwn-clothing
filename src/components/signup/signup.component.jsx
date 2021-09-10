import React from "react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import "./signup.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { createUserWithEmailAndPassword } from "@firebase/auth";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords don't match!");
    } else {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        user.displayName = displayName;
        await createUserProfileDocument(user);
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <div className="sign-up">
        <h2 className="title">I don't have an account</h2>
        <span className="title">Sign up using your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            label="Display Name"
            value={displayName}
            name="displayName"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="email"
            label="Email"
            value={email}
            name="email"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            label="Password"
            value={password}
            name="password"
            onChange={this.handleChange}
            required
          />
          <FormInput
            type="password"
            label="Confirm Password"
            value={confirmPassword}
            name="confirmPassword"
            onChange={this.handleChange}
            required
          />
          <CustomButton type="submit"> Sign up </CustomButton>
        </form>
      </div>
    );
  }
}

export default Signup;
