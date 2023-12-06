import "/src/style.css"

function LoginView(props) {
    document.body.style.backgroundColor = 'var(--primary)';

    return (
        <div className="login-content">
            <h1 className="h1">Lyractle</h1>
            <h3 className="h3">Can you guess the song?</h3>
            <button id="login_button" className="button" onClick={loginACB}>log in</button>
            <button id="guest_button" className="button" onClick={guestACB}>play as guest</button>
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