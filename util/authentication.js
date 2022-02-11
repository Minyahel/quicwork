const User = require('../models/user');
const customException = require('./customException');

module.exports = {
    adminAuth: (req, res, next) => {
        //if a session has not been created for the user
        if (!req.session.userId)
            return next(new Error('You are not logged in'));
        //find the user pointed to by the session data
        User.findById(req.session.userId, (err, result) => {
            if (err)
                return next(
                    customException(500, "Couldn't Find User", { err })
                );
            //if the user is not an admin
            if (!result.admin)
                return next(
                    customException(403, 'Insufficient Permissions For Action')
                );
            next();
        });
    },
    userAuth: (req, res, next) => {
        //if a session has not been created for the user
        if (!req.session.userId)
            return next(customException(403, 'User Not Logged In'));
        next();
    }
};
