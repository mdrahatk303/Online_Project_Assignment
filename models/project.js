const mongoose=require('mongoose');

const Proj_Schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        default:""
    },
    prof:{
        type:String,
        required:true, 
        default:""
    },
    profEmail:{
        type:String,
        default:""
    },
    intake:{
        type:String,

    },
    count:{
        type:String,
        
    },
    alloted:[
        {
            studEmail:{
                type:String,
                default:""
            }
            
        }
    ]
},
{
    timestamps:true
});


const ProjSchema=mongoose.model('projschema',Proj_Schema);
module.exports=ProjSchema;