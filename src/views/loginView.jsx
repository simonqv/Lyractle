import React, { useState, useEffect } from 'react';

function LoginView(props) {
    
    return (
        <div>
            <button id="login_button" onClick={loginACB}>Log in</button>
        </div>
    )

    function loginACB() {
        props.onLoginClick()
        console.log("login")
    }

}

export default LoginView