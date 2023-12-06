import palette from "../palette";
import { loginContentStyle, buttonStyle } from "../style"

function LoginView(props) {
    document.body.style.backgroundColor = palette.primary;

    return (
        <div style={loginContentStyle}>
            <h1>Lyractle</h1>
            <h3>Can you guess the song?</h3>
            <button id="login_button" style={buttonStyle} onClick={loginACB}>log in</button>
            <button id="guest_button" style={buttonStyle} onClick={guestACB}>play as guest</button>
        </div>
    )

    function loginACB() {
        props.onLoginClick()
        console.log("login")
    }

    function guestACB() {
        props.onGuestClick()
        console.log("Guest")
    }

}

export default LoginView