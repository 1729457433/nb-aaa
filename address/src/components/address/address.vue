<template>
    <div>
        <div class="part" v-cloak>
            <ul class="city-query">
                <li v-for="(item,index) in address" v-if="address[index].isChecked != 2">
                    <div class="city-name">
                        <h3 :class="item.show?'active':''" @click="show_children(item)"><i class="city-square"></i>{{item.text}}</h3>
                        <span class="city-btn" @click="chooseAddress(2,index)"><i class="fa fa-plus-circle"></i> 选择</span>
                    </div>
                    <ul class="city-query-1" v-show="item.show">
                        <li v-for="(item2,index2) in item.children" v-if="item.children[index2].isChecked != 2">
                            <div class="city-name">
                                <h3 :class="item2.show?'active':''" @click="show_children(item2)"><i class="city-square"></i>{{item2.text}}</h3>
                                <span class="city-btn" @click="chooseAddress(2,index,index2)"><i class="fa fa-plus-circle"></i> 选择</span>
                            </div>
                            <ul class="city-query-2" v-show="item2.show">
                                <li v-for="(item3,index3) in item2.children" v-if="item2.children[index3].isChecked != 2">
                                    <div class="city-name">
                                        <h3>{{item3.text}}</h3>
                                        <span class="city-btn" @click="chooseAddress(2,index,index2,index3)"><i class="fa fa-plus-circle"></i> 选择</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="part" v-cloak>
            <ul class="city-query">
                <li v-for="(item,index) in address" v-if="address[index].isChecked != false">
                    <div class="city-name">
                        <h3 :class="item.show?'active':''" @click="show_children(item)"><i class="city-square"></i>{{item.text}}</h3>
                        <span class="city-btn" @click="chooseAddress(false,index)"><i class="fa fa-minus-circle"></i> 移除</span>
                    </div>
                    <ul class="city-query-1" v-show="item.show">
                        <li v-for="(item2,index2) in item.children" v-if="item.children[index2].isChecked != false">
                            <div class="city-name">
                                <h3 :class="item2.show?'active':''" @click="show_children(item2)"><i class="city-square"></i>{{item2.text}}</h3>
                                <span class="city-btn" @click="chooseAddress(false,index,index2)"><i class="fa fa-minus-circle"></i> 移除</span>
                            </div>
                            <ul class="city-query-2" v-show="item2.show">
                                <li v-for="(item3,index3) in item2.children" v-if="item2.children[index3].isChecked != false">
                                    <div class="city-name">
                                        <h3>{{item3.text}}</h3>
                                        <span class="city-btn" @click="chooseAddress(false,index,index2,index3)"><i class="fa fa-minus-circle"></i> 移除</span>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import address_data from './address.json';
    var address_json = JSON.stringify(address_data)

	export default {
		name:'my_address',
		props:{
			address: {
				type: Array,
				default: function(){
				    return JSON.parse(address_json);
                }
			}
		},
		data: function(){
			return {}
		},
		mounted(){

		},
		methods:{
            show_children: function(item){
                item.show = !item.show
            },
            /**
             * [chooseAddress description]
             * @param  {[number]} index  [description]
             * @param  {[number]} index2 [description]
             * @param  {[number]} index3 [description]
             * @param  type false设置为未选中  2：设置为选中
             * @return
             */
            chooseAddress: function (type,index,index2,index3){

                if(typeof index3 == 'number'){//选中三级地区
                    if(typeof this.address[index].children[index2].children[index3].choose == 'undefined')
                    //设置三级地区选中状态
                        this.address[index].children[index2].children[index3].isChecked = type;
                    //设置二级地区选中状态
                    this.address[index].children[index2].isChecked = this.getAddressChecked(this.address[index].children[index2].children)
                    //设置一级地区选中状态
                    this.address[index].isChecked = this.getAddressChecked(this.address[index].children)
                }else if(typeof index2 == 'number'){
                    //设置此二级地区下所有的三级地区的选中状态
                    for (let i = 0; i < this.address[index].children[index2].children.length; i++) {
                        this.address[index].children[index2].children[i].isChecked = type;
                    }
                    //设置此二级地区的选中状态
                    this.address[index].children[index2].isChecked = type;
                    //一级
                    this.address[index].isChecked = this.getAddressChecked(this.address[index].children)
                }else if(typeof index == 'number'){
                    //设置此一级地区下所有二级 三级地区的选中状态
                    for (let i = 0; i < this.address[index].children.length; i++) {
                        this.address[index].children[i].isChecked = type;
                        for (let i2 = 0; i2 < this.address[index].children[i].children.length; i2++) {
                            this.address[index].children[i].children[i2].isChecked = type;
                        }
                    }
                    //一级
                    this.address[index].isChecked = type;
                }else{
                    return false;
                }
            },
            /**
             * [getAddressChecked description]
             * @param  {[array]} address_chilren [description]
             * @return false：全部未选中  1：部分选中  2：全部选中
             */
            getAddressChecked: function (address_chilren){
                let all_checked = true
                let this_checked = address_chilren[0].isChecked
                for (let i = 0; i < address_chilren.length; i++) {
                    if(this_checked != address_chilren[i].isChecked){
                        all_checked = false
                        break
                    }
                }
                return all_checked?this_checked:1
            }
		}
	}
</script>
<style scoped>
    .part{float: left; width:300px;height:500px;overflow-y: auto}
    .city-query,.city-query ul,.city-query li {list-style: none; padding: 0; margin: 0;}
    .city-query h3 {margin: 0; padding: 0 0 0 30px; font-weight:normal;}
    .city-query h3,.city-query {line-height: 41px;}
    .city-query h3,.city-query .city-btn{cursor:pointer;}
    .city-query-1 h3 {padding-left: 50px;}
    .city-query-2 h3 {padding-left: 70px;}
    .city-query-3 h3 {padding-left: 90px;}
    .city-query .city-name:hover h3{background: #f5f5f5;}
    .city-query .city-name:hover .city-btn{display: block;}
    .city-query li {position: relative;}
    .city-query .city-btn {position: absolute; top: 0; right: 0; padding: 0 16px; display: block; display: none;}
    .city-query .city-btn:hover{background: #e7e7e7;}
    .city-query .city-square {width: 13px; height: 13px; border: 1px solid currentColor; float: left; margin-left: -20px; margin-top:14px; line-height: 11px; position: relative; }
    .city-query .city-square::after,.city-query .city-square::before {content: ""; position: absolute; width: 60%; height: 1px; top: 5px; left: 20%; background: currentColor; transition: all .3s ease;}
    .city-query .city-square::before {transform: rotate(90deg);}
    .city-query h3.active .city-square::before,.city-query h3.active .city-square::after{transform: rotate(180deg);}
    [v-cloak] { display: none }
</style>