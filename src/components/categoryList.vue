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
      </div>     

    </div>
  </div>



</template>

<script>
import data from '../assets/data.js'

export default {
  name: 'categoryList',
  data:function () {
  	return {
			categoryList:data.groupList.retData.result
  	}	
  },
  methods:{
  	
  }
}
</script>