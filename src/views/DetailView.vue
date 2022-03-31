<template>
<div>
<!--  {{this.$route.params.txid}}-->

    <div class="row mt-5" id="tabloYukseklik">
      <div class="col-12">

        <div class="card">
          <div class="card-header">Transfer Detayları</div>
          <div class="card-body">
            <table class="table">
              <thead>

              <tr>

                <th scope="col">Key</th>
                <th scope="col">Value</th>

              </tr>

              </thead>
              <tbody>
              <tr  v-for="(item , index) in transfer" :key="index">
                <th scope="row">{{index}}</th>
                <td>{{item.toString().substring(0,50)}}</td>
              </tr>

              </tbody>
            </table>

          </div>
        </div>


      </div>
    </div>



</div>
</template>

<script>
import io from "socket.io-client";

export default {
  data (){
    return {
      transfer: {},
    }
  },
 mounted() {
   this.socket = io('http://localhost:3000');

   this.socket.emit('transferdetail', {txid: this.$route.params.txid});

   this.socket.on('transferdetail', (data) => {
     //console.log(data);
     this.transfer = data;
   });

 }
}
</script>

<style scoped>
#tabloYukseklik {
  min-height: 930px;
  max-height: 930px;
}
</style>