<template>
  <div class="wapper_slider">
	  <ul class="slider-menu">
	    <li>
        <router-link to="/" v-bind:class="{'on':selected===1}">
          <p v-on:click="shiftTab(1)"><i class="material-icons md-18">list</i>添加文章</p> 
        </router-link>
      </li>
	    <li>
        <router-link to="/" v-bind:class="{'on':selected===2}">
          <p v-on:click="shiftTab(2)"><i class="material-icons md-18">assignment</i>分类列表</p>
        </router-link>
      </li>
	  </ul>
	</div>

</template>

<script>
// import Hello from './components/Hello'

export default {
  name: 'leftMenu',
  data:function () {
  	return {
			selected:1
  	}	
  },
  methods:{
  	shiftTab:function(index){ // 左边导航栏tab切换 
  		if(index){
  			this.selected = index
        console.log(index)
  			this.$emit('shiftTab',this.selected)
  		}
  	}
  }
}
</script>
<style>
  ul.slider-menu li p{margin-bottom: 0}
</style>