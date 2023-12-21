import HighScoresView from "../views/highScoresView"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"
import { GameStates } from "../userModel"

export default observer(function HighScores(props) {
    
    const navigate = useNavigate()

    return <HighScoresView onReturn={returnClickACB} model={props.model}/>
    
    function returnClickACB() {
        props.model.setGameState(GameStates.PLAYING);
        navigate("/")
    }
})


