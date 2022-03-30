const moment = require("moment");

const last4Block = (web3,socket)=>{

    web3.eth.getBlockNumber(async (req,res)=>{
        let geriGidilecekBlokSayisi = res - 4;
        for(let i = geriGidilecekBlokSayisi; i <= res; i++){
            await  web3.eth.getBlock(i,(req,blokBilgileri)=>{
                blokBilgileri.timestamp = moment.unix(blokBilgileri.timestamp).format('HH:mm:ss');
                socket.emit('blockHeader',blokBilgileri);
            });
        }
    })

}

const last10Transfer = (web3,socket)=>{
    web3.eth.getBlock('latest').then((transfer)=>{
        socket.emit('transfer',transfer);
    });
}



module.exports = {
    last4Block,
    last10Transfer
}