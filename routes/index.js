/*
 * File Name: index.js
 * Author's Name: David Yu 200286902
 * Website Name:donaldrich.heroku.com
 * File Desciption: the handler that renders all the pages handle all the pages and send emails.
 */


//create express and router objects
var express = require('express');
var router = express.Router();

//create passport object
var passport = require('passport');

//create a moongoose object and make refrence to the login model
var mongoose = require('mongoose');
var User = require('../models/user');


//create a nodemailer object
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'Home',
        message: 'Donald\'s World'
    });
});

/* GET about page */
router.get('/about', function (req, res, next) {
    res.render('about', {
        title: 'About'
    });
});

/* GET projects page */
router.get('/projects', function (req, res, next) {
    res.render('projects', {
        title: 'Projects'
    });
});

/* GET services page */
router.get('/services', function (req, res, next) {
    res.render('services', {
        title: 'Services'
    });
});

/* GET contact page */
router.get('/contact', function (req, res, next) {
    res.render('contact', {
        title: 'Contact'
    });
});

/*GET Login page */
router.get('/login', function (req, res, next) {
    res.render('login', {
        title: 'Login'
    });
});

/* POST contact page: 
using nodemailer to send email when user hit the "submit" button */

//create a mail transporter
var transporter = nodemailer.createTransport("SMTP", {
    service: "Gmail",
    auth: {
        user: "flyingars@gmail.com",
        pass: "October19*"
    }
});

/* POST post methd for contact page */
router.post('/contact', function (req, res) {

    //specify the mail option   
    var mailOptions = {
        from: 'flyingars@gmail.com',
        to: 'flyingars@gmail.com',
        subject: 'New Business Idea',
        text: req.body.name + req.body.email + req.body.message

    };

    //transporter sends the email
    transporter.sendMail(mailOptions, function (error, response) {
        if (error) {
            res.render('contact', {
                title: 'Wrong Input. Something Happend.'
            });
        } else {
            res.render('contact', {
                title: 'Correct Input. Thank You For Your Information.'
            });
        }

    });

});

/* POST process the login request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/contacts',
    failureRedirect: '/login',
    failureFlash: 'true'
}));




module.exports = router;