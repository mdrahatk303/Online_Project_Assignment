const express=require('express');
const port=8000;

//(the current version of express-session reads and writes cookies directly).
//so no need go cookie parser
const session=require('express-session');
//for layout
const expressLayouts = require('express-ejs-layouts');

const app=express();

const path=require('path');
const db=require('./config/mongoose');

app.use(express.urlencoded());
 
//For flash messages
const flash=require('connect-flash');
const flashmidware=require('./config/flash_middleware');

//passport auth
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

//ejs layout
app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads',express.static(path.join(__dirname+'/uploads')));

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'chat',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 20 )
    },
    store: new MongoStore(
        {
            mongooseConnection: db,
            autoRemove: 'disabled'
        
        },
        function(err){
            console.log(err ||  'connect-mongodb setup ok');
        }
    )
}));


//Flash messages
app.use(flash());
app.use(flashmidware.setFlash);
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);




app.use('/',require('./routes'));

app.listen(port,function(err)
{
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
}) 


