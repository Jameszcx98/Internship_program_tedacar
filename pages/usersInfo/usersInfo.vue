<template>
	<view style="margin-bottom: 100upx;">
		<!-- Header -->
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">用户中心</block>
		</cu-custom>
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
							<view class=' cu-avatar sm radius text-black' style="width: 150upx;margin-left: 50upx;" @tap="tofollowerList" :data-id='targetUserId'>
								粉丝{{userInfo.follower}}
								<view v-if = 'addStatus' class="cu-tag badge">{{addNumber}}+</view>
							</view>
							<view class=' cu-avatar sm radius text-black' style="width: 150upx;margin-left: 50upx;" @tap="tofollowingList" :data-id='targetUserId'>
								关注{{userInfo.following}}
							</view>
						</view>
					</view>
				</view>
		</view>
		
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item arrow" @tap="toChatDetail" :data-id='targetUserId'>
			<navigator class="content" hover-class="none" open-type="redirect" url="">
			 <text class="cuIcon-friendadd text-black"></text>
			 <text class="text-grey">聊天</text>
			</navigator>
			</view>
		</view>
	</view>
		
</template>

<script>
	 import Parse from '../../common/parse.js'
	 import data from '@/common/data.js'
	 // import {
	 //  get,
	 //  toLogin,
	 //  login
	 // } from '../../utils';
	 
	export default {
	  // onShow() {
	  //  console.log('开始检查登录情况');
	  //  this.$store.commit('needLogin');
	  //  this.wxProfile = this.$store.state.wxProfile
	  // },
	onShow(){
		this.targetUserId = this.$root.$mp.query.id;
		this.getuserStatus()
	   // this.getUpdateFollower();
	  
	  },
	

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
		addFollowerNumber:0,
		targetUserId:''
		
		
		
		
	   };
	 },
	  
	// 
	  methods: {
	   
	   getuserStatus(){
		Parse.Cloud.run('usersInfo',{
			id:this.targetUserId
		})
		.then(r=>{
			let y = r._toFullJSON()
			this.userInfo = y
			console.log('fafaffa'+JSON.stringify(this.userInfo))
		}).catch( e => {
			console.log('??????????信息获取失败');
			})
		
	   },
	   
		
		
	   
	 //   connectMagento() {
		// 
		// let Uid = Parse.User.current().toJSON().authData.weapp.id
		// Parse.Cloud.run('customers', {
		//   id: Uid
		//  })
		//  .then(r => console.log('r' + JSON.stringify(r)))
		//  .catch(e => console.log('e' + JSON.stringify(e)))
	 //   },
	   
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
	   toChatDetail(e) {
	   	console.log('e' + JSON.stringify(e));
	   	let id = e.mp.currentTarget.dataset.id;
	   	uni.navigateTo({
	   		url: `../chatDetail/chatDetail?id=${id}`
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
