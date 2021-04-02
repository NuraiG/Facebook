import firebase from "firebase";

function timeDifference(timestamp1, timestamp2) {
  let difference = timestamp1.getTime() - timestamp2.getTime();

  let yearsDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 365);
  difference -= yearsDifference * 1000 * 60 * 60 * 24 * 365;

  let weeksDifference = Math.floor(difference / 1000 / 60 / 60 / 24 / 7);

  let daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  difference -= daysDifference * 1000 * 60 * 60 * 24;

  let hoursDifference = Math.floor(difference / 1000 / 60 / 60);
  difference -= hoursDifference * 1000 * 60 * 60;

  let minutesDifference = Math.floor(difference / 1000 / 60);
  difference -= minutesDifference * 1000 * 60;
  return {
    yearsDifference,
    weeksDifference,
    daysDifference,
    hoursDifference,
    minutesDifference,
  };
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

function getShortDate(timestamp1, timestamp2) {
  let timeFromPostCreated = timeDifference(timestamp1, timestamp2);
  if (timeFromPostCreated.yearsDifference > 0) {
    return timeFromPostCreated.yearsDifference + "y";
  }
  if (timeFromPostCreated.weeksDifference > 0) {
    return timeFromPostCreated.weeksDifference + "w";
  }
  if (timeFromPostCreated.daysDifference > 0) {
    return timeFromPostCreated.daysDifference + "d";
  }
  if (timeFromPostCreated.hoursDifference > 0) {
    return timeFromPostCreated.hoursDifference + "h";
  }
  return timeFromPostCreated.minutesDifference + "m";
}

function getTimestampFromDate(date) {
  date = date.split("-");
  return new Date(date[0], date[1] - 1, date[2]);
}

function compareObjByDBTimestamp(a, b) {
  if (a.timestamp?.toDate() > b.timestamp?.toDate()) {
    return -1;
  }
  if (a.timestamp?.toDate() < b.timestamp?.toDate()) {
    return 1;
  }
  return 0;
}

function getServerTime() {
  return firebase.firestore.Timestamp.now();
}

export {
  timeDifference,
  calculateAndFormatTime,
  getShortDate,
  getTimestampFromDate,
  compareObjByDBTimestamp,
  getServerTime
};
