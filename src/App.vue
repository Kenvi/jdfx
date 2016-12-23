<template>
  <div class="wapper_con">
    <leftMenu v-on:shiftTab="linkTo"></leftMenu>
    <articleList v-show="config.showTab === 1"></articleList>
    <categoryList v-show="config.showTab === 2"></categoryList>
    <articleEdit v-show="config.showTab === 3"></articleEdit>
  </div>
</template>

<script>

import Data from './assets/data.js'

import leftMenu from './components/article/leftMenu'
import articleList from './components/article/articleList'
import categoryList from './components/article/categoryList'
import articleEdit from './components/article/articleEdit'

export default {
  name: 'app',
  data:function() {
    return {
      data:Data,
      config:{
        showTab:3
      }
    }
  },
  components: {
    leftMenu,
    articleList,
    categoryList,
    articleEdit
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
