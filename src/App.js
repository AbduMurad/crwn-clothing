import React from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import SigninAndSignupPage from "./pages/signin-and-signup-page/signin-and-signup-page";
import {
  auth,
  createUserProfileDocument,
} from "../src/firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

class App extends React.Component {
  unsbscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsbscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        onSnapshot(userRef, (snapshot) =>
          setCurrentUser({ id: snapshot.id, ...snapshot.data() })
        );
      } else {
        setCurrentUser(null);
      }
    });
  }
  componentWillUnmount() {
    this.unsbscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SigninAndSignupPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  console.log(user.currentUser);
  return { currentUser: user.currentUser };
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
