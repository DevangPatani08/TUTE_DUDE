import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cart) || {item : []};
  const cartItemCount = cart.items?.reduce((total, item) => total + item.quantity, 0) || 0

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Shoe Store</Link>
        <div className="d-flex">
          <Link className="btn btn-outline-dark me-2" to="/">
            <i className="bi bi-house"></i> Home
          </Link>
          <Link className="btn btn-outline-dark position-relative" to="/cart">
            <i className="bi bi-cart"></i> Cart
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.items.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;