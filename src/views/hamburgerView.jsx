// hamburgerView.jsx
import React from 'react';

function HamburgerView() {
  return (
    <div className="top-bar">
      <span className="game-title">Lyractle</span>
      <span className="menu">
        <select>
          <option value="logout">Log Out</option>
          <option value="mainMenu">Back to Menu</option>
        </select>
      </span>
    </div>
  );
}

export default HamburgerView;
