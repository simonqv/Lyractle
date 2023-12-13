# Lyractle
## Problem at the moment...
To run the app you have to install a CORS blocker.
This one works: 
[https://webextension.org/listing/access-control.html](https://chromewebstore.google.com/detail/cors-unblock/lfhmikememgdcahcdlaciloancbhjino)


## Short description
This is a game based on the Redactle game. The goal is to to determine the title of a song from either a random artist or a chosen artist.


### Instructions
Some words are visible, while others are hidden. Each guess you make, where the word appears in the song lyrics will, will unveil the hidden words. If your guess does not appear in the song lyrics, nothing will be reveiled, but your guess count will increase. The goal is to find out the title of the song in as few guesses as possible. Input is not case sensitive.

Link to website:
https://lyractle.web.app/

Figma prototype:
https://www.figma.com/file/9OnIGOtvT6YTU0O6y89pWp/Simon-Larspers-Qvist's-team-library?type=design&node-id=0%3A1&mode=design&t=tLEAsRkEVZSfEkRV-1

Use Genius API for tracks and artists etc. 

Use genius-lyrics to get the actual lyrics for the tracks. 

https://www.npmjs.com/package/genius-lyrics-api
npm install --save genius-lyrics-api

## What we have done
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
│   │   ├── lyricsPresenter.jsx           // Present the lyrics view
│   │   ├── mainMenuPresenter.jsx         // Present the main menu view
│   ├── views
│   │   ├── artistSearchResultView.jsx    // View of searched artists
│   │   ├── gameView.jsx                  // View of the game
│   │   ├── guessBarView.jsx              // View of the guesses the player has made 
│   │   ├── guessInputView.jsx            // View of the bar to make guesses
│   │   ├── hamburgerView.jsx             // View of hamburger menu
│   │   ├── highScoresView.jsx            // View of high scores
│   │   ├── loginView.jsx                 // View of login page
│   │   ├── mainMenuView.jsx              // View of the main menu
│   │   ├── playByArtistView.jsx          // View of the menu to choose specific artist to play by
│   ├── artists.js                        // A list of 100 artists used for generating a radnom song
│   ├── firebaseModel.js                  // The firebase model
│   ├── index.jsx
│   ├── PrivateRoute.jsx                  // Only authenticated users can access these pages
│   ├── ReactRoot.jsx                     // Root file, the App
│   ├── resolvePromise.js
│   ├── style.css                         // For styling
│   ├── teacherFetch.js
│   ├── teacherFirebase.js
│   ├── userModel.js                      // The model used for storing data
│   ├── utilities.js                      // Helpers 
│   ├── geniusSource.js                   // Used for api requests to Genius
│   ├── index.html
│   ├── README.md
```

## TODO
We still have a few more things to do. Not everything is persistent at the moment and we lack a few functionaities. Furthermore, we need to update the appearance at some places.

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
  * Play song (maybe)
* High Score
  * View your scores in increasing order (least number of guesses first)
  * Return button (to main menu)

(the list doesn't cover everything)
