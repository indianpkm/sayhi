var socket=io();
var hide=document.querySelector('.hide')
var main=document.querySelector('.main')
var joined=document.querySelector('.joined')
var p=document.getElementById('.p')
var entering=new Audio('entering.wav')
var msg=new Audio('msg.mp3')
var whistle=new Audio('whistle.mp3')

function setUserName(){
   main.classList.remove('hide')
   socket.emit('setUserName',document.getElementById('name').value)
   entering.play();
};
socket.on('userExists',(data)=>{
user=data.userName;
document.getElementById('name-container').innerHTML=data;
})
socket.on('userSet',(data)=>{
   user=data.userName
   document.body.innerHTML=main.innerHTML;
});

socket.on('newUser',function (data) {
   //  newData=[];
   //  newData.push(data)
   console.log('user:'+data)
   document.getElementById('newJoin').innerHTML +='<div>' + data+' join' + '</div>';
   whistle.play();
 })
function sendMessage(){
 var msg = document.getElementById('message').value;
 if(msg){
    socket.emit('msg', {message: msg, user: user});
 }
 var usermessage=document.getElementById('message')
 usermessage.value='';
}

socket.on('newmsg', (data)=>{
   document.getElementById('msg-inner').innerHTML +='<div><span class="name">' + data.user + '</span> 👉 <span class="store_msg">' + data.message + '</span></div>'
   msg.play();
})
socket.on('broadcast',function(data){
   console.log(data)
        document.querySelector('.p').innerHTML=data.client;
    })

socket.on('left', (data)=>{
   console.log(data)
   document.getElementById('newJoin').innerHTML +='<div class="left">' + data+' left' + '</div>';
})
