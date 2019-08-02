<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">聊天</block>
		</cu-custom>

		<!-- 聊天列表 -->
		<!-- <view class="cu-list menu-avatar" @tap="jump('chatDetail')">
			<view class="cu-item cur" v-for="(x,index) in chatList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.url + ');'"></view>
				<view class="content">
					<view><text class="text-cut">{{x.name}}</text>
					</view>
					<view class="text-gray text-sm flex"> <text class="text-cut">{{x.desc}}</text></view>
				</view>
			</view>
		</view> -->
		

		<view class="cu-list menu-avatar" @tap="jump()">
			<view class="cu-item cur solid-bottom" v-for="(x,index) in chatList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.url + ');'"></view>
				<view class="content">
					<view>
						<text class="text-cut">{{x.name}}</text>
					</view>
					<view class="flex">
						<text class="text-cut text-gray text-sm">{{x.desc}}</text>
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
			};
		},

		onLoad() {
			this.chatList = data.chatList
			// console.log(this.chatList);
			console.log("Conversation Id: ", this.convoId);
		},

		computed: {
			...mapState(['convoId']),    // Load from state	
		},
		
		methods: {

			jump() {
				// Create conversation if not existed yet
				if (!((this.user1 + this.user2) in this.convoId)) {
					console.log("New conversation");
					
					Parse.Cloud.run('createConversation', {user1 : this.user1, user2 : this.user2}).then( r => {
						this.cId = r;
						console.log("Conversation id: ", this.cId);
						
						// Assign conversation id to user pair
						this.$store.commit('setConvoId', {
							user1 : this.user1,
							user2 : this.user2,
							convoId : this.cId
						});		
					}).catch( e => {
						console.log(e);
					})
					
				} else {
					console.log("Return conversation");
					
					this.cId = this.convoId[this.user1 + this.user2];
					
					console.log("Conversation id: ", this.cId);
				}

				
				
				// Add message (user2 -> user1)
				// let curUser1 = this.user1;
				// let curUser2 = this.user2;
				// let currentConversationId = this.convoId[curUser2 + curUser1];
				// console.log("Current conversation id: ", currentConversationId);
				// 
				// Parse.Cloud.run('addMessage', {message: this.message, conversationId: currentConversationId, sender: this.user1}).then( r => {
				// 	console.log(r);
				// }).catch( e => {
				// 	console.log(e);
				// })
				
				// Show conversations
				// let curUser1 = this.user1;
				// let curUser2 = this.user2;
				// let currentConversationId = this.convoId[curUser2 + curUser1];
				// 
				// Parse.Cloud.run('showMessage', {conversationId: currentConversationId, host: this.user1}).then( r => {
				// 	console.log(r);
				// }).catch( e => {
				// 	console.log(e);
				// })
				
				
				// 在产品详情页面，想要看任何功能都要先登录
				//this.$store.commit('needLogin')
				uni.navigateTo({
					url:'../chatDetail/chatDetail?user1=' + this.user1 + '&user2=' + this.user2
				});
			}
		}
	}
</script>

<style>


</style>
