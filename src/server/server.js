const http      = require('http');
const socketio  = require('socket.io');
const Web3      = require('web3');
const moment    = require('moment');
const {last4Block,last10Transfer} = require('./socketSend');
const web3      = new Web3(new Web3.providers.WebsocketProvider('ws://127.0.0.1:8556'));
const server    = http.createServer((req,res)=>{
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



//Blokları takip etmek için abonelik başlattık
let blokTakip = web3.eth.subscribe('newBlockHeaders');
//Blokları dinliyoruz
blokTakip.on('data',(blockHeader)=>{

    //bloğun bulunma saatini formatlıyoruz
    blockHeader.timestamp = moment.unix(blockHeader.timestamp).format('HH:mm:ss');

    //son  blokları tüm soketlere emit ediyoruz
    io.emit('blockHeader',blockHeader);

    //son transferleri tüm soketlere emit ediyoruz
    web3.eth.getBlock(blockHeader.number).then((transfer)=>{
        io.emit('transfer',transfer);
    });

});


io.on('connection',(socket)=>{
    //Soket idsini gösterioruz
    console.log('New user connected : ' + socket.id);

    //son 4 bloğu kullanıcıya emit ediyoruz
    last4Block(web3,socket);

    //Son 10 Transfer
    last10Transfer(web3,socket);

})