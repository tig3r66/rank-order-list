// src/components/Header.js
import React from 'react';
import './Header.css';

const Header = ({ onShowHelp }) => (
  <header className="header">
    <h1>Residency Rank Order List Builder</h1>
    <div>
      {/* A Help button that triggers onShowHelp if you want a modal */}
      <button onClick={onShowHelp}>Help</button>
    </div>
  </header>
);

export default Header;
