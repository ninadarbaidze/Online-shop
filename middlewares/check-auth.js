//this function is used in app.js and executed in there automatically.
function checkAuthStatus(req, res, next) {
     const uid = req.session.uid; 

     if(!uid) { //cant find id
        return next()
     };

     res.locals.uid = uid; 
     res.locals.isAuth = true;
     res.locals.isAdmin = req.session.isAdmin;
     next()
}

module.exports = checkAuthStatus;