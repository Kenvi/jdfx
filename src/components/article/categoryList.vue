<template>
  <div class="wapper_content" id="categoryList" >
    <div class="block-category-list">
      <h1>分类列表</h1>
      <div class="block-list">
        <div class="hd"><a class="btn btn-primary" data-toggle="modal" data-target="#addCategory" >添加分类</a></div>
        <div class="bd">
          <table class="table table-sm">
            <thead><tr><th>ID</th><th>分类名</th><th>文章数</th><th>是否可见</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="(item,index) in categoryList" v-bind:key="item.id">
                <td v-html="item.id"></td>
                <td v-html="item.groupName"></td>
                <td v-html="item.articleCount"></td>
                <td v-html="item.viewable ==='0'?'不可见':'可见'"></td>
                <td>
                  <a class="btn-sm btn btn-default" data-toggle="modal" data-target="#delItem" v-on:click="delWarn('id',item.id,item.groupName)">删除</a>
                  <a class="btn-sm btn btn-default" data-toggle="modal" data-target="#changeCategory" v-on:click="changeCatConfirm(item)">修改</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pager v-bind:sum="total" v-bind:pageCount="5" v-bind:selectedPage="1"></pager>
      </div>

    </div>
  </div>



</template>

<script>
import data from '../../assets/data.js'
import pager from '../pager.vue'
import $ from 'jquery'
import 'vue-resource'

export default {
  name: 'categoryList',
  data:function () {
  	return {
			categoryList:data.groupList.retData.result,
			total:data.groupList.retData.total
  	}
  },
  created:function(){
    // this.$http.post('/index.php/pcViews/getUserGroupList',{pageIndex:1,pageSize:10,isGetTotal:1}).then(function(res){
    //   console.log(res.body);
    // })
    var _self = this
    $.ajax({
        url:"http://share.mofor.cn/index.php/pcViews/getUserGroupList",
        data:{pageIndex:1,pageSize:10,isGetTotal:1},
        type:"POST",
        dataType:'jsonp',
        success:function(res){
            if(res.retCode === '1'){
                _self.categoryList = res.retData.result;
                _self.total = res.retData.total;
                console.log(_self.categoryList)
            }else{
                // _self.showTooTips(res.retMsg);                        
            }
        },
        error:function(){
            // _self.showTooTips("提交失败！");
        }
    });

  },
  components:{
    pager
  },
  methods:{
    getCatList:function(opts){//获取类别列表
      var ajaxData = {};
      if(opts){
        ajaxData = opts;
      }
      $.ajax({
          url:"/index.php/pcViews/getUserGroupList",
          data:ajaxData,
          type:"POST",
          dataType:'json',
          success:function(res){
              if(res.retCode === '1'){
                  vm.categoryList = res.retData.result;
                  vm.total = res.retData.total;
                  console.log(res)
              }else{
                  vm.showTooTips(res.retMsg);                        
              }
          },
          error:function(){
              vm.showTooTips("提交失败！");
          }
      });
    }
  }
}
</script>
