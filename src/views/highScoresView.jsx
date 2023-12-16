import '/src/style.css';


function HighScoresView(props){



    return <div className='high-score-view'>
                <h2 className='high-score-title'> Your high scores</h2>
                <div className="high-score-container">

                    <button className="return-button"onClick={returnButtonACB}>Return</button>


                </div>



            </div> 
}


function returnButtonACB(){
    window.location.href = "mainMenu";
}

export default HighScoresView