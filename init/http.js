const path = require("path");

module.exports = function(port = 3000){

    const express = require('express')
    const http = express()
    
    http.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, "../", 'index.html'));
    })

    const server = require('http').createServer(http);

    const socketio = require('socket.io');
    const io = socketio(server);

    let users = {};
    
    io.on('connection', function(socket){ 
        
        // register user on our variable
        users[socket.id] = socket;

        // register message watcher
        socket.on("mensagem", function(data){
            console.log("chegou msg", data);
            socket.emit("mensagem", {from: 'server', data: data})
        })

        // register message watcher
        socket.on("broadcast", function(data){

            for(let socketid in users){
                let user = users[socketid];

                if(users[socketid].id == socket.id) continue;
                
                user.emit("mensagem", {
                    from: socket.id, 
                    data: data
                })
            }
        })


        socket.on('disconnect', function () { 
            delete users[socket.id];
        });

    });

    server.listen(port);
}