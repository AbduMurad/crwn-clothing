import React from "react";
import "./cart-item.styles.scss";

const CartItem = ({ item: { quantity, price, name, imageUrl } }) => {
  return (
    <div className="cart-item">
      <img src={imageUrl} alt="item" className="img" />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} X {price}
        </span>
      </div>
    </div>
  );
};

export default CartItem;
