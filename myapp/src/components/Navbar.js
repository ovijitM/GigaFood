import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fs-2 fw-bold text-warning" to="/">Giga Food</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active text-white" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem('authToken') && (
              <li className="nav-item">
                <Link className="nav-link text-white" to="/cart">Cart</Link>
              </li>
            )}
          </ul>
          {(!localStorage.getItem('authToken')) ? 
            <div className="d-flex">
              <Link className="btn btn-outline-warning me-2" to="/login">Login</Link>
              <Link className="btn btn-warning text-dark" to="/createuser">Register</Link>
            </div>
            :
            <button 
              className="btn btn-danger" 
              onClick={() => {
                localStorage.removeItem('authToken');
                window.location.href = '/';
              }}
            >
              Logout
            </button>
          }
        </div>
      </div>
    </nav>
  );
}
