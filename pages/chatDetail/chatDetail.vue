<template>
	<view style="margin-bottom: 100upx;">
		<!-- Header -->
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">小刚</block>
		</cu-custom>
		<!-- Header -->
		
		
		<!-- Conversation section -->
		<view v-for="(msg, index) in messages" :key="index" class="cu-chat">
		
			<!-- Message by user1 (Host) -->
			<view v-if="msg.sender == 'b7n8SBW7gg'" class="cu-item self">
				<view class="main">
						<view class="date">{{msg.time}}</view>
					<view class="content bg-green shadow">
						<text>{{msg.message}}</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
			
			</view>
			<!-- Message by user1 (Host) -->
			
			<!-- <view class="cu-info round">对方撤回一条消息!</view> -->
			
			
			<!-- Message by user2 (Guest)-->
			<view v-if="msg.sender == 'WyyKaMWhab'" class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="date ">{{msg.time}}</view>
					<view class="content shadow">
						<text>{{msg.message}}</text>
					</view>
				</view>
				
			</view>
			<!-- Message by user2 (Guest)-->
			
			<!-- <view class="cu-info"> -->
				<!-- <text class="cuIcon-roundclosefill text-red "></text> 对方拒绝了你的消息 -->
			<!-- </view> -->
			
			<!-- <view class="cu-info">
				对方开启了好友验证，你还不是他(她)的好友。请先发送好友验证请求，对方验证通过后，才能聊天。
				<text class="text-blue">发送好友验证</text>
			</view> -->
			
			<!-- Send media -->
			<!-- <view class="cu-item self">
				<view class="main">
					<image src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg" class="radius" mode="widthFix"></image>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date"> 13:23</view>
			</view> -->
			<!-- Send media -->
			
			<!-- Send voice message -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action text-bold text-grey">
						3"
					</view>
					<view class="content shadow">
						<text class="cuIcon-sound text-xxl padding-right-xl"> </text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:55</view>
			</view> -->
			<!-- Send voice message -->
			
			<!-- Send location -->
			<!-- <view class="cu-item self">
				<view class="main">
					<view class="action">
						<text class="cuIcon-locationfill text-orange text-xxl"></text>
					</view>
					<view class="content shadow">
						Shanghai, China
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg);"></view>
				<view class="date">13:23</view>
			</view> -->
			<!-- Send location -->
			
			<!-- Translation -->
			<!-- <view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg);"></view>
				<view class="main">
					<view class="content shadow">
						@#$^&**
					</view>
					<view class="action text-grey">
						<text class="cuIcon-warnfill text-red text-xxl"></text> <text class="text-sm margin-left-sm">翻译错误</text>
					</view>
				</view>
				<view class="date">13:23</view>
			</view> -->
			<!-- Translation -->
		</view>
		<!-- Conversation section -->
		
		
		<!-- Send bar -->
		<view class="cu-bar foot input" :style="[{bottom:InputBottom + 'px'}]">
			<view class="action">
				<text class="cuIcon-sound text-grey"></text>
			</view>
			<input v-model="message" class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10"
			 @focus="InputFocus" @blur="InputBlur"></input>
			<view class="action">
				<text class="cuIcon-emojifill text-grey"></text>
			</view>
			<button @tap="send()" class="cu-btn bg-green shadow">发送</button>
		</view>
		<!-- Send bar -->
		

	</view>
</template>

<script>
	import data from '@/common/data.js';
	import Parse from '../../common/parse.js';
	import { mapState } from 'vuex';
	import { constants } from 'fs';

	// Init the subscription of live query
	let query = new Parse.Query('Conversations');
	let subscription = query.subscribe();

	function init(x){
		return subscription.on('open', x);
	}
	
	function getUpdate(x) {
		return subscription.on('create', x);
	}

	

	export default {

		mounted() {
			//获取页面传的参数
			this.user1 = this.$root.$mp.query.user1;
			this.user2 = this.$root.$mp.query.user2;

			this.cId = this.convoId[this.user1 + this.user2];
			console.log("Current conversation id: ", this.cId);
			this.getConversation();
			//this.keepTracking();
		},

		data() {
			return {
				InputBottom: 0,
				isRouterAlive: true,    // Used to reload page
				hostId:'b7n8SBW7gg',
				opId:'WyyKaMWhab',

				cId: '',    // Conversation id
				user1: '',    // Host (me)
				user2: '',    // Guest (him)
				messages: [],    // Messages list from the firebase
				message: '',    // Message to be sent
			};
		},

		onLoad() {
			
		},

		onShow() {
			init(this.callLiveQuery);		
			getUpdate(this.createLiveQuery);
		},

		computed: {
			...mapState(['convoId']),    // Load from state	
		},

		methods: {
			callLiveQuery() {
				console.log("Live query called");
			},
 
			createLiveQuery() {
				console.log("Live query created");
				this.getConversation();
			},

			getConversation() {
				Parse.Cloud.run('getMessage').then( r => {
					this.messages = r;
					console.log("Message List:", this.messages);
					uni.pageScrollTo({
						scrollTop: 250,
						duration: 300
					});
				}).catch( e => {
					console.log(e);
				})
				
				
				
				
				
				
				Parse.Cloud.run('getMessage', {conversationId: this.cId}).then( r => {
					this.messages = r;
					console.log("Message List:", this.messages);
					uni.pageScrollTo({
						scrollTop: 250,
						duration: 300
					});
				}).catch( e => {
					console.log(e);
				})
			},

			keepTracking() {
				Parse.Cloud.run('keepTracking', {conversationId: this.cId}).then( r => {
					// this.messages = r;
					// console.log("Message List:", this.messages);
					console.log("Return thing: ", r);
					
				}).catch( e => {
					console.log(e);
				})
			},
			
			send() {    // Host -> Guest
				// let host = this.user2;
				// let guest = this.user1;
				let toId = 'WyyKaMWhab'  //j
				let fromId = 'b7n8SBW7gg'  //i
				let currentConversationId = this.cId;
				
				Parse.Cloud.run('addMessage', {
					message: this.message,
					conversationId: currentConversationId,
					from: fromId,
					to:toId
					
				}).then( r => {
					console.log(r);
					this.message = '';


				}).catch( e => {
					console.log("Not sent...", e);
				})
			},
			
			
			InputFocus(e) {
				this.InputBottom = e.detail.height;
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			
			jump(x) {
				// 在产品详情页面，想要看任何功能都要先登录
				//this.$store.commit('needLogin')
				console.log('11' + JSON.stringify());
				uni.redirectTo({
					url: `../${x}/${x}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			reload () {
				this.isRouterAlive = false
				this.$nextTick(function () {
					this.isRouterAlive = true
				})
    		},
		}
	}
</script>

<style>
page{
  padding-bottom: 100upx;
}
</style>

