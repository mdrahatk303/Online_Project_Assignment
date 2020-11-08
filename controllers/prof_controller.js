// const User=require('../models/users');
const User=require('../models/prof');

const Proj=require('../models/project');

const fs=require('fs');
const path=require('path')

//user login
module.exports.create_session= async function(req,res)
{
    req.flash('success','Welcome '+req.user.email);
    
    return  res.redirect('/prof/enter')//{user:req.user});

    
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
                let newuser=await User.create({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    identity:"professor"+req.body.email
                    
                });
                console.log(newuser);
                req.flash('success','Successfully Registered!!')
                return res.redirect('back');
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
    return res.redirect('back');
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
            // user.name=req.body.name;
            // user.email=req.body.email;
            // user.cgpa=req.body.cgpa;
            // user.percentage=req.body.percentage;
            // console.log(req.body);
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



//Adding project

module.exports.add_proj=async function(req,res)
{
    try 
    {
        console.log("here"+req.body);
        let project=await Proj.create({
            name:req.body.name,
            prof:req.user.name,
            intake:req.body.intake,
            count:req.body.intake,
            profEmail:req.user.email

        })
        console.log(project);
        return res.redirect('back');
    } 
    catch (error) 
    {
        console.log("ERROR",error);
        return;
    }
}


//Delete Project
module.exports.del_proj=async function(req,res)
{
    try {
        // console.log(req.params.id);
        await Proj.findByIdAndDelete(req.params.id);
        return res.redirect('back');

    } catch (error) {
        console.log("ERROR",error);
        return;
    }
}