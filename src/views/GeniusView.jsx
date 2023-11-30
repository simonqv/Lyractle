
import "/src/style.css"

function GeniusView(props) {
    console.log("props res ", props.res)
    return (
        <div className="search-result">
            {props.res.response.hits.map(renderSearchResCB)}
        </div>
    )
    
    function renderSearchResCB(artist) {
        console.log(artist)
        return (
            <div key={artist.result.id}>
                {artist.result.artist_names}
                {artist.result.title}
            </div>
        )
        function dishClickACB() {
            props.onDishSelect(dish)
            window.location.hash="#/details"
        } 
    }

}


export default GeniusView