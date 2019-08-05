<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" @click="jump('my')">
				<view v-if="user.wxProfile" class="cu-avatar round" :style="'background-image:url(' + user.wxProfile.avatarUrl + '); margin: 0 ;'"></view>
				<p v-if="user.wxProfile" class="margin-lr">{{ user.wxProfile.nickName }}</p>
				<div v-if='item.followSign' class="cu-tag bg-gray radius" @click='unfollow'>已关注</div>
				<div v-else class="cu-tag bg-red radius" @click='follow'>关注</div>
			</block>
		</cu-custom>

		<div class="main">
			<!-- 轮播 -->
			<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
				</swiper-item>
			</swiper>
			<!-- 轮播 -->

			<!-- 文章 -->
			<div class="text-black padding bg-white">{{ item.title }}</div>
			<div class="text-black padding bg-white">{{ item.desc }}</div>
			<!-- 文章 -->


			<!-- 评论列表 -->
			<!-- <p>aaa</p> -->
			<Comment v-if="commentInitData.length>0" :initData="commentInitData"></Comment>
			<!-- 评论列表 -->

			<!-- 底部操作条 -->
			<!-- <view class="cu-bar search footer_bar bg-white solid-top">
				<view class="search-form round">
					<text class="cuIcon-edit"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="说点什么..." confirm-type="search"></input>
				</view>
				
				<view class="action">
					<text class="cuIcon-like"></text>
					
				</view>
				<view class="action margin-right">
					<text class="cuIcon-favor"></text>
					
				</view>
				<view class="action">
					<text class="cuIcon-comment"></text>
					
				</view>
			</view> -->
			<!-- 底部操作条 -->
			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item">
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
					<view class="content">
						<view class="text-grey">莫甘娜</view>
						<view class="text-gray text-content text-df">
							凯尔，你被自己的光芒变的盲目。
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view>凯尔：</view>
								<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">2018年12月4日</view>
							<view>
								<text class="cuIcon-appreciatefill text-red"></text>
								<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
							</view>
						</view>
					</view>
				</view>

				<view class="cu-item">
					<view class="cu-avatar round" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
					<view class="content">
						<view class="text-grey">凯尔</view>
						<view class="text-gray text-content text-df">
							妹妹，如果不是为了飞翔，我们要这翅膀有什么用?
						</view>
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view>莫甘娜：</view>
								<view class="flex-sub">如果不能立足于大地，要这双脚又有何用?</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">2018年12月4日</view>
							<view>
								<text class="cuIcon-appreciate text-gray"></text>
								<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
							</view>
						</view>
					</view>
				</view>
			</view>

		</div>
	</view>
</template>

<script>
	import Parse from '../../common/parse.js';
	import Comment from '../../components/comment.vue';
	export default {
		components: {
			Comment
		},
		data() {
				
			return {
				item: {},
				user: {},
				commentInitData: {},
				locationId:'', 
				InputBottom: 0,
				swiperList: [],
				TabCur: 0,
				scrollLeft: 0,
				tags: [],
				cardData: [],
			
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.locationId = this.$root.$mp.query.id;
			this.getDetail();
			
		},
		methods: {
			
			 getDetail() {
				
				console.log('jznvoia'+JSON.stringify(this.idlist));
				let r =  Parse.Cloud.run('getStatusDetail', {
					id: this.locationId ,
				}).then(r => {
					this.item = r._toFullJSON();
					this.user = r._toFullJSON().user;
					var temp = this.item.image.map( x=>{
						 x = 'https://tedacar.oss-us-east-1.aliyuncs.com/'+x;
						 return x;
					})
					for(let num=0;num<temp.length;num++)
					{   
						let tempt = {}
						tempt.id = num;
						tempt.type = 'image';
						tempt.url = temp[num].toString();
						this.swiperList.push(tempt);
					}
					
	
					this.commentInitData = {
						...this.item,
						targetName: 'Publish' // 规定评论类型
					}; // 把当前页面的信息给子组件
					
					this.$set(item, 'comment', c);
					
					console.log('vuahfouh'+JSON.stringify(this.commentInitData));
					
					
				}
				).catch( e => {
					
				})
				
					
					
               
			},
		follow(){
			
			let r = Parse.Cloud.run('follow',{
				id: this.item.user.objectId
			}).then()
			
		},
		unfollow(){
			
			let r = Parse.Cloud.run('unfollow',{
				id: this.item.user.objectId
			}).then()
			
		},
			
			
			
		}
	};
</script>
