<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">粉丝列表</block>
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
		

		<view class="cu-list menu-avatar" >
			<view class="cu-item cur solid-bottom" v-for="(x,index) in followerList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.follower.wxProfile.avatarUrl + ');'"></view>
				<view class="content">
					<view>
						<text class="text-cut">{{x.follower.wxProfile.nickName}}</text>
					</view>
	
				</view>
				<view class="action" style="display: inline;">
					<!-- <view class="text-grey text-xs">{{x.time}}</view> -->
					<view v-if='x.status' class="cu-tag bg-gray radius" @tap="unfollow" :data-id="x.follower.objectId">已关注</view>
					<view v-else  class="cu-tag bg-red radius" @tap="follow" :data-id="x.follower.objectId">关注</view>
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
				followerList: [],
				tempaddr:'http://tedacar.oss-us-east-1.aliyuncs.com/',
				skipnumber:0
			};
		},

		onShow() {
			this.getStatus(0)
			this.subscribe()
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
					this.followerList = []
					this.skipnumber = 0
				}else{
					this.skipnumber+=num
				}
				Parse.Cloud.run('getFollowerList',{
					number:this.skipnumber
				})
				.then( r=>{
					r.map(x=>{
					let y = x._toFullJSON()
					this.followerList.push(y)
					
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
				}).then(r=>{
					this.targetId = r
					this.followerList.map( x=>{
						if(x.follower.objectId==this.targetId){
							x.status = true
						}
					})
					
				}
				)
				
				
			},
			unfollow(e){
				let targetId = e.mp.currentTarget.dataset.id;
				let r = Parse.Cloud.run('unfollow',{
					id: targetId
				}).then( r=>{
					this.targetId = r._toFullJSON().following.objectId
					this.followerList.map( x=>{
						if(x.follower.objectId==this.targetId){
							x.status = false
						}
					})
				}
				)	
			},
			

		}
	}
</script>

<style>


</style>
