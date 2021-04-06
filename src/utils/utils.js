function truncateString(string, maxLength) {
  if (!string) return "";
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

function generateUuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    // eslint-disable-next-line no-mixed-operators
    let r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function debounce(callback, time) {
  let timerId;
  return function debounced(...params) {
    clearTimeout(timerId);
    timerId = setTimeout(callback, time, ...params);
  }
}

export { truncateString, shuffleArray, generateUuidv4, debounce };
