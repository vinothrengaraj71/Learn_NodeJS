const {Server} = require ("socket.io");

const io = new Server({cors:"http://localhost:5173/"});

let onlineusers = []

io.on("connection",(socket)=>{
    console.log("New Connection" , socket.id);

    //listen to a connection
    socket.on("addNewUser",(userId)=>{
        if (!onlineusers.some(user=>user.userId === userId)) {
        onlineusers.push(
            {
                userId,
                socketId:socket.id,
                status: "online"
            }
        );
    }

    console.log("onlineUsers",onlineusers);

    io.emit("getOnlineUsers",onlineusers);

    });

    socket.on("disconnect", ()=>{
        onlineusers = onlineusers.filter(user => user.socketId !== socket.id);

        io.emit("getOnlineUsers",onlineusers);

    })
   
});

io.listen(5000);

