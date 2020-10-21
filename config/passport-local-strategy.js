const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');
const Prof=require('../models/prof');

// authentication using passport
passport.use('student',new LocalStrategy({
        usernameField: 'email',
        passReqToCallback:true//for adding 'req' arg to function
    },
    function(req,email, password, done){
        // find a user and establish the identity
        User.findOne({email: email}, function(err, user)  
        {
            if (err)
            {
                console.log('Error in finding user --> Passport');
                req.flash('error','Error in finding User!!')
                return done(err);
            }

            if (!user)
            {
                console.log('Invalid Username/Password');
                req.flash('error','User not Found!!');
                return done(null, false);
            }
            else if(user.password != password)
            {
                console.log('Invalid Username/Password');
                req.flash('error','Password is wrong!!');
                return done(null, false);
            }
            //req.flash('success','Welcome '+user.email+'!!')
            console.log(req.flash);
            return done(null, user);
        });
        
    }
  

));

passport.use('professor',new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true//for adding 'req' arg to function
},
function(req,email, password, done){
    // find a user and establish the identity
    Prof.findOne({email: email}, function(err, user)  
    {
        if (err)
        {
            console.log('Error in finding user --> Passport');
            req.flash('error','Error in finding User!!')
            return done(err);
        }

        if (!user)
        {
            console.log('Invalid Username/Password');
            req.flash('error','User not Found!!');
            return done(null, false);
        }
        else if(user.password != password)
        {
            console.log('Invalid Username/Password');
            req.flash('error','Password is wrong!!');
            return done(null, false);
        }
        //req.flash('success','Welcome '+user.email+'!!')
        console.log(req.flash);
        //console.log("Professor"+user);
        return done(null, user);
    });
    
}


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    // if(user.ID!='1')
    // {
        console.log("Student");
        done(null, user.ID);
    // }
    // else
    // {
    //     console.log("Professor");
    //     done(null,user.ID);
    // }
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    // if(id!=='1')
    // {
        console.log("Student");
        User.findOne({ID:id}, function(err, user){
            if(err){
                console.log('Error in finding user --> Passport');
                return done(err);
            }

            return done(null, user);
        });
    // }
    // else{
    //     console.log("Professor");
    //     Prof.findOne({ID:id}, function(err, user){
    //         if(err){
    //             console.log('Error in finding user --> Passport');
    //             return done(err);
    //         }

    //         return done(null, user);
    //     });
    // }
});


// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()){
        return next();
    }

    // if the user is not signed in then take it to sign-in page
    console.log("Professor not loggedin");
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next){
    // console.log("here Prof")
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}



module.exports = passport;