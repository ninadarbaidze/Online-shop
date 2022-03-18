//saves session in the database.
//when user logs in
function createUserSession(req, user, action) { //it will take it's parameters from auth.controllers.
    req.session.uid =  user._id.toString(); //uid name by us, not reserved. storing registered user id in req.session.uid 
    req.session.isAdmin = user.isAdmin; //storing isAdmin property
    req.session.save(action); //when session is succesfully saved, then action will execute
}

//for logout functionality
function destroyUserSession(req) {
    req.session.uid = null;
}

module.exports = {
    createUserSession: createUserSession,
    destroyUserSession: destroyUserSession
};