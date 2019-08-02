<template>
	<view>
		<cu-custom bgColor="bg-teda" :isBack="true">
			<block slot="backText">{{i18n.commonBack}}</block>
			<block slot="content">{{i18n.myTitle}}</block>
		</cu-custom>
		
	<div class="pins padding-sm" style="column-count: 2;column-gap: 18upx;" >
		<view class="cu-card dynamic no-card margin-bottom-sm radius"  v-for="(x, s) in favorList" :key="s">
			<!-- v-for="(x, s) in comList" :key="s" -->
			
			<view class="cu-item shadow" >
				<view class="grid flex-sub padding-0 col-1" @tap="toDetail" :data-id="x.objectId">
					<view class="bg-img only-img" :style=" 'background-image:url('+ tempaddr+x.poster+');'"></view>
				</view>
				
				<view class="cu-list menu-avatar" v-if="x.user">
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
					<text v-else class="cuIcon-like margin-lr-xs" >{{x.like}}</text>
					<text v-if='x.redfavor' class="cuIcon-favorfill margin-lr-xs" @tap='subFavor':data-id="x.objectId":data-name="'Publish'" >{{x.favor}}</text>
					<text v-else class="cuIcon-favor margin-lr-xs">{{x.favor}}</text>
					
					<text class="cuIcon-message margin-lr-xs"></text>
					30
				</view>
			</view>
		</view>
	</div>
		
	</view>
</template>

<script>
import Parse from '../../common/parse.js';
import { mapState } from 'vuex';
import data from '@/common/data.js'

export default{

	data() {
		return {
			favorList:[],
			skipnumber:0,
			temp:[],
			tempaddr:'http://tedacar.oss-us-east-1.aliyuncs.com/',
			
		};
	},
	
	onShow(){
		this.getStatus(0)
    
	},
	
	onReachBottom: function() {
		this.getStatus(10)
    },
 
  
	onPullDownRefresh: function (){
		this.getStatus(0)	
	},
	methods: {
		getStatus(num) {
			if(num==0){
				this.skipnumber = 0
			}else{
			this.skipnumber+=num
			}
			Parse.Cloud.run('getFavorList',{
				num:this.skipnumber
			})
				.then(r => {
					console.log('fgaga')
					this.temp = r.map(x => {
						let y = x._toFullJSON();
						console.log('gdfggag'+JSON.stringify(y))
						if(y.image!=null){
						y.poster = y.image[0];
						}
						let t =  new Date(y.createdAt);
						y.time = t.toLocaleString();
						return y;
					});
					if(this.skipnumber==0){
						this.favorList = []
						this.temp.map(x=>{
							this.favorList.push(x)
						})	
					}else{
						this.temp.map(x=>{
							this.favorList.push(x)
							})		
					}	
				})
				.catch(e => {
					this.favorList = []
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
		},
	
		subFavor(e){
			let targetId = e.mp.currentTarget.dataset.id
			let targetName = e.mp.currentTarget.dataset.name
			Parse.Cloud.run('subFavor',{
				id:targetId,
				name:targetName
			}).then( r=>{
				this.objectId = r._toFullJSON().objectId;
				this.favorList.map( x=>{
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