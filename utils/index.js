function formatNumber(n) {
	const str = n.toString()
	return str[1] ? str : `0${str}`
}

export function toParams(obj) { // 对象转为参数
	return Object.keys(obj).map(function(key) {
		return key + '=' + obj[key];
	}).join('&')
	 
}



//-------------------------------------------------------------------------请求的封装

const host = 'https://cause.wudizu.com/rest/V1';
const imgPath = 'https://cause.wudizu.com/pub/media/catalog/product/'

const itemPath = 'https://www.hopperdubai.com/pub/media/catalog/product/'
export {
	host,
	imgPath
}
//请求封装
function request(url, method, data, header = {}) {
	uni.showLoading({
		title: '加载中' //数据请求前loading
	})
	return new Promise((resolve, reject) => {
		uni.request({
			url: host + url, //仅为示例，并非真实的接口地址
			method: method,
			data: data,
			header: {
				'content-type': 'application/json', // 默认值，
				'Authorization': 'Bearer i6idbw5xbpiw8dk14cdvi77auygug9ce'

			},
			success: function(res) {
				uni.hideLoading();
				resolve(res.data)
			},
			fail: function(error) {
				uni.hideLoading();
				reject(false)
			},
			complete: function() {
				uni.hideLoading();
			}
		})
	})
}

export function getMagento(url, data) {
	return request(url, 'GET', data)
}
export function postMagento(url, data) {
	return request(url, 'POST', data)
}

//-------------------------------------------------------------------------请求的封装


//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function toLogin() {
	const userInfo = wx.getStorageSync('userInfo');
	if (!userInfo) {
		wx.navigateTo({
			url: "/pages/login/login"
		});
	} else {
		return true;
	}
}

export function login() {
	const userInfo = wx.getStorageSync('userInfo');
	if (userInfo) {
		return userInfo;
	}
}

//----------------------------------------------用户是否登录 未登录跳转到登录页面 -------------------------


export function getStorageOpenid() {
	const openId = wx.getStorageSync("openId");
	if (openId) {
		return openId;
	} else {
		return ''
	}
}




