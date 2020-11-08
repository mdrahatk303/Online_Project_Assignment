const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_controller')
const stud=require('./student');
const prof=require('./prof');
const proj=require('./project');

router.get('/',homeController.home);

router.use('/stud',stud);

router.use('/prof',prof);

router.use('/proj',proj);

module.exports=router;