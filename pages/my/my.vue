<template>
 <div class="my">
  <cu-custom bgColor="bg-teda" :isBack="true">
   <block slot="backText">{{i18n.commonBack}}</block>
   <block slot="content">{{i18n.myTitle}}</block>
  </cu-custom>

  <div class="main">
   <!-- 个人资料 -->
   <!-- <view class="cu-bar margin-bottom-sm bg-white solid-bottom" style="padding: 20upx 0;">

    <view class="action">
     <view class="cu-avatar lg round" :style="'background-image:url(' + wxProfile.avatarUrl + ')'"></view>
    </view>

    <div class="name">
     {{wxProfile.nickName}}
    </div>

    <view class="action"><button class="cu-btn bg-green shadow" @tap="jump('information')">{{i18n.editUserInfo}}</button></view>
   </view> -->
   <!-- <view class="bg-white padding">
    <view class="grid margin-bottom text-center" v-for="(item,index) in 5" :key="index" :class="'col-' + (index+1)">
     <view class="padding" :class="indexs%2==0?'bg-cyan':'bg-blue'" v-for="(item,indexs) in (index+1)*2" :key="indexs">{{indexs+1}}</view>
    </view>
   </view>
     -->
   <!-- <view class="cu-list menu-avatar">
    <view class="cu-item">
     <view class="cu-avatar round lg" :style=" 'background-image:url('+userInfo.wxProfile.avatarUrl+');'"></view>
     <view class="content" style="width: calc(100% - 140upx)">
      <view>
       <text class="text-cut margin-top-sm">{{userInfo.wxProfile.nickName}}<text class='cu-tag radius text-teda text-sm margin-left-xs'>认证用户/商家</text></text>
      </view>
      <view class="grid margin-bottom text-center" v-for="(item,index) in 2" :key="index" :class="'col-' + (index+1)">
       <view class="padding" :class="indexs%2==0?'bg-cyan':'bg-blue'" v-for="(item,indexs) in (index+1)*2" :key="indexs">{{indexs+1}}</view>
      </view>
     </view>
    </view>
   </view>
 -->

	<view class="cu-list menu-avatar">
		<view class="cu-item">
			<view class="cu-avatar round lg" :style=" 'background-image:url('+userInfo.wxProfile.avatarUrl+');'"></view>
			<view class="content" style="width: calc(100% - 200upx)">
				<view>
					<text class="text-cut margin-top-sm">{{userInfo.wxProfile.nickName}}<text class='cu-tag radius text-teda text-sm margin-left-xs'>认证用户/商家</text></text>
				</view>
				<view class="  padding-top-xs"> 
					<view  class=' cu-avatar sm radius text-black' style="width: 150upx;">
						帖子获赞{{userInfo.likenumber}}
					</view>
					<view class=' cu-avatar sm radius text-black' style="width: 150upx;margin-left: 50upx;" @tap="tofollowerList" :data-id = 'userInfo.objectId'>
						粉丝{{userInfo.follower}}
						<view v-if = 'addStatus' class="cu-tag badge">{{addNumber}}+</view>
					</view>
					<view class=' cu-avatar sm radius text-black' style="width: 150upx;margin-left: 50upx;" @tap="tofollowingList" :data-id = 'userInfo.objectId' >
						关注{{userInfo.following}}
					</view>
				</view>
			</view>
		</view>
   </view>
   <!-- 个人资料 -->
   <!-- <button type="primary" @click="connectMagento()">注册到magento</button>  -->

   <!-- 常用菜单 -->
   <!-- <view class="cu-list col-3 grid sm-border">
    <view class="cu-item" @tap="jump('save')">
     <view class="cuIcon-like">
      <view class="cu-tag badge">
       <block>11</block>
      </view>
     </view>
     <text>{{i18n.myWishlist}}</text>
    </view>
    <view class="cu-item" @tap="jump('order')">
     <view class="cuIcon-form">
      <view class="cu-tag badge">
       <block>11</block>
      </view>
     </view>
     <text>{{i18n.myOrders}}</text>
    </view>
    <view class="cu-item" @tap="jump('address')">
     <view class="cuIcon-addressbook">
      <view class="cu-tag badge">
       <block>11</block>
      </view>
     </view>
     <text>{{i18n.myAddress}}</text>
    </view>
   </view>  -->

   <!-- 常用菜单 -->

   <!-- 列表菜单 -->
   
   <!-- <view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']"> -->
    <view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
      <view class="cu-item arrow" @tap="jump('garage')">
       <navigator class="content" hover-class="none" open-type="redirect" url="">
        <text class="cuIcon-friendadd text-black"></text>
        <text class="text-grey">我的车辆</text>
       </navigator>
      </view>

      <view class="cu-item arrow" @tap="jump('chat')">
       <navigator class="content" hover-class="none" open-type="redirect" url="">
        <text class="cuIcon-write text-black"></text>
        <text class="text-grey">我的聊天</text>
       </navigator>
      </view>

      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('history')">
        <text class="cuIcon-read text-black"></text>
        <text class="text-grey">浏览历史</text>
       </navigator>
      </view>


      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('newInformation')" > 
		<view class="cuIcon-notification text-black" style="padding-left: 10upx;">
		<text class="text-grey" style="padding-left: 15upx;">消息通知</text>
			<view v-if = 'newsStatus' class="cu-tag badge" style='right: 20upx;'>{{newsNumber}}+</view>
		</view>
       </navigator>
      </view>
      
      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('order')">
        <text class="cuIcon-moneybag text-black"></text>
        <text class="text-grey">交易记录</text>
       </navigator>
      </view>

      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('myDetail')">
        <text class="cuIcon-favor text-black"></text>
        <text class="text-grey">我的收藏<text class='text-grey margin-left'>{{userInfo.favornumber}}条</text></text>
       </navigator>
      </view>

      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('')">
        <text class="cuIcon-service text-black"></text>
        <text class="text-grey">联系客服</text>
       </navigator>
      </view>

      <view class="cu-item arrow">
       <navigator class="content" hover-class="none" @tap="jump('')">
        <text class="cuIcon-group text-black"></text>
        <text class="text-grey">关于我们</text>
       </navigator>
      </view>
      
      <view class="cu-item arrow" @tap="jump('setting')">
       <navigator class="content" hover-class="none" open-type="redirect" url="">
        <text class="cuIcon-settings text-black"></text>
        <text class="text-grey">设置</text>
       </navigator>
      </view>
     </view>
    <footMenu :pageUrl="'my'"></footMenu>
   </view>
   <!-- 列表菜单 -->
  </div>

 </div>
