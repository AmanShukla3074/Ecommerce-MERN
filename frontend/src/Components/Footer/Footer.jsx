import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { CiInstagram } from "react-icons/ci";
import { FaXTwitter } from "react-icons/fa6";
import { CiLinkedin } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer-categoeris">
        <h1 className="footer-categoeris-header">Shop Now</h1>
        <div className="footer-categoeris-links-container">
          <div className="footer-categoeris-links">
            <h2 className="footer-categoeris-links-header">Men</h2>
            <p className="footer-links">
              <Link to={"/category/men_tshirt"}> T-Shirts </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_shirts"}> Shirts </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_sweatshirts_hoodies"}> Hoodies </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_jeans"}> Jeans </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_trousers_pants"}> Trousers </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_shorts"}> Shorts </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_watches"}> Watches </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/men_belts"}> Belts </Link>
            </p>
          </div>

          <div className="footer-categoeris-links">
            <h2 className="footer-categoeris-links-header">Women</h2>
            <p className="footer-links">
              <Link to={"/category/women_dresses"}> Dresses </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_tops"}> Tops </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_tshirt"}> T-Shirts </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_hoodies"}> Hoodies </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_jeans"}> Jeans </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_skirts"}> Skirts </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_watches"}> Watches </Link>
            </p>
            <p className="footer-links">
              <Link to={"/category/women_handbags"}> Handbags </Link>
            </p>
          </div>
          <div className="footer-categoeris-links">
            <h2 className="footer-categoeris-links-header">Help</h2>
            <p className="footer-links">Help Center</p>
            <p className="footer-links">FAQ</p>
            <h2 className="footer-categoeris-links-header">About Us</h2>
            <p className="footer-links">
              <Link to={"/category/women_dresses"}> Our Story </Link>
            </p>
            <p className="footer-links">Business</p>
            <p className="footer-links">Careers</p>
          </div>
        </div>
      </div>
      <div className="footer-location-socials">
        <div className="footer-location">
          <p className="footer-location-row">
            {" "}
            <FaLocationDot /> ABC,Aastha Complex,Khodiyar Nagar
          </p>
          <p className="footer-location-row">Ahmedabad,3082330 </p>
        </div>
        <div className="footer-location">
          <p className="footer-location-row">
            {" "}
            <FaLocationDot /> XYX,Parul Circle,Kalyan Nagar
          </p>
          <p className="footer-location-row">Ahmedabad,3082330 </p>
        </div>
        <div className="footer-socials">
          <CiInstagram />
          <FaXTwitter />
          <CiLinkedin />
          <CiFacebook />
        </div>
      </div>
    </div>
  );
};

export default Footer;
