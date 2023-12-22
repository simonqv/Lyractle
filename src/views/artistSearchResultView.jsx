import "/src/style.css"

function ArtistSearchResultView(props) {
    return (
        <div className="search-result">
            {props.res.message.body.artist_list.map(renderSearchResCB)}
            {/*props.res.response.hits.map(renderSearchResCB)*/}
        </div>
    )
    
    function renderSearchResCB(artist) {
        return (
            <button className="search-result-button" key={artist.artist.artist_id} onClick={artistClickedACB}>
                {artist.artist.artist_name}
            </button>
        )

        function artistClickedACB(){
            props.onArtistClickACB(artist.artist.artist_id)
        }    
    }

}


export default ArtistSearchResultView