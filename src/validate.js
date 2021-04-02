function validateEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password){
    return password.trim() > 5;
}

function validateNames(name){
    return  name.trim.length > 3 && name[0] === name[0].toUpperCase();
}

function validateDate(date){
    let currentDate = new Date().toJSON().slice(0,10).replace(/-/g,'-'); 
    let yearDiff = new Date(currentDate).getFullYear() -  new Date(date).getFullYear();
    return yearDiff >= 4;
}