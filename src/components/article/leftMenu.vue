<template>
  <div class="wapper_slider">
	  <ul class="slider-menu">
	    <li><a v-on:click="shiftTab(1)" v-bind:class="{'on':selected===1}"><i class="material-icons md-18">list</i>文章列表</a></li>
	    <li><a v-on:click="shiftTab(2)" v-bind:class="{'on':selected===2}"><i class="material-icons md-18">assignment</i>分类列表</a></li>
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
  			this.$emit('shiftTab',this.selected)
  		}
  	}
  }
}
</script>