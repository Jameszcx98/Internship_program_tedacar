<template>
	<view>
		<cu-custom :isBack="true" bgColor="bg-teda text-white">
			<block slot="backText">返回</block>
			<block slot="content">个人资料</block>
		</cu-custom>
		<form>
			<!--  个人资料编辑  -->
			<view class="cu-bar bg-white margin-0">
				<view class="action text-black">
					头像
				</view>
				<view class="action">
					{{imgList.length}}/1
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="cu-form-group margin-0">
				<view class="title">昵称</view>
				<input placeholder="请输入昵称" name="input"></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">简介</view>
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="介绍一下自己吧"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择性别'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">地区</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			
			<view class="cu-form-group">
				<view class="title">生日</view>
				<picker mode="date" :value="date" start="1949-10-01" end="2019-05-21" @change="DateChange">
					<view class="picker">
						{{date}}
					</view>
				</picker>
			</view>
	
			<!--  个人资料编辑  -->
		</form>
		<view class="box margin-0 solid-top ">
			<view class="cu-bar bg-white btn-group padding-tb-sm">
				<button class="cu-btn bg-green text-white shadow-blur round margin-top-xl lg">保存</button>
			</view>
		</view>
	</view>
</template>
	
<script>
	
	export default {
		data() {
			return {
				modalName: null,
				textareaAValue: '',
				index: -1,
				picker: ['男', '女', '保密'],
				region: ['上海市', '上海市', '徐汇区'],
				date: '1990-06-15',
				imgList: [],
			}
		},
		methods: {
			PickerChange(e) {
				this.index = e.detail.value
			},
			RegionChange(e) {
				this.region = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
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
					title: '您好',
					content: '确定要删除这个头像吗？',
					cancelText: '保留',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			}
		}
	}
</script>

<style>

</style>