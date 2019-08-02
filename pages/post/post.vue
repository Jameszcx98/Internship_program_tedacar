<template>
	<view style="margin-bottom: 100upx;">
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">车辆信息</block>
		</cu-custom>
<!-- 排放标准 颜色 机械增压 -->
		<view class="cu-list menu">
			<!-- 卖车城市 -->
			<!--	<view class="cu-item" @tap="jump('city')">
				<view class="content">
					<text class="">卖车城市</text>
				</view>
				<view class="connect">
					<text class="">上海</text>
					<text class="cuIcon-right text-gray padding-left-xs"></text>
				</view>
			</view>	-->
			<form @submit="uploadCar">
			<view class="cu-bar bg-white solid-bottom" >
				<!-- @tap="jump('city')" -->
				<view class="cu-form-group">
					<text class="title">卖车城市</text>
					<input v-model="city" name="city"></input>
				</view>
			<!-- 	<view class="action">
					<text class="">上海</text>
					<text class="cuIcon-right text-xs text-gray padding-left-xs"></text>
				</view> -->
			</view>
			<!-- 卖车城市 -->

			<!-- 车辆牌照 -->
			<view class="cu-form-group solid-bottom">
				<text class="title">车辆牌照</text>
				<!-- <picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="carCard">
					<view class="picker">
						{{carCard[0][multiIndex[0]]}} {{carCard[1][multiIndex[1]]}}
					</view>
				</picker> -->
				<input v-model="plate" name="plate"></input>
			</view>
			<!-- 车辆牌照 -->
			
			<!-- 用户定价 -->
		<!-- 	<view class="cu-form-group solid-bottom">
				<text class="title">用户定价</text>
				<input v-model="price" name="price"></input>
				<text class="padding-left-xs">万元</text>
			</view> -->
			<!-- 用户定价 -->
			<!-- 行驶里程 -->
			<view class="cu-form-group solid-bottom">
				<text class="title">行驶距离</text>
				<input v-model="distance" name="distance"></input>
				<text class="padding-left-xs">万公里</text>
			</view>
			<!-- 行驶里程 -->
			
			<!-- 排放标准 -->
			<view class="cu-form-group ">
				<view class="title">排放标准</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'选择排放标准'}}
					</view>
				</picker>
			</view>
			<!-- 排放标准 -->
			
			<!-- 车辆颜色 -->
			<!-- <view class="cu-form-group ">
				<view class="title">排放标准</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'选择排放标准'}}
					</view>
				</picker>
			</view> -->
			<!-- 车辆颜色 -->
			
			<!-- 机械增压 -->
			<view class="cu-form-group solid-bottom">
				<text class="title">机械增压</text>
				<input v-model="superCharged" name="superCharged"></input>
				<text class="padding-left-xs">L</text>
			</view>
			<!-- 机械增压 -->

			
			

			<!-- 品牌车系 -->
			<view class="cu-bar bg-white solid-bottom" @tap="jump('carBrand')">
				<!-- @tap="jump('carBrand')" -->
				<view class="action">
					<text class="">品牌车系</text>
				</view>
				<view class="action">
					<view class="picker">
						选择品牌
					</view>
					
					<!-- <picker mode="selector" :value="brand" range="{{brandArray}}"  @change="BrandChange">
					<view class="picker">
						{{brand}}
					</view>
				</picker> -->
					
				</view>
			</view>
			
			<!-- <view class="cu-form-group ">
				<view class="title">Reference Number:</view>
				<input  v-model="RefNumber" name="RefNumber"></input>
			</view> -->
			<!-- 品牌车系 -->

			<!-- 上牌时间 -->
		<!-- 		<view class="cu-item">
				<view class="content">
					<text class="">上牌时间</text>
				</view>
				<view class="connect">
					<text class="text-gray">请选择上牌时间</text>
					<text class="cuIcon-right text-gray padding-left-xs"></text>
				</view>
			</view>	 -->
		<!-- 	<view class="cu-form-group solid-bottom">
				<view class="title">品牌车系</view>
				<picker mode="selector" :value="brand" start="2009-01-01" end="2019-06-01" @change="brandChange">
					<view class="picker">
						{{brand}}
					</view>
				</picker>
			</view> -->

			<view class="cu-form-group solid-bottom">
				<view class="title">上牌时间</view>
				<picker mode="date" :value="date" start="2009-01-01" end="2019-06-01" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
			<!-- 上牌时间 -->	

			

			<!-- 车况自评 -->
			<view class="cu-bar bg-white solid-bottom" @tap="showModal" data-target="ChooseModal">
				<view class="action">
					<text class="">车况自评</text>
				</view>
				<view class="action">
					<text class="text-gray">请选择车况</text>
					<text class="cuIcon-right text-gray padding-left-xs"></text>
				</view>
			</view>


			<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<view class="cu-bar bg-white">
						<view class="action text-blue" @tap="hideModal">取消</view>
						<view class="content">车况自评</view>
						<view class="action text-green" @tap="hideModal">确定</view>
					</view>


					<view class="padding-top padding-left flex">碰撞描述</view>
					
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox1" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'"
							 @tap="ChooseCheckbox1" :data-value="item.value">
							 {{item.name}}
							</button>
						</view>
					</view>

					<view class="padding-top padding-left flex">外观描述</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox2" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'" 
							@tap="ChooseCheckbox2" :data-value="item.value">
							{{item.name}}
							</button>
						</view>
					</view>

					<view class="padding-top padding-left flex">其他描述</view>
					<view class="grid col-3 padding-sm">
						<view v-for="(item,index) in checkbox3" class="padding-xs" :key="index">
							<button class="cu-btn gray block" :class="item.checked?'bg-teda':'line-gray'"
							 @tap="ChooseCheckbox3" :data-value="item.value">{{item.name}}
							</button>
						</view>
					</view>

				</view>
			</view>
			<!-- 车况自评 -->
			
		<!-- 	<view class="cu-form-group">
				<view class="title">品牌选择</view>
				<picker @change="PickerChange" :value="index" :range="carbrandlist">
					<view class="picker">
						{{index>-1?picker[index]:'选择品牌'}}
					</view>
				</picker>
			</view> -->

			<!-- 上传图片 -->
			<view class="cu-list bg-white margin-top-sm">
				<view class="action padding">
					车辆照片<text class="text-gray text-sm">（选填）</text>
				</view>
				<view class="flex-wrap padding-left padding-bottom text-gray">
					发布车辆照片，可以增加曝光度，让您的爱车卖得更快
				</view>
			</view>
			<OOS :upImgConfig="upImgOos"  @onUpImg="upOosData" @onImgDel="delImgInfo" ref="uImage"></OOS>

			<!-- <view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
						<image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">  
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view> -->
			<!-- 上传图片 -->


