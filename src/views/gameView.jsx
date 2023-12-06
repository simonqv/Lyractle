import LyricsView from './lyricsView'; // Adjust the import path as needed
import GuessBarView from './guessBarView'
import '/src/style.css'

function GameView(props) {

  return (
    <div className="game-view">

      <div className="main-content">
        <LyricsView lyrics={pcurrentLyrics} trackTitle={currentTrack}/>
        <GuessBarView />
      </div>
    </div>
  );
}


export default GameView
