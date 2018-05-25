import my_address from './address.vue'

my_address.install = function(Vue){
	Vue.component('my_address', my_address);
}

export default my_address