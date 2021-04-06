function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  return password.trim().length > 5;
}

function validateNames(name) {
  return name.trim().length >= 2;
}

function validateDate(date) {
  let currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, "-");
  let yearDiff =
    new Date(currentDate).getFullYear() - new Date(date).getFullYear();
  let monthDiff = new Date(currentDate).getMonth() - new Date(date).getMonth();

  return yearDiff > 14 || (yearDiff === 14 && monthDiff >= 0);
}

export { 
  validateEmail, 
  validatePassword, 
  validateNames, 
  validateDate };
