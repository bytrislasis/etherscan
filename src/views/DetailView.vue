<template>
<div>
  {{this.$route.params.txid}}
</div>
</template>

<script>
import io from "socket.io-client";

export default {
 mounted() {
   this.socket = io('http://localhost:3000');

   this.socket.emit('transferdetail', {txid: this.$route.params.txid});

   this.socket.on('transferdetail', (data) => {
     console.table(data);
     //this.transfer = data.transfer;
   });

 }
}
</script>

<style scoped>

</style>