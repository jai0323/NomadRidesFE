import React, {useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../../styles/header.css";
import logo from "../../assets/all-images/nomadlogo.png";


const navLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/cars",
    display: "Cars",
  },
  {
    path: "/bikes",
    display: "Bikes",
  },
  {
    path: "/blogs",
    display: "Blog",
  },
  {
    path: "/contact",
    display: "Contact",
  },
];

const Header = () => {
  const menuRef = useRef(null);
  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Check if a user is logged in on initial render
  
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(JSON.parse(localStorage.getItem("user")));
    };

    // Add event listeners for both the custom event and `storage` event
    window.addEventListener("storageChange", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("storageChange", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.dispatchEvent(new Event("storageChange"));
  };

  return (
    <header className="header">
      {/* ============ header top ============ */}
      <div className="header__top">
        <Container>
          <Row>
            <Col lg="6" md="6" sm="6">
              <div className="header__top__left">
                <span>Need Help?</span>
                <span className="header__top__help">
                  <i class="ri-phone-fill"></i> +020-224-555-0149
                </span>
              </div>
            </Col>

            <Col lg="6" md="6" sm="6">
            {user ? (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link to="" className="d-flex align-items-center gap-1">
                    {user.name}
                  </Link>
                  <button  onClick={handleLogout} className="d-flex align-items-center gap-1 rounded-md">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="header__top__right d-flex align-items-center justify-content-end gap-3">
                  <Link to="/pup" className="d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Admin
                  </Link>
                  <Link to="/login" className="d-flex align-items-center gap-1">
                    <i className="ri-login-circle-line"></i> Login
                  </Link>
                  <Link to="/register" className="d-flex align-items-center gap-1">
                    <i className="ri-user-line"></i> Register
                  </Link>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* =============== header middle =========== */}
      <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src={logo} alt="Nomad Riders Logo" className="logo-image" />
                    <span>
                      Nomad Riders
                     </span>
                  </Link> 
                  <h6>Car and Bike Rental Service</h6>
                </h1>
                
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Pune City,India</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Sunday to Friday</h4>
                  <h6>10am - 7pm</h6>
                </div>
              </div>
            </Col>

            <Col
              lg="2"
              md="3"
              sm="0"
              className=" d-flex align-items-center justify-content-end "
            >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div>

      {/* ========== main navigation =========== */}

      <div className="main__navbar">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            <div className="nav__right">
              <div className="search__box">
                <input type="text" placeholder="Search" />
                <span>
                  <i class="ri-search-line"></i>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
