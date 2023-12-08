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
        <li><button className='dropdown-button' onClick={mainMenuACB}>main menu</button></li>
        <li><button className='dropdown-button' onClick={highScoresACB}>high scores</button></li>
        <li><button className='dropdown-button' onClick={logoutACB}>log out</button></li>
      </ul> 

    </div>
  )

  function mainMenuACB() {
    props.onMainMenu()
  }

  function highScoresACB() {
    props.onHighScores()
  }
  
  function logoutACB() {
        props.onLogout()
    }
  
}

export default HamburgerView
