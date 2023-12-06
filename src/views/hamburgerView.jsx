import '/src/style.css';

function HamburgerView(props) {
  const isActive = props.active
  const toggleDropdown = props.dropdown

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
        <li><button onClick={logoutACB}>log out</button></li>
      </ul>
    </div>
  )
  
  function logoutACB() {
        props.onLogout()
    }
  
}

export default HamburgerView
