
    
     
module.exports.home=function(req,res)
{
    // if (req.isAuthenticated())
    // {
    //     {
    //         return res.redirect('/stud/enter');
    //     }
    // }
    return res.render('sign_in');
}