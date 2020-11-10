const nodemailer=require('nodemailer');
const ejs=require('ejs');
const path=require('path');

let transporter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

// let rendertemplate=function(data,relativePath)
// {
//     let mailHtml;
//     ejs.renderFile(
//         path.join(__dirname,'../views/mailer',relativePath),//relativePath->from where this function will be called(i.e. if any file inside mailer folder)
//                                                              //relativePath is actually path of file inside mailers folder: eg->/comments/new_comment
//         data,
//         function(err,template)
//         {
//             if(err)
//             {
//                 console.log("Error in rendering template",err);
//                 return;
//             }
//             mailHtml=template;
//         }
    
//     )
//         return mailHtml;
// }


module.exports={
    transporter:transporter,
    // rendertemplate:rendertemplate
};