import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartHiddenState } from "../../redux/cart/cart.selectors";

import {
  HeaderContainer,
  LogoContainer,
  OptionDiv,
  OptionLink,
  OptionsDiv,
} from "./header.styles";
import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, hidden, signOut }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsDiv>
        <OptionLink to="/shop">Shop</OptionLink>
        <OptionLink to="/contact">Contact</OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => signOut()}>Sign out</OptionDiv>
        ) : (
          <OptionLink to="/signin">Sign in</OptionLink>
        )}
        <CartIcon />
      </OptionsDiv>
      {!hidden ? <CartDropdown /> : null}
    </HeaderContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHiddenState,
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
