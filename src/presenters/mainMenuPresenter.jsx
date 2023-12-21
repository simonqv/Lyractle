import { observer } from "mobx-react-lite"
import { useState } from "react"
import Modal from "react-modal"
import MainMenuView from "../views/mainMenuView"
import { useNavigate } from "react-router-dom"
import ArtistSearchResultView from "../views/artistSearchResultView"

Modal.setAppElement("#root"); // Set the root element for accessibility

export default
observer(
    function MainMenu(props) {
        const navigate = useNavigate()

        const [showModal, setShowModal] = useState(false);

        return <div>
            {checkState(props.model.currentTrack)}
        </div>
        
        function checkState(track) {

            return <div>
                <MainMenuView model={props.model} onContinueGameClick={continueGameACB} onHighScoresClick={goToHighScoresACB} onRandomClick={randomTrackACB} onPlayArtist={openModal}></MainMenuView>
                <Modal className="search-modal" isOpen={showModal} onRequestClose={closeModal}>
                <div>
                    <div style={{ display: "flex", flexDirection: "row"}}>
                        <input className="search-bar" style={{margin: "0px 8px 4px 0px", height: "48px", fontSize: "25px"}} onChange={searchArtistACB} placeholder="search for artist"/>
                        <button className='small-button' style={{width: "115px"}} onClick={searchACB}>search</button>
                    </div>
                    {shouldRenderSearchArtist(props.model.searchResultsPromiseState)}
                    <button className='small-button' style={{marginTop: "10px"}} onClick={closeModal}>close</button>
                </div>
            </Modal>
            </div>

        }

        function continueGameACB() {
            navigate("/game")
        }
       
        function goToHighScoresACB() {
            navigate("/highScores")
        }

        function searchArtistACB(artistQuery) {
            console.log("searchArtistACB, ", artistQuery.target.value)
            props.model.setSearchQuery(artistQuery.target.value)
        }

        function searchACB() {
            console.log("search acb", props.model.searchArtistQuery)
            props.model.doSearch(props.model.searchArtistQuery)
        }

        function randomTrackACB() {
            props.model.getRandomSong()
            
            navigate("/game")

        }

        function openModal() {
            setShowModal(true)
        }

        function closeModal() {
            props.model.searchResultsPromiseState = {}
            setShowModal(false)
        }

        function shouldRenderSearchArtist(state) {
            console.log("state: ", state)
            if (!state.data && !state.error) {
                return <div></div>
            }
    
            if (state.error) {
                return state.error
            }
        
            return <ArtistSearchResultView res={state.data} onArtistClickACB={playArtist} ></ArtistSearchResultView>

            function playArtist(artistID) {
                props.model.getSongFromArtist(artistID)
                navigate("/game")
                
            }
        }
    }
)