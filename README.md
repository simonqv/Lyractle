# Lyractle

Link to website:
https://lyractle.web.app/

Figma prototype:
https://www.figma.com/file/9OnIGOtvT6YTU0O6y89pWp/Simon-Larspers-Qvist's-team-library?type=design&node-id=0%3A1&mode=design&t=tLEAsRkEVZSfEkRV-1

Use Genius API for tracks and artists etc. 

Use lyricsgenius to get the actual lyrics for the tracks. 

https://www.npmjs.com/package/genius-lyrics-api
npm install --save genius-lyrics-api

TODO:

* Fix firebase:
  * Persistance 
  * Authentiaction

* Model:
  * User
  * Guesses
  * Current track (song name and artist)
  * Current lyrics
  * Current score
  * scores 
  * scoresPromiseState
  * serachResultsPromiseState
  * Search result
  * currentTrackPromiseState


* Pages / compontents(?):
  * Hamburger menu
    * Log out button
    * Main menu button
    * High score button 
  * Start page / log in page 
    * Log in button
      * Google log in pop up 
    * Guest button
  * Main menu
    * Search pop-up
    * Start random game button
    * View high scores button
  * Game page
    * Lyrics part
      * With hidden words and such
    * Guess list
      * List of guesses and how many times the occur 
      * Give up and get hint
    * Guess / input bar 
  * WIN page
    * Full lyrics
    * Total number of guesses
    * Play song
  * High Score
    * View your scores in increasing order (least number of guesses first)
    * Return button (to main menu)
  
