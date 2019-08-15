<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true">
			<block slot="backText" >
				<view v-if="user.wxProfile" class="cu-avatar round" :style="'background-image:url(' + user.wxProfile.avatarUrl + '); margin: 0 ;'"></view>
				<p v-if="user.wxProfile" class="margin-lr">{{ user.wxProfile.nickName }}</p>
				<div  v-if='item.followSign' class="cu-tag bg-gray radius" @tap.stop='unfollow'>已关注</div>
				<div  v-else class="cu-tag bg-red radius" @tap.stop='follow'>关注</div>
			</block>
			
		</cu-custom>
		
		<view class="cu-bar bg-white solid-bottom">
			<view class="action" @tap="comment">
				<button class="bg-teda cu-btn mybgcolor shadow">
					<text class="text-white">
						发评论
						<!-- <text style="margin-left:5upx" class="cuIcon-location"></text> -->
					</text>
				</button>
			</view>
			<!-- <view class="action" @tap="comment">
				<button style="background: rgb(234,80,79);" class="cu-btn  shadow">
					<text class="text-white">
						上传自拍
						<text style="margin-left:5upx" class="cuIcon-comment"></text>
					</text>
				</button>
			</view> -->
			
		</view>
		
		<div class="main">
			<!-- 轮播 -->
			<swiper class="screen-swiper" :class="dotStyle ? 'square-dot' : 'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item, index) in swiperList" :key="index">
					<image :src="'https://tedacar.oss-us-east-1.aliyuncs.com/'+item" mode="aspectFill" ></image>
				
				</swiper-item>
			</swiper>
			<!-- 轮播 -->

		
			<div class="text-black padding bg-white">{{ desc }}</div>
			<!-- 文章 -->


			

			<!-- 底部操作条 -->
			<!-- <view class="cu-bar search footer_bar bg-white solid-top">
				<view class="search-form round">
					<text class="cuIcon-edit"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="说点什么..." confirm-type="search"></input>
				</view>
				
				<view class="action">
					<text class="cuIcon-like"></text>
					
				</view>
				<view class="action margin-right">
					<text class="cuIcon-favor"></text>
					
				</view>
				<view class="action">
					<text class="cuIcon-comment"></text>
					
				</view>
			</view> -->
			<!-- 底部操作条 -->
		<view v-for="(item, index) in commentNum" :key="index" class="cu-item shadow">
			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item">
					<view v-if="item.user.wxProfile.avatarUrl" class="cu-avatar round" :style="{backgroundImage: 'url(' + item.user.wxProfile.avatarUrl + ')'}"></view>
					<view class="content">
						<view class="text-grey">{{item.user.wxProfile.nickName }}</view>
						<view class="grid flex-sub padding-top" :class="isCard ? 'col-3 grid-square' : 'col-1'">
							<view class="bg-img" :class="isCard ? '' : 'only-img'" :style="{ backgroundImage: 'url(' +'https://tedacar.oss-us-east-1.aliyuncs.com/'+ x + ')' }"
							 v-for="(x, j) in item.commentImg" :key="j"></view>
						</view>
						<view class="text-gray text-content text-df">{{ item.desc }}</view>
						<view v-if="item.commentTwo" v-for="(c, d) in item.commentTwo" :key="d" class="bg-grey padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<!-- <view>{{c.thisUserPointer.wxProfile.nickName}}:</view> -->
								<view class="flex-sub">{{ c.desc }}</view>
							</view>
						</view>
						<view class="margin-top-sm flex justify-between">
							<view class="text-gray text-df">{{item.UtcTime}}</view>
							<view>
								<!-- <text @tap="Fabulous(item.objectId)" class="cuIcon-appreciatefill text-sm text-gray"><text style="display: inline-block;width:10upx;text-align:right;margin:0 10upx 0 5upx">{{ item.score }}</text></text> -->
								<text @tap="comment" :data-commentId="item.objectId" class="cuIcon-messagefill text-gray margin-left-sm"></text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		</div>
	</view>
</template>

