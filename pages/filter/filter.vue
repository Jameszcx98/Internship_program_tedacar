<template>
	<view>
		<view class="action">
			<cu-custom :isBack="true" bgColor="bg-white text-white">
				<block slot="backText">返回</block>
				<block slot="content">高级筛选</block>
			</cu-custom>
		</view>

		<view class="VerticalBox" style="margin-bottom: 100upx;">
			<!-- 左边垂直滑动条  -->
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation :scroll-top="verticalNavTop" style="height:calc(100vh)">
				<view class="cu-item text-gray text-sm" :class="index==tabCur?'text-green cur':''" v-for="(item,index) in listscroll"
				 :key="index" @tap="TabSelect" :data-id="index">
					{{item.frontend_labels[0]?item.frontend_labels[0].label:item.attribute_code}}
				</view>
			</scroll-view>
			<!-- ／左边垂直滑动条 -->

			<!-- 右边垂直滑动条 -->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh )" :scroll-into-view="'main-'+mainCur"
			 @scroll="VerticalMain">
				<view class="padding-top padding-lr" v-for="(item,index) in listscroll" :key="index" :id="'main-'+index">
					<view class="cu-bar solid-bottom bg-white">
						<view class="action">
							{{item.frontend_labels[0]?item.frontend_labels[0].label:item.attribute_code}}
							<text v-show="item.attribute_code=='carprice'" class="text-gray">(万元)</text>
							<text v-show="item.attribute_code=='payments'" class="text-gray">(万元)</text>
							<text v-show="item.attribute_code=='monthPay'" class="text-gray">(万元)</text>
							<text v-show="item.attribute_code=='displacement'" class="text-gray">(L)</text>
							<text v-show="item.attribute_code=='carage'" class="text-gray">(年)</text>
							<text v-show="item.attribute_code=='mileage'" class="text-gray">(万公里)</text>
						</view>
						<view v-show="item.attribute_code=='payments'" class="text-center margin-right">
							<text>{{ range1.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range1.rangeValues[1]>=9.5?'不限':range1.rangeValues[1] }}</text>
						</view>
						<view v-show="item.attribute_code=='displacement'" class="text-center margin-right">
							<text>{{ range2.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range2.rangeValues[1]>=4.9?'不限':range2.rangeValues[1] }}</text>
							<text>{{ range2.rangeValues[1]>=4.9?'':'L' }}</text>
						</view>
						<view v-show="item.attribute_code=='carage'" class="text-center margin-right">
							<text>{{ range3.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range3.rangeValues[1]>=6?'不限':range3.rangeValues[1] }}</text>
							<text>{{ range3.rangeValues[1]>=6?'':'年' }}</text>
						</view>
						<view v-show="item.attribute_code=='mileage'" class="text-center margin-right">
							<text>{{ range4.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range4.rangeValues[1]>=15?'不限':range4.rangeValues[1] }}</text>
							<text>{{ range4.rangeValues[1]>=15?'':'万公里' }}</text>
						</view>
						<view v-show="item.attribute_code=='carprice'" class="text-center margin-right">
							<text>{{ range5.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range5.rangeValues[1]>=60?'不限':range5.rangeValues[1] }}</text>
							<text>{{ range5.rangeValues[1]>=60?'':'万' }}</text>
						</view>
						<view v-show="item.attribute_code=='monthpay'" class="text-center margin-right">
							<text>{{ range6.rangeValues[0] }}</text>
							<text>~</text>
							<text>{{ range6.rangeValues[1]>=10?'不限':range6.rangeValues[1] }}</text>
							<text>{{ range6.rangeValues[1]>=10?'':'万' }}</text>
						</view>
					</view>

					<!-- 右边垂直滑动条具体内容 -->
					<view v-if="item.attribute_code!='payments'&&item.attribute_code!='displacement'&&item.attribute_code!='carage'&&item.attribute_code!='mileage'&&item.attribute_code!='carprice'&&item.attribute_code!='monthpay'" class="cu-bar solid-bottom bg-white">
						<view class="action">
							<view class="flex grid col-2 padding-tb-sm">
								<view v-if='j!=0' @tap="onchange" :data-id='index' :data-index='j' v-for="(i,j) in item.options" :key='j' class="padding-tb-xs text-center"><button
									 :style="i.light?'background-color: blue;color:#fff':''" class="cu-btn my_width line-gray shadow text-sm">{{i.label}}</button></view>
							</view>
						</view>
					</view>
					<!-- ／右边垂直滑动条具体内容 -->

					<!-- 首付 -->
					<view v-if="item.attribute_code=='payments'" class="sliderBox bg-white cu-bar" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range1.slideWidth" :height="range1.slideHeight" :blockSize="range1.slideBlockSize" :min="range1.slideMin"
						 :max="range1.slideMax" :values="range1.rangeValues" :step="range1.step" :liveMode="range1.isLiveMode"
						 @rangechange="onRangeChange">
							<view slot="minBlock" @touchend='changeRange("range1",range1.rangeValues)' class="range-slider-block">11111</view>

							<!-- 左边滑块的内容 -->
							<view slot="maxBlock" @touchend='changeRange("range1",range1.rangeValues)' class="range-slider-block"></view>
							<!-- 右边滑块的内容 -->
						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap;">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">2</view>
							<view style="width:90rpx" class="text-orange cur ">4</view>
							<view style="width:90rpx" class="text-orange cur ">6</view>
							<view style="width:90rpx" class="text-orange cur ">8</view>

							不限
						</view>

					</view>
					<!-- 排量 -->
					<view v-if="item.attribute_code=='displacement'" class="sliderBox bg-white" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range2.slideWidth" :height="range2.slideHeight" :blockSize="range2.slideBlockSize" :min="range2.slideMin"
						 :max="range2.slideMax" :values="range2.rangeValues" :step="range2.step" :liveMode="range2.isLiveMode"
						 @rangechange="onRangeChange2">
							<view slot="minBlock" class="range-slider-block"></view>

							<view slot="maxBlock" class="range-slider-block"></view>

						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">1.0</view>
							<view style="width:90rpx" class="text-orange cur ">2.0</view>
							<view style="width:90rpx" class="text-orange cur ">3.0</view>
							<view style="width:90rpx" class="text-orange cur ">4.0</view>
							不限
						</view>
					</view>
					
					<view v-if="item.attribute_code=='carage'" class="sliderBox bg-white" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range3.slideWidth" :height="range3.slideHeight" :blockSize="range3.slideBlockSize" :min="range3.slideMin"
						 :max="range3.slideMax" :values="range3.rangeValues" :step="range3.step" :liveMode="range3.isLiveMode"
						 @rangechange="onRangeChange3">
							<view slot="minBlock" class="range-slider-block"></view>

							<view slot="maxBlock" class="range-slider-block"></view>

						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">1</view>
							<view style="width:90rpx" class="text-orange cur ">2</view>
							<view style="width:90rpx" class="text-orange cur ">3</view>
							<view style="width:90rpx" class="text-orange cur ">4</view>
							不限
						</view>
					</view>
					<!-- 里程 -->
					<view v-if="item.attribute_code=='mileage'" class="sliderBox bg-white" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range4.slideWidth" :height="range4.slideHeight" :blockSize="range4.slideBlockSize" :min="range4.slideMin"
						 :max="range4.slideMax" :values="range4.rangeValues" :step="range4.step" :liveMode="range4.isLiveMode"
						 @rangechange="onRangeChange4">
							<view slot="minBlock" class="range-slider-block"></view>

							<view slot="maxBlock" class="range-slider-block"></view>

						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">3</view>
							<view style="width:90rpx" class="text-orange cur ">6</view>
							<view style="width:90rpx" class="text-orange cur ">9</view>
							<view style="width:90rpx" class="text-orange cur ">12</view>
							不限
						</view>
					</view>
					
					<view v-if="item.attribute_code=='carprice'" class="sliderBox bg-white" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range5.slideWidth" :height="range5.slideHeight" :blockSize="range5.slideBlockSize" :min="range5.slideMin"
						 :max="range5.slideMax" :values="range5.rangeValues" :step="range5.step" :liveMode="range5.isLiveMode"
						 @rangechange="onRangeChange5">
							<view slot="minBlock" class="range-slider-block"></view>

							<view slot="maxBlock" class="range-slider-block"></view>

						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">10</view>
							<view style="width:90rpx" class="text-orange cur ">20</view>
							<view style="width:90rpx" class="text-orange cur ">30</view>
							<view style="width:90rpx" class="text-orange cur ">40</view>
							不限
						</view>
					</view>
					
					<view v-if="item.attribute_code=='monthpay'" class="sliderBox bg-white" style="position: relative;padding-bottom: 50upx;border-left:20upx solid #fff">
						<RangeSlider :width="range6.slideWidth" :height="range6.slideHeight" :blockSize="range6.slideBlockSize" :min="range6.slideMin"
						 :max="range6.slideMax" :values="range6.rangeValues" :step="range6.step" :liveMode="range6.isLiveMode"
						 @rangechange="onRangeChange6">
							<view slot="minBlock" class="range-slider-block"></view>

							<view slot="maxBlock" class="range-slider-block"></view>

						</RangeSlider>
						<view class="text-orange cur flex" style="position: absolute;top:80upx;height: 50upx;text-align:left;width: 450rpx;overflow: hidden;white-space: nowrap">
							<view style="width:90rpx" class="text-orange cur ">0</view>
							<view style="width:90rpx" class="text-orange cur ">2</view>
							<view style="width:90rpx" class="text-orange cur ">4</view>
							<view style="width:90rpx" class="text-orange cur ">6</view>
							<view style="width:90rpx" class="text-orange cur ">8</view>
							不限
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- ／右边垂直滑动条 -->
		</view>
		<view class="cu-bar tabbar foot shadow bg-white">
			<view class="flex-sub text-center">
				<view class="solid-bottom text-xxl padding">
					<text>找到<text class="text-blue">{{totolCount}}</text>辆车</text>
				</view>
			</view>
			<view style="height:100%" class="action">
				<button style="height:100%;border-radius:0;line-height:100upx;" @tap="reset" class="bg-blue">重置</button>
			</view>
		</view>
	</view>
