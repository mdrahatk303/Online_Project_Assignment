const express=require('express');
const router=express.Router();
const passport=require('passport');
const app=express();
const usercontroller=require('../controllers/user_controller')

router.get('/',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
            return res.redirect('/stud/enter');
        }
    }
     return res.render('sign_in');
    //return res.render('prof_signIn');
})

router.get('/sign-up',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
           
            return res.redirect('/stud/enter');
        }
    }
     return res.render('sign_up');
    //return res.render('prof_signUp');
})

const Proj=require('../models/project');
const User=require('../models/users');
router.get('/enter', passport.checkAuthentication,async function(req,res)
{
    
    let proj=await Proj.find({});
    let user=await User.findById(req.user.id);
    return res.render('enter',{project:proj,choices:user.choices});
})

 
//user signing in
//Failure redirect must be same page for working of flash messages
//that are kept in passport-local page
router.post('/create-session',passport.authenticate('student',{failureRedirect:'/'}),usercontroller.create_session);

//registration of user(sign-up)
router.post('/create',usercontroller.create);

//profile section
router.get('/profile/:id',passport.checkAuthentication,usercontroller.profile);
    
//updating profile pic
router.post('/update',usercontroller.update);


//logout
router.get('/sign-out',usercontroller.destroy);


module.exports=router;