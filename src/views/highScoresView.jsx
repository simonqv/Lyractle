import '/src/style.css';


function HighScoresView(props){

    console.log(props.model.scores["Biggie"])

    return <div className='high-score-view'>
                <h2 className='high-score-title'> Your high scores</h2>
                <div className="high-score-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Rank</th>
                                <th>Song</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {props.model.scores.map((index) => showScoreACB(index))} */}
                            {Object.entries(props.model.scores).map(([key, value], index) => (
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

    function showScoreACB() {
        return (
        <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
        </tr>
        );
    }
}


function returnButtonACB(){
    window.location.href = "mainMenu";
}

export default HighScoresView