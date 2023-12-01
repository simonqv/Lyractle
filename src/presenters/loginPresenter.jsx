import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebaseModel";
import { observer } from "mobx-react-lite";
import LoginView from "../views/loginView";
import { useEffect } from "react";

export default observer(function Login(props) {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    if (props.model.user !== null) {
      // User is already logged in, navigate to the main menu
      navigate("/mainMenu");
    }
  }, [props.model.user, navigate]);

  function loginLogic() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("RESULT", result)
        const accessToken = result.user.accessToken;
        props.model.setUserAccessToken(accessToken);

        const user = result.user;
        props.model.setUser(user);
        props.model.setUserID(user.uid);
        // TODO: props.model.setScores, .setGuesses, and other model updates

        // Navigate to the desired page after a successful login
        navigate("/mainMenu");
      })
      .catch((error) => {
        // Handle error here
        console.error("Login error:", error);
      });
  }

  return <LoginView onLoginClick={loginLogic} />;
});
