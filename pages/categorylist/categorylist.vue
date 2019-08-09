<template>
	<div class="categoryList">
		<cu-custom bgColor="bg-teda text-white">

			<block slot="content">买车</block>
		</cu-custom>
		<!-- 搜索 -->




		<view class="cu-bar bg-white search padding-bottom" style="padding-top: 24rpx;">
			<view class="search-form round">
				<text class="cuIcon-search text-gray"></text>
				<input @click="toSearch" :adjust-position="false" type="text" placeholder="家用省油" confirm-type="search" />
			</view>

		</view>
		<!-- 搜索 -->

		<!-- 工具栏 -->
		<div class="cu-bar bg-white padding-lr solid">
			<div class="item" @tap="jump('carBrand')">
				品牌<text class="cuIcon-unfold margin-left-xs"></text>
			</div>
			<div class="item" @tap="showModal" data-target="ChooseModal">
				车价<text class="cuIcon-unfold margin-left-xs"></text>
			</div>

			<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-blue" data-target="btnNull" @tap="hideModal">取消</view>
						<view class="content">车价分类</view>
						<view class="action text-green" data-target="btnOk" @tap="hideModal">确定</view>
					</view>

					<view class="padding-top padding-left flex">选择价格区间</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in priceList" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'" @tap="ChoosePriceList" :data-value="item.value">{{item.name}}
							</button>
						</view>
					</view>

				</view>
			</view>

			<div class="item" @tap="showModal" data-target="ChooseModal2">
				分期<text class="cuIcon-unfold margin-left-xs"></text>
			</div>
			<view class="cu-modal" :class="modalName=='ChooseModal2'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-blue" data-target="btnNull" @tap="hideModal">取消</view>
						<view class="content">分期付款(单选)</view>
						<view class="action text-green" data-target="btnOk" @tap="hideModal">确定</view>
					</view>

					<view class="padding-top padding-left flex">月供（元）</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox4" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'" @tap="ChooseCheckbox4" :data-value="item.value">{{item.name}}
							</button>
						</view>
					</view>
					<view class="padding-top padding-left flex">首付（元）</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox5" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'" @tap="ChooseCheckbox5" :data-value="item.value">{{item.name}}
							</button>
						</view>
					</view>
				</view>
			</view>


			<div class="item" @tap="jump('filter')" data-target="DrawerModalR">
				筛选<text class="cuIcon-filter margin-left-xs"></text>
			</div>
		</div>
		<!-- 工具栏 -->

		<!-- 汽车分类 -->
		<!-- <scroll-view scroll-x class="bg-white nav padding-bottom" scroll-with-animation :scroll-left="scrollLeft">

			<view class="cu-item" :class="index==TabCur?'text-green cur':''" v-for="(item,index) in list" :key="index" @tap="tabSelect"
			 :data-id="index">
				<img :src="item.url" class="padding-top" style="width: 140rpx; height: 80rpx;">
				<view class="bg-gray text-center text-sm padding-tb-xs" style="width: 100%; height: 40upx; line-height: 40upx;">{{item.name}}</view>
			</view>

		</scroll-view> -->
		<!-- 汽车分类 -->

		<!-- 二手车列表 -->
		<view class="cu-card article margin-bottom" :class="isCard?'no-card':''" @tap="jump('goods')">
			<view class="cu-item shadow " v-for="(item,index) in carlist" :key="index">
				<view class="content margin-top">
					<image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXqDfub7Uq-J3NP0B88VHIdTQWlUtOygTBgnnJ53UpFS2sqgvm"></image>
					<view class="desc">
						<view class="text-black ">{{item.name}}----{{index}}</view>
						<view class="text-black">{{item.desc}}</view>
						<!--购物车符号-->
						<div>
							<div>
								<view class="text-gray text-xs">{{item.dist}}</view>
								<view class="text-black">{{item.price}}</view>
							</div>
							<!-- <text class="cuIcon-cart text-black"></text> -->
						</div>
						<!--购物车符号-->
						<view>
							<view class="cu-tag bg-teda sm text-white">一成购</view>
							<text class="padding-left-xs text-teda text-sm">{{item.monthpay}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 二手车列表 -->
		<view class="cu-bar  " style="margin-bottom: 100upx;"></view> <!-- 底部间隙防止foot遮挡 -->
		<!-- <footMenu pageURL></footMenu> -->
		<footMenu :pageUrl="'categorylist'"></footMenu>
	</div>
</template>

<script>
	import Parse from '../../common/parse.js'
	import footMenu from '@/components/footMenu.vue'
	import data from '@/common/data.js'
	import {
		getMagento,
		itemPath
	} from '../../utils';

	import SingleItem from '../../components/item.vue'
	export default {
		components: {
			footMenu,
			SingleItem,
		},
		created() {},
		mounted() {
			//获取页面传的参数
			this.categoryId = this.$root.$mp.query.id;
			// this.getAllData();
		},
		data() {
			return {
				resultList: [],
				categoryId: '',
				list: [],
				carlist: [],
				oldlist:[],
				CustomBar: this.CustomBar,
				modalName: null,
				priceList: [],
				checkbox4: [],
				checkbox5: [],
				num: 1,
				scroll:true,
				
			};
		},
		onLoad: function() {
			this.$store.commit('setScreenResults',[])
			this.$store.commit('setOldlist',[])
			if (this.$store.state.isScreen) {//判断筛选是否重置
			// console.log(":::::::");
				this.$store.commit('setCurrentPage',1)
				this.screenLookup()
				
			}else{//重置执行初始化函数
				this.$store.commit('setCurrentPage',0)
				this.getAttribute()//初始化list
			}
	
			this.priceList = data.priceList
			this.checkbox4 = data.checkbox4
			this.checkbox5 = data.checkbox5
			// console.log('aaaaaaaaaa')
		},
		onPullDownRefresh(){
			this.$store.commit('setScreenResults',[])
			this.$store.commit('setOldlist',[])
			if(this.$store.state.isScreen){//判断执行筛选函数
				this.$store.commit('setCurrentPage',0)
				this.screenLookup()
			}else{
				// console.log('无')
				this.$store.commit('setCurrentPage',0)
				this.lookup()
			}
		},
		onReachBottom(){//下拉筛选
			// console.log('hshhd'+this.isScreen)
			if(this.$store.state.isScreen){//判断执行筛选函数
				console.log('有')
				this.screenLookup()
			}else{
				console.log('无')
				this.lookup()
			}
			
		},
		onShow() {
			// console.log('bbbbbbbbb')
			this.$store.commit('setScreenResults',[])
			this.$store.commit('setOldlist',[])
			if (this.$store.state.isScreen) {//判断筛选是否重置
				this.$store.commit('setCurrentPage',0)
				this.screenLookup()
			}else{//重置执行初始化函数
				this.$store.commit('setCurrentPage',1)
				this.getAttribute()
			}
		},
		methods: {
			screenFunction(a,b,c){//数据请求接口
				let newlist=[];
				this.$store.commit('setCurrentPage',this.$store.state.currentPage+1)
				if(this.$store.state.currentPage<=this.$store.state.allPage){
					Parse.Cloud.run('getFilteredProducts',{pageSize:a,currentPage:b,choose2:c}).then(r =>{ 
						newlist=r.items;
						this.carlist=[...newlist,...this.$store.state.oldlist]
						this.$store.commit('setScreenResults',this.carlist)
						this.$store.commit('setOldlist',this.carlist)
					}).catch(e => {
						console.log('eeeeee' + e)
					})	
				}else{
					console.log("xxxxxxx");
				}
				
			},
			lookup(){//请求后台数据,当前页面的请求
				this.screenFunction(this.$store.state.pageSize,this.$store.state.currentPage)
				// console.log('llllll' + JSON.stringify(this.carlist))
			},
			screenLookup(){//请求后台数据,，筛选请求
				this.screenFunction(this.$store.state.pageSize,this.$store.state.currentPage,this.$store.state.choose2)
			},
			ChoosePriceList(e) {
				let items = this.priceList;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			ChooseCheckbox4(e) {
				let items = this.checkbox4;
				this.checkbox4.forEach(x => {
					x.checked = false;
				})
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},
			ChooseCheckbox5(e) {
				let items = this.checkbox5;
				this.checkbox5.forEach(x => {
					x.checked = false;
				})
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
			},


			jump(pageName) {
				uni.navigateTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},

			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
				this.getTarget(this.modalName);
			},
			hideModal(e) {
				let chooseData = e.currentTarget.dataset.target;
				switch (chooseData) {
					case 'btnOk':
						this.screen();
						this.modalName = null;
						break;
					case 'btnNull':
						this.modalName = null;
						break;
				}
			},
			screen() { //获取选则价格区间的商品
				if (this.num == 1) {
					let lowPrice = [];
					let highPrice = [];
					this.priceList.forEach(item => {
						if (item.checked) {
							lowPrice.push(item.low);
							highPrice.push(item.high);
						}
					})
					lowPrice.sort(this.sortNumber);
					highPrice.sort(this.sortNumber);
					console.log("this.categoryId" + this.categoryId);
					Parse.Cloud.run('getAttbutesLabel', {
						low: lowPrice[0],
						high: highPrice[highPrice.length - 1]
					}).then(r => {
						console.log('jjfjdjfdjj' + JSON.stringify(r))
					}).catch()
					console.log('lowPrice' + lowPrice[0] + 'highPrice' + highPrice[highPrice.length - 1])
				} else {
					let saveMonthly = '';
					let savePayments = '';
					this.checkbox4.forEach(i => {
						i.checked ? saveMonthly = i.name : ''
					})
					this.checkbox5.forEach(j => {
						j.checked ? savePayments = j.name : ''
					})
					console.log('saveMonthly' + saveMonthly + '----' + savePayments)
				}
			},
			sortNumber(a, b) { //排序
				return a - b
			},
			getAttribute() {//无筛选请求，初始加载数据，并生成总页码
				Parse.Cloud.run('getFilteredProducts',{pageSize:this.$store.state.pageSize,currentPage:this.$store.state.currentPage}).then(r => {
					this.$store.commit('setScreenResults',r.items)
					this.$store.commit('setAllPage',Math.ceil(r.total_count/this.$store.state.pageSize))
					this.$store.commit('setOldlist',r.items)
					this.$store.commit('setCurrentPage',1)
					// console.log('-----'+this.allPage)
					this.carlist=r.items
				}).catch(e=>{
					console.log(JSON.stringify(e))
				})
			},
			getTarget(target) {
				if (target == 'ChooseModal') {
					this.num = 1
				} else {
					this.num = -1
				}
			},
			goDetail() {
				uni.navigateTo({
					url: '../goods/goods'
				})
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
			},

			async changeTab(index, id) {
				this.nowIndex = index;
				const listdata = await get('/goods/goodsList', {
					categoryId: id
				});
				this.goodsList = listdata.data;
				this.currentNav = listdata.currentNav;
				//需要让导航滚动到可见区域
				if (this.nowIndex > 4) {
					this.scrollLeft = this.nowIndex * 60;
				}
			},
			async getAllData() {


				const navdata = await get(`/categories/${this.categoryId}/products`);
				console.log('拿到列表页全部产品SKU');
				console.log(navdata);


				let allPromise = navdata.map(x => {
					let promise = get(`/products/${x.sku}`);
					return promise;
				});
				console.log('全部的请求' + allPromise);

				//       this.navData = navdata.navData;
				//       this.currentNav = navdata.currentNav;
				//
				//       for (let i = 0; i < this.navData.length; i++) {
				//         const id = this.navData[i].id;
				//         if (id == this.currentNav.id) {
				//           this.nowIndex = i;
				//         }
				//       }
				//
				//       //需要让导航滚动到可见区域
				//       if (this.nowIndex > 4) {
				//         this.scrollLeft = this.nowIndex * 60;
				//       } else {
				//         this.scrollLeft = 0;
				//       }

				Promise.all(allPromise)
					.then(r => {
						console.log('拿到产品信息' + r);
						this.goodsList = r;
					})
					.catch(e => {
						console.log(e);
					});

				//       const listdata = await get("/goods/goodsList", {
				//         categoryId: this.categoryId
				//       });
				//       this.goodsList = listdata.data;
			},
			goodsDetail(id) {
				console.log(id);
				wx.navigateTo({
					url: '/pages/goods/goods?id=' + id
				});
			}
		},
		computed: {}
	};
</script>

<style>
	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 200upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: "";
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}
</style>
