<template>
		<!-- 底部菜单 -->
		<view class="cu-bar tabbar foot shadow bg-white">
			<view class="action" @tap="jump('index')">
				<view :class="pageUrl == 'index' ? 'cuIcon-homefill' : 'cuIcon-home'"></view>
				首页
			</view>
			<view class="action " @tap="jump('categorylist')">
				<view :class="pageUrl == 'categorylist' ? 'cuIcon-shopfill' : 'cuIcon-shop'"></view>
				买车
			</view>
			
			<view class="action " @tap="jump('post')">
				<view :class="pageUrl == 'post' ? 'cuIcon-cartfill' : 'cuIcon-cart'"></view>
				卖车
			</view>	
			
			<view class="action " @tap="jump('community_fountain')">
				<view :class="pageUrl == 'community_fountain' ? 'cuIcon-hotfill' : 'cuIcon-hot'"></view>
				侃车
			</view>
			<view class="action " @tap="jump('my')">
				<view :class="pageUrl == 'my' ? 'cuIcon-profilefill' : 'cuIcon-profile'"></view>
				我的
			</view>
		</view>
		<!-- 底部菜单 -->
</template>

<script>
	export default {
		props: {
		pageUrl: {
			type: String,
			default: '/'
		}
	},

		data() {
			return {
			}
		},
		onShow(){
			console.log('this.pageUrl'+this.pageUrl);
		},
		methods:{
		  jump(pageName) {
			  console.log('11' + JSON.stringify());
			uni.redirectTo({
				url: `../${pageName}/${pageName}`,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},
		}
	}
</script>

<style>
</style>

