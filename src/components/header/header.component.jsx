import react from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/" className="logo">
          <Logo></Logo>
        </Link>
      </div>
      <div className="options">
        <Link to="/shop" className="option">
          Shop
        </Link>
        {currentUser ? (
          <div className="option" onClick={() => auth.signOut(currentUser)}>
            Sign out
          </div>
        ) : (
          <Link to="/signin" className="option">
            Sign in
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
