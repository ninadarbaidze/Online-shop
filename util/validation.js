//will be used in auth.controllers, we have to check if user input is valid:

function isEmpty(value) {
  return !value && value.trim === ""; //if value is empty
}

function userDetailsValid(email, password, fullname, street, postal, city) {
  return (
    email &&
    email.includes("@") &&
    password &&
    password.trim().length >= 4 &&
    !isEmpty(fullname) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function confirmEmailTrue(email, confirmEmail) {
    return email === confirmEmail;
}

module.exports =  {
    userDetailsValid: userDetailsValid,
    confirmEmailTrue: confirmEmailTrue
     
}
