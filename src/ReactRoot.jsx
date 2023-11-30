import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { RouterProvider, createHashRouter } from "react-router-dom";
import MainMenu from "../src/presenters/mainMenuPresenter.jsx"
import Login from "./presenters/loginPresenter.jsx";

function makeRouter(model) {
    return createHashRouter([
        {
            path: "/",
            element: <MainMenu model = {model}/>
        },
        {
            path: "/login",
            element: <Login model = {model}/>
        }
    ])
}


export default
observer(
    function ReactRoot(props) {
        console.log(props.model)
        const navigate = useNavigate();

        if (props.model.user === undefined) {
            // Firebase auth layers not yet initialized
            return (
              <img
                src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif"
                alt="Loading..."
              />
            );
          }
        if (props.model.user === null) {
            navigate("/login");
            return null;

        }
        return props.model.ready ? <div>
            <RouterProvider router={makeRouter(props.model)}/>
            </div>
            :
            <img src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif"/>
        
    }
)
//props.model.ready ?
        //:
        //<img src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif"/>