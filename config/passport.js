//define our local strategy
var localStrategy = require('passport-local');


//import user model
var User = require('../models/user');

//pass in reference to passport from app.js
module.exports = function (passport) {

    //serialize user
    passport.serializeUser(function (user, done) {
        //done(null, user);
        console.log('serializing user: ');console.log(user); 
        done(null, user._id); 

    });

    //deserizlize a user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            //done(null, user);
        
        console.log('deserializing user:',user); 
        done(err, user); 

        });
    });
    passport.use('local-login', new localStrategy({
            passReqToCallBack: true
        },
        function (req, username, password, done) {
            //asynchronous process
            process.nextTick(function () {
                User.findOne({
                        'username': username
                    },
                    function (err, user) {
                        if (err) {
                            return done(err);
                        }

                        //if no valid username is found
                        if (!user) {
                            return done(null, false, req.flash('loginMessage', 'Incorrect Username'));

                        }

                        //if no valid password
                        if (!user.validPassword(password)) {
                            return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
                        }

                        //everything is OK - proceed with the login
                        return done(null, user);

                    });
            });
        }));

}


/*
// add a reference to the passport strategy
var LocalStrategy = require('passport-local').Strategy;

// import the User Model
var User = require('../models/user');

module.exports = function(passport) {
	
	// SETUP for Session Storage and Retrieval
	
	//serialize user
	passport.serializeUser(function(user, done) {
		done(null, user);
	});
	
	//deserialze user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
	
	passport.use('local-login', new LocalStrategy({
		passReqToCallback: true
	},
	function(req, username, password, done) {
		
		// asynchronous process
		process.nextTick(function() {
			User.findOne({
				'username':username
			}, function(err, user) {
				if(err) {
					return done(err);
				}
				
				//no valid user found
				if(!user) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Username'));
				}
				
				//no valid password entered
				if(!user.validPassword(password)) {
					return done(null, false, req.flash('loginMessage', 'Incorrect Password'));
				}
				
				//everything is ok - proceed with login
				return done(null, user);
			});
		});
	}));
}*/


/*var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// passport/login.js
passport.use('login', new LocalStrategy({
    passReqToCallback : true
  },
  function(req, username, password, done) { 
    // check in mongo if a user with username exists or not
    User.findOne({ 'username' :  username }, 
      function(err, user) {
        // In case of any error, return using the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user){
          console.log('User Not Found with username '+username);
          return done(null, false, 
                req.flash('message', 'User Not found.'));                 
        }
        // User exists but wrong password, log the error 
        if (!isValidPassword(user, password)){
          console.log('Invalid Password');
          return done(null, false, 
              req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from 
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));*/