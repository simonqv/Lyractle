// hamburgerView.jsx
import React from 'react';

function HamburgerView() {
  return (
    <div className="hamburger-view">
      <div className="app-name">Lyractle</div>
      <div className="dropdown-menu">
        {/* Implement your dropdown menu here */}
        <button>Log Out</button>
        <button>Go Back to Menu</button>
      </div>
    </div>
  );
}

export default HamburgerView;
