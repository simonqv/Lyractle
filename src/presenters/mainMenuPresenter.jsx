import { observer } from "mobx-react-lite"
import MainMenuView from "../views/mainMenuView"

export default
observer(
    function MainMenu(props) {
        return <div>
            <div>HEJ</div>
            <MainMenuView test={searchACB}></MainMenuView>
            {trash(props.model.searchResultsPromiseState)}
            
        </div>

        function trash(state) {
            console.log("state: ", state)
            if (!state.promise) {
                return "No data"
            }

            if (!state.data && !state.error) {
                return <img src="https://brfenergi.se/iprog/loading.gif"></img>
            }

            if (state.error) {
                return state.error
            }
            return <GeniusView res={state.data}></GeniusView>
        }

        function searchACB() {
            props.model.doSearch("props.model.searchParams")
        }
    }
)