const socket=io();
const chatMessages = document.querySelector('.chat-messages');
//For chat form
const text=document.querySelector('input')
const image=document.querySelector('image')

//so that scroll down automatically
const users=document.getElementById('users');
chatMessages.scrollTop = chatMessages.scrollHeight;

//for username and room name
var queryString = window.location.search;
console.log(queryString);
var urlParams = new URLSearchParams(queryString);
var username=urlParams.get('username');
var room=urlParams.get('room');

//sending room and username to server
socket.emit("joinroom",{username,room});

//for submitting the form->for messages
var form=addEventListener("submit",sendmessage);

function sendmessage(e)
{
    // var  file = document.f1.avatar.value.split("\\") ;
    // console.log(file[file.length-1]);
   
    e.preventDefault();
    //sending  message to server
    socket.emit("chats",text.value);
    text.value="";
}


//For room name
var roomname=document.getElementById('room-name');
roomname.innerHTML=`${room}`;

//New user joined
socket.on("newUser",function(obj)
{
   
    output(obj);
})

//User messages
socket.on("message",function(obj)
{   
    console.log('Message from server->',obj.msg);
    output(obj);
    
}) 

//Message by bot when a user leave
socket.on("left",function(obj)
{
    
    output(obj);
})



function output(obj)
{
    var messageToDom=document.createElement('div');
    messageToDom.classList.add('message');
    messageToDom.innerHTML=`<p class="meta">${obj.user_} <span> ${obj.time}</span><span><a class="del" href="/delete/${obj.id}"><i class="fa fa-trash" aria-hidden="true"></i></a></span></p>
    <p class="text">
        ${obj.msg}
    </p>`;

    document.querySelector('.chat-messages').appendChild(messageToDom);

    // Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

 //Appending users
 socket.on("userList",(userList)=>{
     users.innerHTML="";
     for(user of userList)
     {

         if(user.room==room)
         {
            var li=document.createElement('li');
           
            if(user.username==username)
            {
                
                li.innerHTML=`<strong>${user.username}</strong>`
                
                
            }else
            {
                li.innerHTML=user.username;
            }
            users.appendChild(li);
         }
     }
 })

//NEW CHANGES
//For images

$('#image').bind('change', function(e){
    var data = e.originalEvent.target.files[0];
    readThenSendFile(data);      
});

function readThenSendFile(data){

    var reader = new FileReader();
    reader.onload = function(evt){
        var msg ={};
        msg.username = username;
        msg.file = evt.target.result;
        msg.fileName = data.name; 
        socket.emit('base64 file', msg);
        //console.log(msg);
    };
   
    reader.readAsDataURL(data);
}


//Appending base64 image
socket.on('addimage',(base64image)=>
{
    console.log("here in add image");
    let messageToDom=document.createElement('div');
    messageToDom.classList.add('message');
    messageToDom.innerHTML=`<p class="meta">${base64image.username}<span> ${base64image.time}</span><span><a class="del" href="/delete/${base64image.id}"><i class="fa fa-trash" aria-hidden="true"></i></a></span></p>
    <p class="text">
    '<img src="${base64image.file}" width="400 px" height="400 px">'
    </p>`;

    document.querySelector('.chat-messages').appendChild(messageToDom);
     // Scroll down
     chatMessages.scrollTop = chatMessages.scrollHeight;
    // document.querySelector('.chat-messages').appendChild(messageToDom);

    //     $('.chat-messages')
    //     .append($('.message')
    //     .append($('.text')
    //     .append(
    //         '<img src="'+ base64image+'" >'
    //     )))
    
    
})
        


// <p class="meta"><%=chat.user%><span><%=chat.time%></span></p>
//               <p class="text"><%=chat.msg%></p>



$('#profile').bind('change', function(e){
    var data = e.originalEvent.target.files[0];
    readThenSendProfile(data);      
});

function readThenSendProfile(data){

    var reader = new FileReader();
    reader.onload = function(evt){
        var msg ={};
        msg.username = username;
        msg.file = evt.target.result;
        msg.fileName = data.name; 
        socket.emit('base64Profile', msg);
        //console.log(msg);
    };
   
    reader.readAsDataURL(data);
}


//Showing profile pic
socket.on('profilePic',(base64image)=>
{
    location.reload();
//    console.log("eree");
//     let newpic=document.getElementById('profilepic');
//     //messageToDom.classList.add('profilepic');
//     newpic.innerHTML=`<img src="${base64image.file}" width="100 px" height="100 px">`;
    

    //document.querySelector('.profilepic').appendChild(newpic);
    
    
})



//Reload all the client when delete but is clicked to avoid getting lots of "leave" and "joined" messages

// var delbutton=document.getElementsByClassName("del");

// for (var i = 0 ; i < delbutton.length; i++) {
//     delbutton[i].addEventListener('click' , reloadClient , false ) ; 
//  }


// function reloadClient() {
//   socket.emit("reload_clients");
// }

// socket.on("reload",()=>{
//     location.reload();
// })

