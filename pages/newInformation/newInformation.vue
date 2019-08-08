<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">消息通知</block>
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
		

		<view class="cu-list menu-avatar" style="background-color:#EBD4EF">
			<view class="cu-item cur solid-bottom" v-for="(x,index) in newsList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.targetuserPointer.wxProfile.avatarUrl + ');'"></view>
				<view class="content">
					<view>
						<text class="text-cut">{{x.targetuserPointer.wxProfile.nickName}}</text>
					</view>
	
				</view>
				<view class="action" style="display: inline;">
					<view v-if='x.status' class="text-red text-xs">{{x.time}}</view>
					<view v-else class="text-gray text-xs">{{x.time}}</view>
					<view v-if='x.eventPointer' class="cu-tag bg-gray radius" @tap="toDetail" :data-id="x.eventPointer.objectId">{{x.targetName}}</view>
					<view v-else  class="cu-tag bg-gray radius" >用户关注</view>
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
				newsList: [],
				tempaddr:'http://tedacar.oss-us-east-1.aliyuncs.com/',
				skipnumber:0,
			};
		},

		onShow() {
			this.getStatus(0)
		},

		
		onReachBottom: function() {
			this.getStatus(10)
		},
		
		
		onPullDownRefresh: function (){
			this.getStatus(0)
		},
		methods: {
			getStatus(num){
				if(num==0){
					this.newsList = []
					this.skipnumber = 0
				}else{
					this.skipnumber+=num
				}
				Parse.Cloud.run('getNews',{
					number:this.skipnumber
				})
				.then( r=>{
					r.map(x=>{
					let y = x._toFullJSON()
					let t =  new Date(y.createdAt);
					y.time = t.toLocaleString();
					this.newsList.push(y)
					
					});
				}).catch(e => {
					this.followerList=[]
				console.log('????' + JSON.stringify(e));
				});
				
			},
			
			follow(e){
				let targetId = e.mp.currentTarget.dataset.id;
				let r = Parse.Cloud.run('follow',{
					id: targetId
				}).then()
				this.getStatus()
			},
			unfollow(e){
				let targetId = e.mp.currentTarget.dataset.id;
				let r = Parse.Cloud.run('unfollow',{
					id: targetId
				}).then()
				this.getStatus()
				
			},
			
			toDetail(e) {
				console.log('e' + JSON.stringify(e));
				let id = e.mp.currentTarget.dataset.id;
				uni.navigateTo({
					url: `../communityDetail/communityDetail?id=${id}`
				});
			},
			

		}
	}
</script>

<style>


</style>
