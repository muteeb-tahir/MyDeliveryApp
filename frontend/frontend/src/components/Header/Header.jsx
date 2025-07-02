import React from "react";
import "./Header.css";
import headerImage from "../../assets/header_img.png"; // make sure this path is correct

const Header = () => {
  const scrollToMenu = () => {
    const menuSection = document.getElementById("explore-menu");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="header-container">
      <div className="header-text-box">
        <h1>Delicious Meals, Delivered Fast</h1>
        <p>Discover a wide variety of fresh meals, customized to your taste, delivered to your doorstep within minutes.</p>
        <button onClick={scrollToMenu}>Explore Menu</button>
      </div>

      <div className="header-image-box">
        <img src={headerImage} alt="Food delivery" />
      </div>
    </div>
  );
};

export default Header;
