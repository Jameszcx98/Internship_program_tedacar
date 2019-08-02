<template>
	<view>
		<cu-custom bgColor="bg-teda" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">我的车辆</block>
		</cu-custom>

		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item">
				<view class="content padding-tb-sm">
					<view>
						<text class="text-blue margin-right-xs"></text>下一辆车</view>
					<view class="text-gray text-sm">
						<text class="margin-right-xs"></text>添加你的心愿车辆，可获取声望值</view>
				</view>
				<view class="action">
					<view class="flex flex-wrap justify-between align-center bg-white">
						<button class="cu-btn block line-blue round">图标</button>
					</view>
				</view>
			</view>
		</view>

		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" @tap="naveTo">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper>
		<!-- 轮播图 -->
		
		
		
		<!-- 车辆列表 -->
		<view class="cu-card article margin-bottom" :class="isCard?'no-card':''" @tap="jump('goods')">
			<view class="cu-item shadow " v-for="(item,index) in carlist" :key="index">
				<view class="content margin-top">
					<image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqDfub7Uq-J3NP0B88VHIdTQWlUtOygTBgnnJ53UpFS2sqgvm"></image>
					<view class="desc">
						<view class="text-black ">{{item.name}}</view>
						<view class="text-black">{{item.desc}}</view>
						<!--购物车符号-->
						<div>
							<div>
								<view class="text-gray text-xs">{{item.dist}}</view>
								<view class="text-black">{{item.price}}</view>
							</div>
							<!-- <text class="cuIcon-cart text-black"></text> -->
						</div>
						<!--购物车符号-->
						<view>
							<view class="cu-tag bg-teda sm text-white">一成购</view>
							<text class="padding-left-xs text-teda text-sm">{{item.monthpay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 车辆列表 -->
		
		
		
		
		
		<!-- 发现同系车友 -->
		<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
			<view class="cu-item" :class="menuArrow?'arrow':''">
				<view class="content">
					<text class="text-grey text-sm">发现60位同系车友</text>
				</view>
				<view class="">
					<view class="cu-avatar-group">
						<view class="cu-avatar round xs" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- ／发现同系车友 -->
		<view class="box margin-0 solid-top ">
			<view class="cu-bar bg-white btn-group padding-tb-sm">
				<text class="text-lg"><text class="cuIcon-add text-lg"></text>添加车辆</text>
			</view>
		</view>



		<view class="cu-bar" style="margin-bottom: 100upx;"></view>
	</view>
</template>

<script>
	import data from '@/common/data.js'
	import Parse from '../../common/parse.js'
	export default {
		data() {
			return {
				swiperList: [],
				avatar: [],
				groupBuys: [],
				carlist:[]

			};
			
		},

		onLoad() {
			this.carlist = data.myCarList2
			this.swiperList = data.swiperList
			this.avatar = data.avatar
			this.getMyCarlist()     //writing......
		},


		methods: {
			getCarlist(){
				
				Parse.Cloud.run('getMyCarlist').then(r => {
					console.log("r:",r)
				
				})
					
				.catch(e => {
					console.log("err:" + JSON.stringify(e));
				})
				
			},
			
			
			naveTo() {
				uni.navigateTo({
					url: '../myCar/myCar',
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
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
