import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getDatabase, ref, get, set } from "/src/teacherFirebase.js"
import firebaseConfig from "./firebaseConfig"
import { getMusicLyrics, getTrack } from "./musicSource"
import { GameStates } from "./userModel"
import resolvePromise from "./resolvePromise"


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getDatabase(app)

const PATH = "users/"

function modelToPersistence(model) {
  return {
    currTrack: model.currentTrack?.track.commontrack_id ? model.currentTrack.track.commontrack_id : 0,
    userGuesses: model.guesses,
    userGameState: model.gameState,
    userScores: model.scores,
    userHints: model.nbrHints
  }
}

function persistenceToModel(data, model) {
  
  data?.userScores ? model.setScores(data?.userScores) : model.setScores({})
  
  if (data?.currTrack) {
    getTrack(data?.currTrack).then(saveToModelACB).then(getLyricsACB)
  }
  else {
    model.setCurrentTrack(null)
  }

  function saveToModelACB(track) {
    model.setCurrentTrack(track.message.body)
  }

  function getLyricsACB() {
    const lyricsPromiseState = resolvePromise(getMusicLyrics(model.currentTrack.track.commontrack_id), {})
    
    lyricsPromiseState.promise
      .then(() => {
        model.setCurrentLyrics(lyricsPromiseState.data.message.body.lyrics.lyrics_body)
      })
      .catch((error) => {
        console.error("Error fetching lyrics from fb to model:", error)
      })
  }

  data?.userHints ? model.setNbrHints(data?.userHints) : model.setNbrHints(0)
  // model.setNbrHints(data?.userHints || 0)

  model.setGuesses(data?.userGuesses || [])

  model.setGameState(data?.userGameState || GameStates.PLAYING)

  model.setScores(data?.userScores || {})
    
  return null
}

function saveToFirebase(model) {
  if (!model.user && !model.guest) {
    model.wipeModel()
  }
  if (model.ready) {
    const uid = model.user ? model.user : null
    if (uid) {
      const rf = ref(db, PATH + uid)
      set(rf, modelToPersistence(model)).catch((error) => {
        console.error("Error saving data to Firebase:", error)
      })
    }
  }
}

function readFromFirebase(model) {
  if (!model.user && !model.guest) {
    model.wipeModel()
    model.ready = true
    return
  }
  model.ready = false
  const uid = model.user
  const rf = ref(db, PATH + uid)
  get(rf)
    .then((snapshot) => persistenceToModel(snapshot.val(), model))
    .then(() => {
      model.ready = true
    })
    .catch((error) => {
      console.error("Error reading data from Firebase:", error)
    })
}

function connectToFirebase(model, watchFunction) {
  onAuthStateChanged(auth, loginOrOutACB)
  watchFunction(checkChangeACB, updateFirebaseACB)

  function checkChangeACB() {
    return [
      // model.currentScore,
      model.currentTrack,
      model.currentLyrics,
      model.nbrHints,
      model.scores,
      model.guesses,
      model.gameState,
    ]
  }

  function updateFirebaseACB() {
    saveToFirebase(model)
  }

  function loginOrOutACB(user) {
    if (user) {
      model.user = user.uid
      readFromFirebase(model)
    } else {
      model.user = null
      model.ready = true
    }
  }
}

export { modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase, auth }
export default connectToFirebase
