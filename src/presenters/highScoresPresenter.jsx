import HighScoresView from "../views/highScoresView"
import { observer } from "mobx-react-lite"

export default observer(function HighScores(props) {
    return <HighScoresView props={props.model}/>
})