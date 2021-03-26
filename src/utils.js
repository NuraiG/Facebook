function timeDifference(timestamp1, timestamp2) {
    let difference = timestamp1 - timestamp2;

    let daysDifference = Math.floor(difference/1000/60/60/24);
    difference -= daysDifference*1000*60*60*24

    let hoursDifference = Math.floor(difference/1000/60/60);
    difference -= hoursDifference*1000*60*60

    let minutesDifference = Math.floor(difference/1000/60);
    difference -= minutesDifference*1000*60    
    return { daysDifference, hoursDifference, minutesDifference };
}

function calculateAndFormatTime(timestamp1, timestamp2) {
    let timeFromPostCreated = timeDifference(timestamp1, timestamp2);
      // depending on how long ago the post was made, display the date differently
      let timeToDisplay = new Date(timestamp2).toUTCString();
      if (timeFromPostCreated.daysDifference < 1) {
        timeToDisplay =
          timeFromPostCreated.hoursDifference < 1
            ? timeFromPostCreated.minutesDifference + "m"
            : timeFromPostCreated.hoursDifference + "h";
      }
      return timeToDisplay;
}

export { timeDifference, calculateAndFormatTime }