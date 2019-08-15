<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom bgColor="bg-teda">
			<block slot="content">{{ i18n.com }}</block>
		</cu-custom>
			
		<!-- 工具栏 -->
			
		<div class="cu-bar padding-lr bg-white solid ">
			<div class="item" @click='getStatus(0)'>
				{{ i18n.comFollow }}
				<text class=" margin-left-xs"></text>
			</div>
			<div class="item" @click='getStatushot(0)'>
				{{ i18n.comPublic }}
				<text class=" margin-left-xs"></text>
			</div>
			<div class="item" @click='getStatusme(0)'>
				{{ i18n.comMe }}
				<text class=" margin-left-xs"></text>
			</div>
			
		</div>
		<div class="pins padding-sm" style="column-count: 2;column-gap: 18upx;" >
			<view class="cu-card dynamic no-card margin-bottom-sm radius" v-if='signone' v-for="(x, s) in bookListone" :key="s">
				<!-- v-for="(x, s) in comList" :key="s" -->
				
				<view class="cu-item shadow" >
					<view class="grid flex-sub padding-0 col-1" @tap="toDetail" :data-id="x.objectId">
						<view class="bg-img only-img" :style=" 'background-image:url('+ tempaddr+x.poster+');'"></view>
					</view>
					
					<view class="cu-list menu-avatar" v-if="x.user" @tap="toUsers" :data-id="x.user.objectId" >
						<view class="cu-item " style="height: 100upx;">
							<view class="cu-avatar round " :style="'background-image:url(' + x.user.wxProfile.avatarUrl + ')'"></view>
							<view class="" style="width: 65%;">
								<view>{{ x.user.wxProfile.nickName }} </view>
								<view class="text-gray text-sm flex justify-between">{{ x.time }}</view>
							</view>
						</view>
					</view>

					<view class="text-gray text text-right margin-bottom-sm margin-right"  >
						<text v-if='x.redheart' class="cuIcon-likefill margin-lr-xs"  >{{x.like}}</text>
						<text v-else class="cuIcon-like margin-lr-xs"  @tap='addLike' :data-id="x.objectId" :data-name="'Publish'">{{x.like}}</text>
						<text v-if='x.redfavor' class="cuIcon-favorfill margin-lr-xs" @tap='subFavor' :data-id="x.objectId" :data-name="'Publish'" >{{x.favor}}</text>
						<text v-else class="cuIcon-favor margin-lr-xs" @tap='addFavor' :data-id="x.objectId" :data-name="'Publish'">{{x.favor}}</text>
						
						<text class="cuIcon-message margin-lr-xs"></text>
						30
					</view>
				</view>
			</view>
			<view class="cu-card dynamic no-card margin-bottom-sm radius" v-if='signtwo' v-for="(x, s) in bookListtwo" :key="s">
				<!-- v-for="(x, s) in comList" :key="s" -->
				
				<view class="cu-item shadow" >
					<view class="grid flex-sub padding-0 col-1" @tap="toDetail" :data-id="x.objectId">
						<view class="bg-img only-img" :style=" 'background-image:url('+ tempaddr+x.poster+');'"></view>
					</view>
					
					<view class="cu-list menu-avatar" v-if="x.user" @tap="toUsers" :data-id="x.user.objectId">
						<view class="cu-item " style="height: 100upx;">
							<view class="cu-avatar round " :style="'background-image:url(' + x.user.wxProfile.avatarUrl + ')'"></view>
							<view class="" style="width: 65%;">
								<view>{{ x.user.wxProfile.nickName }} </view>
								<view class="text-gray text-sm flex justify-between">{{ x.time }}</view>
							</view>
						</view>
					</view>
			
					<view class="text-gray text text-right margin-bottom-sm margin-right"  >
						<text v-if='x.redheart' class="cuIcon-likefill margin-lr-xs" >{{x.like}}</text>
						<text v-else class="cuIcon-like margin-lr-xs"  @tap='addLike' :data-id="x.objectId" :data-name="'Publish'">{{x.like}}</text>
						<text v-if='x.redfavor' class="cuIcon-favorfill margin-lr-xs" @tap='subFavor' :data-id="x.objectId" :data-name="'Publish'">{{x.favor}}</text>
						<text v-else class="cuIcon-favor margin-lr-xs" @tap='addFavor' :data-id="x.objectId" :data-name="'Publish'">{{x.favor}}</text>
						
						<text class="cuIcon-message margin-lr-xs"></text>
						30
					</view>
				</view>
			</view>
			<view class="cu-card dynamic no-card margin-bottom-sm radius" v-if='signthree' v-for="(x, s) in bookListthree" :key="s">
				<!-- v-for="(x, s) in comList" :key="s" -->
				
				<view class="cu-item shadow" >
					<view class="grid flex-sub padding-0 col-1" @tap="toDetail" :data-id="x.objectId">
						<view class="bg-img only-img" :style=" 'background-image:url('+ tempaddr+x.poster+');'"></view>
					</view>
					
					<view class="cu-list menu-avatar" v-if="x.user" @tap="toUsers" :data-id="x.user.objectId">
						<view class="cu-item " style="height: 100upx;">
							<view class="cu-avatar round " :style="'background-image:url(' + x.user.wxProfile.avatarUrl + ')'"></view>
							<view class="" style="width: 65%;">
								<view>{{ x.user.wxProfile.nickName }} </view>
								<view class="text-gray text-sm flex justify-between">{{ x.time }}</view>
							</view>
						</view>
					</view>
			
					<view class="text-gray text text-right margin-bottom-sm margin-right"  >
						<text v-if='x.redheart' class="cuIcon-likefill margin-lr-xs"  >{{x.like}}</text>
						<text v-else class="cuIcon-like margin-lr-xs"  @tap='addLike' :data-id="x.objectId" :data-name="'Publish'">{{x.like}}</text>
						<text v-if='x.redfavor' class="cuIcon-favorfill margin-lr-xs" @tap='subFavor' :data-id="x.objectId" :data-name="'Publish'" >{{x.favor}}</text>
						<text v-else class="cuIcon-favor margin-lr-xs" @tap='addFavor' :data-id="x.objectId" :data-name="'Publish'">{{x.favor}}</text>
					
						<text class="cuIcon-message margin-lr-xs"></text>
						30
					</view>
				</view>
			</view>
		</div>
		<!-- 发布按钮 -->
		<view
			@tap="publishContent"
			class="add round bg-gradual-orange text-xxl text-bold text-blue flex justify-center align-center"
			style="width: 100upx; height: 100upx;position: fixed;bottom: 120upx; right:20upx;z-index:  1024;box-shadow: 0 4upx 6upx rgba(0, 0, 0, 0.1);"
		>
			<text class="cuIcon-add "></text>
		</view>
		<!-- 发布按钮 -->
		
		<footMenu :pageUrl="'community_fountain'"></footMenu>
	</view>
