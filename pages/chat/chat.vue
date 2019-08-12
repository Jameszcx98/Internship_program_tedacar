<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">聊天</block>
		</cu-custom>
		
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-teda cur':''" v-for="(item,index) in 2" :key="index" @tap="tabSelect" :data-id="index">
					{{Tab[index]}}
				</view>
			</view>
		</scroll-view>

		<!-- 聊天列表 -->
		<!-- <view class="cu-list menu-avatar" @tap="jump('chatDetail')">
			<view class="cu-item cur" v-for="(x,index) in chatList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.following.wxProfile.avatarUrl + ');'"></view>
				<view class="content">
					<view><text class="text-cut">{{x.following.wxProfile.nickName}}</text>
					</view>
					<view class="text-gray text-sm flex"> <text class="text-cut">"聊天的内容"</text></view>
				</view>
			</view>
		</view> -->
		
		

		<view class="cu-list menu-avatar" >
			<view class="cu-item cur solid-bottom" v-for="(x,index) in chatList" :key="index" @tap="toDetail" :data-id="x.friend.objectId">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.friend.wxProfile.avatarUrl + ');'"></view>
				<view class="content">
					<view>
						<text class="text-cut">{{x.friend.wxProfile.nickName}}</text>
					</view>
					<view class="flex">
						<text class="text-cut text-gray text-sm">{{x.chatcontent}}</text>
					</view>
				</view>
				<view class="action" style="display: inline;">
					<view class="text-grey text-xs">{{x.time}}</view>
					<view class="cuIcon-notice_forbid_fill text-gray"></view>
					<view class="cuIcon-top"></view>
					
					
				</view>
				
			</view>
		</view>
		<!-- 聊天列表 -->
		
		<footMenu :pageUrl="'chat'"></footMenu>

	</view>
</template>

