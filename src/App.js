import React, { useEffect } from "react";
import "./App.css";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shoppage/shoppage.component";
import CheckoutPage from "./pages/checkoutpage/checkoutpage.component";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/header/header.component";
import SigninAndSignupPage from "./pages/signin-and-signup-page/signin-and-signup-page";
import {
  auth,
  createUserProfileDocument,
  // addCollectionAndItsDocuments,
} from "../src/firebase/firebase.utils";
import { onSnapshot } from "firebase/firestore";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { checkUserSession } from "./redux/user/user.actions";
// import { selectCollectionsAsAnArray } from "./redux/shop/shop.selectors";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/shop" component={ShopPage} />
        <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? <Redirect to="/" /> : <SigninAndSignupPage />
          }
        />
        <Route exact path="/checkout" component={CheckoutPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
