function truncateString(string, maxLength) {
  if (!string) return null;
  if (string.length <= maxLength) return string;
  return `${string.substring(0, maxLength)}...`;
}

function shuffleArray(array) {
  let arrayClone = [...array];

  let currentIndex = arrayClone.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = arrayClone[currentIndex];
    arrayClone[currentIndex] = arrayClone[randomIndex];
    arrayClone[randomIndex] = temporaryValue;
  }

  return arrayClone;
}

export { truncateString, shuffleArray };
