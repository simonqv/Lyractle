// hamburgerView.jsx
import React from 'react';

function HamburgerView() {
  return (
    // <div className="top-bar">
    //   <span className="game-title">Lyractle</span>
    //   <span className="menu">
    //     <select>
    //       <option value="logout">Log Out</option>
    //       <option value="mainMenu">Back to Menu</option>
    //     </select>
    //   </span>
    // </div>

    <div class="navbar">


      <span className="game-title">Lyractle</span>
      
      <ul class="nav-list">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">Contact</a></li>
      </ul>

      <div class="hamburger-menu">
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
      </div>
  </div>
  );
}

export default HamburgerView;
