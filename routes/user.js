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

router
    .get('/', adminAuth, (req, res, next) => {
        //return all users if verified to be admin
        var users = User.find({}, (err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    })
    .post('/login', (req, res, next) => {
        //if already logged in, no need to do it again
        console.log(req.body);
        if (req.session.userId) {
            console.log(req.session);
            res.send('You are already logged in');
            return;
        }
        //check if required data for logging in has been provided
        if (!req.body.email || !req.body.password)
            throw new Error('You need a username and password');

        //find the user based on email given
        User.findOne({ email: req.body.email }, (err, result) => {
            if (err) return next(err);
            if (result) {
                var user = result;
                //check the given password using the already build schema method
                result.comparePassword(
                    req.body.password,
                    function (err, result) {
                        //if not the same password hash throw error
                        if (err) next(new Error('Wrong email or password'));
                        req.session.userId = user._id;
                        res.send('Welcome ' + user.username);
                    }
                );
            } else {
                throw new Error('Wrong email or password');
            }
        });
    })
    .post('/logout', (req, res, next) => {
        //destroy the session when logging out
        req.session.destroy();
        res.send('Successfuly logged out');
    })
    .post('/signup', (req, res, next) => {
        //check if email is already used
        User.find({ email: user.email }, (err, person) => {
            if (err) return next(err);
            //if any person entry with the same email is found don't add that person account
            if (person.length > 0) {
                next(new Error('Email already in use!'));
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
                    if (err) throw err;
                    else {
                        req.session.userId = user._id;
                        res.send('Successfuly signed up');
                    }
                });
            }
        });
    })
    .delete('/:userId', adminAuth, (req, res, next) => {
        //delete user using id
        User.findByIdAndDelete(req.params.userId, (err, result) => {
            if (err) return next(err);
            res.send('Successfuly deleted user');
        });
    });

module.exports = router;
