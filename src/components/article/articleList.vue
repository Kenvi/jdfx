<template>
  <div class="wapper_content" id="articleList" >
    <div class="block-post-list">
      <h1>文章列表</h1>
      <div class="block-list">
        <div class="hd"><a class="btn btn-primary" v-on:click="createNewArticle()" >添加文章</a></div>
        <div class="bd">
          <table class="table table-sm">
            <thead><tr><th>ID</th><th>分类名</th><th>文章名字</th><th>门槛</th><th>创建时间</th><th>最后修改时间</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="(item,index) in articleList" v-bind:key="item.id" >
                <td v-html="item.id"></td>
                <td v-html="item.groupName"></td>
                <td v-html="item.subject"></td>
                <td v-html="item.threshold"></td>
                <td v-html="item.createTime"></td>
                <td v-html="item.modifyTime"></td>
                <td>
                  <a class="btn-sm btn btn-default" data-toggle="modal" data-target="#delItem" v-on:click="delWarn('id',item.id,item.subject)">删除</a>
                  <a class="btn-sm btn btn-default" v-on:click="updateArticlePage(item.id)" >修改</a>
                  <a class="btn-sm btn btn-default" data-toggle="modal" data-target="#showArticleLink" v-on:click="showArticleLink(item.id,item.userId)">查看网址</a>
                  <!-- <a class="btn-sm btn btn-success" data-toggle="modal" data-target="#pushItem" v-on:click="pushItemTips(item.id,item.subject)">推送</a> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pager v-bind:sum="total" v-bind:page_count="5" v-bind:selected_page="1"></pager>
      </div>
    </div>
  </div>


</template>

<script>
import data from '../../assets/data.js'
import pager from '../pager.vue'

export default {
  name: 'articleList',
  data:function () {
  	return {
			articleList:data.articleList.retData.result,
      total:data.articleList.retData.total
  	}
  },
  components:{
    pager
  },
  methods:{

  }
}
</script>
