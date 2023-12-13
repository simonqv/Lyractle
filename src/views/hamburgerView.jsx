import { useRef, useEffect, useState } from 'react';
import Modal from "react-modal"

import '/src/style.css';

const customStyleModal = {
  content: {
    backgroundColor: "red"
  },
};

function HamburgerView(props) {

  const [showModal, setShowModal] = useState(false);

  const isActive = props.active
  const toggleDropdown = props.dropdown

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isActive) {
        toggleDropdown();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isActive, toggleDropdown]);

  return (
    <div style={{position: "fixed", width: "100%"}} className={`navbar ${isActive ? 'active' : ''}`} ref={menuRef} >
      <div>
      <span className="game-title">Lyractle</span>
      <img src="/src/images/info.png" className="instructions-button" onClick={infoACB}/>
      </div>

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

      <Modal className="info-modal" isOpen={showModal} onRequestClose={closeModal}>
            <div>
                <h3 className='h3'>Instructions</h3>
                <p className='p'>Some words are visible, while others are hidden.
                  Each guess you make, where the word appears in the song lyrics will,
                  will unveil the hidden words.If your guess does not appear in the song lyrics,
                  nothing will be reveiled, but your guess count will increase.
                  The goal is to find out the title of the song in as few guesses as possible.
                  Input is not case sensitive.</p>
                
                <button className='button' style={{padding: "2px", marginBottom: "4px", minWidth: "102px"}} onClick={closeModal}>Close</button>
            </div>
      </Modal>

    </div>
  )

  function infoACB() {
    setShowModal(true) 
  }

  function closeModal() {
    setShowModal(false)
}

  function mainMenuACB() {
    toggleDropdown()
    props.onMainMenu()
  }

  function highScoresACB() {
    toggleDropdown()
    props.onHighScores()
  }
  
  function logoutACB() {
        props.onLogout()
    }
  
}

export default HamburgerView
