import { signOut } from "firebase/auth"
import { observer } from "mobx-react-lite"
import { auth } from "../firebaseModel";
import { useNavigate } from "react-router-dom";

export default observer(function Hamburger(props) {
    function logout() {
        signOut(auth).then((result) => {
            props.model.wipeModel()
            navigate("/login")
        })
      }
    return <Hamburger onLogout={logout} />
})