</template>

<script>
import { toParams } from '../../utils/index.js';
import Parse from '../../common/parse.js';
import { mapState } from 'vuex';
import data from '@/common/data.js'

export default {
 
 data() {
  return {
   status: [],
   modalName: null,
   CustomBar: this.CustomBar, // vue 对象上
            tempaddr:'https://tedacar.oss-us-east-1.aliyuncs.com/',
   TabCur: 0,
   scrollLeft: 0,
   bookListone:[],
   bookListtwo:[],
   bookListthree:[],
   objectId:'',
   like:'',
   signone:'',
   signtwo:'',
   signthree:'',
   skipone:0,
   skiptwo:0,
   skipthree:0,
   default:true,//进入页面默认follow
   
   
   
  };
 },
 
 onShow(){
  if(this.signone||this.default){
   this.getStatus(0)
   this.default = false
  }else if(this.signtwo){
   this.getStatushot(0)
  }else if(this.signthree){
   this.getStatusme(0)
  }
    
 },
 
 onReachBottom: function() {
  if(this.signone){
   this.getStatus(10)
  }else if(this.signtwo){
   this.getStatushot(10)
  }else if(this.signthree){
   this.getStatusme(10)
    }
    },
 
  
	onPullDownRefresh: function (){
		if(this.signone){
			this.getStatus(0)
		}else if(this.signtwo){
			this.getStatushot(0)
		}else if(this.signthree){
			this.getStatusme(0)
		}
		
		
	},
	methods: {
		getStatus(skipnumber) {
			if (skipnumber==0){
			this.bookListone = []
			this.skipone =0
			}else{
			this.skipone+=skipnumber;
			}
			Parse.Cloud.run('getStatus',{number:this.skipone})
				.then(r => {
					this.skiptwo = 0
					this.skipthree = 0
					r.map(x => {
						let y = x._toFullJSON();
						if(y.image!=null){
						y.poster = y.image[0];
						}
						let t =  new Date(y.createdAt);
						y.time = t.toLocaleString();
						console.log('gsgg'+JSON.stringify(y))
						this.bookListone.push(y)
					});
					this.signone = true
					this.signtwo = false
					this.signthree = false
				})
				.catch(e => {
					
					console.log('????' + JSON.stringify(e));
				});
		},
		getStatushot(skipnumber) {
			if (skipnumber==0){
			this.bookListtwo = []
			this.skiptwo =0
			}else{
			this.skiptwo+=skipnumber;
			}
			Parse.Cloud.run('getStatushot',{number:this.skiptwo})
				.then(r => {
					this.skipthree = 0
					this.skipone = 0
					console.log(r)
					let i=0;
					r.map(x => {
						let y = x._toFullJSON();
						if(y.image!=null){
						y.poster = y.image[0];
						}
						let t =  new Date(y.createdAt);
						y.time = t.toLocaleString();
						this.bookListtwo.push(y);
					});
					this.signone = false
					this.signtwo = true
					this.signthree = false
					
				})
				.catch(e => {
					console.log('????' + JSON.stringify(e));
				});
				
		},
		getStatusme(skipnumber) {
			if (skipnumber==0){
			this.bookListthree = []
			this.skipthree =0
			}else{
			this.skipthree+=skipnumber;
			}
			Parse.Cloud.run('getStatusme',{number:this.skipthree})
				.then(r => {
					this.skiptwo = 0
					this.skipone = 0
					this.temp= r.map(x => {
						let y = x._toFullJSON();
						if(y.image!=null){
						y.poster = y.image[0];
						}
						let t =  new Date(y.createdAt);
						y.time = t.toLocaleString();
						this.bookListthree.push(y)
					});
					this.signone = false
					this.signtwo = false
					this.signthree = true
					
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
				type: 'postStatus',
				tip: '',
				desc: '',
				commentId:'undefined'
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
		toUsers(e) {
			console.log('e' + JSON.stringify(e));
			let id = e.mp.currentTarget.dataset.id;
			uni.navigateTo({
				url: `../usersInfo/usersInfo?id=${id}`
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
		},
		
		addLike(e){
			let targetId = e.mp.currentTarget.dataset.id;
			let targetName = e.mp.currentTarget.dataset.name;
			Parse.Cloud.run('addLike',{
				id:targetId,
				name:targetName
			}).then( r => {
				this.objectId = r._toFullJSON().objectId;
				this.bookListone.map( x=>{
					if(x.objectId==this.objectId){
					++x.like
					x.redheart=true
					}
				});
				this.bookListtwo.map( x=>{
					if(x.objectId==this.objectId){
						++x.like
						x.redheart=true
					}
				});
				this.bookListthree.map( x=>{
					if(x.objectId==this.objectId){
						++x.like
						x.redheart=true
					}
				});
				
			}).catch( e => {
				console.log('e' + JSON.stringify(e));
			});
		},
		
		addFavor(e){
			let targetId = e.mp.currentTarget.dataset.id
			let targetName = e.mp.currentTarget.dataset.name
			Parse.Cloud.run('addFavor',{
				id:targetId,
				name:targetName
			}).then( r=>{
				this.objectId = r._toFullJSON().objectId;
				this.bookListone.map( x=>{
					if(x.objectId==this.objectId){
						this.$nextTick(()=>{
							x.favor++
							x.redfavor=true
						})
					
					}
				});
				this.bookListtwo.map( x=>{
					if(x.objectId==this.objectId){
						x.favor++
						x.redfavor=true
					}
				});
				this.bookListthree.map( x=>{
					if(x.objectId==this.objectId){
					this.$nextTick(()=>{
						x.favor++
						x.redfavor=true
					})
					}
				});	
					}).catch( e => {
						console.log('e???????' + JSON.stringify(e));
					});
				},
		
		subFavor(e){
			let targetId = e.mp.currentTarget.dataset.id
			let targetName = e.mp.currentTarget.dataset.name
			Parse.Cloud.run('subFavor',{
				id:targetId,
				name:targetName
			}).then( r=>{
				this.objectId = r._toFullJSON().objectId;
				this.bookListone.map( x=>{
					if(x.objectId==this.objectId){
						this.$nextTick(()=>{
							x.favor--
							x.redfavor=false
						})
					
					}
				});
				this.bookListtwo.map( x=>{
					if(x.objectId==this.objectId){
						x.favor--
						x.redfavor=false
					}
				});
				this.bookListthree.map( x=>{
					if(x.objectId==this.objectId){
					this.$nextTick(()=>{
						x.favor--
						x.redfavor=false
					})
					}
				});	
					}).catch( e => {
						console.log('e???????' + JSON.stringify(e));
					});
				},
		},
		
		
			
		
		
		
	
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
</style>