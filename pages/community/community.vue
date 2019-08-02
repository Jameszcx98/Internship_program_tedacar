<template>
	<view>
		<cu-custom bgColor="bg-teda" >
			
			<block slot="content">{{ i18n.com }}</block>
		</cu-custom>

		<!-- 工具栏 -->

		<div class="cu-bar padding-lr bg-white solid ">
			<div class="item">
				<!-- {{ i18n.comFollow }} -->
				关注
				<text class=" margin-left-xs"></text>
			</div>
			<div class="item">
				<!-- {{ i18n.comPublic }} -->
				发现
				<text class=" margin-left-xs"></text>
			</div>
			<div class="item">
				<!-- {{ i18n.comMe }} -->
				上热评
				<text class=" margin-left-xs"></text>
			</div>

			<!-- <div class="item" @tap="showModal" data-target="DrawerModalR">
				{{ i18n.commonFilter }}
				<text class="cuIcon-filter margin-left-xs"></text>
			</div> -->
		</div>
		<!-- 工具栏 -->

		<!-- 过滤器 -->
		<!-- <view class="cu-modal drawer-modal justify-end" :class="modalName == 'DrawerModalR' ? 'show' : ''" @tap="hideModal">
			<view class="cu-dialog basis-xl" @tap.stop="" :style="[{ top: CustomBar + 'px', height: 'calc(100vh - ' + CustomBar + 'px)' }]">
				<view class="cu-list menu text-left">
					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>
								肤质
							</view>

							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x, idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">干性</text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>
								年纪
							</view>

							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x, idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">23-26</text>
								</view>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="content padding-tb-sm">
							<view>
								<text class=" text-blue margin-right-xs"></text>
								国家
							</view>

							<view class="text-gray grid text-sm  text-center col-3">
								<view v-for="(x, idx) in 6" :key="idx" class="text-black" style="margin-top: 20upx;">
									<text class="round padding-lr-sm padding-tb-xs bg-gray ">美国</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<!-- 过滤器 -->
		
		
		<!-- <scroll-view scroll-y class="page"> -->
			
			<!-- 双栏瀑布布局 -->
		<!-- 	<view class="nav-list">
				<navigator hover-class='none' :url="'/pages/component/' + item.name" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in elements" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.icon"></text>
				</navigator>
			</view> -->
			<!-- 双栏瀑布布局 -->
			
			<!-- <view class="cu-tabbar-height"></view> -->
			
		</scroll-view>
		
		<!-- 卡片 -->
		<view class="cu-card dynamic" :class="isCard?'no-card':''" @tap="jump('article')">
			<view class="cu-item shadow" v-for="(x,t) in comList" :key="t">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style=" 'background-image:url(' + x.url + ');'"></view>
						<view class="content flex-sub">
							<view>{{x.name}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{x.time}}
							</view>
						</view>
					</view>
				</view>
				
				
				
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="bg-img" :class="isCard?'':'only-img'" :style=" 'background-image:url(' + x.url2 + ');'"
					 v-for="(item,index) in isCard?9:1" :key="index">
					</view>
				</view>	

				<view class="text-content">
					{{x.content}}
				</view>
				
				<view class="text-sm text-gray text-right padding">
					<text class="cuIcon-appreciatefill margin-lr-xs text-gray"></text> 20
					<text class="cuIcon-messagefill margin-lr-xs text-gray"></text> 30
				</view>
			</view>
		</view>

		<!-- 发布按钮 -->
		<view @tap="publishContent" class="add round bg-gradual-orange text-xxl text-bold text-blue flex justify-center align-center"
		 style="width: 100upx; height: 100upx;position: fixed;bottom: 200upx; right:20upx;z-index:  1024;box-shadow: 0 4upx 6upx rgba(0, 0, 0, 0.1);">
			<text class="cuIcon-add "></text>
		</view>
		<!-- 发布按钮 -->
		<footMenu :pageUrl="'community'"></footMenu>
	</view>
</template>

<script>
	import data from '@/common/data.js'
	import {
		toParams
	} from '../../utils/index.js';
	import Parse from '../../common/parse.js';
	import {
		mapState
	} from 'vuex';

	export default {
		data() {
			return {
				status: [],
				modalName: null,
				CustomBar: this.CustomBar, // vue 对象上
				comList:[],
				TabCur: 0,
				scrollLeft: 0,
				elements: [{
						title: '操作条',
						name: 'bar',
						color: 'purple',
						icon: 'vipcard'
					},
					{
						title: '导航栏 ',
						name: 'nav',
						color: 'mauve',
						icon: 'formfill'
					},
					{
						title: '列表',
						name: 'list',
						color: 'pink',
						icon: 'list'
					},
					{
						title: '卡片',
						name: 'card',
						color: 'brown',
						icon: 'newsfill'
					},
					{
						title: '表单',
						name: 'form',
						color: 'red',
						icon: 'formfill'
					},
					{
						title: '时间轴',
						name: 'timeline',
						color: 'orange',
						icon: 'timefill'
					},
					{
						title: '聊天',
						name: 'chat',
						color: 'green',
						icon: 'messagefill'
					},
					{
						title: '轮播',
						name: 'swiper',
						color: 'olive',
						icon: 'album'
					},
					{
						title: '模态框',
						name: 'modal',
						color: 'grey',
						icon: 'squarecheckfill'
					},
					{
						title: '步骤条',
						name: 'steps',
						color: 'cyan',
						icon: 'roundcheckfill'
					}
				],
				tags: [{
						name: '护肤'
					},
					{
						name: '面膜'
					},
					{
						name: '彩妆'
					},
					{
						name: '美发'
					},
					{
						name: '瘦身'
					},
					{
						name: '朋友'
					}
				]
			};
		},
		computed: {
			...mapState(['lang'])
		},
		onLoad() {
			this.getStatus();
			this.comList = data.comList;
		},

		methods: {
			getStatus() {

				Parse.Cloud.run('getStatus')
					.then(r => {
						this.status = r.map(x => {
							let y = x._toFullJSON();
							
							console.log('lang' + JSON.stringify(this.lang));
							y.time = new Date(y.createdAt).toLocaleTimeString(this.lang);
							return y;
						});
						console.log(this.status);
					})
					.catch(e => {
						console.log('????' + JSON.stringify(e));
					});
			},
			publishContent() {
				let p = {
					targetName: 'Publish', // 留言的对象名字
					pageTitle: this.$t('index.comPubTitle'),
					title: true,
					type: 'zzz',
					tip: this.$t('index.comPubTip'),
					desc: this.$t('index.comPubPlaceholder')
				};
				uni.navigateTo({
					url: '../publish/publish?' + toParams(p)
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
			toDetail(e) {
				console.log('e' + JSON.stringify(e));
				let id = e.mp.currentTarget.dataset.id;
				uni.navigateTo({
					url: `../communityDetail/communityDetail?id=${id}`
				});
			},
			jump(pageName) {
				uni.navigateTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			}
		}
	};
</script>

<style>
	.pins .cu-card {
		display: inline-block;
		width: 100%;
		/* box-shadow: 0 0 10rpx 0 rgba(0,0,0,0.10); */
		break-inside: avoid;
		overflow: auto;
	}
	.page {
		height: 100vh;
	}
</style>
