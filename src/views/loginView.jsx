import React, { useState, useEffect } from 'react';

function LoginView(props) {
    
    return (
        <div>
            <h1>Lyractle</h1>
            <h3>Can you guess the song?</h3>
            <button id="login_button" onClick={loginACB}>log in</button>
            <button id="guest_button" onClick={guestACB}>play as guest</button>
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