<script>
	import Parse from '../../common/parse.js';
	import {toParams} from '../../common/util.js';
	export default {
		components: {
			
		},
		data() {
				
			return {
				item: {},
				user: {},
				commentInitData: {},
				detailId:'', 
				InputBottom: 0,
				swiperList: [],
				TabCur: 0,
				scrollLeft: 0,
				tags: [],
				cardData: [],
				commentNum:[],
				desc:'',
				userId:''
			
			};
		},
		onLoad(option) {
			this.id = option.id;
			this.detailId = this.$root.$mp.query.id;
			this.getPost()
			this.getComment();
			this.getDetail();
			
		},
		onShow() {
			this.getComment();
		},
		methods: {
			getPost(){
				new Parse.Query('Publish').equalTo('objectId',this.detailId).find().then(r=>{
					let post=r.map(x=>x._toFullJSON())
					this.swiperList=post[0].image
					this.desc=post[0].desc
					// console.log('88888'+JSON.stringify(r))
				}).catch(e=>{console.log(e)})
			},
			setTime() { //修改世界时间
				this.commentNum.forEach((a, b) => {
					let time = new Date(a.createdAt).toLocaleDateString()
					this.$set(a, 'UtcTime', time);

				})
				// console.log('this.commentNum'+JSON.stringify(this.commentNum))
			},
			getComment(){//顶级评论
				new Parse.Query('Comment').equalTo('ifFather',true).equalTo('isDisabling',true).equalTo('targetId',this.detailId).descending('createdAt').include('user')
				.find()
				.then(r=>{
					this.commentNum=r.map(x=>x._toFullJSON())
					this.setTime()
					this.getTwoComment()
					this.user=this.commentNum[0].user.wxProfile
					// this.userId=this.commentNum[0].user.objectId
					})
				.catch(e=>{console.log(JSON.stringify(e))})
				// setTimeout(()=>{
				// 	console.log('099999900'+JSON.stringify(this.commentNum))
				// },3000)
			},
			getTwoComment() {
				//获取次级评论并将内容插入到顶级评论中
				// if (this.commentNum.length < 1) return this.isloading = false; //关闭load
				// console.log('ccccccc'+JSON.stringify(this.commentNum))
				this.commentNum.forEach((item, index) => {
					// console.log('8888'+item.objectId)
					
					let commentPointer = Parse.Object.extend('Comment').createWithoutData(item.objectId);
					// console.log('bbbbb'+JSON.stringify(commentPointer))
					// condole.log('333'+commentPointer)
					new Parse.Query('Comment')
						.descending('updatedAt')
						.equalTo('ifFather', false)
						.equalTo('comment', commentPointer)
						.find()
						.then(r => {
							// console.log('22222222'+JSON.stringify(r))
							let c = r.map(x => x._toFullJSON());
							// console.log('jjjj'+JSON.stringify(r))
							this.$set(item, 'commentTwo', c);
							// this.isloading = false; //关闭load
							// console.log('ccccccc'+JSON.stringify(this.commentNum))
						})
						.catch(e => {
							console.log('e' + JSON.stringify(e));
						});
				})},
			comment(e){//评论
				let commentId = 'undefined';
				if (e) {
					commentId = e.target.dataset.commentid;
				}
				let tip = !!commentId ? '我的评论' : '评论帖子';
				let p = {
					targetId: this.detailId,
					targetName: 'Publish', // 留言的对象名字
					pageTitle: '评论',
					commentId: commentId, //二级评论ID
					type: 'postComment',
					tip: tip,
					desc: '有什么想说的..',
					
				};
				uni.navigateTo({
					url: '../publish/publish?' + toParams(p)
				});
			},
			 getDetail() {
				
				// console.log('jznvoia'+JSON.stringify(this.idlist));
				let r =  Parse.Cloud.run('getStatusDetail', {
					id: this.detailId ,
				}).then(r => {
					this.item = r._toFullJSON();
					console.log('0900900'+JSON.stringify(this.item));
					this.user = r._toFullJSON().user;
					var temp = this.item.image.map( x=>{
						 x = 'https://tedacar.oss-us-east-1.aliyuncs.com/'+x;
						 return x;
					})
					
					// for(let num=0;num<temp.length;num++)
					// {   
					// 	let tempt = {}
					// 	tempt.id = num;
					// 	tempt.type = 'image';
					// 	tempt.url = temp[num].toString();
					// 	this.swiperList.push(tempt);
					// }
					
	
					this.commentInitData = {
						...this.item,
						targetName: 'Publish' // 规定评论类型
					}; // 把当前页面的信息给子组件
					
					// this.$set(item, 'comment', c);
					
					// console.log('vuahfouh'+JSON.stringify(this.commentInitData));
					
					
				}
				).catch( e => {
					console.log('e'+JSON.stringify(e))
				})
				
					
					
               
			},
		follow(){
			
			let r = Parse.Cloud.run('follow',{
				id: this.item.user.objectId
			}).then()
			this.getDetail()
		
			
		},
		unfollow(){
			
			let r = Parse.Cloud.run('unfollow',{
				id: this.item.user.objectId
			}).then()
			this.getDetail()
			
		},
			
			
			
		}
	};
</script>
