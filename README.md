# Lyractle

## Short description
This is a game based on the Redactle game. The goal is to to determine the title of a song from either a random artist or a chosen artist.


### Instructions
You will be presented with 30% of the lyrics of a song. Your goal is to find the title of the song in as few guesses as possible! Some words are visible, while others are hidden. Each guess you make, where the word appears in the song lyrics, will unveil the hidden words. If your guess does not appear in the song lyrics, nothing will be reveiled, but your guess count will increase. Input is not case sensitive.

When you are testing and can't figure out the answer, you can cheat by opening the console and typing:
myModel.currentTrack.track.track_name
(but this is cheating 😉)

Link to website:
https://lyractle.web.app/

Figma prototype:
https://www.figma.com/file/9OnIGOtvT6YTU0O6y89pWp/Simon-Larspers-Qvist's-team-library?type=design&node-id=0%3A1&mode=design&t=tLEAsRkEVZSfEkRV-1

Use Musixmatch API for tracks, lyrics and artists etc. 

## What we have done (before halftime evaluation)
* Created a firebase project with google authentication and a user database
* Implemented a user model that stores relevant information, such as the current track, lyrics, and guesses.
* Hamburger menu
  * Log out button
  * Main menu button
  * High score button 
* Login - as a user or continue as guest
* Main menu page
  * Continue game button
  * Start random game button
  * Play by artist button
  * View high scores button
* Game page
    * Lyrics part
      * With hidden words and such
    * Guess list
      * List of guesses
      * Give up and get hint buttons
    * Guess / input bar 


## Project file structure
```bash
├── src
│   ├── presenters
│   │   ├── gamePresenter.jsx             // Present the game view
│   │   ├── hamburgerPresenter.jsx        // Present the hamburger menu view
│   │   ├── highScoresPresenter.jsx       // Present the high scores view
│   │   ├── loginPresenter.jsx            // Present the login view
│   │   ├── mainMenuPresenter.jsx         // Present the main menu view
│   ├── views
│   │   ├── artistSearchResultView.jsx    // View of searched artists
│   │   ├── finalLyricsView.jsx           // View for win or given up state
│   │   ├── gameView.jsx                  // View of the game
│   │   ├── guessBarView.jsx              // View of the guesses the player has made 
│   │   ├── guessInputView.jsx            // View of the bar to make guesses
│   │   ├── hamburgerView.jsx             // View of hamburger menu
│   │   ├── highScoresView.jsx            // View of high scores
│   │   ├── loadingView.jsx               // View when loading 
│   │   ├── loginView.jsx                 // View of login page
│   │   ├── mainMenuView.jsx              // View of the main menu
│   │   ├── playByArtistView.jsx          // View of the menu to choose specific artist to play by
│   ├── constants.js                      // A list of 100 artists used for generating a radnom song, predefined words to show in lyrics.
│   ├── firebaseModel.js                  // The firebase model
│   ├── index.jsx
│   ├── musicSource.js                    // Used for api requests to musixmatch
│   ├── PrivateRoute.jsx                  // Only authenticated users can access these pages
│   ├── ReactRoot.jsx                     // Root file, the App
│   ├── resolvePromise.js
│   ├── style.css                         // For styling
│   ├── teacherFetch.js
│   ├── teacherFirebase.js
│   ├── userModel.js                      // The model used for storing data
│   ├── utilities.js                      // Helpers 
│   ├── index.html
│   ├── README.md
```

## Has been implemented after halftime evaluation!

* Hamburger menu - update the appearance
* Main menu
  * Play by artist - functionality
* Game page
  * Lyrics part
    * Make the guessed words persistent
  * Guess list
    * How many times the word occurs 
    * Give up and get hint - functionality
    * Display the number of guesses made (current score)
  * Guess / input bar - update the appearance
* WIN and give up page
  * Full lyrics 
  * Total number of guesses
* High Score
  * View your scores in increasing order (least number of guesses first)
  * Return button (to main menu)

(the list doesn't cover everything)
