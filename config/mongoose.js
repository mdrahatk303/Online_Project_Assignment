const mongoose=require('mongoose')
//mongoose.connect('mongodb+srv://Rahat:Rahat3601@cluster0-ieib1.mongodb.net/whats-up-budy?retryWrites=true&w=majority');
mongoose.connect('mongodb://localhost/WebTech');

const db=mongoose.connection;
db.on('error',function(err)
{
    console.log(err.message);
});

db.once('open',function()
{
    console.log("successfully connected to database");
})

module.exports=db;

