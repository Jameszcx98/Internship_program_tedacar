import state from './state.js'
import Parse from '../common/parse.js';

const mutations = {

	needLogin(state) {
		if (!!state.wxProfile.nickName) { // 但是如果userinfo 有，还要检查 session
			uni.checkSession({
				success(r) {
					console.log('登录状态还在' + JSON.stringify(r));
				},
				fail(e) {
					console.log('登录失效' + JSON.stringify(e));
					uni.navigateTo({
						url: '../login/login'
					})
				}
			})

		} else {
			uni.navigateTo({
				url: '../login/login'
			})

		}


	},

	setWxProfiles(state, wxProfiles) { // 同步用户的微信信息
		state.wxProfile = wxProfiles
	},

	setLang(state, v) {
		state.lang = v
	},

	setNotice(state, v) {
		state.globalNotice = v
	},

	setUncomingCorner(state, v) {
		state.uncomingCorner = v
	},

	addOnlineUser(state, v) {
		if (state.onlineUser.toString().indexOf(v) === -1) {
			state.onlineUser.push(v)
		}
	},
	setScreenResults(state, v) {//存储筛选结果
		state.screenResults = v
	},
	reduceOnlineUser(state, v) {

		Array.prototype.indexOf = function(val) {
			for (var i = 0; i < this.length; i++) {
				if (this[i] == val) return i;
			}
			return -1;
		};

		Array.prototype.remove = function(val) {
			var index = this.indexOf(val);
			if (index > -1) {
				this.splice(index, 1);
			}
		};

		state.onlineUser.remove(v)
	},
	setOpenId(state, openId) {
		state.openId = openId
	},
	
	setConvoId(state, x) {    // Set conversation id
		state.convoId[x.user1 + x.user2] = x.convoId;
		state.convoId[x.user2 + x.user1] = x.convoId;
		console.log("Conversation Ids: ", state.convoId);
		
	},


}

export default mutations
