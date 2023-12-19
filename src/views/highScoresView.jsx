import '/src/style.css';


function HighScoresView(props){
    return <div className='game-view'> 
                <h2 className='high-score-title'> Your high scores</h2>
                <div className="high-score-container">
                    <table className="score-table">
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Song</th>
                                <th>Score</th>
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
    

    function sortScores(){
        if (props.model.scores.length === 0 ) {
            return []
        }
    
        const scores = []

        for (let key in props.model.scores) {
            scores.push([ key, props.model.scores[key] ])
        }

        scores.sort(function compare(kv1, kv2) {
            return kv1[1] - kv2[1]
        })

        const sortedScoreDict = scores.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return sortedScoreDict;

    }

    function returnButtonACB(){
        props.onReturn()
    }
    
}



export default HighScoresView