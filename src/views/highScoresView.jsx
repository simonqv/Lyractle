import '/src/style.css'

function HighScoresView(props){
    return <div className='game-view'> 
                <h2 className='high-score-title'> Your high scores</h2>
                <div className="high-score-container">
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th style={{width: "20%"}}>Rank</th>
                                <th>Song</th>
                                <th style={{width: "20%"}}>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(sortScores()).map(([key, value], index) => (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{key}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table> 

                    <button className="return-button"onClick={returnButtonACB}>Return</button>
                </div>
            </div> 

    function sortScores() {
      
        if (Object.keys(props.scores).length === 0) {
          return {}
        }
      
        const sortedKeys = Object.keys(props.scores).sort(
            (key1, key2) => props.scores[key1][1] - props.scores[key2][1]
          );
        
          const sortedScoreDict = sortedKeys.reduce((acc, key) => {
            const [songName, score] = props.scores[key];
            acc[songName] = score;
            return acc;
          }, {});
      
        return sortedScoreDict
      }

    function returnButtonACB(){
        props.onReturn()
    }
    
}



export default HighScoresView