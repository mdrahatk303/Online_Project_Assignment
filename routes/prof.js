const express=require('express');
const router=express.Router();
const passport=require('passport');
const moment=require('moment');
const profcontroller=require('../controllers/prof_controller')

router.get('/',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
            return res.redirect('/prof/enter');
        }
    }
     //return res.render('sign_in');
    return res.render('prof_signIn');
})

router.get('/sign-up',function(req,res)
{
    
    if (req.isAuthenticated()){
        {
           
            return res.redirect('/prof/enter');
        }
    }
     //return res.render('sign_up');
    return res.render('prof_signUp');
})

const Proj=require('../models/project');
router.get('/enter', passport.checkAuthentication,async function(req,res)
{
    // console.log("here in proffessor section");
    
    let proj=await Proj.find({profEmail:req.user.email});
    // console.log("projects "+proj)
    // console.log(moment().format('YYYY-MM-DD'));
    return res.render('professor',{project:proj,date:moment().format('YYYY-MM-DD')});
})

 

 
//user signing in
//Failure redirect must be same page for working of flash messages
//that are kept in passport-local page
router.post('/create-session',passport.authenticate('professor',{failureRedirect:'/'}),profcontroller.create_session);

//registration of user(sign-up)
router.post('/create',profcontroller.create);

//profile section
router.get('/profile/:id',passport.checkAuthentication,profcontroller.profile);
    
//updating profile pic
router.post('/update',profcontroller.update);


//logout
router.get('/sign-out',profcontroller.destroy);


//Adding project
router.post('/add-proj',profcontroller.add_proj);


//Delete Project
router.get('/delete-proj/:id',profcontroller.del_proj)


//HOD VIEW
router.get('/hod',async function(req,res)
{
    let proj=await Proj.find({});
    return res.render('hod',{project:proj});
})

module.exports=router;