function addCsrfToken(req, res, next) {
    //locals property is express property which allows us to set variables, which are exposed to all the views automatically.
    res.locals.csrfToken = req.csrfToken(); //now this token is saved and we can use it in any view.
    next();
};

module.exports = addCsrfToken;
