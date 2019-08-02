<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" @click="jump('my')">
				<view v-if="user.wxProfile" class="cu-avatar round" :style="'background-image:url(' + user.wxProfile.avatarUrl + '); margin: 0 ;'"></view>
				<p v-if="user.wxProfile" class="margin-lr">{{ user.wxProfile.nickName }}</p>
				<div class="cu-tag bg-red radius">关注</div>
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
	<!-- 		<div class="text-black padding bg-white">{{ item.title }}</div>
			<div class="text-black padding bg-white">{{ item.desc }}</div> -->
			<!-- 文章 -->


			<!-- 评论列表 -->
			<!-- <p>aaa</p> -->
			<!-- <Comment :initData="commentInitData"></Comment> -->
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
						<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view>凯尔：</view>
								<view class="flex-sub">妹妹，你在帮他们给黑暗找借口吗?</view>
							</view>
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
			<!-- <footMenu></footMenu> -->
			<view class="cu-bar tabbar footer_bar bg-white my_box_shadow shadow">
				<view @tap="jump('index')">
					<view class="cuIcon-edit" style="display: inline-table;" ></view>
					<input style="display: inline-table;" placeholder=" 说点什么..." />
					<!-- 评论框 -->
				</view>	
				<view class="action" @tap="jump('index')">
					<view class="cuIcon-like " style="display: inline-table;"></view>
				
					<!-- 点赞-->
				</view>
				<view class="action" @tap="jump('index')">
					<view class="cuIcon-favor "></view>
					<!-- 收藏 -->
				</view>
				<view class="action " @tap="jump('categorylist')">
					<view class="cuIcon-comment"></view>
					<!-- 评论 -->
				</view>
		<!-- 	
			<view class="action " @tap="jump('chat')">
				<view class="cuIcon-taxi"></view>
				卖车
			</view>	
			
			<view class="action " @tap="jump('community')">
				<view class="cuIcon-hot"></view>
				侃车
			</view> -->
			
			
			<!-- <view class="action text-red add-action" @click="jump('publish')">
				<button class="cu-btn cuIcon-add bg-bingbang shadow"></button>
				发布
			</view>
			
			<view class="action text-red" @click="jump('cart')">
				<view class="cuIcon-cart"><view class="cu-tag badge">99</view></view>
				购物车
			</view> -->
			<!-- <view class="action " @tap="jump('my')">
				<view class="cuIcon-profile "></view>
				我的
			</view> -->
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

				InputBottom: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					},
					{
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg'
					}
				],
				TabCur: 0,
				scrollLeft: 0,
				tags: [],
				cardData: []
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.getDetail();
		},
		methods: {
			async getDetail() {
				let r = await Parse.Cloud.run('getStatusDetail', {
					id: '9FIRRWHwn1'
				}).then();
				console.log('r' + JSON.stringify(r));
				this.item = r._toFullJSON();
				this.user = r._toFullJSON().user;

				this.commentInitData = {
					...this.item,
					targetName: 'Publish' // 规定评论类型
				}; // 把当前页面的信息给子组件
			}
		}
	};
</script>
