<template>
	<view style="margin-bottom: 100upx;">
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
				chatList: [{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					name: "小明",
					desc: "好的",
					time: "14:09"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/img/champion/Taric.png',
					name: "小方",
					desc: "行，那就明天见",
					time: "12:23"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png',
					name: "小刚",
					desc: "可以可以",
					time: "12:22"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg',
					name: "Mary",
					desc: "bye bye",
					time: "11:49"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
					name: "胡军",
					desc: "谢谢",
					time: "周日"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big107000.jpg',
					name: "余辉",
					desc: "我去吃饭了",
					time: "周六"
				},
				{
					url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big143004.jpg',
					name: "张东",
					desc: "好的下次请教你",
					time: "周三"
				},
				{
					url: '//c6.xinstatic.com/f3/20180601/1624/5b1102b642e94128239.png',
					name: "周经理",
					desc: "好的",
					time: "周一"
				}
			],
				user1 : 'User1',
				user2 : 'User2',
				cId: '',    // Conversation id
				message: 'Hey, how are you?',
			};
		},

		onLoad() {
			this.getChatList()
			// this.chatList = data.chatList
			// console.log(this.chatList);
			//this.getStatus(0)
			//console.log("Conversation Id: ", this.convoId);
		},

		computed: {
			...mapState(['convoId']),    // Load from state	
		},
		
		methods: {
			getChatList(){
				Parse.Cloud.run('getChatList')
				.then(r=>{
					this.userInfo = r._toFullJSON()
					this.likenumber = this.userInfo.likenumber
					this.follower = this.userInfo.follower
					this.following = this.userInfo.following
			
					
				})
				console.log("function running")
				let query = new Parse.Query('ChatInfo')
				let subscription =  query.subscribe()
				subscription.on('open', () => {
					console.log('subscription opened')
				})

				subscription.on('create', (object) => {
					console.log('object created'+JSON.stringify(object))
				})

				subscription.on('update', (object) => {
					console.log('object updated:'+JSON.stringify(object))
					
				})
				
			},
			

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
