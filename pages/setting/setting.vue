<template>
	<div class="">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">设置</block>
		</cu-custom>


		<div class="main">
			<!-- 列表菜单 -->
			<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
				<view class="cu-item arrow" @tap="jump('information')">
					<navigator class="content" hover-class="none" open-type="redirect" url="">
						<text class="cuIcon-people text-black"></text>
						<text class="text-grey">个人资料</text>
					</navigator>
				</view>

				<!--  切换语言  -->
				<view class="cu-item" :class="menuArrow?'arrow':''">
					<view class="content">
						<text class="cuIcon-activityfill text-black"></text>
						<text class="text-grey">{{i18n.switchLanguage}}</text>
					</view>
					<view class="action">
						<switch checked @change="changeLanguage" />
					</view>
				</view>
				
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" open-type="redirect" url="">
						<text class="cuIcon-font text-black"></text>
						<text class="text-grey">是否开放美国车源</text>
					</navigator>
				</view>
				
				<view class="cu-item arrow">
					<navigator class="content" hover-class="none" open-type="redirect" url="">
						<text class="cuIcon-friend text-black"></text>
						<text class="text-grey">隐私</text>
					</navigator>
				</view>

				<view class="cu-item arrow margin-top-sm">
					<navigator class="content" hover-class="none" open-type="redirect" url="">
						<text class="cuIcon-back_android text-black"></text>
						<text class="text-grey">退出账号</text>
					</navigator>
				</view>
			</view>
		</div>



	</div>
</template>

<script>
	import Parse from '../../common/parse.js'
	import data from '@/common/data.js'
	export default {
		data() {
			return {

			};
		},
		onLoad() {

		},
		computed: {

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
