import React from 'react';
import './Footer.css';

const currentYear = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    © 2025–{currentYear} by Eddie Guo
  </footer>
);

export default Footer;
