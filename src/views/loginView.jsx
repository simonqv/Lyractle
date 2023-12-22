import "/src/style.css"
import { useEffect } from "react";


function LoginView(props) {

    useEffect(() => {
        // Update body classList when the component mounts
        document.body.classList.add('primary-background');
    
        // Cleanup the classList when the component unmounts
        return () => {
          document.body.classList.remove('primary-background');
        };
      }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div className="login-content">
            <h1 className="h1">Lyractle</h1>
            <h2 className="h3">Can you guess the song?</h2>
            <button id="login_button" className="button" onClick={loginACB}>log in</button>
            <button id="guest_button" className="button" onClick={guestACB}>play as guest</button>
        </div>
    )

    function loginACB() {
        props.onLoginClick()
    }

    function guestACB() {
        props.onGuestClick()
    }

}

export default LoginView