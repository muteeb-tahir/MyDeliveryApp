import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-grid">
        <div className="footer-logo-section">
          <img src={assets.logo} alt="Logo" className="footer-logo" />
          <p className="footer-description">
            Bringing you fresh, flavorful meals with speed and care. Quality ingredients, delivered to your door.
          </p>
          <div className="footer-icons">
            <img src={assets.facebook_icon} alt="Facebook" />
            <img src={assets.twitter_icon} alt="Twitter" />
            <img src={assets.linkedin_icon} alt="LinkedIn" />
          </div>
        </div>

        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <ul>
            <li>+91 7006967194</li>
            <li>muteebtahir68@gmail.com</li>
          </ul>
        </div>
      </div>

      <hr />

      <p className="footer-bottom">
        &copy; 2024 mtb. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
