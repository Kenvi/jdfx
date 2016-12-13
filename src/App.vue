<template>
  <div id="app" class="wapper_con">
    <!-- <img src="./assets/logo.png"> -->
    <leftMenu v-on:shiftTab="linkTo"></leftMenu>
    <articleList v-show="config.showTab === 1"></articleList>
    <categoryList v-show="config.showTab === 2"></categoryList>
  </div>
</template>

<script>

import Data from './assets/data.js'

import leftMenu from './components/leftMenu'
import articleList from './components/articleList'
import categoryList from './components/categoryList'

export default {
  name: 'app',
  data:function() {
    return {
      data:Data,
      config:{
        showTab:1
      }
    }
  },
  components: {
    leftMenu,
    articleList,
    categoryList
  },
  methods:{
    linkTo:function (index) {
      if(index){
        this.config.showTab = index
      }
    }
  }
}
</script>
<style>
  #app{
    margin: 50px 0;
  }
</style>
