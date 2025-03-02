import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from "react-bootstrap/Badge";
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"; 

export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const items = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const loadCart = () => {
    setCartView(true);
  };

  return (
    <div className=''>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{ width: "100%" }}>
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand fs-1 fst-italic" to="/">TastyTrack</Link>

          {/* Toggle button for mobile view */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible part of the navbar */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {localStorage.getItem('authToken') && (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" to="/myOrder">My Orders</Link>
                </li>
              )}
            </ul>

            {/* Login/Signup or Cart and Logout */}
            {!localStorage.getItem('authToken') ? (
              <form className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-white text-success mx-1" to="/createuser">Signup</Link>
              </form>
            ) : (
              <div className="d-flex">
                <div className="btn bg-white text-success mx-2" onClick={loadCart}>
                  <Badge color="secondary" badgeContent={items.length}>
                    <ShoppingCartIcon />
                  </Badge>
                  Cart
                </div>
                {cartView && <Modal onClose={() => setCartView(false)}><Cart /></Modal>}
                <button className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
