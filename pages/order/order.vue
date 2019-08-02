<template>
	<div class="orders">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<!-- <block slot="backText">返回</block> -->
			<block slot="content">我的订单</block>
		</cu-custom>

		<!-- 	<scroll-view scroll-x class="bg-white nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in category" :key="index" @tap="tabSelect" :data-id="index">
				{{item}}
			</view>
		</scroll-view> -->

		<!--  筛选  -->
<!--	<view class="box bg-white margin-tb-sm">
			<view class="cu-bar btn-group">
				<button class="cu-btn bg-teda shadow-blur round text-white" @tap="showNopay">未付款订单</button>
				<button class="cu-btn bg-teda shadow-blur round text-white" @tap="showPayed">已付款订单</button>
				<button class="cu-btn bg-teda shadow-blur round text-white" @tap="showAll">全部订单</button>
			</view>
		</view>	-->
		<!--  筛选  -->

		<div class="order_item" v-for="(x,index) in orders" :key="index">

			<div class="cu-bar bg-white solid padding-lr">
				<div class="seller">
					<view class="cu-avatar radius sm margin-right-sm" :style=" { backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg)' }"
					 style="margin-left: 0;"></view>
					订单
					<text class="cuIcon-right"></text>
				</div>
				<div class="status">
					<text class="cu-tag line-red text-red radius">{{x.status}}</text>
				</div>
			</div>

			<view class="cu-card article no-card margin-bottom-sm" v-for="(p,i) in x.items" :key="i">
				<view class="cu-item shadow padding-tb-sm bg-gray">

					<view class="content">
						<image :src=p.url mode="aspectFill">
						</image>

						<view class="desc ">
							<view class="text-content">{{p.name}}</view>
							<view>
								<view class="cu-tag bg-red light sm round">实际付款：{{p.price}}</view>
								<view class="cu-tag bg-green light sm round">(免运费)</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</div>
		<footMenu></footMenu>

	</div>
</template>

<script>
	import Parse from '../../common/parse.js'
	import data from '@/common/data.js'
	export default {
		data() {
			return {
				orders: [],
				TabCur: 0,
				scrollLeft: 0,
			};
		},
		onLoad() {
			//this.getOrders()
			this.orders = data.orders
		},
		computed: {
			//  filteredOrders :  function (){
			// 	let match = {
			// 		pending:1,
			// 		processing:2,
			// 	}
			// 	console.log('this.order' + JSON.stringify(this.orders));
			// 	return this.orders.map( x => {
			// 		 match[x.status] === this.TabCur
			// 	})
			// }
		},

		methods: {
			showNopay() {
				return orders.filter(function(status) {
					return status === "未付款"
				})
			},

			showPayed() {
				return orders.filter()
			},

			showAll() {
				
			},

			getOrders() {
				new Parse.Cloud.run('orders').then(r => {
					this.orders = r.items
				}).catch(e => {
					console.log('e' + JSON.stringify(e));
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			}
		}
	};
</script>

<style>

</style>
