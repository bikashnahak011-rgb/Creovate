import React from 'react';
import { Link } from 'react-router-dom';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaYoutube } from 'react-icons/fa';
import { SiWhatsapp, SiTelegram } from 'react-icons/si';
import useWhatsApp from '../useWhatsApp';
import './Footer.css';

const WA_CHANNEL = 'https://whatsapp.com/channel/0029Vb6p4yfCxoAqsYAVcm2E';
const TELEGRAM = 'https://t.me/+xc-AmHSjMOtmOTc1';

export default function Footer() {
  const { open } = useWhatsApp();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="logo">CREO<span>VATE</span></span>
          <p>Creative services delivered professionally.<br />Your vision, our craft. Starting from just ₹20!</p>
          <button className="wa-footer-btn" onClick={() => open('Hi Bikash! I want to order from CREOVATE')}>
            <FaWhatsapp /> Chat on WhatsApp
          </button>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/services">Services</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <Link to="/services/video-editing">Video Editing</Link>
          <Link to="/services/photo-editing">Photo Editing</Link>
          <Link to="/services/website-building">Website Building</Link>
          <Link to="/services/presentations">Presentations</Link>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <div className="social-icons">
            <button onClick={() => open('Hi Bikash!')} title="WhatsApp"><FaWhatsapp /></button>
            <a href={WA_CHANNEL} target="_blank" rel="noreferrer" title="WhatsApp Channel"><SiWhatsapp /></a>
            <a href={TELEGRAM} target="_blank" rel="noreferrer" title="Telegram"><SiTelegram /></a>
            <a href="mailto:freelancingplat44@gmail.com" title="Email"><FaEnvelope /></a>
            <a href="https://www.instagram.com/_bikash_022?igsh=Y21zMHc0ZXdrMjE1" target="_blank" rel="noreferrer" title="Instagram"><FaInstagram /></a>
            <a href="#youtube" target="_blank" rel="noreferrer" title="YouTube"><FaYoutube /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 CREOVATE by Bikash Nahak. All rights reserved.</p>
        <span>Made with ❤️ by <a href="/about">Bikash Nahak</a></span>
      </div>
    </footer>
  );
}
