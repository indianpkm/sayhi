var express=require('express');
var app=express()
var http=require('http').Server(app);
var io=require('socket.io')(http);
var PORT=process.env.PORT || 3000

app.use(express.static(__dirname+'/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '')
})

users=[];
var online=0;
io.on('connection',(socket)=>{
    online++;
    io.sockets.emit('broadcast',{client:online +' Online'})
    socket.on('setUserName',(data)=>{
        users[socket.id]=data;
        console.log(users)
        io.sockets.emit('newUser',data);
        if(users.indexOf(data)> -1){
            socket.emit('userExists',data+' userName is taken! please try another')
        }else{
            users.push(data);
            socket.emit('userSet',{userName:data})
        }
    })
    socket.on('msg', (data)=>{
        //Send message to everyone
        io.sockets.emit('newmsg', data);
     })
     socket.on('disconnect', function (data) {
        online--;
        io.sockets.emit('broadcast',{client:online +' Online'})
             io.sockets.emit('left',users[socket.id]);
             delete users[socket.id]
     });
})

http.listen(PORT,()=>{
    console.log(`listing at ${PORT}`)
})