<!-- 在提交的时候把imglist里面的图片路径都转成base64  写在submit事件里  -->
			<view class="box margin-0 solid-top ">
				<view class="cu-bar bg-white btn-group padding-tb-sm">
					<button class="cu-btn bg-green text-white shadow-blur round margin-top-xl lg" form-type="submit">提交</button>
				</view>
			</view>
			
			</form>
		</view>
		<footMenu :pageUrl="'post'"></footMenu>


		
	</view>
</template>

<script>
	import data from '@/common/data.js'
	import Parse from '../../common/parse.js';
	import OOS from '../../components/sunui-upimg/sunui-upimg-alioos.vue';
	export default {
		components: {
			OOS
		},
		data() {
			return {
				oosArr: [],
				imgUrlArr:[],
			// 阿里云oos相关配置
			upImgOos: {
				aliConfig: {
					// 阿里云oos上传key_secret(后端传)
					AccessKeySecret: 'q5qgBsUVQzc9xF9NrhQuwzYCz5zGmI',
					// 阿里云oos上传key_id(后端传)
					OSSAccessKeyId: 'LTAIeuZ0sLZS7tsT',
					// 阿里云oos上传目录(必须存在)
					oosDirectory: 'car_products_pics',
					// 阿里云上传url
					url: 'http://tedacar.oss-us-east-1.aliyuncs.com/'
				},
				// 是否开启notli(开启的话就是选择完直接上传，关闭的话当count满足数量时才上传)
				notli: true,
				// 图片数量
				count: 4,
				// 上传图片背景修改
				upBgColor: '#E8A400',
				// 上传icon图标颜色修改(仅限于iconfont)
				upIconColor: '#eee',
				// 上传svg图标名称
				upSvgIconName: 'icon-certificate'
			},
				
				
				
				
				modalName: null,
				index: -1,
				multiIndex: [0, 0],
				carCard: [
					['沪', '津', '京', '渝', '冀', '豫', '云', '辽', '黑', '湘', '皖', '鲁', '新', '苏', '浙', '赣',
						'鄂', '桂', '甘', '晋', '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁', '琼'
					],
					['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
						'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
					]
				],
				date: '2016-12-25',
				imgList: [],
				checkbox1: [],
				checkbox2: [],
				checkbox3: [],
				//brandArray:['奥迪', '宝马', '奔驰', '特斯拉'],
				
				basearr:[], //存放上传的图片的base64

				city:"上海",
				plate:"沪A88888",
				distance:1,
				price:25,
				carbrandlist:[],
				crashlevel:0,
				appearancelevel:0,
				soaked:0,
				burned:0,
				emissionStandard:0,
				picker: ['国Ⅳ', '国Ⅴ', '国Ⅵ','欧Ⅲ','欧Ⅳ'],
				superCharged:0,
				
				
			};
		},
		onLoad(options) {
			console.log('options' + JSON.stringify(options));
			this.initDate = options;
			this.checkbox1 = data.checkbox1
			this.checkbox2 = data.checkbox2
			this.checkbox3 = data.checkbox3
			
			
			//页面加载时渲染品牌下拉框 这一段之后要移到carBrand.vue的onload中 点击那个页面的时候渲染
			Parse.Cloud.run('showCarList',{}).then( r=>{
				 this.carbrandlist = r
				 console.log("carbrandlist:",this.carbrandlist)
			}).catch( e => console.log("e:",e))
			

		},
		onUnload() {
			(this.imageList = []),
			(this.sourceTypeIndex = 2),
			(this.sourceType = ['拍照', '相册', '拍照或相册']),
			(this.sizeTypeIndex = 2),
			(this.sizeType = ['压缩', '原图', '压缩或原图']),
			(this.countIndex = 8);
		},
		onNavigationBarButtonTap(e) {
			//监听右上自定义按钮点击事件
			if (e.index == 0) {
				uni.switchTab({
					url: '../find'
				});
			}
		},
		methods: {
			
			uploadCar(e){
				//先把imglist中图片url都转成base64
				// console.log(this.imgList) //1
				
				let promises = this.imgList.map( x => {		  //x是imglist中的项 也就是url
					return uni.request({ 
						url: x,
						method:'GET',
						responseType: 'arraybuffer',						
					})				
				})
				
				
				// console.log(promises)
				//let resarr = []
				Promise.all( promises).then(r=>{
					// console.log(r[0][1])
					r.map(o =>{     //o是r中数组的每一项
						o.shift()  //去除数组中第一项的第一项 ok
						let base64 = wx.arrayBufferToBase64(o[0].data)
						base64 = 'data:image/jpeg;base64,' + base64 
						o[0].data = base64   
					})
					// console.log("r[0][0].data:",r[0][0].data)
					//console.log("r:",r)
					
					Parse.Cloud.run('uploadCar',{
						//放上传参数
						city:this.city,
						plate: this.plate,
						distance:this.distance,
						date:this.date,
						price:this.price,
						crash:this.crashlevel,
						appearance:this.appearancelevel,
						soaked:this.soaked,
						burned:this.burned,
						EmissionStandard:this.emissionStandard,
						superCharged:this.superCharged
						// base:r[0][0].data
					}).then(r=>{
						console.log("r")
					})
											
					} ).catch( err => {
						console.log("post-err:",err)
					})
					console.log("upload:",this.appearancelevel,this.crashlevel,this.superCharged)
					
					// console.log("basearr:",r) 
					// console.log("resarr:",resarr)
						
						
						
					// console.log("imglist[0]:",this.imgList[0])
					
					// Parse.Cloud.run('uploadCar',{
					// 	//放上传参数
					// 	city:this.city,
					// 	plate: this.plate,
					// 	distance:this.distance,
					// 	date:this.date
					// })
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			PickerChange(e) {
				this.index = e.detail.value
				console.log(e.detail.value)
				this.emissionStandard = Number(e.detail.value)
				console.log(this.emissionStandard)
			},
		
			
			
			ChooseCheckbox1(e) {
				let items = this.checkbox1;
				let values = e.currentTarget.dataset.value;
				//this.crashlevel = values
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
				
				for(let i=0;i<items.length;i++){
					if(items[i].checked){this.crashlevel = i+1}   //设定损伤等级
				}
				
				
				console.log("crashlevel:",this.crashlevel)
			},
			ChooseCheckbox2(e) {
				let items = this.checkbox2;
				let values = e.currentTarget.dataset.value;
				// console.log("values:",values)
				this.appearancelevel =  values
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						// console.log(items[i].value)
						break
					}
				}
				for(let i=0;i<items.length;i++){
					if(items[i].checked){this.appearancelevel = i+1}  //设定损伤等级
				}
				console.log("appLevel:",this.appearancelevel)
				
			},
			ChooseCheckbox3(e) {
				let items = this.checkbox3;
				let values = e.currentTarget.dataset.value;
				
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].value == values) {
						items[i].checked = !items[i].checked;
						break
					}
				}
				if(items[0].checked){this.soaked = 1}      //set soaked status
				if(!items[0].checked){this.soaked = 0}
				if(items[1].checked){this.burned = 1}     //set burned status
				if(!items[1].checked){this.burned = 0}
				console.log("soaked status:",this.soaked)
				console.log("burned status:",this.burned)
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			brandChange(e) {
				console.log(e.detail.brand)
				this.brand = e.detail.brand
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
			},
			jump(pageName){
				uni.navigateTo({
					url: `../${pageName}/${pageName}`,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			},
			
			submit() {
				var rule = [
					// 初步检查发布的内容
					{
						name: 'title',
						checkType: 'string',
						checkRule: '3,50',
						errorMsg: this.$t('index.ErrTitleLong')
					},
					{
						name: 'desc',
						checkType: 'string',
						checkRule: '3,300',
						errorMsg: this.$t('index.ErrContentLong')
					}
				];

				// 某些字段没有的时候，需要跳过某些 Role
				rule.map((x, index) => {
					if (!!this.formInput[x.name]) {} else {
						rule.splice(index, 1);
					}
				});
				console.log('rule' + JSON.stringify(rule));

				// 提交时候有些字段没有值，清理掉
				for (let x in this.formInput) {
					if (this.formInput[x] === '') {
						delete this.formInput[x];
					}
				}

				let checkRes = graceChecker.check(this.formInput, rule);
				if (!checkRes) {
					// 检查失败，就中断执行，报错
					uni.showToast({
						title: graceChecker.error,
						icon: 'none'
					});
					return false;
				}

				// 一些带有目标指向的发布，需要带上目标的ID 和 表名字
				let finalFormInput = {};
				if (this.initDate.targetId && this.initDate.targetName) {
					finalFormInput = Object.assign(this.formInput, {
						targetId: this.initDate.targetId,
						targetName: this.initDate.targetName,
						commentId: this.initDate.commentId
					});
				} else {
					finalFormInput = this.formInput;
				}

				Parse.Cloud.run(this.initDate.type, finalFormInput)
					.then(r => {
						console.log('r' + JSON.stringify(r));

						uni.showModal({
							title: this.$t('index.success'),
							showCancel: false,
							success() {
								uni.navigateBack({});
							}
						});
					})
					.catch(e => {
						console.log('e' + JSON.stringify(e));
					});
			},
			
			
			ChooseImage() {
				console.log("choosing.....")
				// console.log(typeof(this.basearr))  //basearr is an object
				uni.chooseImage({
					
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: res => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths);
							// console.log(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths;   //成功则返回图片的本地文件路径列表 tempFilePaths
							// console.log(res.tempFilePaths)
						}
						console.log("imgList: ",this.imgList)  //http://tmp/wxd2fa273880446a03.o6zAJszYHBbEC1jv5zc2RtYyfvR8.SOYtNyth3ReBa220c760184e03cf0fe4e5ef8c2ed838.png
					//imglist是一个数组 存放图片的url 接下来把这个url转换成base64 res.tempFilePaths
					 
						
					}
				});
				
			},
			
			
			
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1);
						}
					}
				});
			},
			close(e) {
				this.imageList.splice(e, 1);
			},
			chooseImage: async function() {
				if (this.imageList.length === 9) {
					let isContinue = await this.isFullImg();
					console.log('是否继续?', isContinue);
					if (!isContinue) {
						return;
					}
				}
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: this.imageList.length + this.count[this.countIndex] > 4 ? 4 - this.imageList.length : this.count[this.countIndex],
					success: res => {
						this.imageList = this.imageList.concat(res.tempFilePaths);
					}
				});
			},
			isFullImg: function() {
				return new Promise(res => {
					uni.showModal({
						content: '已经有9张图片了,是否清空现有图片？',
						success: e => {
							if (e.confirm) {
								this.imageList = [];
								res(true);
							} else {
								res(false);
							}
						},
						fail: () => {
							res(false);
						}
					});
				});
			},
			previewImage: function(e) {
				var current = e.target.dataset.src;
				// 					var current = 'https://i.loli.net/2019/02/18/5c6a6e2623448.jpg'
				// 					this.imageList = ['https://i.loli.net/2019/02/18/5c6a6e2623448.jpg','https://i.loli.net/2019/02/18/5c6a6e49829ea.jpg']
				console.log(current);
				console.log(this.imageList);
				uni.previewImage({
					current: current,
					urls: this.imageList
				});
			},
			touchStart: function(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},

			touchEnd: function(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			},

			// 测试

			uImageTap() {
				this.$refs.uImage.uploadimage(this.upImgOos);
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.oosArr.splice(e.index, 1));
				// 需要自己写删除
				console.log('eeeeeeeeeeeeee'+ JSON.stringify(this.oosArr) )
				Parse.Cloud.run('deleteImgAliOSS',{fileName: e.url }).then( r => {
					console.log('r' + JSON.stringify(r));
				}).catch( e => console.log(e) )
			},
			
			// 阿里云
			
			async upOosData(e) {
				// 上传图片数组
				let arrImg = [];
				for (let i = 0, len = e.length; i < len; i++) {
					try {
						if (e[i].path_server != '') {
							await arrImg.push(e[i].path_server.split(','));
						}
					} catch (err) {
						console.log('上传失败...');
					}
				}
				// 图片信息保存到data数组
				this.oosArr = arrImg;
				console.log("this.oosArr:",this.oosArr.length,this.oosArr)
				console.log("this.oosArr[0]:",this.oosArr[0][0])
				let urlList = await this.oosArr.map(x=>{
					return x[0].substring(41)   //分割字符串 或者正则表达式
				})
				
				
				//console.log(urlList)   //存储图片相对地址的数组
				
				
				// this.imgUrlArr = urlList
				// console.log("imgUrlArr:",imgUrlArr)
				

				// 可以根据长度来判断图片是否上传成功. 2019/4/11新增
				if (arrImg.length == this.upImgOos.count) {
					uni.showToast({
						title: `上传成功`,
						icon: 'none'
					});
				}
			},
			// 获取上传图片阿里云
			getUpImgInfoOos() {
				console.log('阿里云转成一维数组:', this.oosArr.join().split(','));
			}

			// 测试
		}
	};
</script>

<style>

</style>
