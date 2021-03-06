const mongoose=require('mongoose');
const path=require('path');
const multer=require('multer');
const AVATAR_PATH=path.join('/uploads/images');

const User_Schema=mongoose.Schema({
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
    enrollment:{
        type:String,
        default:""
        // required:true,
        //unique:true
    },
    avatar:{
        type:String,
        default:""
    },
    cgpa:{
        type:String,
        default:""
        
    
    },
    percentage:{
        type:String,
        default:""
    },
    identity:{
        type:String,
        default:"student"
    },
    choices:[{

        projId:{
            type:String,
            default:""
        },
        priority:{
            type:String,
            default:""
        },
        projName:{
            type:String,
            default:""
        },
        profName:{
            type:String,
            default:""
        }
    }],
    alloted:{
        projName:{
            type:String,
            default:""
        }
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
User_Schema.statics.uploadedAvatar = multer({ storage: storage }).single('avatar');//only file will be uplaoded for fieldname avatar
User_Schema.statics.avatarPath=AVATAR_PATH;

const UserSchema=mongoose.model('userschema',User_Schema);
module.exports=UserSchema;