<script>
	import data from '@/common/data.js'
	import Parse from '../../common/parse.js'
	import { mapState } from 'vuex';
	
	export default {
		data() {
			return {
				chatList: [],
				user1 : 'User1',
				user2 : 'User2',
				cId: '',    // Conversation id
				message: 'Hey, how are you?',
				skipnumber:0,
				//followingList: [],  
				TabCur: 0,
				scrollLeft: 0,
				Tab:['我关注的','未关注的']
			};
		},

		// onLoad() {
		// 	this.getChatList()
		// 	// this.chatList = data.chatList
		// 	// console.log(this.chatList);
		// 	//this.getStatus(0)
		// 	//console.log("Conversation Id: ", this.convoId);
		// },
		onShow(){
			console.log('gsdrfgf')
			this.getStatus(0)
		},

	
		onReachBottom: function() {
			this.getStatus(10)
		},
		
		
		onPullDownRefresh: function (){
			this.getStatus(0)
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				
				console.log(this.TabCur)
				
				this.chatList = []
				Parse.Cloud.run('getChatList',{
					number:this.skipnumber,
					method:this.TabCur
				})
				.then( r=>{
					r.map(x=>{
					let y = x._toFullJSON()
					this.chatList.push(y)
					console.log("chatList:",JSON.stringify(this.chatList)) //x.following.wxProfile.nickName
					});
				})
				.catch(e => {
				console.log('????' + JSON.stringify(e));
				});
				 
			},
			
			getStatus(num){      //拿关注列表
				if(num==0){
					this.chatList = []
					this.skipnumber = 0
				}else{
					this.skipnumber+=num
				}
				Parse.Cloud.run('getChatList',{
					number:this.skipnumber
				})
				.then( r=>{
					r.map(x=>{
					let y = x._toFullJSON()
					this.chatList.push(y)
					console.log("chatList:",JSON.stringify(this.chatList)) //x.following.wxProfile.nickName
					});
				})
				.catch(e => {
				console.log('????' + JSON.stringify(e));
				});
				 
			},
			
// 			getChatList(){
// 				Parse.Cloud.run('getChatList')
// 				.then(r=>{		
// 			// 		this.userInfo = r._toFullJSON()
// 			// 		this.likenumber = this.userInfo.likenumber
// 					
// 			// 		this.following = this.userInfo.following
// 			
// 					console.log("r:",r)
// 				})
// 				console.log("function running")
// 				let query = new Parse.Query('Message')
// 				let subscription =  query.subscribe()
// 				subscription.on('open', () => {
// 					console.log('subscription opened')
// 				})
// 
// 				subscription.on('create', (object) => {
// 					console.log('object created'+JSON.stringify(object))
// 					
// 				})
// 
// 				subscription.on('update', (object) => {
// 					let strobj = JSON.stringify(object)
// 					console.log('object updated:'+ strobj)
// 					let obj = object._toFullJSON()
// 					console.log("obj:::",obj)   
// 					console.log("obj.to.objectId:(有问题)",obj.to.objectId)   //WyyKaMWhab
// 					console.log("obj.text",obj.text) 
// 					this.chatList[0].desc = obj.text
// 					//obj.to.wxprofile
// 					
// 					//console.log('trxt',object['text'])
// 					
// 				})
// 				
// 			},
// 			
			toDetail(e) {
				console.log('e' + JSON.stringify(e));
				let id = e.mp.currentTarget.dataset.id;
				uni.navigateTo({
					url: `../chatDetail/chatDetail?id=${id}`
				});
			},
// 			jump() {
// 				Parse.Cloud.run('createConversation').then( r => {
// 						
// 						console.log("creating");
// 						
// 					}).catch( e => {
// 						console.log(e);
// 					})
// 				
// 				
// 				
// 				
// 				
// 				// Create conversation if not existed yet
// // 				if (!((this.user1 + this.user2) in this.convoId)) {
// // 					console.log("New conversation");
// // 					
// // 					Parse.Cloud.run('createConversation', {user1 : this.user1, user2 : this.user2}).then( r => {
// // 						this.cId = r;
// // 						console.log("Conversation id: ", this.cId);
// // 						
// // 						// Assign conversation id to user pair
// // 						this.$store.commit('setConvoId', {
// // 							user1 : this.user1,
// // 							user2 : this.user2,
// // 							convoId : this.cId
// // 						});		
// // 					}).catch( e => {
// // 						console.log(e);
// // 					})
// // 					
// // 				} else {
// // 					console.log("Return conversation");
// // 					
// // 					this.cId = this.convoId[this.user1 + this.user2];
// // 					
// // 					console.log("Conversation id: ", this.cId);
// // 				}
// // 
// 				
// 				
// 				// Add message (user2 -> user1)
// 				// let curUser1 = this.user1;
// 				// let curUser2 = this.user2;
// 				// let currentConversationId = this.convoId[curUser2 + curUser1];
// 				// console.log("Current conversation id: ", currentConversationId);
// 				// 
// 				// Parse.Cloud.run('addMessage', {message: this.message, conversationId: currentConversationId, sender: this.user1}).then( r => {
// 				// 	console.log(r);
// 				// }).catch( e => {
// 				// 	console.log(e);
// 				// })
// 				
// 				// Show conversations
// 				// let curUser1 = this.user1;
// 				// let curUser2 = this.user2;
// 				// let currentConversationId = this.convoId[curUser2 + curUser1];
// 				// 
// 				// Parse.Cloud.run('showMessage', {conversationId: currentConversationId, host: this.user1}).then( r => {
// 				// 	console.log(r);
// 				// }).catch( e => {
// 				// 	console.log(e);
// 				// })
// 				
// 				
// 				// 在产品详情页面，想要看任何功能都要先登录
// 				//this.$store.commit('needLogin')
// 				uni.navigateTo({
// 					url:'../chatDetail/chatDetail?user1=' + this.user1 + '&user2=' + this.user2
// 				});
// 			}
		}
	}
</script>

<style>


</style>
