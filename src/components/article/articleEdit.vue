<template>
	<div>
		<div id="editArticle" class="wapper_content">
		  <div class="block-topic-add">
		    <h1 v-html="editArticle.type === 'update' ? '更新主题' : '创建新主题' "></h1>
		    <div class="content row">
		      <div class="col-md-8">        
		        <div class="text-editor">
		          <div class="form-group">
		            <input type="text" class="form-control" placeholder="主题" v-model="editArticle.ajaxData.subject">
		            <span class="ajaxDataSubject hide" v-html="editArticle.ajaxData.subject"></span>
		          </div>        
		          <div class="form-group row">
		            <form id="coverImage"><input type="file" accept = "image/jpeg,image/png" name="coverImg" v-on:change="uploadImage('coverImage',insertCoverImage)"  style="display: none;"></form>
		            <div class="col-md-2"><button class="btn btn-default btn-sm" v-on:click="chooseImage('#coverImage')"><i class="material-icons md-18">insert_photo</i>插入封面</button></div>
		            <div class="col-md-4"><img v-show="editArticle.ajaxData.cover !== ''" v-bind:src="editArticle.fullPath" style="width:100%;"></div>
		            
		          </div>        
		          <div class="form-group" id="addDec">
		            <label for="" class="ant-checkbox-wrapper" v-on:click="decCheck()">
		              <span class="ant-checkbox" v-bind:class="{'ant-checkbox-checked ant-checkbox-checked-1':!editArticle.showDec}"><span class="ant-checkbox-inner"></span><input type="checkbox" class="ant-checkbox-input" value="on"></span>
		              <span>描述</span>
		            </label>
		          </div>                
		          <div class="form-group" v-bind:class="{'hide':editArticle.showDec}">
		            <input type="text" class="form-control" placeholder="描述" v-model="editArticle.ajaxData.description">
		            <span class="ajaxDataDec hide" v-html="editArticle.ajaxData.description"></span>

		          </div>
		          <div class="form-group" id="addIntro">
		            <label for="" class="ant-checkbox-wrapper" v-on:click="introCheck()">
		              <span class="ant-checkbox" v-bind:class="{'ant-checkbox-checked ant-checkbox-checked-1':!editArticle.showIntro}"><span class="ant-checkbox-inner"></span><input type="checkbox" class="ant-checkbox-input" value="on"></span>
		              <span>导语</span>
		            </label>
		          </div> 

		          <div class="form-group form-group-intro" v-bind:class="{'unactive':editArticle.showIntro}">
		            <h4>导语（免费可见内容）</h4>
		            <div class="block-editor">
		              <div class="block-ueditor">
		                <div id="intro" name="content" type="text/plain"  class="edui-default"></div>
		              </div>
		            </div>
		          </div>
		          <div class="form-group">
		            <h4>正文（分享可见）</h4>
		            <div class="block-editor">
		              <div class="block-ueditor">
		                <div id="content" name="content" type="text/plain" class="edui-default"></div>
		              </div>
		            </div> 
		          </div>
		          <div class="form-group articleClassify">
		            <div class="from-select" v-on:click="classifySelected()">
		              <div class="display " v-bind:class="{'display_focus':!editArticle.classify}">
		                <span v-html="editArticle.choiceClassify"></span>
		                <i class="material-icons" v-html="editArticle.classify ? 'keyboard_arrow_down':'keyboard_arrow_up'"></i>
		              </div>
		              <div class="option-wapper " v-bind:class="{'hide':editArticle.classify}">
		                <a v-for="(item,index) in categoryList" class="option"  v-html="item.groupName" v-on:click="switchClassify(item.groupName,item.id)"></a>
		                <a class="option option-add" data-toggle="modal" data-target="#addCategory"><i class="material-icons md-18">add</i>添加分组</a>

		              </div>
		            </div>
		          </div>
		          <div class="form-group ">
		            <div class="from-select" v-on:click="requestSelected()">
		              <div class="display" v-bind:class="{'display_focus':!editArticle.request}">                
		                <span v-html="editArticle.choiceRequest"></span>
		                <i class="material-icons" v-html="editArticle.request ? 'keyboard_arrow_down':'keyboard_arrow_up'"></i>
		              </div>
		              <div class="option-wapper " v-bind:class="{'hide':editArticle.request}">
		                <a class="option" v-on:click="switchRequest('0（无门槛）',0)">0（无门槛）</a>            
		                <a class="option" v-on:click="switchRequest('5积分',5)">5积分</a>            
		                <a class="option" v-on:click="switchRequest('8积分',8)">8积分</a>            
		                <a class="option" v-on:click="switchRequest('12积分',12)">12积分</a>            
		              </div>
		            </div>
		          </div>
		          <div class="form-group" id="addAuthor">
		            <label for="" class="ant-checkbox-wrapper" v-on:click="authorCheck()">
		              <span class="ant-checkbox" v-bind:class="{'ant-checkbox-checked ant-checkbox-checked-1':!editArticle.showAuthor}">
		                <span class="ant-checkbox-inner"></span>
		                <input type="checkbox" class="ant-checkbox-input" value="on">
		              </span>
		              <span>作者</span>
		            </label>
		          </div>        
		          <div class="form-group" v-bind:class="{'hide':editArticle.showAuthor}">
		            <input type="text" class="form-control" placeholder="作者" v-model="editArticle.ajaxData.AuthorName">
		            <span class="ajaxDataAuthor hide " v-html="editArticle.ajaxData.AuthorName"></span>          
		          </div>

		          <div class="row ifRecommend" style="border-top:1px solid #eee;padding-top:15px;">
		            <div class="col-md-6">
		              <div class="form-group" id="recommend">
		                <label for="" class="ant-checkbox-wrapper" v-on:click="recommendCheck()">
		                  <span class="ant-checkbox" v-bind:class="{'ant-checkbox-checked ant-checkbox-checked-1':editArticle.ajaxData.isRecommend==='1'}">
		                    <span class="ant-checkbox-inner"></span>
		                    <input type="checkbox" class="ant-checkbox-input" value="on">
		                  </span>
		                  <span>是否推荐</span>
		                </label>
		              </div>
		            </div>
		            <div class="col-md-6">
		              <div class="form-group" id="showInWechat">
		                <label for="" class="ant-checkbox-wrapper" v-on:click="showInWechatCheck()">
		                  <span class="ant-checkbox" v-bind:class="{'ant-checkbox-checked ant-checkbox-checked-1':editArticle.ajaxData.isShowInWechat==='1'}">
		                    <span class="ant-checkbox-inner"></span>
		                    <input type="checkbox" class="ant-checkbox-input" value="on">
		                  </span>
		                  <span>是否可见</span>
		                </label>
		              </div>
		            </div>
		          </div>

		        
		        </div>
		      </div>

		      <div class="col-md-4">
		        <div  class="rc-dialog-wrap " id="screenView" >
		          <div class="rc-dialog ">
		            <div class="rc-dialog-content">
		              <div class="rc-dialog-body">

		                <div class="iphone-screen" v-bind:class="{'hide':editArticle.preview.pay}">
		                  <div class="block-preivew-one unpay">
		                    <div class="title" v-html="editArticle.ajaxData.subject"></div>
		                    <div class="ctt">
		                      <div class="ct-title" v-html="editArticle.ajaxData.subject"></div>
		                      <div class="ct-time" v-html="editArticle.type==='update'?editArticle.updateUtil.modifyTime:'刚刚'"></div>
		                      <div class="intro" v-html="editArticle.ajaxData.introduction"> </div>
		                    </div>
		                  </div>
		                </div>

		                <div class="iphone-screen " v-bind:class="{'hide':!editArticle.preview.pay}">
		                  <div class="block-preivew-one pay ">
		                    <div class="title" v-html="editArticle.ajaxData.subject"></div>
		                    <div class="ctt">
		                      <div class="ct-title" v-html="editArticle.ajaxData.subject"></div>
		                      <div class="ct-time" v-html="editArticle.type==='update'?editArticle.updateUtil.modifyTime:'刚刚'"></div>
		                      <div class="intro" v-html="editArticle.ajaxData.introduction">   </div>
		                      <div class="content" v-html="editArticle.ajaxData.content"> </div>
		                    </div>
		                  </div>
		                </div>

		                <div class="preview-btns">
		                  <ul class="nav nav-pills nav-stacked">
		                    <li role="presentation" v-bind:class="{'active':!editArticle.preview.pay}"><a href="javascript:;" v-on:click="prevShift('unpay')">分享前内容</a></li>
		                    <li role="presentation" v-bind:class="{'active':editArticle.preview.pay}"><a href="javascript:;" v-on:click="prevShift('pay')">分享后内容</a></li>
		                  </ul>
		                </div>

		              </div>

		            </div>

		            <div style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>

		          </div>
		        </div>
		      </div>

		    </div>
		    <div class="form-group submit-group">
		      <div class="text-editor clearfix">
		        <button class="btn btn-primary btn-lg" v-on:click="editArticleSubmit(editArticle.type)" v-html="editArticle.type === 'update' ? '更新主题' : '发布新主题' "></button>
		        <button class="btn btn-default btn-lg" v-on:click="showPreview()">预览效果</button>
		      </div>
		    </div>
		  </div>
		</div>

		<div id="articlePreview" v-bind:class="{'hide':!editArticle.preview.show}">
		  <div class="rc-dialog-mask"></div>
		  <div  class="rc-dialog-wrap " >
		    <div class="rc-dialog ">
		      <div class="rc-dialog-content">
		        <button aria-label="Close" class="rc-dialog-close-btn btn btn-default" v-on:click="hidePreview()">关闭</button>
		        <div class="rc-dialog-body">

		          <div class="iphone-screen" v-bind:class="{'hide':editArticle.preview.pay}">
		            <div class="block-preivew-one unpay">
		              <div class="title" v-html="editArticle.ajaxData.subject"></div>
		              <div class="ctt">
		                <div class="ct-title" v-html="editArticle.ajaxData.subject"></div>
		                <div class="ct-time" v-html="editArticle.type==='update'?editArticle.updateUtil.modifyTime:'刚刚'"></div>
		                <div class="intro" v-html="editArticle.ajaxData.introduction"> </div>
		              </div>
		            </div>
		          </div>

		          <div class="iphone-screen " v-bind:class="{'hide':!editArticle.preview.pay}">
		            <div class="block-preivew-one pay ">
		              <div class="title" v-html="editArticle.ajaxData.subject"></div>
		              <div class="ctt">
		                <div class="ct-title" v-html="editArticle.ajaxData.subject"></div>
		                <div class="ct-time" v-html="editArticle.type==='update'?editArticle.updateUtil.modifyTime:'刚刚'"></div>
		                <div class="intro" v-html="editArticle.ajaxData.introduction">   </div>
		                <div class="content" v-html="editArticle.ajaxData.content"> </div>
		              </div>
		            </div>
		          </div>

		          <div class="preview-btns">
		            <ul class="nav nav-pills nav-stacked">
		              <li role="presentation" v-bind:class="{'active':!editArticle.preview.pay}"><a href="javascript:;" v-on:click="prevShift('unpay')">分享前内容</a></li>
		              <li role="presentation" v-bind:class="{'active':editArticle.preview.pay}"><a href="javascript:;" v-on:click="prevShift('pay')">分享后内容</a></li>
		            </ul>
		          </div>

		        </div>

		      </div>

		      <div style="width: 0px; height: 0px; overflow: hidden;">sentinel</div>

		    </div>
		  </div>
		</div>
	</div>
