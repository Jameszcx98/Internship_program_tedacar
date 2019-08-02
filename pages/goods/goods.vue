<template>
	<view>
		<cu-custom bgColor="bg-teda" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">商品详情</block>
		</cu-custom>
		
		<view class="main">
			<swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperGoodList" :key="index">
					<image :src="item.url" mode="aspectFill"></image>
				</swiper-item>
			</swiper>

			<!-- 价格 -->
			<view class="cu-bar bg-teda ">
				<view class="padding-left padding-tb-xs">
					<text class="text-white ">45.37<text class="text-white text-xs">万</text></text>
					<text class="text-white padding-left-xs text-xs">车价分析</text>
					<text class="cuIcon-right text-xs text-white"></text>
				</view>
				<view class="padding-left padding-tb-xs">
					<text class="text-white padding-right">金融特惠</text>
				</view>
				<!-- <view class="padding-left padding-bottom">
					<text class="text-sm text-orange">原价 48.83万</text>
				</view> -->
			</view>

			<view class="cu-bar bg-white">
				<view class="">
					<view class="padding-left padding-tb-xs">
						<text class="">奥迪 A8L 2014款 3.0T 自动 45TFSI豪华型四驱</text>
					</view>
					<view class='margin-left cu-tag text-gray text-xs'>超值</view>
					<view class='cu-tag text-gray text-xs'>优信金牌认证</view>
				</view>
			</view>

			<view class="cu-bar bg-white margin-bottom-sm">
				<view class="">
					<view class="padding-left padding-tb-xs">
						<text class="text-teda">一成首付5.05万元 月供11465元</text>
					</view>
				</view>
			</view>
			<!-- 车辆档案 -->
			<view class="cu-bar bg-white solid-bottom">
				<view class="padding-left ">
					<text class="text-lg">车辆档案</text>
				</view>
				<view class="padding-left padding-tb-xs">
					<text class="text-gray text-sm padding-right">编号:81676897</text>
				</view>
			</view>

			<view class="cu-list grid col-3">
				<view class="padding-tb" v-for="(item,index) in goodlist" :key="index">
					<view class=" text-sm text-gray">{{item.title}}</view>
					<view class="text-bold padding-top-sm">{{item.content}}</view>
				</view>
			</view>

			<view class="cu-list grid col-4">
				<view class="padding-tb" v-for="(item,index) in goodlist2" :key="index">
					<image :src="item.url" style="height: 80rpx; width: 80rpx;"></image>
					<view class="text-gray padding-top-sm">{{item.name}}</view>
				</view>
			</view>

			<view class="padding-xs flex align-center bg-white margin-bottom-sm">
				<view class=" padding flex-sub text-center">
					<text class="">查看详细参数配置<text class="cuIcon-right"></text></text>
				</view>
			</view>

			<!-- 购车服务 -->
			<view class="cu-form-group solid-bottom">
				<view class="text-lg">购车服务<text class="text-gray text-sm padding-left-xs">服务费不超过车价9%</text></view>
				<button class="cu-btn block line-gray solid">立即咨询</button>
			</view>

			<view class="cu-form-group solid-bottom">
				<view class="text-gray text-sm">配送</view>
				<text class="text-sm">由华东仓发出</text>
				<text class="cuIcon-more"></text>
			</view>

			<view class="cu-form-group solid-bottom">
				<view class="text-gray text-sm">全国购</view>
				<view>
					<text class="cuIcon-roundcheck text-teda"><text class="text-sm">上门服务</text></text>
					<text class="cuIcon-roundcheck padding-left-xs text-teda"><text class="text-sm">包物流</text></text>
					<text class="cuIcon-roundcheck padding-left-xs text-teda"><text class="text-sm">包过户</text></text>
				</view>
				<text class="cuIcon-more"></text>
			</view>

			<view class="cu-form-group solid-bottom margin-bottom-sm">
				<view class="text-gray text-sm">金牌认证</view>
				<view class="">
					<view class='cu-tag sm text-teda line-red round'>315项检测</view>
					<view class='cu-tag sm text-teda line-red round'>30天包退</view>
					<view class='cu-tag sm text-teda line-red round'>1年保修</view>
				</view>
				<text class="cuIcon-more"></text>
			</view>

			<!-- 问答精选 -->
			<view class="cu-bar bg-white solid-bottom" @tap="jump('qa')">
				<view class="action">
					<text class="text-lg">问答精选（1）</text>
				</view>
				<view class="action">
					<text class="text-teda text-sm">查看全部 <text class="cuIcon-right text-orange text-sm"></text></text>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom margin-bottom-sm">
				<view class="action">
					<text class="cuIcon-question text-orange"><text class="padding-left-xs text-sm">2016款奥迪A8可以入手吗？</text></text>
				</view>
			</view>

			<!-- 服务点 -->
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-lg">服务点</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">购车顾问提供上门服务</text>
				</view>
			</view>

			<!-- 地图 -->
			<div class="map_container bg-white padding">
				<map class="map" id="map" style="width: 100%; height: 25vh;" :longitude="longitude" :latitude="latitude" :markers="markers"
				 scale="16" show-location></map>
			</div>

			<view class="cu-bar bg-white padding-bottom-sm" style="min-height: auto;">
				<text class="text-lg padding-left">上海市徐汇区番禺路店</text>
				<view class="cuIcon-right text-lg padding-right"></view>
			</view>
			<view class="cu-bar bg-white margin-bottom-sm padding-bottom-sm" style="min-height: auto;">
				<text class="text-sm text-gray padding-left">上海市徐汇区番禺路</text>
				<view class="cuIcon-location text-sm text-gray padding-right">2.2km</view>
			</view>

			<!-- 车辆检测 -->
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-lg">车辆检测</text>
				</view>
				<view class="action">
					<button class="cu-btn block text-sm line-gray solid">车况咨询</button>
				</view>
			</view>

			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" style="background-image:url(https://s5.xinstatic.com/static/newcar-m/imgs/car-detail/head-defaul_fcdbf8a.png);"></view>
					<view class="content">
						<view><text class="text-cut text-sm margin-top-sm">王师傅<text class='cu-tag radius text-teda text-sm margin-left-xs'>保证真实车况</text></text>
						</view>
						<view class="text-gray text-sm flex"><text class="text-gray text-sm margin-right-xs flex">
								车辆检测员 2019-06-18 完成车辆检测</text></view>
					</view>
				</view>
			</view>

			<view class="cu-card article">
				<view class="desc bg-white">
					<view class="text-content padding-left">该车已排除重大事故，已排除水泡火烧情况，方向盘被改装过，车身骨架无损伤，车体外观个别位置有瑕疵，部分漆面进行过维修，内饰整体较好，发动机变速箱运转正常，发动机舱内油液无需添加。</view>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom" v-for="(x,index) in goodList3" :key="index">
				<view class="action">
					<text class="">{{x.name}}</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">{{x.num}}<text class="cuIcon-roundcheckfill text-lg text-green padding-lr-xs"></text>
						<text class="cuIcon-right  text-gray"></text></text>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom" v-for="(x,index) in goodList4" :key="index">
				<view class="action">
					<text class="">{{x.name}}</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">{{x.num1}}<text class="cuIcon-warnfill text-lg text-teda padding-lr-xs"></text></text>
					<text class="text-gray text-sm">{{x.num2}}<text class="cuIcon-roundcheckfill text-lg text-green padding-lr-xs"></text>
						<text class="cuIcon-right text-gray"></text></text>
				</view>
			</view>

			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub text-teda" :class="index==TabCur?'text-teda cur':''" v-for="(item,index) in goodList5"
					 :key="index" @tap="tabSelect" :data-id="index">
						{{item.name}}
					</view>
				</view>
			</scroll-view>

			<view class="bg-white padding">
				<image src="//s5.xinstatic.com/static/newcar-m/widget/vehicle_report/new-defect-repair/img/car-cover_1fdfd1d.jpg"
				 mode="aspectFill" class="" style="width: 100%;">
				</image>
			</view>

			<view class="cu-bar bg-white">
				<view class="flex-sub text-center">
					<text class="text-sm text-gray">共8项检测项存在异常：共10处瑕疵，其中2处已修复</text>
				</view>
			</view>

			<view class="padding-xs flex align-center bg-white solid margin-bottom-sm">
				<view class=" padding flex-sub text-center">
					<text class="text-sm">查看详细检测报告<text class="cuIcon-right text-sm"></text></text>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-lg">维保记录</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">最近一次维保时间：2017-12-22</text>
				</view>
			</view>

			<view class="cu-bar bg-white solid-bottom" v-for="(x,index) in goodList6" :key="index">
				<view class="action">
					<text class="">{{x.name}}</text>
				</view>
				<view class="action">
					<text class="text-gray text-sm">{{x.num}}<text class="cuIcon-right  text-gray">
						</text></text>
				</view>
			</view>

			<view class="padding-xs flex align-center bg-white solid margin-bottom-sm">
				<view class=" padding flex-sub text-center">
					<text class="text-sm">免费查看详细维保记录<text class="cuIcon-right text-sm"></text></text>
				</view>
			</view>

			<!-- 车辆实拍 -->
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-lg">车辆实拍</text>
				</view>
			</view>

			<view class="bg-white padding" v-for="(x,index) in goodList7" :key="index">
				<image :src="x.url" mode="aspectFill" style="width: 100%;">
				</image>
				<view class="">
					<text class="text-sm text-gray">{{x.title}}<text class="text-sm">{{x.desc}}</text></text>
				</view>
			</view>

			<!-- 相似推荐 -->
			<view class="cu-bar bg-white solid-bottom">
				<view class="action">
					<text class="text-lg">相似推荐</text>
				</view>
			</view>

			<view class="cu-card article margin-bottom" :class="isCard?'no-card':''">
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
			</view>

			<view class=" padding flex-sub text-center">
				<text class="text-gray">- 销售政策详见官网服务保障详情页 -</text>
			</view>



			<!-- 底部导航 -->
			<view class="cu-bar bg-white tabbar border shop footer_bar solid-top" >
				<view class="action" @click="showModal('Modal')">
					<view class="cuIcon-cart"></view>加入购物车
				</view>
				<view class="cu-modal" :class="modalName=='Modal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">加入成功</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							请尽快结算
						</view>
					</view>
				</view>

				<button class="action" @click="showModal('Modal1')">
					<view class="cuIcon-redpacket text-green"></view>我要优惠
				</button>
				<view class="cu-modal" :class="modalName=='Modal1'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white justify-end">
							<view class="content">立享底价</view>
							<view class="action" @tap="hideModal">
								<text class="cuIcon-close text-red"></text>
							</view>
						</view>
						<view class="padding-xl">
							登录之后立享优惠底价
						</view>
					</view>
				</view>

				<view class="bg-red submit" style="display: block; opacity:0.6;" @click="showModal('bottomModal')">
					<view class="text-white padding-top" style="">电话客服</view>
				</view>
				<view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
					<view class="cu-dialog">
						<view class="cu-bar bg-white">
							<view class="action text-green">确定</view>
							<view class="action text-blue" @tap="hideModal">取消</view>
						</view>
						<view class="padding-xl">
							请拨打400-820-8800
						</view>
					</view>
				</view>

				<view class="bg-red submit" @tap="pay">
					<view class="text-white " style="">在线咨询</view>
				</view>
			</view>
			<!-- 底部导航 -->
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
				modalName: null,
				TabCur: 0,
				longitude: "121.436761",
				latitude: "31.189120",
				swiperGoodList: [],
				goodlist: [],
				goodlist2: [],
				goodList3: [],
				goodList4: [],
				goodList5: [],
				goodList6: [],
				goodList7: [],
				carlist: [],
				x: {},
				price: '',
				stock: '',
				desc: '',
				modalName: null,

				groupBuys: []

			};
		},

		onLoad() {
			this.getItemDetail() // 拿到细节
			this.getStock() // 拿到库存
			this.getGroupBuy()
			this.goodlist = data.goodlist
			this.goodlist2 = data.goodlist2
			this.goodList3 = data.goodList3
			this.goodList4 = data.goodList4
			this.goodList5 = data.goodList5
			this.goodList6 = data.goodList6
			this.goodList7 = data.goodList7
			this.carlist = data.carlist
			this.swiperGoodList = data.swiperGoodList

		},


		methods: {
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
