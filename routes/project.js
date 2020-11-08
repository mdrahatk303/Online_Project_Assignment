const express=require('express');
const router=express.Router();
const passport=require('passport');
const Projcontroller=require('../controllers/proj_controller');

router.post('/',Projcontroller.proj_chosen);
router.get('/allocation',Projcontroller.allocation);

module.exports=router;