</template>
<script>

	import $ from 'jquery'
	import data from '../../assets/data.js'
	require("imports?baidu=>window.baidu,UEDITOR_CONFIG=>window.UEDITOR_CONFIG!../../assets/extend/ueditor/ueditor.all.js") 
	import "../../assets/extend/ueditor/ueditor.config.js"

	export default {
	  name: 'articleEdit',
	  data:function () {
	  	return {
	  		categoryList:data.groupList.retData.result,
				editArticle:{
					type:'create',
					fullPath:'',
					showAuthor:true,
					showDec:true,
					showIntro:true,			
					classify:true,
					choiceClassify:'请选择一个分组',
					request:true,
					choiceRequest:0,
					SelectHide:'',
					preview:{
						show:false,
						pay:false
					},
					updateUtil:{
						modifyTime:''
					},
					ajaxData:{
						id:'', // 文字id（更新用）
						subject:'', //文章标题
						groupId:'', // 组别id
						AuthorName:'', //	作者名字(非必须)
						introduction:'', //导语(免费可见内容)
						content:'', //正文内容(需要门槛可见内容)
						threshold:0, //门槛(积分)
						cover:'', //封面图片
						description:'', //描述(非必须)
						isRecommend:'0', //是否推荐
						isShowInWechat:'0' // 是否可见
					}
				},
				config:{
					selected:'editArticle' , // 页面刷新保留当前选择tab，否则默认选中左边导航栏tab1
					pageCount:10 , //分页器每页显示个数
					selectedPage: 1 // 默认分页器选中第一页
				}
	  	}
	  },
	  created:function(){
	  	var _slef = this;

		  UE.getEditor('intro', { // 导语编辑框
		    toolbars: [
		      [
            'fullscreen', 'source', '|', 'undo', 'redo', '|',
            'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
            'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
            'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
            'directionalityltr', 'directionalityrtl', 'indent', '|',
            'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
            'link', 'unlink',  '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
            'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music','spechars'
	        ]
		    ],
		    autoHeightEnabled: true,
		    autoFloatEnabled: true,
		    initialFrameHeight:200, // 设置编辑器高度
		    elementPathEnabled:false // 隐藏元素路径
			});

	    UE.getEditor('content', {// 内容编辑框
		    toolbars: [
		      [
	          'fullscreen', 'source', '|', 'undo', 'redo', '|',
	          'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc', '|',
	          'rowspacingtop', 'rowspacingbottom', 'lineheight', '|',
	          'customstyle', 'paragraph', 'fontfamily', 'fontsize', '|',
	          'directionalityltr', 'directionalityrtl', 'indent', '|',
	          'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'touppercase', 'tolowercase', '|',
	          'link', 'unlink',  '|', 'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
	          'simpleupload', 'insertimage', 'emotion', 'scrawl', 'insertvideo', 'music','spechars'
	        ]
		    ],
		    autoHeightEnabled: true,
		    autoFloatEnabled: true,
		    initialFrameHeight:350, // 设置编辑器高度
		    elementPathEnabled:false // 隐藏元素路径			    

			});

			UE.getEditor('intro').addListener('contentChange',function(){
			    _slef.editArticle.ajaxData.introduction = UE.getEditor('intro').getContent(); //获取导语编辑器内容
			});
			UE.getEditor('content').addListener('contentChange',function(){
			    _slef.editArticle.ajaxData.content = UE.getEditor('content').getContent(); //获取正文编辑器内容
			});

	  	$('body').on('click',function(){
	  		_slef.checkSelectHide(_slef.SelectHide);
	  	})

	  	$(window).scroll(function(){
	  		var scrollTop = $(window).scrollTop(),
	  				bodyHeight = $('body').height()-250;
	  		if(scrollTop>200 ){
	  			$('#screenView').css({'top':$(window).scrollTop()-180})
	  		}else{
	  			$('#screenView').css({'top':20})
	  		}
	  	})
	  },
	  
	  methods:{
	  	insertCoverImage:function(res){
	  		this.editArticle.ajaxData.cover = res.url;
	  		this.editArticle.fullPath = res.fullPath;
	  	},
	  	authorCheck:function(){
	  		if(this.editArticle.showAuthor){
	  			this.editArticle.showAuthor = false;
	  		}else{
	  			this.editArticle.showAuthor = true;
	  		}
	  	},
	  	decCheck:function(){
	  		if(this.editArticle.showDec){
	  			this.editArticle.showDec = false;
	  		}else{
	  			this.editArticle.showDec = true;
	  		}
	  	},
	  	introCheck:function(){
	  		if(this.editArticle.showIntro){
	  			this.editArticle.showIntro = false;
	  		}else{
	  			this.editArticle.showIntro = true;
	  		}
	  	},
	  	classifySelected:function(){
	  		if(this.editArticle.classify){
	  			this.editArticle.classify = false;
	  		}else{
	  			this.editArticle.classify = true;
	  		}
	  		var _slef = this;
	  		setTimeout(function(){_slef.SelectHide = 'hide'},100);

	  	},
	  	switchClassify:function(val,id){
	  		if(val){
	  			this.editArticle.choiceClassify = val;
	  			this.editArticle.ajaxData.groupId = parseInt(id);
	  		}
	  	},
	  	requestSelected:function(){
	  		if(this.editArticle.request){
	  			this.editArticle.request = false;
	  		}else{
	  			this.editArticle.request = true;
	  		}
	  		var _slef = this;
	  		setTimeout(function(){_slef.SelectHide = 'hide'},100);
	  	},
	  	switchRequest:function(val,thresholdId){
	  		if(val){
	  			this.editArticle.choiceRequest = val;
	  			this.editArticle.ajaxData.threshold = parseInt(thresholdId);
	  		}
	  	},
	  	checkSelectHide:function(type){
	  		if(type === 'hide'){
	  			this.hideSelectdOption();
	  		}else{
	  			return;
	  		}
	  	},

	  	hideSelectdOption:function(){
	  		var _slef = this;
	  		if(!_slef.editArticle.classify){
	  			_slef.editArticle.classify = true;
	  		}
	  		if(!_slef.editArticle.request){
	  			_slef.editArticle.request = true;
	  		}
	  		setTimeout(function(){
	  			_slef.SelectHide = '';
	  		},100);				
	  	},
	  	recommendCheck:function(){
	  		if(this.editArticle.ajaxData.isRecommend === '0'){
	  			this.editArticle.ajaxData.isRecommend = '1';
	  		}else{
	  			this.editArticle.ajaxData.isRecommend = '0';
	  		}
	  	},
	  	showInWechatCheck:function(){
	  		if(this.editArticle.ajaxData.isShowInWechat === '0'){
	  			this.editArticle.ajaxData.isShowInWechat = '1';
	  		}else{
	  			this.editArticle.ajaxData.isShowInWechat = '0';
	  		}			
	  	},
	  	editArticleSubmit:function(type){
	  		var _slef = this;
	  		_slef.editArticle.ajaxData.introduction = UE.getEditor('intro').getContent(); //获取导语编辑器内容
	  		_slef.editArticle.ajaxData.content = UE.getEditor('content').getContent(); //获取正文编辑器内容
	  		var data = {
	  			subject:_slef.editArticle.ajaxData.subject, //文章标题
	  			groupId:_slef.editArticle.ajaxData.groupId, // 组别id
	  			AuthorName:_slef.editArticle.ajaxData.AuthorName, //	作者名字(非必须)
	  			introduction:_slef.editArticle.ajaxData.introduction.replace(/(<p><br\/><\/p>)*$/,''), //导语(免费可见内容)
	  			content:_slef.editArticle.ajaxData.content.replace(/(<p><br\/><\/p>)*$/,''), //正文内容(需要门槛可见内容)
	  			threshold:_slef.editArticle.ajaxData.threshold, //门槛(积分)
	  			cover:_slef.editArticle.ajaxData.cover, //封面图片		
	  			recommend:	_slef.editArticle.ajaxData.isRecommend,
	  			viewable:	_slef.editArticle.ajaxData.isShowInWechat
	  		};

	  		if(_slef.editArticle.ajaxData.description === ''){
	  			var dec = UE.getEditor('content').getContentTxt();
	  			data.description = dec.slice(0,54); //如果没有添加描述默认选择正文内容提交
	  		}else{
	  			data.description = _slef.editArticle.ajaxData.description;
	  		}
	  		
	  		if(type){
	  			switch(type){
	  				case 'create' : this.createArticleAjax(data);break;
	  				case 'update' : data.id=this.editArticle.ajaxData.id;this.updateArticleAjax(data);break;
	  			}
	  		}

	  	},
	  	createArticleAjax:function(data){
	  		// this.submitLoading();
				var _slef = this;
				console.log(data)
	  		// $.ajax({
	  		//     url:"/index.php/pcViews/addArticle",
	  		//     data:data,
	  		//     type:"POST",
	  		//     dataType:'json',
	  		//     success:function(res){
	  		//         if(res.retCode === '1'){
	  		//             _slef.showTooTips('创建成功');
	  		//             sessionStorage.selectedTab = 1;
	  		//             setTimeout(function(){window.location.href='/index.php/pcViews/manage?type=articleList';},1500);
	  		//         }else{
	  		//             _slef.showTooTips(res.retMsg);                        
	  		//         }
	  		//     },
	  		//     error:function(){
	  		//         _slef.showTooTips("提交失败！");
	  		//     }
	  		// });
	  	},
	  	updateArticleAjax:function(data){
	  		this.submitLoading();
	  		var _slef = this;
	  		$.ajax({
	  		    url:"/index.php/pcViews/updateArticle",
	  		    data:data,
	  		    type:"POST",
	  		    dataType:'json',
	  		    success:function(res){
	  		        if(res.retCode === '1'){
	  		            _slef.showTooTips('修改成功');
	  		            sessionStorage.selectedTab = 1;
	  		            setTimeout(function(){window.location.href='/index.php/pcViews/manage?type=articleList';},1500);
	  		        }else{
	  		            _slef.showTooTips(res.retMsg);                        
	  		        }
	  		    },
	  		    error:function(){
	  		        _slef.showTooTips("提交失败！");
	  		    }
	  		});
	  	},
	  	hidePreview:function(){
	  		this.editArticle.preview.show = false;
	  		$('body').removeClass('ov-h');
	  	},
	  	showPreview:function(){
	  		this.editArticle.preview.show = true;
	  		$('body').addClass('ov-h');			
	  	},
	  	prevShift:function(type){
	  		if(type){
	  			switch(type){
	  				case 'unpay' : this.editArticle.preview.pay = false;
	  											 break;
	  			  case 'pay' : 	 this.editArticle.preview.pay = true;
	  			  							 break;
	  			}
	  		}
	  	},
	  	chooseImage:function(selecter){
	  		$(selecter).find('input').trigger('click');
	  	},
	  	uploadImage:function(id,cb){
	  		htmlAjaxUpload(id,function(res){
	  			cb(JSON.parse(res))
	  		})
	  	}
	  }
	}
</script>