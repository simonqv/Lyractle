import { observer } from "mobx-react-lite"
import LoginView from "../views/loginView"
import { auth } from "../firebaseModel"
import { signInWithPopup, GoogleAuthProvider, signOut} from "firebase/auth"
import { useState } from "react"


export default
observer(
    function Login(props) {
        const provider = new GoogleAuthProvider()

        return (
        <div>
            <LoginView onLoginClick={loginClickACB}/>
        </div>
        )

        function loginClickACB() {
            auth.currentUser ? signOut(auth) : signInWithPopup(auth, provider);
        }

    } 
)