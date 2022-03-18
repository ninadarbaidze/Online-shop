const e = require("express");
const User = require("../models/user.model");
const authUtil = require('../util/authentification');
const validation = require('../util/validation')
const flashSession = require('../util/session-flash');

// get /signup
function getSignup(req, res, next) {
  let sessionData = flashSession.getSessionData(req)
    if(!sessionData) {
      sessionData = {
        email: '',
        confirmEmail: '',
        password: '',
        fullname: '',
        street: '',
        postal: '',
        city: ''
      };
    }

  res.render("customer/auth/signup", {inputData: sessionData});
}


// post /signup
async function signUp(req, res) {
  const enteredData = { 
    email: req.body.email, 
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    name: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city
  }

    //check if user input data is not valid, redirect also check if confirm email is true(from validation)
   if(!validation.userDetailsValid(
    req.body.email, 
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city) || !validation.confirmEmailTrue(req.body.email, req.body['confirm-email'])) {

      //for fleshing error messages.
      flashSession.flashDataToSession(req, {
        errorMessage: "please enter correct data",
        ...enteredData
      }, function() {
        res.redirect('/signup') 
      }
    );
      return;
   } 

    const user = new User(
      req.body.email, 
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    );

  
  try {
     //check if user email already exists
    const existsAlready = await user.existsAlready();
    if(existsAlready) {
    flashSession.flashDataToSession(req, {
      errorMessage: "Please enter another email, because it already exists!",
      ...enteredData

    }, function() {
      res.redirect('/signup');
    }
    );
    return;
  }
    await user.signUp()
  }
    catch(error) {
      next(error)
      return;
    }
  res.redirect('/login');
}



//get login
function getLogin(req, res) {
  let sessionData = flashSession.getSessionData(req);
  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }

  res.render("customer/auth/login", {inputData: sessionData});
}




//post login
async function login(req, res, next) {
  const user = new User(req.body.email, req.body.password);

  let existingUser; //it is defined before try because try creates block scope{}, so the existing user won't be available otherwise.
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch(error) {
    next(error);
    return
  }

  const sessionErrorData = {
    errorMessage: "Invalid email or password, double check and try again!",
    email: user.email,
    password: user.password
};
  
  if (!existingUser) {
    //if user doesn't exists in database
    flashSession.flashDataToSession(req, sessionErrorData, function() {
      res.redirect('/login');
    })
    return;
  }

  const correctPassword = await user.comparePassword(existingUser.password)

  if(!correctPassword) {
    //if user's password is incorrect.
    flashSession.flashDataToSession(req, sessionErrorData, function() {
      res.redirect('/login');
    })
    return;
  }

  // if email and password is correct, user will be logged in
  authUtil.createUserSession(req, existingUser, function(){ //from authentification.js
    res.redirect('/'); 
})

}

// post logout
function logout(req, res) {
  authUtil.destroyUserSession(req);
  res.redirect('/login');
}


module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signUp: signUp,
  login: login,
  logout: logout
};
