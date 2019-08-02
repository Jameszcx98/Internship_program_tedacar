<template>
	<view class="">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">城市选择</block>
		</cu-custom>

		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">A</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityA" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">B</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityB" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">C</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityC" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>

		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">D</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityD" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">E</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityE" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">F</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityF" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">G</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityG" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">H</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityH" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">J</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityJ" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view> 
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">K</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityK" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">L</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityL" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">M</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityM" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">N</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityN" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">P</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityP" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">Q</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityQ" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">R</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityR" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">S</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityS" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">T</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityT" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">W</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityW" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">X</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityX" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">Y</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityY" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		<view class="cu-bar bg-white solid-bottom padding-tb-xs" style="min-height: auto;">
			<view class="text-sm padding-left">Z</view>
		</view>
		<view class="cu-list grid col-4 margin-bottom-sm">
			<view class="padding-sm" v-for="(item,index) in cityZ" :key="index">
				<view class="text-sm">{{item.name}}</view>
			</view>
		</view>
		
		
		
		<view class=" padding flex-sub text-center">
			<text class="text-gray">更多城市开通中...</text>
		</view>

	</view>
</template>

<script>
	import data from '@/common/data.js'
	export default {
		data() {
			return {
				cityA: [], cityB: [], cityC: [], cityD: [], cityE: [], cityF: [], cityG: [], 
				cityH: [], cityJ: [], cityK: [], cityL: [], cityM: [], cityN: [], cityP: [],
				cityQ: [], cityR: [], cityS: [], cityT: [], cityW: [], cityX: [], cityY: [],
				cityZ: []
			};
		},

		onLoad() {
			this.cityA = data.cityA
			this.cityB = data.cityB
			this.cityC = data.cityC
			this.cityD = data.cityD
			this.cityE = data.cityE
			this.cityF = data.cityF
			this.cityG = data.cityG
			this.cityH = data.cityH
			this.cityJ = data.cityJ
			this.cityK = data.cityK
			this.cityL = data.cityL
			this.cityM = data.cityM
			this.cityN = data.cityN
			this.cityP = data.cityP
			this.cityQ = data.cityQ
			this.cityR = data.cityR
			this.cityS = data.cityS
			this.cityT = data.cityT
			this.cityW = data.cityW
			this.cityX = data.cityX
			this.cityY = data.cityY
			this.cityZ = data.cityZ
		},


		methods: {
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
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
	}
</script>

<style>
</style>