</template>

<script>
	import Parse from '../../common/parse.js'
	import RangeSlider from '../../components/range-slider/range-slider.vue';
	export default {
		components: {
			RangeSlider
		},
		data() {
			return {
				listscroll: [],
				tabCur: 0,
				mainCur: 0,
				verticalNavTop: 0,
				load: true,
				totolCount: 0,

				range1: { //首付滑块
					rangeValues: [0, 10],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 10,
					step: 1,
					isLiveMode: true,
				},
				range2: { //排量滑块
					rangeValues: [0, 5],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 5,
					step: 0.1,
					isLiveMode: true,
				},
				range3: { //车龄滑块
					rangeValues: [0, 6],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 6,
					step: 1,
					isLiveMode: true,
				},
				range4: { //里程
					rangeValues: [0, 15],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 15,
					step: 1,
					isLiveMode: true,
				},
				range5: { //车价滑块
					rangeValues: [0, 60],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 60,
					step: 1,
					isLiveMode: true,
				},
				range6: { //月供滑块
					rangeValues: [0, 10],
					slideWidth: 410,
					slideHeight: 80,
					slideBlockSize: 30,
					slideMin: 0,
					slideMax: 10,
					step: 1,
					isLiveMode: true,
				},
			};
		},
		mounted() {
			uni.showLoading({
				title: '加载中...',
				mask: true
			});
		},
		onLoad() {
			if (this.$store.state.allCondition.length != 0) {
				this.listscroll = this.$store.state.allCondition;
				this.$store.commit('setScreenResults', [])
				this.$forceUpdate();
				this.lookup();
			} else {
				this.getAttribute();
				this.lookup();
			}

		},
		onReady() {
			uni.hideLoading()
		},
		onShow() {


		},
		// computed:{
		// 	changeRange(range,value){//存滑块的数据
		// 		let newrang=this.$store.state.rang;
		// 		let allrang=this.$store.state.rang;
		// 		allrang.forEach((a,b)=>{
		// 			if(a.range==range){
		// 				newrang[b].value=value
		// 			}else{
		// 				newrang.push({
		// 					range:range,
		// 					value:value
		// 				})
		// 			}
		// 		})
		// 		return this.$store.commit('setRang',newrang)
		// 	},
		// },
		// watch:{
		// },
		methods: {

			reset() { //重置所以筛选属性
				console.log('hhhhhhhh'+JSON.stringify(this.$store.state.rang))
				this.listscroll.forEach((y, z) => {
					y.options.forEach((i, j) => {
						i.light = false;
					})
				})
				this.range1.rangeValues = [0, 10];
				this.range2.rangeValues = [0, 10];
				this.$store.commit('setChoose2', [])
				this.$store.commit('setScreenResults', [])
				this.$store.commit('setIsScreen', false)
				this.$store.commit('setCurrentPage', 1)
				this.$store.commit('setAllPage', null)
				this.lookup()
				this.$forceUpdate();
			},
			lookup() { //开始筛选
				let choose = []; //初始存储所以筛选
				let choose2 = []; //存储被点亮的筛选
				this.listscroll.forEach((d, f) => { //存储所有筛选要求
					choose.push({}) //存储格式为new QueryBuilder()的形式，方便循环
					choose[f].name = d.attribute_code
					choose[f].id = d.attribute_id
					choose[f].options = []
					d.options.forEach((g, h) => { //判断筛选的条件是否点亮，并存储
						if (g.light == true) {
							choose[f].options.push({
								field: d.attribute_code,
								value: g.value,
								condition: 'eq'
							})
						}
					})
				})
				choose.forEach((k, l) => { //挑选有条件的筛选要求
					if (k.options.length >= 1) {
						choose2.push(k)
					}
				})
				if (choose2.length != 0) {
					this.$store.commit('setIsScreen', true)
					this.$store.commit('setChoose2', choose2)
				}

				Parse.Cloud.run('getFilteredProducts', {
					choose2
				}).then(r => { //发送筛选请求
					this.$store.commit('setAllPage', Math.ceil(r.total_count / this.$store.state.pageSize))
					this.totolCount = r.total_count;


				}).catch(e => {
					console.log('eeeeee' + e)
				})
			},
			onRangeChange: function(e) { //首付区间值
				this.range1.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range1',this.range1.rangeValues)
				// console.log(this.range1.rangeValues);
			},
			onRangeChange2: function(e) { //排量区间值
				this.range2.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range2',this.range2.rangeValues)
				// console.log(this.range2.rangeValues);
			},
			onRangeChange3: function(e) { //排量区间值
				this.range3.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range3',this.range3.rangeValues)
				// console.log(this.range2.rangeValues);
			},
			onRangeChange4: function(e) { //排量区间值
				this.range4.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range4',this.range4.rangeValues)
				// console.log(this.range2.rangeValues);
			},
			onRangeChange5: function(e) { //排量区间值
				this.range5.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range5',this.range5.rangeValues)
				// console.log(this.range2.rangeValues);
			},
			onRangeChange6: function(e) { //排量区间值
				this.range6.rangeValues = [e.minValue, e.maxValue];
				// this.changeRange('range6',this.range6.rangeValues)
				// console.log(this.range2.rangeValues);
			},
			onchange(e) { //选择筛选，按钮变色
				let code = e.currentTarget.dataset.id
				let index = e.currentTarget.dataset.index
				// this.checkBox(code,index)
				// console.log('this.listscroll[code]'+JSON.stringify(this.listscroll[code]))
				if (this.listscroll[code].options[index].light) {
					this.listscroll[code].options[index].light = false
				} else {
					this.listscroll[code].options[index].light = true
				}
				this.$forceUpdate(); //手动跟新数据（数据太多vue跟新不了）
				this.$store.commit('setAllCondition', this.listscroll)
				this.$store.commit('setScreenResults', [])
				this.$store.commit('setOldlist', [])
				this.$store.commit('setCurrentPage', 0)
				this.lookup() //发送请求进行筛选
			},
			changeRange(range,value){//存滑块的数据
				console.log('000000')
				let newrang=this.$store.state.rang;
				let allrang=this.$store.state.rang;
				console.log('99999'+allrang.length)
				if(allrang.length==0){
					newrang.push({
							range:range,
							value:value
						})
				}else{
					allrang.forEach((a,b)=>{
					if(a.range==range){
						newrang[b].value=value
					}else{
						newrang.push({
							range:range,
							value:value
						})
					}
				})
				}
				
				this.$store.commit('setRang',newrang)
				console.log('ggggg'+JSON.stringify(this.$store.state.rang))
			},
			
			getAttribute() { //获取所有筛选标签
				Parse.Cloud.run('getAttbutesLabel').then(r => {
					let attributes = []
					r.filter((c, d) => {
						if (c.attribute_code == 'city' || c.attribute_code == 'userid' || c.attribute_code == 'cost' || c.attribute_code ==
							'distance' || c.attribute_code == 'burned' || c.attribute_code == 'soaked' || c.attribute_code ==
							'supercharging'||c.attribute_code == 'scratchlevel'||c.attribute_code == 'crashlevel'||c.attribute_code == 'plate'||c.attribute_code == 'date') {
							
						} else {
							attributes.push(c)
						}
					})
					attributes.forEach((x, j) => { //筛选手动添加的标签
						if (x.is_user_defined) {
							this.listscroll.push(x)
						}
					})
					this.listscroll.forEach((z, k) => { //增加ID用于滑动
						z.numId = k
					})
					// console.log('000000' + JSON.stringify(this.listscroll))
				}).catch(e => {
					console.log("xxxxxx" + JSON.stringify(e));
				})
			},


			//----------------------------------------

			TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.mainCur = e.currentTarget.dataset.id;
				this.verticalNavTop = (e.currentTarget.dataset.id - 1) * 50
			},
			VerticalMain(e) {
				// #ifdef MP-ALIPAY
				return false //支付宝小程序暂时不支持双向联动 
				// #endif
				let that = this;
				let tabHeight = 0;
				if (this.load) {
					for (let i = 0; i < this.listscroll.length; i++) {
						let view = uni.createSelectorQuery().select("#main-" + this.listscroll[i].numId);
						view.fields({
							size: true
						}, data => {
							this.listscroll[i].top = tabHeight;
							tabHeight = tabHeight + data.height;
							this.listscroll[i].bottom = tabHeight;
						}).exec();
					}
					this.load = false
				}
				let scrollTop = e.detail.scrollTop + 10;
				for (let i = 0; i < this.listscroll.length; i++) {
					if (scrollTop > this.listscroll[i].top && scrollTop < this.listscroll[i].bottom) {
						this.verticalNavTop = (this.listscroll[i].numId - 1) * 50
						this.tabCur = this.listscroll[i].numId
						//console.log(scrollTop)
						return false
					}
				}
			}
		}
	}
</script>

<style>

</style>
