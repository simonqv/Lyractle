import { useState } from 'react';
import { signOut } from "firebase/auth"
import { observer } from "mobx-react-lite"
import { auth } from "../firebaseModel";
import { useNavigate } from "react-router-dom";
import HamburgerView from "../views/hamburgerView";

export default observer(function Hamburger(props) {
    const navigate = useNavigate()
    
    const [isActive, setIsActive] = useState(false)

    const toggleDropdown = () => {
      setIsActive(!isActive);
    }

    function mainMenu() {
      navigate("/")
    }

    function highScores() {
      navigate("/highScores")
    }
    
    function logout() {
        signOut(auth).then((result) => {
            console.log("SIGN OUT", props.model)
            props.model.wipeModel()

            navigate("/login")
        })
      }
    return <HamburgerView active={isActive} dropdown={toggleDropdown} onMainMenu={mainMenu} onHighScores={highScores} onLogout={logout} />
})
