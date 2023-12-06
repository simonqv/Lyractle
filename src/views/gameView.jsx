import Lyrics from '../presenters/lyricsPresenter'
import GuessBarView from './guessBarView'
import '/src/style.css'

function GameView(props) {
  return (
    <div className="game-view">
      <div className="main-content">
        <Lyrics currentLyrics={props.lyrics} currentTitle={props.title}/>
        <GuessBarView />
      </div>
    </div>
  );
}


export default GameView
