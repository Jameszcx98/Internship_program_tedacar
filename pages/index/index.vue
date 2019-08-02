<template>
	<div class="index">
		<cu-custom bgColor="bg-teda text-white">

			<block slot="content">TedaGroup</block>
		</cu-custom>

		<!-- 搜索 -->
		<view class="cu-bar search bg-teda padding-bottom-sm">
			<view class="search-form margin-top round">
				<text class="cuIcon-search text-gray"></text>
				<input @click="toSearch" :adjust-position="false" type="text" placeholder="家用省油" confirm-type="search"></input>
			</view>
			<view class="padding-right" @tap="naveTo">
				<view class="">
					<text class="cuIcon-filter text-white"></text>
				</view>
				<view class="">
					<text class="text-xs text-white">筛选</text>
				</view>
			</view>
		</view>

		<view class="padding-top-0 padding-left padding-bottom-sm bg-teda solid-bottom">
			<view class='cu-tag round bg-white'>热搜</view>
			<view class='cu-tag round bg-white'>大众</view>
			<view class='cu-tag round bg-white'>捡漏好车</view>
			<view class='cu-tag round bg-white'>付一成开豪车</view>
			<view class='cu-tag round bg-white'>皮实耐用</view>
		</view>
		<!-- 搜索	 -->

		<!-- 轮播图 -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper>
		<!-- 轮播图 -->

		<!-- 热销排行、新车驾到、超值二手、惊喜方案等-->
		<!--<view class="cu-list grid col-4">
			<view class="padding-sm" v-for="(item,index) in five" :key="index">
				<view class="text-red" style="font-size: 70rpx;" :class="'cuIcon-' + item.name"></view>
				<view class="text-gray text-sm">{{item.title}}</view>
			</view>
		</view>-->
		<!-- 热销排行、新车驾到、超值二手、惊喜方案等-->

		<!--  商家特选、车友交易  -->
		<!-- 目前都导航到买车页面 -->
		<view class="cu-list grid col-2 margin-top" @tap="navToCategory">
			<view class="cu-item padding-sm" v-for="(item,index) in three" :key="index">
				<view>
					<image :src="item.url" class="align-center" style="width: 180rpx; height: 100rpx;">
					</image>
				</view>
				<view class="padding-xs">{{item.title}}</view>
				<view class="text-gray text-sm">{{item.desc}}</view>
			</view>
		</view>
		<!--  ／商家特选、车友交易  -->

		<!-- 增值服务（ 2 X 4 col） -->
		<view class="cu-bar bg-white margin-top solid-bottom" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<text class="text-bold padding-left-xs text-teda">增值服务</text>
			</view>
		</view>
		<!-- <view class="cu-list grid col-4">
			<view class="padding-sm" v-for="(item,index) in iconList" :key="index">
				<view class="text-sm padding-bottom">{{item.name}}</view>
			</view>
		</view> -->
		
		<!-- ！！！！目前点击所有icon都去上传估价页面 ！！！！！！！-->
		<view class="cu-list grid" :class="['col-' + gridCol,gridBorder?'':'no-border']" @tap="naveTo">
			<view class="cu-item" v-for="(item,index) in iconList" :key="index" v-if="index<gridCol*2">
				<view :class="['cuIcon-' + item.icon,'text-blue']" >
					<!-- ,'text-' + item.color  去掉颜色 改成蓝色-->
					<view class="cu-tag badge" v-if="item.badge!=0">
						<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
					</view>
				</view>
				<text>{{item.name}}</text>
			</view>
		</view>
		<!-- ／增值服务（ 2 X 4 col） -->

		<!--  我的座驾  -->
		<view class="cu-bar bg-white margin-top solid-bottom" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<text class="text-bold padding-left-xs text-teda">我的座驾</text>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="min-height: auto;" @tap="jump('myCar')">
			<view class="action padding-tb-sm">
				<view class="cuIcon-title text-teda"><text class="padding-left-xs">车辆信息</text></view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<view class="cuIcon-title text-teda"><text class="padding-left-xs">已估值</text></view>
			</view>
		</view>
		<view class="cu-bar bg-white solid-bottom" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<view class="cuIcon-title text-teda"><text class="padding-left-xs">TEDA用车顾问</text></view>
			</view>
		</view>

		<!-- 发帖：用车感受、选车心得等-->
		<!--	<view class="cu-list grid col-2 margin-top">

			<view class="cu-item dynamic" :class="isCard?'no-card':''" v-for="(x,i) in postList" :key="i">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round " :style=" 'background-image:url(' + x.url + ');'"></view>
							<view class="content flex-sub" style="left: 110upx;">
								<view>{{x.name}}</view>
								<view class="text-gray text-sm flex justify-between">
									{{x.time}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content flex padding-left">
						{{x.content}}
					</view>
					<view class="">
						<image :src=x.car mode="aspectFill" class="padding-sm" style="height: 250rpx;width: 400rpx;"></image>
					</view>
					<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
						<view class="bg-img" :class="isCard?'':'only-img'" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"
						 v-for="(item,index) in isCard?9:1" :key="index">
						</view>
					</view> 
					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-attentionfill margin-lr-xs"></text> 10
						<text class="cuIcon-appreciatefill margin-lr-xs"></text> 20
						<text class="cuIcon-messagefill margin-lr-xs"></text> 30
					</view>  
				</view>
			</view>

		</view>-->
		<!-- ／发帖：用车感受、选车心得等-->

		<!-- 资讯头条 -->
		<!-- <view class="cu-bar bg-white margin-bottom" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<text class="text-bold padding-right" style="font-style: italic;">头条</text>
				<text class="text-sm padding-right text-teda">资讯</text>
				<text class="text-sm">秒变老司机！这3辆车能带给你足够的驾驶体验！</text>
			</view>
		</view> -->
		<!-- 资讯头条 -->

		<!-- 淘好车 经济省油 轮播图 -->
		<!-- 		<view class="cu-bar bg-white" style="min-height: auto;">
			<view class="action padding-tb-sm">
				<text class="cuIcon-shop text-teda "></text>
				<text class="text-bold padding-right">淘好车</text>
				<text class=" padding-right text-teda">经济省油</text>
			</view>
		</view>
		<swiper class="screen-swiper margin-bottom" :circular="true" :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<image :src="item.url" mode="aspectFill" v-if="item.type == 'image'"></image>
				<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type == 'video'"></video>
			</swiper-item>
		</swiper> -->
		<!-- 淘好车 经济省油 轮播图 -->

		<!-- 全国购 今日特惠 买车必看 col-3-->
		<!--	<view class="cu-list grid col-3">
			<view class="cu-item padding-sm" v-for="(item,index) in three" :key="index">
				<view>
					<image :src="item.url" class="align-center" style="width: 180rpx; height: 100rpx;">
					</image>
				</view>
				<view class="padding-xs">{{item.title}}</view>
				<view class="text-gray text-sm">{{item.desc}}</view>
			</view>
		</view>		-->
		<!-- /全国购 今日特惠 买车必看 col-3-->

		<!-- 全部 低首付 无忧购买 性价比 -->
		<!--	<view class="cu-list grid col-4">
			<view class="cu-item ">
				<view class="padding-xs text-teda">全部</view>
				<view class="text-teda text-sm">猜你喜欢</view>
			</view>
			<view class="cu-item ">
				<view class="padding-xs">低首付</view>
				<view class="text-gray text-sm">首付2000起</view>
			</view>
			<view class="cu-item ">
				<view class="padding-xs">无忧购</view>
				<view class="text-gray text-sm">3天无理由</view>
			</view>
			<view class="cu-item ">
				<view class="padding-xs">性价比</view>
				<view class="text-gray text-sm">超值好车</view>
			</view>
		</view>		-->
		<!-- 全部 低首付 无忧购买 性价比 -->

		<!-- 二手车列表 -->
		<!--	<view class="cu-card article margin-bottom" :class="isCard?'no-card':''" @tap="jump('goods')">
			<view class="cu-item shadow " v-for="(item,index) in carlist" :key="index">
				<view class="content margin-top">
					<image :src="item.url"></image>
					<view class="desc">
						<view class="text-black ">{{item.name}}</view>
						<view class="text-black">{{item.desc}}</view>
						<div>
							<view class="text-gray text-xs">{{item.dist}}</view>
							<view class="text-black">{{item.price}}</view>
						</div>
						<view>
							<view class="cu-tag bg-teda sm text-white">一成购</view>
							<text class="padding-left-xs text-teda text-sm">{{item.monthpay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>	-->
		<!-- 二手车列表 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">


				<!-- <view class="cu-list menu text-left">
					<view class="cu-item arrow" v-for="(item,index) in 5" :key="index">
						<view class="content">
							<view>Item {{index +1}}</view>
						</view>
					</view>
				</view> -->
				<cu-custom bgColor="bg-teda" :isBack="true">
					<block slot="backText"></block>
					<block slot="content"></block>
				</cu-custom>
				<div class="main">

					<!-- 头像页 -->
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://s5.xinstatic.com/static/newcar-m/imgs/car-detail/head-defaul_fcdbf8a.png);"></view>
						</view>

						<view class="content bg-white">
							<view class="text-gray text-sm flex padding-left"><text class="flex">Maxim<text class=' radius text-sm margin-left-sm'>声望105</text></text>
							</view>
							<view class="text-gray text-sm flex padding-left padding-tb-xs"><text class="text-gray text-sm margin-right-xs flex">12获赞<text
									 class='radius text-gray text-sm margin-left-sm'>5粉丝</text></text>
							</view>
							<view @tap="jump('timeline')"><text class="text-cut flex text-sm padding-left padding-bottom-xs">查看个人主页</text></view>
						</view>

					</view>

					<!-- 头像页 -->

					<!-- 列表菜单 -->
					<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">

						<view class="cu-item arrow margin-top-sm" @tap="jump('setting')">
							<navigator class="content" hover-class="none" open-type="redirect" url="">
								<text class="cuIcon-settings text-gray"></text>
								<text class="">设置</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-forward text-gray"></text>
								<text class="">我的分享</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-write text-gray"></text>
								<text class="">我的草稿</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-read text-gray"></text>
								<text class="">浏览历史</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('order')">
								<text class="cuIcon-moneybag text-gray"></text>
								<text class="">交易记录</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-phone text-gray"></text>
								<text class="">联系客服</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-people text-gray"></text>
								<text class="">关于我们</text>
							</navigator>
						</view>


					</view>
				</div>



			</view>
		</view>

		<view class="cu-bar  " style="margin-bottom: 100upx;"></view><!-- 底部间隙防止foot遮挡 -->
		<footMenu :pageUrl="'index'"></footMenu>
	</div>
</template>

<script>
	import data from '@/common/data.js'
	import amapFile from '../../utils/amap-wx';
	import {
		get
	} from '../../utils';
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import fake from '../../fakedata/home.js';
	import SingleItem from '../../components/item'
	import Parse from '../../common/parse.js'
	import Vue from 'vue'




	export default {
		components: {

			SingleItem
		},
		mounted() {
			this.$store.dispatch('getHotItems')
		},
		computed: {
			...mapState(['hotItems'])
		},
		data() {
			return {
				iconList: [],
				CustomBar: this.CustomBar,
				modalName: null,
				name: "basics",
				elements: [{
						title: '布局',
						name: 'layout',
						color: 'cyan',
						icon: 'newsfill'
					},
					{
						title: '背景',
						name: 'background',
						color: 'blue',
						icon: 'colorlens'
					},
					{
						title: '文本',
						name: 'text',
						color: 'purple',
						icon: 'font'
					},
					{
						title: '图标 ',
						name: 'icon',
						color: 'mauve',
						icon: 'icon'
					}
				],
				postList: [],
				comList: [],
				carlist: [],
				kindlist: [],
				tagList: [],
				gridCol: 4,
				gridBorder: true,
				swiperList: [],
				langs: ['en-US', 'zh-CN'],
				banner: [],
				channel: [],
				three: [],
				five: [],
				hostItems: [], // 最热产品
				topicList: [],
				newCategoryList: []
			};
		},
		onShow() {

		},

		onLoad: function() {
			this.$store.commit('needLogin')
			
			this.tagList = data.tagList
			this.swiperList = data.swiperList
			this.five = data.five
			this.kindlist = data.kindlist
			this.three = data.three
			this.carlist = data.carlist
			this.comList = data.comList
			this.postList = data.postList
			this.iconList = data.iconList
		},
		methods: {

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},

			hideModal(e) {
				this.modalName = null
			},

			onClose() {
				this.isShow = false
			},

			login() {
				uni.login({
					success: res => {
						if (res.code) {
							this.$http({
								url: '/user/getOpenId',
								method: 'GET',
								data: res,
								success: r => {
									if (r.statusCode === 200) {
										this.$store.commit('setOpenId', r.data.openid)
									}
								}
							})
						}
					}
				});
			},

			naveTo() {
				uni.navigateTo({
					url: '../uploadForEvaluate/uploadForEvaluate',
					
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			navToCategory(){
				uni.navigateTo({
					url: '../categorylist/categorylist',
					
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			jump(pageName) {
				if (pageName === 'my') {
					this.login()
				}
				uni.redirectTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			changeLang(lang) {
				console.log('修改语言' + lang);
				this.$i18n.locale = lang;
			},

			demonote() {
				uni.showModal({
					title: 'hihi',
					content: 'haha',
					showCancel: false
				});
			},

			toMappage() {
				var _this = this;
				// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
				wx.getSetting({
					success(res) {
						//如果没有同意授权,打开设置
						if (!res.authSetting['scope.userLocation']) {
							wx.openSetting({
								success: res => {
									_this.getCityName();
								}
							});
						} else {
							wx.navigateTo({
								url: '/pages/mappage/mappage'
							});
						}
					}
				});
			},

			async getData() {
				const data = fake;
				this.banner = data.banner;
				this.channel = data.channel;
				this.brandList = data.brandList;
				this.newGoods = data.newGoods;
				this.hotGoods = data.hotGoods;
				this.topicList = data.topicList;
				this.newCategoryList = data.newCategoryList;
			},
			goodsDetail(id) {
				wx.navigateTo({
					url: '/pages/goods/goods?id=' + id
				});
			},
			categoryList(id) {
				wx.navigateTo({
					url: '/pages/categorylist/categorylist?id=' + id
				});
			},
			goodsList(info) {
				if (info == 'hot') {
					wx.navigateTo({
						url: '/pages/newgoods/newgoods?isHot=' + 1
					});
				} else {
					wx.navigateTo({
						url: '/pages/newgoods/newgoods?isNew=' + 1
					});
				}
			},
			topicdetail(id) {
				wx.navigateTo({
					url: '/pages/topicdetail/topicdetail?id=' + id
				});
			},
			totopic() {
				wx.navigateTo({
					url: '/pages/topic/topic'
				});
			},
			tobrandList() {
				wx.navigateTo({
					url: '/pages/brandlist/brandlist'
				});
			},
			branddetail(id) {
				wx.navigateTo({
					url: '/pages/branddetail/branddetail?id=' + id
				});
			}
		},
		created() {
			// this.demonote() // 显示提醒
		},

		onShareAppMessage: function(options) {
			var that = this; // 设置菜单中的转发按钮触发转发事件时的转发内容
			var shareObj = {
				title: 'Cause', // 默认是小程序的名称(可以写slogan等)
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
			return shareObj;
		}
	};
</script>