</template>

<script>
 import Parse from '../../common/parse.js'
 import data from '@/common/data.js'
 import {
  get,
  toLogin,
  login
 } from '../../utils';
 
 
 
 
 
 
 
 
 export default {
  // onShow() {
  //  console.log('开始检查登录情况');
  //  this.$store.commit('needLogin');
  //  this.wxProfile = this.$store.state.wxProfile
  // },
  onShow(){
   this.getuserStatus();
   this.getUpdateNews();
   // this.getUpdateFollower();
  
  },
  created() {},
  mounted() {},

  data() {
   return {
    four: [],
    userInfo: {},
    avator: '',
    allcheck: false,
    listData: [],
    Listids: [],
	addNumber:'',
	addStatus:'',
	newsNumber:0,
 	newsStatus:'',
	addFollowerNumber:0
	
	
    
   };
  },
  
// 
  methods: {
   
   getuserStatus(){
	   
	
	this.addStatus = false
	this.newsStatus = false
    Parse.Cloud.run('userInfo')
    .then(r=>{
		let y = r._toFullJSON()
		// if(this.userInfo == null){
		this.userInfo = y
		// }else{
		// 	this.addNumber = y.follower - this.userInfo.follower
		// 	this.userInfo = y
		// 	if(this.addNumber > 0 ){
		// 		this.addStatus = true
		// 	}else{
		// 		this.addStatus = false
		// 	}
		// }
		this.newsNumber = this.userInfo.number
		if(this.newsNumber>0)
		this.newsStatus = true
     
     
    }).catch( e => {
		console.log('??????????登录失败');
		})
    
   },
   
  //  getUpdateFollower(){
	 //    
	 //    let query = new Parse.Query('UserInfo');
		// let subscription = query.subscribe();
	 //   	subscription.on('update', (object)=>{
		// 	object = object._toFullJSON()
		// 	console.log('gada'+object.user.objectId)
		// 	if(this.userInfo.objectId == object.user.objectId){
		// 	this.addNumber = object.follower - this.userInfo.follower
		// 	if(this.addNumber > 0 ){
		// 		this.addStatus = true
		// 	}else{
		// 		this.addStatus = false
		// 	}
		// 	// this.addNumberTwo = object.get('following') - this.userInfo.following
	 //   		this.userInfo.likenumber = object.like
	 //   		this.userInfo.follower = object.follower
	 //   		this.userInfo.following = object.following
		// 	}
	 //   		
	 //   	})
		// // subscription.unsubscribe();
		// // Parse.LiveQuery.close();
		// 
		// 
		// 
	 //   
  //  },
   
   getUpdateNews(){
		
		let queryNews = new Parse.Query('News');
		let subscriptionNews = queryNews.subscribe();
		console.log('gdafgar')
		subscriptionNews.on('open', ()=>{
			console.log('aseragga')
			})
		subscriptionNews.on('create', (object)=>{
			console.log('gargdgaga'+JSON.stringify(object))
				let x = object._toFullJSON()
				if(this.userInfo.objectId == x.user.objectId){
					this.newsNumber = x.number
					console.log('fadsta'+this.newsNumber)
					this.newsStatus = true
				}else{
					this.newsStatus = false
				}
				
			
			
			
		})
		
		},
		
	
   
   connectMagento() {
    
    let Uid = Parse.User.current().toJSON().authData.weapp.id
    Parse.Cloud.run('customers', {
      id: Uid
     })
     .then(r => console.log('r' + JSON.stringify(r)))
     .catch(e => console.log('e' + JSON.stringify(e)))
   },
   
   jump(pageName) {
    uni.navigateTo({
     url: `../${pageName}/${pageName}`,
     success: res => {},
     fail: () => {},
     complete: () => {}
    });
   },
   
    tofollowerList(e) {
   	console.log('e' + JSON.stringify(e));
   	let id = e.mp.currentTarget.dataset.id;
   	uni.navigateTo({
   		url: `../followerList/followerList?id=${id}`
   	});
   },
   tofollowingList(e) {
   	console.log('e' + JSON.stringify(e));
   	let id = e.mp.currentTarget.dataset.id;
   	uni.navigateTo({
   		url: `../followingList/followingList?id=${id}`
   	});
   },
   
   
   changeLanguage(e) {
    // console.log('修改语言' + e.target.value);
    if (e.target.value) {
     this.$store.commit('setLang', 'zh-CN')
     console.log('切换为中文');
    } else {
     console.log('切换为英文文');
     this.$store.commit('setLang', 'en-US')
    }
    console.log('this.$store.state.lang' + JSON.stringify(this.$store.state.lang));
    this.$i18n.locale = this.$store.state.lang
   },
  },
  computed: {}
 };
 

</script>
<style scoped>
 .uni-list-cell-navigate img {
  width: 30upx;
  height: 30upx;
 }

 .uni-list-cell-navigate {
  justify-content: start;
 }
</style>