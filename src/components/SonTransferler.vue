<template>
  <!--Transferler-->
  <div class="row mt-4">
    <div class="col" id="over">
      <TransitionGroup name="list">
        <div class="card mb-3" v-for="item in transfer" :key="item">
          <div class="card-header">Transfer Bilgileri</div>
          <div class="row g-0">
            <div class="col-1">
              <img src="https://static.vecteezy.com/system/resources/previews/000/291/162/non_2x/transaction-vector-icon.jpg" class="img-fluid"  style="max-width: 100px;">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <p>
                  <span><code style="cursor: pointer">{{parentHash.substring(0,35)}}</code></span> ===> <span><code style="cursor: pointer">{{hash.substring(0,35)}}</code></span>
                </p>
                <p class="card-text">
                  <router-link  class="link-info" :to="{name:'detail',params:{txid:item}}">{{item}}</router-link>
                </p>
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
      socket      : {},
      hash        : '',
      parentHash  : '',
      transfer    : [],
      limit       : 5,
    }
  },
  mounted() {
    this.socket = io('http://localhost:3000');
    this.socket.on('transfer', (data) => {
      console.log(data)
      this.hash = data.hash;
      this.parentHash = data.parentHash;
      let last10 = data.transactions.slice(Math.max(data.transactions.length - this.limit, 0));
      for (let i = 0; i < last10.length; i++) {
        setTimeout(()=>{
          this.transfer.unshift(last10[i])
        },i*750)
      }
    })
  }
}
</script>


<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 1s ease-out;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
#over{
  min-height: 785px;
  max-height: 785px;
  overflow: hidden;
}
</style>