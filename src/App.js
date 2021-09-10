import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import { Route, Switch } from "react-router-dom";
import Header from "./components/header/header.component";
import SigninAndSignupPage from "./pages/signin-and-signup-page/signin-and-signup-page";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsbscribeFromAuth = null;

  componentDidMount() {
    this.unsbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapshot) =>
          this.setState({
            currentUser: { id: snapshot.id, ...snapshot.data() },
          })
        );
      } else {
        this.setState({ currentUser: userAuth });
      }
    });
  }
  componentWillUnmount() {
    this.unsbscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SigninAndSignupPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
