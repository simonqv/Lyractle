// hamburgerView.jsx
import React from 'react';

function HamburgerView() {
  return (
    <div className="header">
      <div className="app-name">Lyractle</div>
      <div className="menu">
        <select>
          <option value="logout">Log Out</option>
          <option value="mainMenu">Back to Menu</option>
        </select>
      </div>
    </div>
  );
}

export default HamburgerView;
