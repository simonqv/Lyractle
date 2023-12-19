import HighScoresView from "../views/highScoresView"
import { observer } from "mobx-react-lite"
import { useNavigate } from "react-router-dom"

export default observer(function HighScores(props) {
    
    const navigate = useNavigate()

    return <HighScoresView onReturn={returnClickACB} model={props.model}/>
    
    function returnClickACB() {
        navigate("/")
    }
})


