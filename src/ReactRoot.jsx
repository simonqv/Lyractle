import { observer } from "mobx-react-lite";
import { RouterProvider, createHashRouter } from "react-router-dom";
import MainMenu from "../src/presenters/mainMenuPresenter.jsx"

function makeRouter(model) {
    return createHashRouter([
        {
            path: "/",
            element: <MainMenu model = {model}/>
        }
    ])
}


export default
observer(
    function ReactRoot(props) {
        return <div>
            <RouterProvider router={makeRouter(props.model)}>
                <div>
                    <MainMenu model = {props.model}/>
                </div>
            </RouterProvider>
            </div>
        
    }
)
//props.model.ready ?
        //:
        //<img src="https://cdn.dribbble.com/users/379146/screenshots/7958815/media/f9132d75f0f4eeb9a7f63bc7e80e02dc.gif"/>