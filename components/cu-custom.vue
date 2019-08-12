<template>
	<view>
		<view class="cu-custom " :style="[{height:CustomBar + 'px'}]">
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">

				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
				</view>

				<view class="action"  v-else>
					<slot name="userCenter" class="user_center shadow">
						<view v-if="!!userImg" class="cu-avatar round " :style="{backgroundImage: 'url(' + userImg + ')'}"
						 @tap="showModal" data-target="DrawerModalL"></view>
						 
					</slot>
				</view>
				
				<p @tap="home">首页</p>

				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
		</view>


		<!-- 左弹出内容 -->
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">

					<!--   头像  -->
					<view class="cu-list menu-avatar margin-bottom">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://s5.xinstatic.com/static/newcar-m/imgs/car-detail/head-defaul_fcdbf8a.png);">
							</view>
						</view>
						<view class="content padding-left bg-white ">
							<view>
								<text class="text-cut margin-top-sm">Maxim<text class='cu-tag radius text-teda text-sm margin-left'>认证用户/商家</text></text>
							</view>
							<!-- <view class="text-gray text-sm flex padding-top-xs"><text class='text-gray text-sm padding-right'>声望 105</text><text
								 class="text-gray text-sm margin-right-xs flex">0获赞<text class='text-gray text-sm margin-left-xs padding-left-sm'>0粉丝</text></text>
							</view> -->
							<!-- <view class="text-sm flex padding-tb-xs" @tap="jump('timeline')">查看个人座驾</view> -->
						</view>
					</view>
					<!--  ／头像  -->

					<!--  横条组  -->
					<view class="cu-list menu" :class="[menuBorder?'sm-border':'',menuCard?'card-menu margin-top':'']">
						<view class="cu-item arrow" @tap="jump('garage')">
							<navigator class="content" hover-class="none" open-type="redirect" url="">
								<text class="cuIcon-friendadd text-black"></text>
								<text class="text-grey">我的车辆</text>
							</navigator>
						</view>

						<view class="cu-item arrow" @tap="jump('chat')">
							<navigator class="content" hover-class="none" open-type="redirect" url="">
								<text class="cuIcon-write text-black"></text>
								<text class="text-grey">我的聊天</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" open-type="redirect" url="">
								<text class="cuIcon-read text-black"></text>
								<text class="text-grey">浏览历史</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('order')">
								<text class="cuIcon-moneybag text-black"></text>
								<text class="text-grey">交易记录</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('post')">
								<text class="cuIcon-favor text-black"></text>
								<text class="text-grey">我的收藏</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-service text-black"></text>
								<text class="text-grey">联系客服</text>
							</navigator>
						</view>

						<view class="cu-item arrow">
							<navigator class="content" hover-class="none" @tap="jump('')">
								<text class="cuIcon-group text-black"></text>
								<text class="text-grey">关于我们</text>
							</navigator>
						</view>
						
						<view class="cu-item arrow" @tap="jump('setting')">
							<navigator class="content" hover-class="none" open-type="redirect" url="">
								<text class="cuIcon-settings text-black"></text>
								<text class="text-grey">设置</text>
							</navigator>
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- ／左弹出内容 -->
	</view>
</template>

<script>
	import Parse from '../common/parse.js'
	export default {
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				StatusBar: this.StatusBar,
				userImg:''
			};
		},

		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar = this.StatusBar;
				var CustomBar = this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		onShow(){
			this.getUser()
		},
		methods: {
			getUser(){//获取用户信息
				 let userInfo=Parse.User.current()._toFullJSON();
				 this.userImg=userInfo.wxProfile.avatarUrl
				
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},

			hideModal(e) {
				this.modalName = null
			},

			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			goUser() {
				uni.navigateTo({
					url: '../../pages/user/user'
				})
			},

			home() {
				uni.navigateTo({
					url: '../../pages/index/index'
				})
			},

			jump(pageName) {
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
