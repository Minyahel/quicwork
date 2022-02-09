const User = require('../models/user');

module.exports = {
    adminAuth: (req, res, next) => {
        //if a session has not been created for the user
        if (!req.session.userId)
            return next(new Error('You are not logged in'));
        //find the user pointed to by the session data
        User.findById(req.session.userId, (err, result) => {
            if (err) return next(err);
            //if the user is not an admin
            if (!result.admin)
                return next(
                    new Error("You don't have the facilities for dat big man")
                );
            next();
        });
    },
    userAuth: (req, res, next) => {
        //if a session has not been created for the user
        if (!req.session.userId)
            return next(new Error('You are not logged in'));
        next();
    }
};
