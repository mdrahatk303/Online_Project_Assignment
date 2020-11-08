const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const AVATAR_PATH=path.join('/uploads/images');

const Prof_Schema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String, 
        required:true
    },
    avatar:{
        type:String,
        default:""
    }
    ,
    identity:{
        type:String,
        default:"professor"
    },
    allot:{
        type:String,
        default:"0"
    },
    hod:{
        type:String,
        default:""
    }
    
},
{
    timestamps:true
}); 
 
//For uploading
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      //  console.log("in userschema");
      cb(null, path.join(__dirname,'..',AVATAR_PATH))//dirname means corrent directory name that is "models"
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })

//static function
Prof_Schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');//only file will be uplaoded for fieldname avatar
Prof_Schema.statics.avatarPath=AVATAR_PATH;

const ProfSchema=mongoose.model('profschema',Prof_Schema);
module.exports=ProfSchema;