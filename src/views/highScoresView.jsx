import '/src/style.css';


function HighScoresView(props){

    

    return <div className='high-score-view'>
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
                            {/* {props.model.scores.map((index) => showScoreACB(index))} */}
                            {Object.entries(sortScores()).map(([key, value], index) => (
                                <tr key={index}>
                                    <td>{index}</td>
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
        const scores = []

        for (let key in props.model.scores) {
            scores.push([ key, props.model.scores[key] ])
        }

        scores.sort(function compare(kv1, kv2) {
            return kv2[1] - kv1[1]
        })

        const sortedScoreDict = scores.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return sortedScoreDict;

    }

 
}


function returnButtonACB(){
    window.location.href = "mainMenu";
}

export default HighScoresView