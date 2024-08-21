import React, { useEffect, useRef, useState } from "react";
import "./Navbar.css";
import { IoCartOutline } from "react-icons/io5";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../Imgs/logo-cropped.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { FiMenu } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const Navbar = () => {
  const [navbarTransparent, setNavbarTransparent] = useState(true);
  const [menMenuOpen, setMenMenuOpen] = useState(false);
  const [womenMenuOpen, setWomenMenuOpen] = useState(false);
  const [searchBox, setSearchBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sideMenuOpen, setSideMenuOpen] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { isAuthenticated } = useSelector((state) => state.auth);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    if(searchQuery.length > 0){
    navigate(`/search/${searchQuery}`);}
  };

  return (
    <div
      className={`navbar ${navbarTransparent && isHome ? "transparent" : "solid"
        }`}
      onMouseEnter={() => {
        setNavbarTransparent(false);
      }}
      onMouseLeave={() => {
        window.scrollY <= 100 && setNavbarTransparent(true);
      }}
    >
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="ss" className="nav-logo" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul
          className={`navLinks-ul  ${sideMenuOpen ? "navbar-center-open" : ""}`}
        >
          <IoMdClose
            className="side-menu-close-btn"
            onClick={() => {
              setSideMenuOpen(false);
            }}
          />
          {isAuthenticated && (
            <li className="side-menu-dropdown-opt">
              <p className="side-menu-options-username">
                {user?.user.firstName + " " + user?.user.lastName}
              </p>
            </li>
          )}
          <li className="navLinks">
            <Link to="/">Home</Link>
          </li>
          <li
            onMouseEnter={() => setMenMenuOpen(true)}
            onMouseLeave={() => setMenMenuOpen(false)}
            className="navLinks"
          >
            <div className="navLinks-header">
              {" "}
              <span             
            onClick={() => setMenMenuOpen(!menMenuOpen)}> Men</span>{" "}
              {menMenuOpen ? (
                <IoIosArrowUp className="navLinks-header-icons" />
              ) : (
                <IoIosArrowDown className="navLinks-header-icons" />
              )}
            </div>
            {menMenuOpen && (
              <div className="mega-menu">
                <div className="submenu-column">
                  <h3>Topwear</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_tshirt"}> T-Shirts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_shirts"}> Shirts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_sweatshirts_hoodies"}>
                        {" "}
                        Sweatshirts & Hoodies{" "}
                      </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_jackets"}> Jackets </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_sweaters"}> Sweaters </Link>
                    </li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Bottomwear</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_joggers"}> Joggers </Link>
                    </li>
                    <li
                      onClick={[() => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_jeans"}> Jeans </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_cargos"}> Cargos </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_trousers_pants"}>
                        {" "}
                        Trousers & Pants{" "}
                      </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_shorts"}> Shorts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_boxers"}> Boxers </Link>
                    </li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Accessories</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_watches"}> Watches </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_bracelets"}> Bracelets </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_sunglasses"}> Sunglasses </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_caps"}> Caps </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_bags"}> Bags </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setMenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/men_belts"}> Belts </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
          <li
            onMouseEnter={() => setWomenMenuOpen(true)}
            onMouseLeave={() => setWomenMenuOpen(false)}
            // onClick={() => setWomenMenuOpen(!womenMenuOpen)}
            className="navLinks"
          >
            <div className="navLinks-header">
              {" "}
              <span  
            onClick={() => setWomenMenuOpen(!womenMenuOpen)}> Women</span>
              {womenMenuOpen ? (
                <IoIosArrowUp className="navLinks-header-icons" />
              ) : (
                <IoIosArrowDown className="navLinks-header-icons" />
              )}
            </div>
            {womenMenuOpen && (
              <div className="mega-menu">
                <div className="submenu-column">
                  <h3>Topwear</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_dresses"}> Dresses </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_tops"}> Tops </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_tshirt"}> T-Shirts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_shirts"}> Shirts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_sweaters"}> Sweaters </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_jackets"}> Jackets </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_hoodies"}> Hoodies </Link>
                    </li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Bottomwear</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_jeans"}> Jeans </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_leggings"}> Leggings </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_skirts"}> Skirts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_pants"}> Pants </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_shorts"}> Shorts </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_joggers"}> Joggers </Link>
                    </li>
                  </ul>
                </div>
                <div className="submenu-column">
                  <h3>Accessories</h3>
                  <ul>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_watches"}> Watches </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_bracelets"}> Bracelets </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_sunglasses"}>
                        {" "}
                        Sunglasses{" "}
                      </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_handbags"}> Handbags </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_scarves"}> Scarves </Link>
                    </li>
                    <li
                      onClick={[
                        () => {
                          setWomenMenuOpen(false);
                        },
                        () => {
                          setSideMenuOpen(false);
                        },
                      ]}
                    >
                      <Link to={"/category/women_hats"}> Hats </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </li>
          {isAuthenticated && (
            <li
              className="side-menu-logout"
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </li>
          )}
          {isAuthenticated && (
            <li
              className="side-menu-logout"
              onClick={() => {
                setSideMenuOpen(false);
              }}
            >
              {/* {isAuthenticated && <li className="side-menu-logout" onClick={[()=>{setSideMenuOpen(false)},() => {navigate("/your-order")}]}> */}
              <Link to="/your-order" >
              Your Orders
              </Link>
            </li>
          )}
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
              <button type="submit"><FaSearch/></button>
            </form>
          )}

          {searchBox ? (
            <IoMdClose
              className="search-icon"
              onClick={handleSearchBoxToggle}
            />
          ) : (
            <CiSearch className="search-icon" onClick={handleSearchBoxToggle} />
          )}
        </div>
        <div className="cart-icon-container">
          <IoCartOutline
            className="cart-icon"
            onClick={() => {
              navigate("/cart");
            }}
          />{" "}
          <p className="cart-item-count">{totalItems}</p>
        </div>
        {/* { isAuthenticated ?  <FaRegCircleUser className="user-icon" />: <button className="navbar-right-btn" onClick={()=>{navigate('/login')}}>Login</button>} */}
        {isAuthenticated ? (
          <div className="user-dropdown" ref={dropdownRef}>
            <div className="user-icon">
              {dropdownOpen ? (
                <IoMdClose
                  className="icon"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                />
              ) : (
                <FaRegCircleUser
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                  }}
                />
              )}
            </div>
            {/* <div onClick={()=>{setDropdownOpen(!dropdownOpen)}} className="user-icon">
              {dropdownOpen ? <IoMdClose className="icon" /> : <FaRegCircleUser />}
            </div> */}
            {dropdownOpen && (
              <div className="dropdown-menu">
                <p>{user?.user.firstName}</p>
                <Link to="/your-order" onClick={() => setDropdownOpen(false)}>
                  Your Orders
                </Link>
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="navbar-right-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
        <FiMenu
          className="menu-icon"
          onClick={() => {
            setSideMenuOpen(true);
          }}
        />
      </div>
    </div>
  );
};

export default Navbar;
