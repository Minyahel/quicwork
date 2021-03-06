/*
	Made for handling all api routes dealing with user 
	* Signup
	* Login
	* Logout
	* Account Delete
*/

const express = require('express');
var router = express.Router();
var User = require('../models/user');
var { adminAuth, userAuth } = require('../util/authentication');
const customException = require('../util/customException');

router
    .get('/', adminAuth, (req, res, next) => {
        //return all users if verified to be admin
        var users = User.find({}, (err, result) => {
            if (err)
                return next(customException(500, "Couldn't Load Users", err));
            res.status(200).json(result);
        });
    })
    .post('/login', (req, res, next) => {
        //if already logged in, no need to do it again
        // TODO handle login whilst already logged in properly
        if (req.session.userId) {
            return next(customException(208, 'User already logged in'));
        }
        //check if required data for logging in has been provided
        if (!req.body.email || !req.body.password)
            return next(customException(400, 'Missing Username or Password'));
        //find the user based on email given
        User.findOne({ email: req.body.email }, (err, result) => {
            if (err)
                return next(customException(400, "Couldn't Find User", err));
            if (result) {
                var user = result;
                //check the given password using the already build schema method
                result.comparePassword(
                    req.body.password,
                    function (err, result) {
                        //if not the same password hash throw error
                        if (err) {
                            return next(
                                customException(400, 'Wrong Email or Password')
                            );
                        }
                        req.session.userId = user._id;
                        res.status(200).json({
                            message: 'Successfully logged in'
                        });
                    }
                );
            } else {
                return next(customException(400, 'Wrong Email or Password'));
            }
        });
    })
    .post('/logout', (req, res, next) => {
        //destroy the session when logging out
        console.log('Destroying session');
        req.session.destroy();
        res.status(200).json({ message: 'Successfuly logged out' });
    })
    .post('/signup', (req, res, next) => {
        //check if email is already used
        User.find({ email: req.body.email }, (err, person) => {
            if (err) return next(customException(500, 'Server Error', err));
            //if any person entry with the same email is found don't add that person account
            // TODO handle the case where user is trying to signup with an already used email
            if (person.length > 0) {
                next(customException(400, 'Email Already in Use'));
                return;
            } else {
                //create a new user object from schema
                var user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    admin: req.body.admin
                });
                //save the created person
                user.save((err, result) => {
                    if (err) next(customException(500, 'Server Error', err));
                    else {
                        req.session.userId = user._id;
                        res.status(200).json({
                            message: 'Successfuly signed up'
                        });
                    }
                });
            }
        });
    })
    .delete('/:userId', adminAuth, (req, res, next) => {
        //delete user using id
        User.findByIdAndDelete(req.params.userId, (err, result) => {
            if (err)
                return next(customException(500, "Couldn't Find User", err));
            res.status(200).json({ message: 'Successfuly deleted user' });
        });
    })
    .get('/checkSession', (req, res, next) => {
        if (req.session.userId)
            res.status(200).json({
                message: 'true'
            });
        else
            res.status(200).json({
                message: 'false'
            });
    });

module.exports = router;
