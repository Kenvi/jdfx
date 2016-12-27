<template>
  <div class="wapper_con">
    <leftMenu v-on:shiftTab="linkTo"></leftMenu>
    <articleEdit></articleEdit>
  </div>
</template>

<script>

import Data from './assets/data.js'

import leftMenu from './components/article/leftMenu'
import articleEdit from './components/article/articleEdit'

export default {
  name: 'EditArticle',
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