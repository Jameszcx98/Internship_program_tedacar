<template>
	<view>
		<cu-custom bgColor="bg-teda" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">品牌详情</block>
		</cu-custom>

		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper>

		<!-- 汽车车系、价格 -->
		<view class="cu-bar bg-white">
			<view class="">
				<view class="padding-left padding-tb-xs">
					<text class="">奥迪 A8L</text>
				</view>
				<view class='text-gray text-sm padding-left padding-bottom-xs'>指导价：85.68-122.08万</view>
			</view>
		</view>

		<!-- 年份 -->
		<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in yearList" :key="index" @tap="tabSelect"
			 :data-id="index">
				{{item.year}}
			</view>
		</scroll-view>

		


		<!-- 每一年车类 -->
		<view class="cu-bar bg-white">
			<view class='text-gray text-sm padding-left padding-bottom-xs'>2.0升 涡轮增压 178马力</view>
		</view>
		<view class="cu-bar bg-white" v-for="(x,index) in brandList2" :key="index">
			<view class="">
				<view class="padding-left padding-tb-xs">
					<text class="">{{x.name}}</text>
				</view>
				<view class='text-gray text-sm padding-left padding-bottom'>指导价：{{x.price}}万</view>
			</view>
		</view>

		<!--  测试  -->















		<view class="cu-bar" style="margin-bottom: 100upx;"></view>
	</view>
</template>

<script>
	import data from '@/common/data.js'
	import Parse from '../../common/parse.js'
	export default {
		data() {
			return {
				brandList2: [],
				TabCur: 0,
				yearList: [],
				scrollLeft: 0,
				swiperList: []
			};
		},

		onLoad() {
			this.swiperList = data.swiperList
			this.brandList2 = data.brandList2
			this.yearList = data.yearList
		},

		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},

			pay() {
				// Parse.Cloud.run('pay').then( r => {
				// 	console.log('r' + JSON.stringify(r));
				// }).catch( e => console.log('e' + JSON.stringify(e))	)
				this.launchGroupBuy('test1')
			},
			launchGroupBuy(sku) {
				Parse.Cloud.run('newGroupBuy', {
					sku: sku
				}).then(r => {
					console.log(r);
				}).catch(e => console.log('e' + JSON.stringify(e)))
			},

			scrollLeft(e) {
				console.log('e' + JSON.stringify(e));
			},
			async getStock() {
				let s = await Parse.Cloud.run('getItemStock', {
					sku: 'test1'
				}).then()
				this.stock = s.qty
				console.log('库存' + JSON.stringify(this.stock));
			},

			async getGroupBuy() {

				let r = await new Parse.Query('Pin')
					.include('user').equalTo('itemSku', 'test1').find().then()

				console.log('r' + JSON.stringify(r));

				this.groupBuys = r.map(x => {
					return {
						nickName: x.toJSON().user.wxProfile.nickName,
						avatarUrl: x.toJSON().user.wxProfile.avatarUrl,
					}
				})
			},

			async getItemDetail() {
				let r = await Parse.Cloud.run('Gproducts', {
					sku: 'test1'
				}).then()
				console.log(r);
				this.x = r.products.items[0]

			},

			showModal(e) {
				this.modalName = e;
			},
			hideModal(e) {
				this.modalName = null;
			},
			jump(x) {
				// 在产品详情页面，想要看任何功能都要先登录

				//this.$store.commit('needLogin')

				uni.redirectTo({
					url: `../${x}/${x}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},

		onShareAppMessage: function(options) {
			var that = this;
			// 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: "Wudi 微信小程序商城Demo", // 默认是小程序的名称(可以写slogan等)
				success: function(res) {
					// 转发成功之后的回调
					if (res.errMsg == 'shareAppMessage:ok') {}
				},
				fail: function() {
					// 转发失败之后的回调
					if (res.errMsg == 'shareAppMessage:fail cancel') {
						// 用户取消转发
					} else if (res.errMsg == 'shareAppMessage:fail') {
						// 转发失败，其中 detail message 为详细失败信息
					}
				},
				complete: function() {
					// 转发结束之后的回调（转发成不成功都会执行）
				}
			};
			return shareObj
		}
	};
</script>

<style scoped>
	.desc image {
		width: 100%;
	}
</style>
