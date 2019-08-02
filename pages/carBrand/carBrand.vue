<template>
	<view>
		<cu-custom bgColor="bg-teda text-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">选择品牌</block>
		</cu-custom>

		<!--  搜索条  -->
		<view class="cu-bar bg-white search fixed" :style="[{top:CustomBar + 'px'}]">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input type="text" placeholder="输入搜索的关键词" confirm-type="search"> </input>
			</view>
			<view class="action">
				<button class="cu-btn bg-gradual-green shadow-blur round">搜索</button>
			</view>
		</view>
		<!--  搜索条 m -->

		<!--  主目录  -->
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" :style="[{height:'calc(100vh - '+ CustomBar + 'px - 50px)'}]"
		 :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in list" :key="index">
				<view :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view class="cu-item" v-for="(items,sub) in 1" :key="sub"  data-target="DrawerModalR" @tap="showModal">
							<!-- @tap="showModal" -->
							<!--2改成动态的-->
							<view class="cu-avatar round lg">{{item.name}}</view>
							<!--头像-->
							<view class="content">
								<view class="" @tap="passPara">{{item.label}}</view>
								<!-- passPara还没写  传递参数-->
							</view>
						</view>
					</view>
				</view>
			</block>
		</scroll-view>
		<!--  主目录  -->

		<!--  右边索引表  -->
		<view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in list" :key="index" :id="index" @touchstart="getCur" @touchend="setCur">
					{{item.name}}</view>
			</view>
		</view>
		<!--  右边索引表  -->

		<!--  右边弹出框  -->
		<view class="cu-modal drawer-modal justify-end" :class="modalName=='DrawerModalR'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">

					<view class="cu-item margin-bottom">
						<navigator class="content" hover-class="none">
							<text class="">奥迪</text>
						</navigator>
					</view>

					<view class="cu-item arrow" v-for="(item,index) in brandList1" :key="index" @tap="jump('brandDetail')">
						<view class="content">
							<view>{{item.name}}</view>
						</view>
					</view>



				</view>
			</view>
		</view>
		<!--  ／右边弹出框  -->

		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>

<script>
	import data from '@/common/data.js'
	export default {
		data() {
			return {
				modalName: null,
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				hidden: true,
				listCurID: '',
				list: [],
				brandList1: [],
				listCur: '',
				car: [{
					name: "A",
					brand: "奥迪"
				}, {
					name: "A",
					brand: "奔驰"
				}]
			};
		},
		onLoad() {
			let list = [{}];
			for (let i = 0; i < 26; i++) {
				list[i] = {};
				list[i].name = String.fromCharCode(65 + i);
			}
			this.list = list;
			this.listCur = list[0];
			this.brandList1 = data.brandList1
		},
		onReady() {
			let that = this;
			uni.createSelectorQuery().select('.indexBar-box').boundingClientRect(function(res) {
				that.boxTop = res.top
			}).exec();
			uni.createSelectorQuery().select('.indexes').boundingClientRect(function(res) {
				that.barTop = res.top
			}).exec()
		},
		methods: {
			jump(pageName) {
				uni.redirectTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},

			hideModal(e) {
				this.modalName = null
			},
			//获取文字信息
			getCur(e) {
				this.hidden = false;
				this.listCur = this.list[e.target.id].name;
			},
			setCur(e) {
				this.hidden = true;
				this.listCur = this.listCur
			},
			//滑动选择Item
			tMove(e) {
				let y = e.touches[0].clientY,
					offsettop = this.boxTop,
					that = this;
				//判断选择区域,只有在选择区才会生效
				if (y > offsettop) {
					let num = parseInt((y - offsettop) / 20);
					this.listCur = that.list[num].name
				};
			},

			//触发全部开始选择
			tStart() {
				this.hidden = false
			},

			//触发结束选择
			tEnd() {
				this.hidden = true;
				this.listCurID = this.listCur
			},
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.list;
				let scrollY = Math.ceil(list.length * e.detail.y / barHeight);
				for (let i = 0; i < list.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = list[i].name;
						that.movableY = i * 20
						return false
					}
				}
			}
		}
	}
</script>

<style>
	page {
		padding-top: 100upx;
	}

	.indexes {
		position: relative;
	}

	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
</style>
