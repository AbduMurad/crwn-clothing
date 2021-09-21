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

const Header = ({ currentUser, hidden }) => {
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Logo className="logo" />
      </LogoContainer>
      <OptionsDiv>
        <OptionLink to="/shop">Shop</OptionLink>
        <OptionLink to="/contact">Contact</OptionLink>
        {currentUser ? (
          <OptionDiv onClick={() => auth.signOut()}>Sign out</OptionDiv>
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

export default connect(mapStateToProps)(Header);
