 const User=require('../models/users');
//const User=require('../models/prof');
const fs=require('fs');
const path=require('path')

//user login
module.exports.create_session= async function(req,res)
{
    req.flash('success','Welcome '+req.user.email);
    
    return  res.redirect('/enter')//{user:req.user});

    // //Manual Authentication
    // try {
    //     let user=await User.findOne({email:req.body.email});
    //     if(user)
    //     {
    //         if(user.password==req.body.password)
    //         {
    //             console.log("Enetred");
    //             req.flash('success','Welcome'+user.email+'!!');
    //             return res.render('enter',{user});
    //         }
    //         else
    //         {
    //             console.log("Password does not match");
    //             req.flash('error','Invalid Password!!')
    //             return res.redirect('back');
    //         }
    //     }
    //     else
    //     {
    //         console.log("user not found");
    //         req.flash('error','User not found!!')
    //         return res.render('sign_up');
    //     }
    // } 
    // catch (error) {
    //     console.log("******Error",error);
    //     req.flash('error','Some internal error!!')
    //     return res.redirect('back');
        
    // }
    
}

//user registering
module.exports.create=async function(req,res)
{
    try 
    {
        if(req.body.password!=req.body.confirmPassword)
        {
            console.log("confirm password did not match");
            req.flash('error','Passwords do not match!!')
            return res.redirect('back');
        }
       let user=await User.findOne({email:req.body.email});
        
            
            if(user)
            {
                console.log("User already exists");
                req.flash('error',user.email+'is already registered!!')
                return res.redirect('back');
            }
            else
            {
                let newuser=await User.create(req.body);
                console.log(newuser);
                req.flash('success','Successfully Registered!!')
                return res.redirect('/');
            }
       
        
    }
    catch (error)
    {
        console.log(error);
        req.flash('error','Some internal error!!')
        return res.redirect('/');
    }
}

//destroy session
module.exports.destroy=function(req,res)
{
    if(req.user)
    req.flash('success','See you soon '+req.user.email+"!!");
    req.logout();
    return res.redirect('/');
}

//Profile section

module.exports.profile=function(req,res)
{
    //console.log(req.params.email);
    if(req.user.id===req.params.id)
    {
        //let user=req.user;
        return res.render('profile');
    }
    else
    {
        return res.redirect('/');
    }
}

//update profile pic

module.exports.update= async function(req,res)
{
    
    //console.log(req.file);
    try {
        //console.log(req.body);
        let user=await User.findById(req.user.id);
        // user.avatar=req.body.avatar;
        // console.log(user.avatar);
        

        //Commented code works locally(not after deployement)
        User.uploadedAvatar(req,res,function(err)
        {
            if(err)
            {
                console.log("Multer error",err);
                req.flash('error','Multer Error')
                return res.redirect('back');

            } 
            user.name=req.body.name;
            user.email=req.body.email;
            user.cgpa=req.body.cgpa;
            user.percentage=req.body.percentage;
            console.log(req.file);
            if(req.file)
            {
               // If already image->remove it before adding new image
               
               if(user.avatar)
               {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
               }
                user.avatar=User.avatarPath+'/'+req.file.filename;
                // var img=new Buffer(fs.readFileSync(req.file.path));
                // var encImg = img.toString('base64');
                // var image={img: Buffer(encImg, 'base64')}
                // console.log(image);
               //user.avatar=image;
            
            }
            user.save();
            req.flash('success','Updated Successfully')
        });
        
        return res.redirect('back');
        
    } catch (error) {
        console.log("Error",error);
        return;
    }
    


}

