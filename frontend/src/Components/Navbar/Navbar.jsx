import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../Imgs/logo-cropped.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const [menMenuOpen, setMenMenuOpen] = useState(false);
  const [womenMenuOpen, setWomenMenuOpen] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();
  const navigation = useNavigate()

  const dispatch = useDispatch()
  const totalItems = useSelector((state) => state.cart.totalItems);
  const {userCredentialsData,isAuthenticated}=useSelector((state)=>state.auth)
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setNavbarTransparent(scrollPosition <= 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = location.pathname === "/";
  const handleSearchBoxToggle = () => {
    setSearchBox(!searchBox);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigation(`/search/${searchQuery}`)
    console.log("Search query:", searchQuery);
  };
  
  return (
    <div
      className={`navbar ${
        navbarTransparent && isHome ? "transparent" : "solid"
      }`}
      onMouseEnter={() => {
        setNavbarTransparent(false);
      }}
      onMouseLeave={() => {window.scrollY<=100 &&
        setNavbarTransparent(true);
      }}
    >
      <div className="navbar-left">
        <Link to="/">
        <img src={logo} alt="ss" className="nav-logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="navLinks-ul">
          <li className="navLinks"><Link to="/">Home</Link></li>
          <li
            onMouseEnter={() => setMenMenuOpen(true)}
            onMouseLeave={() => setMenMenuOpen(false)}
            className="navLinks"
          >
            Men
            {menMenuOpen && (
              <div className="mega-menu">
                <div className="submenu-column">
                  <h3>Topwear</h3>
                  <ul>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_tshirt"}> T-Shirts </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_shirts"}> Shirts </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_sweatshirts_hoodies"}> Sweatshirts & Hoodies </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_jackets"}> Jackets </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_sweaters"}> Sweaters </Link></li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Bottomwear</h3>
                  <ul>
                    
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_joggers"}> Joggers </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_jeans"}> Jeans </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_cargos"}> Cargos </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_trousers_pants"}> Trousers & Pants </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_shorts"}> Shorts </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_boxers"}> Boxers </Link></li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Accessories</h3>
                  <ul>
                    
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_watches"}> Watches </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_bracelets"}> Bracelets </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_sunglasses"}> Sunglasses </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_caps"}> Caps </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_bags"}> Bags </Link></li>
                  <li onClick={()=>{setMenMenuOpen(false)}}><Link to={"/category/men_belts"}> Belts </Link></li>
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setWomenMenuOpen(true)}
            onMouseLeave={() => setWomenMenuOpen(false)}
            className="navLinks"
          >
            Women
            {womenMenuOpen && (
              <div className="mega-menu">
                <div className="submenu-column">
                  <h3>Topwear</h3>
                  <ul>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_dresses"}> Dresses </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_tops"}> Tops </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_tshirt"}> T-Shirts </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_shirts"}> Shirts </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_sweaters"}> Sweaters </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_jackets"}> Jackets </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_hoodies"}> Hoodies </Link></li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Bottomwear</h3>
                  <ul>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_jeans"}> Jeans </Link></li>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_leggings"}> Leggings </Link></li>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_skirts"}> Skirts </Link></li>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_pants"}> Pants </Link></li>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_shorts"}> Shorts </Link></li>
                    <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_joggers"}> Joggers </Link></li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Accessories</h3>
                  <ul>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_watches"}> Watches </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_bracelets"}> Bracelets </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_sunglasses"}> Sunglasses </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_handbags"}> Handbags </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_scarves"}> Scarves </Link></li>
                  <li onClick={()=>{setWomenMenuOpen(false)}}><Link to={"/category/women_hats"}> Hats </Link></li>
                  </ul>
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
      
      <div className="navbar-right">
      <div className="search-container">
          {searchBox && (
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
              />
              <button type="submit">Search</button>
            </form>
          )}
          
            {searchBox ? <IoMdClose className="search-icon" onClick={handleSearchBoxToggle}/> : <CiSearch className="search-icon" onClick={handleSearchBoxToggle}/>}
          
        </div>
        <div className="cart-icon-container">
        <IoCartOutline className="cart-icon" onClick={()=>{navigation("/cart")}}/> <p className="cart-item-count">{totalItems}</p>
        </div>
        { isAuthenticated ?  <FaRegCircleUser className="user-icon" />: <button className="navbar-right-btn" onClick={()=>{navigation('/login')}}>Login</button>}
      </div>
    </div>
  );
};

export default Navbar;
