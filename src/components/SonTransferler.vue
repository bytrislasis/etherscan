<template>
  <!--Transferler-->
  <div class="row mt-4">
    <div class="col">

      <TransitionGroup name="list">
        <div class="card mb-3" v-for="item in transfer" :key="item">
          <div class="card-header">Transfer Bilgileri</div>
          <div class="row g-0">
            <div class="col-1">
              <img src="https://static.vecteezy.com/system/resources/previews/000/291/162/non_2x/transaction-vector-icon.jpg" class="img-fluid"  style="max-width: 100px;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">TX Hash</h5>
                <p class="card-text"><a :href="item" class="link-info">{{item}}</a></p>
              </div>
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  data(){
    return {
      socket: {},
      transfer: [],
      limit: 3,
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000');
    this.socket.on('transfer', (data) => {
      console.log(data)
      this.transfer = data.slice(Math.max(data.length - this.limit, 0))
    })
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
  transform: translateY(30px);
}
</style>