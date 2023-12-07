import "/src/style.css"

function ArtistSearchResultView(props) {
    return (
        <div className="search-result">
            {props.res.response.hits.map(renderSearchResCB)}
        </div>
    )
    
    function renderSearchResCB(artist) {
        return (
            <div key={artist.result.id}>
                {artist.result.artist_names}
                {artist.result.title}
            </div>
        )
    }

}


export default ArtistSearchResultView