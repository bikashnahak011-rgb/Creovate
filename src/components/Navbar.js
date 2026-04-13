import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import useWhatsApp from '../useWhatsApp';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { open: openWA } = useWhatsApp();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">CREO<span>VATE</span></Link>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {['/', '/services', '/about', '/contact'].map((path, i) => (
          <Link key={i} to={path} className={pathname === path ? 'active' : ''} onClick={() => setOpen(false)}>
            {['Home', 'Services', 'About', 'Contact'][i]}
          </Link>
        ))}
        <button className="btn-orange" onClick={() => { openWA('Hi Bikash! I want to order a service from CREOVATE'); setOpen(false); }}>Order Now</button>
      </div>
      <button className="hamburger" onClick={() => setOpen(!open)}>
        {open ? <FaTimes /> : <FaBars />}
      </button>
    </nav>
  );
}
