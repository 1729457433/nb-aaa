<template>
  <div id="app">
      <h3>{{msg}}</h3>
      <my_address></my_address>
  </div>
</template>

<script>
import my_address from "./components/address";
import Vue from 'vue'

Vue.use(my_address);

export default {
    components: {my_address},
    name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    whenChange(item){
      console.log(item);
    }
  }
}
</script>
