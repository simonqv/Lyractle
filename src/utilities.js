
function countOccurrences(longString, word) {
    // Use a regular expression to split the string into an array of words
    // The regular expression \b ensures that only whole words are matched
    let wordsArray = longString.split(/\b/)
    
    // Initialize a counter for occurrences
    let count = 0
    
    // Iterate through the array and count occurrences
    for (const element of wordsArray) {
        if (element === word) {
            count++
        }
    }
    return count
  }

  function cleanTitle(title) {
    if (title) {
        return title.replace(/ *\([^)]*\) *|\[[^\]]*\] *| *\{[^}]*\} */g, '')
    }
  }

  export {countOccurrences, cleanTitle}