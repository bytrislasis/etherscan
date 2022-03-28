const http      = require('http');
const socketio  = require('socket.io');
const Web3      = require('web3');

const web3     = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8556'));

const server = http.createServer((req,res)=>{
    res.end('Server is running');
});

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});


const io = socketio(server,{
    cors:{
        origin: '*',
        methods: ['GET'],
    }
});


let sub = web3.eth.subscribe('newBlockHeaders');

sub.on('data',(blockHeader)=>{
    io.emit('blockHeader',blockHeader);
});



io.on('connection',(socket)=>{
    console.log('New user connected : ' + socket.id);
})