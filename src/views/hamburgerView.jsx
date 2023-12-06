// HamburgerView.jsx
import React from 'react';
import useHamburgerPresenter from '../presenters/hamburgerPresenter';
import '/src/style.css';

function HamburgerView() {
  const { isActive, toggleDropdown } = useHamburgerPresenter();

  return (
    <div className={`navbar ${isActive ? 'active' : ''}`}>
      <span className="game-title">Lyractle</span>

      <div className="hamburger-menu" onClick={toggleDropdown}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className="nav-list">
        <li><a href="#">Main Menu</a></li>
        <li><a href="#">High Scores</a></li>
        <li><a href="#">Log out</a></li>
      </ul>
    </div>
  );
}

export default HamburgerView;
