
function LyricsView(props) {
    return <div>
        <p>{props.currentLyrics/*.map(displayLyricsCB)*/}</p>
    </div>

function displayLyricsCB(word, index) {
    // You can customize the rendering of each word here
    return <span key={index}>{word} </span>;
  }
}

export default LyricsView