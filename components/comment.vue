<template>
	<div class="comment">
		<div class="cu-bar bg-white padding-lr justify-end">
			<button @tap="comment" class="cu-btn radius sm-border margin-left " style="flex-shrink: 0; "> <text class="cuIcon-comment margin-right-sm"></text> {{ i18n.commonComment }}</button>
		</div>

		<!-- 聊天窗口 -->
			<view class="cu-list menu-avatar comment solids-top">
				<view class="cu-item solid-bottom" v-for="(x, i) in comments" :key="i">
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
</template>

<script>
import Parse from '../common/parse.js';
import { toParams } from '../utils/index.js';
export default {
	
	props:['initData'],
	
	data() {
		return {
			
			comments: []
		};
	},
	computed: {},
	components: {},
	mounted() {
		console.log('hughhgh'+JSON.stringify(this.initData));
		this.getCommentList();
	},
	methods: {
		getCommentList(){ // 常规评论，顶层评论
		
			console.log('huvh'+JSON.stringify(this.initData));
			Parse.Cloud.run('getComment', {
				targetId : this.initData.objectId, // 这一次请求带ID, 不请求回复的评论
				targetName: this.initData.targetName // 限制评论类型
			})
				.then(r => {
					this.comments = r.map(x => x._toFullJSON());
					console.log('拿到评论列表' + JSON.stringify(this.comments));
					this.getComment();
				})
				.catch(e => {
					console.log(e);
				});
		},
		getComment() {
			if (!this.comments.length) return;
			this.comments.forEach((item, i) => {
				Parse.Cloud.run('getComment', {
					commentId: item.objectId,
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
		comment(e) { // 去发布评论
			console.log('e' + JSON.stringify(e.mp.target.dataset.target));
			let commentId = e.mp.target.dataset.target
			let p = {
				commentId: !!commentId ? commentId : '', // 评论的类型
				targetId: this.initData.objectId, // 留言的对象ID
				targetName: this.initData.targetName, // 留言的对象名字
				pageTitle: this.$t('index.qaComment'),
				type: 'postComment',
				tip: this.$t('index.qaCommentTip'),
				desc: this.$t('index.qaCommentDesc')
			};
			uni.navigateTo({
				url: '../publish/publish?' + toParams(p)
			});
		},
	
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

}
</script>

<style>
</style>
