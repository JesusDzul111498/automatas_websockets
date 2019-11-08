const path = require('path');
const express = require('express');
const app = express();

//Configuracion del puerto
app.set('port', process.env.PORT || 3000);

//archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//Inicio del servidor
const server = app.listen(app.get('port'),()=>{
    console.log('Servidor activo en puerto', app.get('port'));
});

//websockets
const SocketIO = require('socket.io');
const io =SocketIO(server);

// metodos del los websockets
io.on('connection', (socket)=>{
    console.log('nueva conexion', socket.id);

    socket.on('chat:message', data =>{
        io.sockets.emit('chat:message',data);
    });

    socket.on('chat:typing', (data) =>{
        socket.broadcast.emit('chat:typing',data);
    });
});


