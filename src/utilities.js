
/* Sort dishes in ascending order */
function sortScores(scores) {
    const scoresArray = [...scores]
    return scoresArray.sort((a, b) => b - a)
}
    