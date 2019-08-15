
 <template>
	<view class="page">
	 	<cu-custom :isBack="true" bgColor="bg-teda text-white">
	 		<block slot="backText">返回</block>
	 		<block slot="content">发布</block>
	 	</cu-custom>
 
		<!-- <cu-custom bgColor="bg-teda text-white">

			<block slot="content">评论</block>
		</cu-custom> -->
 		<!-- <cu-custom bgColor="my_header_background" :isBack="true">
 			<block slot="content">评论</block>
 		</cu-custom> -->
 
 		<view class="cu-bar bg-white solid-bottom ">
 			<view v-if="initDate.tip" class="action">
 				<text class="cuIcon-title text-orange"></text>
 				{{ initDate.tip }}
 			</view>
 
 			<view class="">
 				<button class="bg-teda margin padding-lr "  @tap="submit">
 					<text class="text-white bg-teda"> 发送 </text>
 				</button>
 			</view>
 		</view>
 
 		
 		
 		<view v-if="isShow" style="margin-top: 20upx;">
 			<view class="cu-bar bg-white margin-top">
 				<view class="action">
 					图片上传
 				</view>
 				<view class="action">
 					{{imgList.length}}/4
 				</view>
 			</view>
 			<OOS :upImgConfig="upImgOos"  @onUpImg="upOosData" @onImgDel="delImgInfo" ref="uImage"></OOS>
 		</view>
 		<form>
 			<view v-if="true" class="cu-form-group margin-top-sm"><input type="text" v-model="formInput.title" placeholder="" /></view>
 
 			<view class="cu-form-group margin-top-sm">
 				<textarea maxlength="-1" :placeholder="initDate.desc ? initDate.desc : i18n.commonDesc" v-model="formInput.desc"></textarea>
 			</view>
 		</form>
 		<onlybackfooter :Back='true'></onlybackfooter>
 	</view>
 </template>
 
 
<script>
var sourceType = [['camera'], ['album'], ['camera', 'album']];
var sizeType = [['compressed'], ['original'], ['compressed', 'original']];
import Parse from '../../common/parse.js';
let graceChecker = require('../../utils/graceChecker.js');

import OOS from '../../components/sunui-upimg/sunui-upimg-alioos.vue';

export default {
	components: {
		OOS
	},
	data() {
		
		return {
			initDate: {
				desc:'请输入内容'
			},
			formInput: {
				title: '有什么想说的',
				desc: '',
			},
	

	// 测试
			oosArr: [],
			// 阿里云oos相关配置
			upImgOos: {
				aliConfig: {
					// 阿里云oos上传key_secret(后端传)
					AccessKeySecret: 'q5qgBsUVQzc9xF9NrhQuwzYCz5zGmI',
					// 阿里云oos上传key_id(后端传)
					OSSAccessKeyId: 'LTAIeuZ0sLZS7tsT',
					// 阿里云oos上传目录(必须存在)
					oosDirectory: 'post_pictures',
					// 阿里云上传url
					url: 'https://tedacar.oss-us-east-1.aliyuncs.com/'
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
			// 测试
	
			imgList: [],
			// title: 'choose/previewImage',
			input_content: '',
			imageList: [],
			sourceTypeIndex: 2,
			sourceType: ['拍照', '相册', '拍照或相册'],
			sizeTypeIndex: 2,
			sizeType: ['压缩', '原图', '压缩或原图'],
			countIndex: 8,
			count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
	
			//侧滑返回start
			startX: 0, //点击屏幕起始位置
			movedX: 0, //横向移动的距离
			endX: 0 ,//接触屏幕后移开时的位置,
			isShow:true
			//end
		};
	},
	onLoad(options) {
		console.log('options' + JSON.stringify(options));
		this.initDate = options;
		if(this.initDate.commentId=='undefined'){this.isShow=true}else{this.isShow=false}
	
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
		submit() {
			this.formInput.targetId=this.initDate.targetId
			this.formInput.targetName=this.initDate.targetName
			this.formInput.commentId=this.initDate.commentId
			// this.formInput.targetId=this.initDate.targetId
			var rule = [
				// 初步检查发布的内容
				{ name: 'title', checkType: 'string', checkRule: '3,50', errorMsg: this.$t('index.ErrTitleLong') },
				{ name: 'desc', checkType: 'string', checkRule: '3,300', errorMsg: this.$t('index.ErrContentLong') },
			];

			// 某些字段没有的时候，需要跳过某些 Role
			rule.map((x, index) => {
				if (!!this.formInput[x.name]) {
				} else {
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
				uni.showToast({ title: graceChecker.error, icon: 'none' });
				return false;
			}
			
			// let getUserInfo = Parse.User.current()._toFullJSON().objectId;
			// console.log('getUserInfo'+getUserInfo)
			// let thisUserPointer =  Parse.Object.extend('User').createWithoutData(getUserInfo)
			
			// 一些带有目标指向的发布，需要带上目标的ID 和 表名字
			let finalFormInput = {};
			let image = {
				img:[],
			};
			let temp = [];
			
			
			
			if (this.initDate.targetId && this.initDate.targetName&&this.initDate.commentId!='undefined') {
			// console.log('+++++')
				finalFormInput = Object.assign(this.formInput, {
					targetId: this.initDate.targetId,
					targetName: this.initDate.targetName,
					// commentId: this.initDate.commentId 
				});
			} else {
				// console.log('---------')
				finalFormInput=this.formInput;
				var i=0;
				for(var key in this.oosArr)
				{
					let reg=new RegExp('https://tedacar.oss-us-east-1.aliyuncs.com/');
				    temp.push(this.oosArr[i].toString().replace(reg,''));
					i++;
				}
				
				image = {img:temp};
				Object.assign(finalFormInput,image);
				 console.log('---------'+JSON.stringify(finalFormInput))
				
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
			uni.chooseImage({
				count: 4, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: res => {
					if (this.imgList.length != 0) {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					} else {
						this.imgList = res.tempFilePaths;
					}
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
				count: this.imageList.length + this.count[this.countIndex] > 9 ? 9 - this.imageList.length : this.count[this.countIndex],
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
						console.log('err'+err)
						console.log('上传失败...');
					}
				}
				console.log('arrImg'+arrImg)
				// 图片信息保存到data数组
				this.oosArr = arrImg;
		
				
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

<style scoped>
.footer {
	margin-top: 80upx;
}

.cell-pd {
	padding: 20upx 30upx;
}

.uni-textarea {
	width: auto;
	padding: 20upx 25upx;
	line-height: 1.6;
	height: 150upx;
}
.uni-list::before {
	height: 0;
}
.uni-list:after {
	height: 0;
}
.list-pd {
	margin-top: 0;
}
.close-view {
	text-align: center;
	line-height: 22upx;
	height: 24upx;
	width: 24upx;
	border-radius: 50%;
	background: #ef5350;
	color: #ffffff;
	position: absolute;
	top: 6upx;
	right: 8upx;
	font-size: 24upx;
}
.page {
	width: 750upx;
	height: 100%;
}
</style>
