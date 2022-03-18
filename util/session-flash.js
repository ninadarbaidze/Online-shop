//we should add it in auth.controller.

function getSessionData(req) {
    const sessionData = req.session.flashData;
    req.session.flashData = null;

    return sessionData;
}

function flashDataToSession(req, data, action) {
   //added new property in session object. saving error message and all the input values.
   //adding this data will be saved temporarly, not to force users entered them again
    req.session.flashData = data; 
    req.session.save(action);
}

module.exports = {
    getSessionData: getSessionData,
    flashDataToSession: flashDataToSession
}