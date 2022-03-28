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


//Blokları takip etmek için abonelik başlattık
let blokTakip = web3.eth.subscribe('newBlockHeaders');

//Blokları dinliyoruz
blokTakip.on('data',(blockHeader)=>{
    io.emit('blockHeader',blockHeader);
});



io.on('connection',(socket)=>{
    //Soket idsini gösterioruz
    console.log('New user connected : ' + socket.id);

    //son 4 bloğu kullanıcıya emit ediyoruz
    web3.eth.getBlockNumber((req,res)=>{
        let geriGidilecekBlokSayisi = res - 4;
        for(let i = geriGidilecekBlokSayisi; i <= res; i++){
            web3.eth.getBlock(i,(req,blokBilgileri)=>{
                socket.emit('blockHeader',blokBilgileri);
            });
        }
    })



})