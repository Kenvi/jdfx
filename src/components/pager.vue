<template>
  <div class="ft" v-show="setPager()>0">
    <ul class="pagination">
      <li class="previous" v-bind:class="{disabled:config.selectedPage===1}"><a v-on:click="shiftPage('prev')">上一页</a></li>
      <li v-for="n in setPager()" v-bind:class="{active:config.selectedPage===n}"><a v-on:click="shiftPage(n)" v-html="n"></a></li>
      <li class="next " v-bind:class="{disabled:config.selectedPage===setPager()}"><a v-on:click="shiftPage('next')">下一页</a></li>
    </ul>
  </div>
</template>

<script>
  export default{
    name:'pager',
    props:['sum','page_count','selected_page'],
    data(){
      return{
        config:{
          total:this.sum,
          selectedPage: this.selected_page,
          pageCount: this.page_count
        }
      }
    },
    methods:{
      setPager:function () {
        var // 页数,余数
          pageCount = this.config.pageCount , // 设置分页器每页显示条数
          rem = this.config.total % pageCount,
          num = this.config.total / pageCount ;


        if(rem !== 0 ){
          return parseInt(num) + 1 ;
        }else{
          return num;
        }
      },
      shiftPage:function (index) {
        if(typeof index !=='number'){
          switch(index){
            case 'prev' : if(this.config.selectedPage>1) this.config.selectedPage--;break;
            case 'next' : if(this.config.selectedPage<this.setPager()) this.config.selectedPage++;break;
          }
        }else{
          this.config.selectedPage = index;
        }

//        switch(this.config.selected){
//          case 1 : this.getArticleList({pageIndex:vm.config.selectedPage,pageSize:vm.config.pageCount});break;
//          case 2 : this.getCatList({pageIndex:vm.config.selectedPage,pageSize:vm.config.pageCount,isGetTotal:1});break;
//        }
      }
    }
  }
</script>
