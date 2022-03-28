<template>
  <!--Bulunan Bloklar-->
  <div class="row mt-4">
    <div class="col-sm-3 mt-2" v-for="(item , index) in bloklar" :key="index">
      <div class="card">
        <div class="card-header fw-bold">{{item.number}}</div>
        <div class="card-body">
          <p class="card-text">Saat {{item.timestamp}}</p>
          <p class="card-text">Miner : <a href="" class="link-info">{{item.miner.substring(0,20)}}...</a></p>
        </div>
        <div class="card-footer"> Hash : # <a href="" class="link-info">{{item.hash.substring(0,20)}}...</a></div>
      </div>
    </div>

  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data(){
    return {
      socket: {},
      bloklar: [],
      limit : 3
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000');
    this.socket.on('blockHeader', (data) => {

      if(this.bloklar.length > this.limit){
        this.bloklar.pop()
      }

      this.bloklar.unshift(data);

    });
  }
}
</script>

<style scoped>

</style>