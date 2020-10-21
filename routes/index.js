const express=require('express');
const router=express.Router();
const passport=require('passport');
const app=express();
const usercontroller=require('../controllers/user_controller')

router.get('/',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
            return res.redirect('/enter');
        }
    }
     return res.render('sign_in');
    //return res.render('prof_signIn');
})

router.get('/sign-up',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
           
            return res.redirect('/enter');
        }
    }
     return res.render('sign_up');
    //return res.render('prof_signUp');
})


router.get('/enter', passport.checkAuthentication,function(req,res)
{
    console.log("here in enter section");
    
    return res.render('enter');
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