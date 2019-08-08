<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">我的关注</block>
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
			<view class="cu-item cur solid-bottom" v-for="(x,index) in followingList" :key="index">
				<view class="cu-avatar radius lg" :style=" 'background-image:url(' + x.following.wxProfile.avatarUrl + ');'"></view>
				<view class="content">
					<view>
						<text class="text-cut">{{x.following.wxProfile.nickName}}</text>
					</view>
	
				</view>
				<view class="action" style="display: inline;">
					<!-- <view class="text-grey text-xs">{{x.time}}</view> -->
					<view v-if='x.status' class="cu-tag bg-gray radius" @tap="unfollow" :data-id="x.following.objectId">已关注</view>
					<view v-else  class="cu-tag bg-red radius" @tap="follow" :data-id="x.following.objectId">关注</view>
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
				followingList: [],
				tempaddr:'https://tedacar.oss-us-east-1.aliyuncs.com/',
				targetId:'',
				skipnumber:0
			};
		},

		onShow() {
			this.getStatus(0)
		},

		onReachBottom: function() {
			this.getStatus(0)
		},
		
		onPullDownRefresh: function (){
			this.getStatus(0)
			
			
		},
		methods: {
			getStatus(num){
				if(num==0){
					this.followingList = []
					this.skipnumber = 0
				}else{
					this.skipnumber+=num
				}
				Parse.Cloud.run('getFollowingList',{
					number:this.skipnumber
				})
				.then( r=>{
					r.map(x=>{
					let y = x._toFullJSON()
					this.followingList.push(y)
					});
				}).catch(e => {
				console.log('????' + JSON.stringify(e));
				});
				
			},
			
			follow(e){
				let targetId = e.mp.currentTarget.dataset.id;
				let r = Parse.Cloud.run('follow',{
					id: targetId
				}).then( r=>{
					this.targetId = r
					this.followingList.map( x=>{
						if(x.following.objectId==this.targetId){
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
					this.followingList.map( x=>{
						if(x.following.objectId==this.targetId){
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
