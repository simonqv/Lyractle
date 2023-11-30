
import "/src/style.css"

function GeniusView(props) {
    console.log("test: ", props.res)
    return (
        <div className="search-result">
            {props.res.target.response}
        </div>
    )
    
    function renderSearchResCB(dish) {
        return (
            <span key={dish.id} className="search-result-object" onClick={dishClickACB}>
                <img src={dish.image} height="100" onClick={dishClickACB} />
                <div onClick={dishClickACB}>{dish.title}</div>
            </span>
        )
        function dishClickACB() {
            props.onDishSelect(dish)
            window.location.hash="#/details"
        } 
    }

}


export default GeniusView