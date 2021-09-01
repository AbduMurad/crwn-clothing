import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ title, size, imageUrl }) => {
  return (
    <div className={`${size ? size : ""} menu-item`}>
      <div
        className="background-image"
        style={{
          background: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};

export default MenuItem;
