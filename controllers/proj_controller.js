const Proj=require('../models/project');
const User =require('../models/users');
const Prof=require('../models/prof');

//sending mail
const mail=require('../mailer/allocate_mail');

module.exports.proj_chosen= async function(req,res)
{
    try {
        let user=await User.findById(req.user.id);
        // user.choices=req.body;
        // user.save();
        // console.log(req.body);
        var i=0;
        for(let projid of req.body.projId)
        {
            user.choices.push({
                projId:projid,
                priority:req.body.priority[i],
                projName:req.body.projName[i],
                profName:req.body.profName[i]
            })
            
            i++;
        }
        user.save();
        // console.log(req.body.projId);
        return res.redirect('back');
        
    } catch (error) {
        console.log("ERROR",error);
        return res.redirect('back');
    }
    
}


module.exports.allocation=async function(req,res)
{

    let proj=await Proj.find({});
    // let user=await User.findById(req.user.id);
    //NOTE: THIS IS FOR SORTING AND ALLOTMENT
    // if(user.choices.length>0)
    // {
        let students=await User.find({}).sort({cgpa:-1}).sort({percentage:-1});
        //console.log("Sorted students "+ students)
        for(let stud of students)
        {
            await mail.allocateMail(stud);
            let sortedChoices=await stud.choices.sort((a,b) => (a.priority > b.priority) ? 1 : ((b.priority > a.priority) ? -1 : 0)); 
            // console.log("SortedChoices o"+ sortedChoices);
            for(let choice of sortedChoices)
            {
                let project=await Proj.findById(choice.projId);
                if(parseInt(project.count)>0)
                {
                    await project.alloted.push({studEmail:stud.email});
                    stud.alloted.projName=project.name;
                    project.count=parseInt(parseInt(project.count)-1);
                    console.log("Projects alloted to "+ stud.name+ " " + project.name);
                    
                    await stud.save();
                    await project.save();
                    
                    break;
                }
            }
        }
        //  console.log(students);
        //  console.log("projects "+proj)
    // }
    let prof=await Prof.find({});
    for(let p of prof)
    {
        // await mail.allocateMail(p.email);
        p.allot="1";
        await p.save();
    }
    
    return res.redirect('back');
}

