<template>
  <!--Bulunan Bloklar-->
  <div class="row mt-4 d-flex justify-content-center">


    <TransitionGroup name="list">

        <div class="col-sm-2 mt-2 float-end" v-for="item in bloklar" :key="item.number">

          <div class="card">

            <div class="card-header fw-bold">No : #{{item.number}}</div>

            <div class="card-body" style="font-size: smaller; max-height: 100px;">

              <p class="card-text">Saat {{item.timestamp}}</p>

              <p class="card-text">

                Miner : <a href="" class="link-info">{{item.miner.substring(0,10)}}...</a>

              </p>

            </div>

          </div>
        </div>
    </TransitionGroup>


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
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>