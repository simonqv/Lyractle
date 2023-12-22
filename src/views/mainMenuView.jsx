import { useEffect } from "react"
import { GameStates } from "../userModel";

function MainMenuView(props) {

    useEffect(() => {
        // Update body classList when the component mounts
        document.body.classList.add('primary-background');
    
        // Cleanup the classList when the component unmounts
        return () => {
          document.body.classList.remove('primary-background');
        };
      }, []); // Empty dependency array means this effect runs once when the component mounts
    
    return (
        <div className='main-menu-content'>
            <h1 className='h1' style={{marginBottom: '40px'}}>Lyractle</h1>
            {props.model.currentTrack ? <button className='button' style={{minWidth: "326px"}} onClick={continueGameACB}>{props.model.gameState === GameStates.PLAYING ? "continue game" : "view results"}</button> : <div/>}
            <button className='button' onClick={randomSongACB}>start random game</button>
            <button className='button' style={{minWidth: "326px"}} onClick={playByArtistACB}>play by artist</button>
            {props.model.user ? <button className='button' style={{minWidth: "326px"}} onClick={highScoresACB}>high scores</button> : <div/>} 
        </div>
    )

    function continueGameACB() {
        props.onContinueGameClick()
    }

    function randomSongACB() {
        props.onRandomClick()
    }

    function playByArtistACB() {
        props.onPlayArtist()
    }

    function highScoresACB() {
        props.onHighScoresClick()
    }

}

export default MainMenuView