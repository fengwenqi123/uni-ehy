<template>
	<view class="container">
		<div class="list">
			<ul>
				<li @click="chooseImage">
					<div class="item header">
						<div class="label"><div class="name">头像</div></div>
						<div class="right">
							<image class="hedimg" :src="user.headImage" mode=""></image>
							<image src="../../static/img/i-right.png" mode=""></image>
						</div>
					</div>
				</li>
				<li>
					<div class="item nicheng">
						<div class="label"><div class="name">账号昵称</div></div>
						<div class="right">
							<div class="name">{{ user.name }}</div>
							<image src="../../static/img/i-right.png" mode=""></image>
						</div>
					</div>
				</li>
				<li v-for="(item, index) in list" :key="index">
					<div class="item" @click="localTo(index)">
						<div class="label">
							<div class="name">{{ item.name }}</div>
						</div>
						<div class="right"><image src="../../static/img/i-right.png" mode=""></image></div>
					</div>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
import { getUserInfo, getToken } from '@/utils/cache.js';
import { updatePhoto } from '@/api/personal.js';
export default {
	data() {
		return {
			user: getUserInfo(),
			list: [
				{
					name: '地区',

					path: ''
				},
				{
					name: '修改密码',

					path: ''
				},
				{
					name: '退出',

					path: ''
				}
			]
		};
	},
	methods: {
		localTo(index) {
			const url = this.list[index].path;
			uni.navigateTo({
				url,
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		chooseImage() {
			var _this = this;
			uni.chooseImage({
				count: 1, //默认9
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: function(res) {
					console.log(JSON.stringify(res.tempFilePaths));
					_this.setupdatePhoto(res.tempFilePaths);
				}
			});
		},
		setupdatePhoto(photo) {
			updatePhoto({ accessToken: getToken(), photo }).then(response => {});
		}
	}
};
</script>
<style scoped lang="scss">
.container {
	width: 100%;
}
.list {
	ul {
		li {
			padding: 0 32rpx;
			background: rgba(255, 255, 255, 1);
			border-bottom: 1px solid #d8d8d8;
			.item {
				width: 100%;
				height: 104rpx;

				display: flex;
				align-items: center;
				justify-content: space-between;
				.label {
					display: flex;
					align-items: center;
					.name {
						font-size: 30rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
				.right {
					display: flex;
					align-items: center;
					image {
						width: 16rpx;
						height: 36rpx;
						margin-left: 30rpx;
					}
					.hedimg {
						width: 120rpx;
						height: 120rpx;
						border-radius: 50%;
					}
					.name {
						font-size: 34rpx;
						font-weight: 400;
						color: rgba(136, 136, 136, 1);
					}
				}
			}
			.header {
				height: 160rpx;
			}
		}
		li:last-child {
			border: none;
		}
	}
}
</style>
