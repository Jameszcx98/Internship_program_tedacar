<template>
	<div class="qa">
		<cu-custom bgColor="bg-teda" :isBack="true">
			<block slot="backText">{{ i18n.qaBackItemDetail }}</block>
			<block slot="content">{{ i18n.qaFaq }}</block>
		</cu-custom>

		<div class="main">
			<div class="cu-bar bg-white padding-lr">
				<text>Feel free to ask cause one questions about makeuo and beauty</text>
				<button @tap="askQuestion" class="cu-btn round lg bg-red margin-left" style="flex-shrink: 0;">{{ i18n.qaAsk }}</button>
			</div>

			<div v-if="questions.length === 0" class="empty cu-bar justify-center margin-lg ">
				<text class="cuIcon-location text-xxl text-gray">{{ i18n.qaEmpty }}</text>
			</div>

			<!-- 聊天窗口 -->
			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item solid-bottom" v-for="(x, i) in questions" :key="i">
					<view class="cu-avatar round" :style="'background-image:url(' + x.user.wxProfile.avatarUrl + ')'"></view>
					<view class="content">
						<view>
							{{ x.user.wxProfile.nickName }}
							<text class="cuIcon-baby margin-left text-gray ">油性皮肤</text>
						</view>

						<view class="text-content text-df text-bold margin-tb-sm">{{ x.title }}</view>
						<view class="text-content text-df bg-gray padding-sm radius">{{ x.desc }}</view>

						<view>
							<text @tap="addLike" :data-targetId="x.objectId" :data-targetName=" 'Question' " class="cuIcon-appreciate text-green text-lg"></text>
							<text @tap="comment" :data-target="x.objectId" class="cuIcon-message text-lg text-green margin-left-sm"></text>
						</view>

						<view v-if="x.comment" v-for="(c, index) in x.comment" :key="index" class="bg-gray padding-sm radius margin-top-sm  text-sm">
							<view class="flex">
								<view class="flex-sub">
									<text v-if="c.user.wxProfile.nickName">{{ c.user.wxProfile.nickName }}</text>
									{{ c.desc }}
								</view>
								<view><text @tap="addLike" :data-targetId="c.objectId" :data-targetName=" 'Comment' " class="cuIcon-appreciate text-lg text-green margin-left-sm"></text></view>
							</view>
						</view>

						<view class="margin-top-sm flex justify-between"><view class="text-gray text-df">2018年12月4日</view></view>
					</view>
				</view>
			</view>

			<!-- 聊天窗口 -->
		</div>
	</div>
</template>

<script>
import Parse from '../../common/parse.js';
import { toParams } from '../../utils/index.js';
export default {
	mounted() {
		//判断是否登录获取用户信息
	},
	data() {
		return {
			questions: [],
			comments: []
		};
	},
	computed: {},
	components: {},
	onShow() {
		//
		this.getQuestions();
	},
	methods: {
		getComment() {
			if (!this.questions.length) return;
			this.questions.forEach((item, i) => {
				Parse.Cloud.run('getComment', {
					targetId: item.objectId
				})
					.then(r => {
						let c = r.map(x => x._toFullJSON());
						this.$set(item, 'comment', c);
						// console.log('this.questions' + JSON.stringify(this.questions));
					})
					.catch(e => {
						console.log('e' + JSON.stringify(e));
					});
			});
		},
		comment(e) {
			console.log('e' + JSON.stringify(e));
			let p = {
				targetId: e.mp.target.dataset.target, // 留言的对象ID
				targetName: 'Question', // 留言的对象名字
				pageTitle: this.$t('index.qaComment'),
				type: 'postComment',
				tip: this.$t('index.qaCommentTip'),
				desc: this.$t('index.qaCommentDesc')
			};
			uni.navigateTo({
				url: '../publish/publish?' + toParams(p)
			});
		},
		getQuestions() {
			Parse.Cloud.run('getQuestions', {
				sku: '1212'
			})
				.then(r => {
					this.questions = r.map(x => x._toFullJSON());
					console.log(this.questions);
					this.getComment();
				})
				.catch(e => {
					console.log(e);
				});
		},
		askQuestion() {
			let p = {
				pageTitle: this.$t('index.qaAskQuestion'),
				tip: this.$t('index.questionTip'),
				type: 'postQuestion',
				title: false,
				desc: ''
			};

			uni.navigateTo({
				url: '../publish/publish?' + toParams(p)
			});
		},
		makeComment() {},
		addLike(e){
			let targetId = e.mp.currentTarget.dataset.targetid
			let targetName = e.mp.currentTarget.dataset.targetname
			console.log('e' + JSON.stringify(e));
			Parse.Cloud.run('addLike',{
				targetId,
				targetName
			}).then( r => {
				console.log('r' + JSON.stringify(r));
				
			}).catch( e => {
				console.log('e' + JSON.stringify(e));
			})
		}
	}
};
</script>
