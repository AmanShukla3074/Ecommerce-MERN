import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../Imgs/logo-cropped.png"
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const [navbartransparent,setNavbartransparent]= useState(true)
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setNavbartransparent(false);
      } else {
        setNavbartransparent(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome =
  location.pathname === "/" 

  return (
    <div className={`navbar ${navbartransparent && isHome  ? "transparent" : "solid" }`}>
      <div className="navbar-left">
        <img src={logo} alt="ss" className='nav-logo'/>
      </div>
      <div className="navbar-center">
        <ul className='naveLinks'>
            <li>Home</li>
            <li>Category</li>
            <li>Men</li>
            <li>Women</li>
        </ul>
      </div>
      <div className="navbar-right">
        <IoCartOutline className='cart-icon'/>
        <FaRegCircleUser className='user-icon'/>
        <button className="navbar-right-btn">Login</button>
      </div>
    </div>
  )
}

export default Navbar