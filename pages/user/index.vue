<template>
	<view class="container">
		<!-- <view class="status_bar"></view> -->
		<view class="header">
			<div class="main" @click="login">
				<div class="info">
					<div class="img"><image :src="user.headImage" mode=""></image></div>
					<div class="name">
						<p class="p1">{{ user.name }}</p>
						<p class="p2">{{ user.mobile }}</p>
					</div>
				</div>
				<div class="set"><image src="../../static/img/set.png" mode=""></image></div>
			</div>
		</view>
		<div class="list">
			<ul>
				<li v-for="(item, index) in list" :key="index">
					<div class="item" @click="localTo(index)">
						<div class="label">
							<image :src="item.icon" mode=""></image>
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
import { getUserInfo, removeToken, removeUserInfo } from '@/utils/cache.js';
export default {
	data() {
		return {
			user: {
				name: '未登录',
				mobile: '',
				headImage: ''
			},
			list: [
				{
					name: '我的船舶',
					icon: require('@/static/img/i-ship.png'),
					path: '/pages/myShip/index'
				},
				{
					name: '消息管理',
					icon: require('@/static/img/i-msg.png'),
					path: '/pages/message/index'
				},
				{
					name: '船员适任证',
					icon: require('@/static/img/i-cer.png'),
					path: '/pages/certificate/index'
				},
				{
					name: '关于我们',
					icon: require('@/static/img/i-about.png'),
					path: '/pages/about/index'
				}
				// {
				// 	name: '检查新版本',
				// 	icon: require('@/static/img/i-update.png'),
				// 	path: ''
				// },
				// {
				// 	name: '二维码',
				// 	icon: require('@/static/img/i-ewm.png'),
				// 	path: ''
				// }
			]
		};
	},
	onShow() {
		this.isLogin();
	},
	methods: {
		isLogin() {
			const noLogin = {
				name: '未登录',
				mobile: '',
				headImage: ''
			};
			this.user = getUserInfo() || noLogin;
		},
		login() {
			if (getUserInfo()) {
				uni.navigateTo({
					url: '/pages/personal/index',
					animationType: 'pop-in',
					animationDuration: 300
				});
			} else {
				uni.navigateTo({
					url: '/pages/login/index',
					animationType: 'pop-in',
					animationDuration: 300
				});
			}
		},
		localTo(index) {
			const url = this.list[index].path;
			uni.navigateTo({
				url,
				animationType: 'pop-in',
				animationDuration: 300
			});
		}
	}
};
</script>
<style scoped lang="scss">
.container {
	width: 100%;
	position: relative;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
	background: #007aff;
}
.header {
	background: url(../../static/img/background.png) no-repeat;
	background-size: 100% 100%;
	height: 295rpx;
	width: 100%;
	padding: 0 32rpx 0 72rpx;
	.main {
		padding-top: 132rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.info {
			display: flex;
			align-items: center;
			.img {
				background: #ffffff;
				border-radius: 50%;
				image {
					border-radius: 50%;
					height: 124rpx;
					width: 124rpx;
				}
			}
			.name {
				margin-left: 30rpx;
				.p1 {
					font-size: 34rpx;
					font-weight: bold;
					color: rgba(255, 255, 255, 1);
				}
				.p2 {
					font-size: 30rpx;
					margin-top: 20rpx;
					font-weight: 500;
					color: rgba(255, 255, 255, 1);
				}
			}
		}
		.set {
			image {
				height: 30rpx;
				width: 30rpx;
			}
		}
	}
}
.list {
	ul {
		li {
			padding: 0 32rpx;
			background: rgba(255, 255, 255, 1);
			.item {
				width: 100%;
				height: 104rpx;

				display: flex;
				align-items: center;
				justify-content: space-between;
				.label {
					display: flex;
					align-items: center;
					image {
						width: 30rpx;
						height: 30rpx;
					}
					.name {
						font-size: 30rpx;
						margin-left: 30rpx;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
				.right {
					image {
						width: 16rpx;
						height: 36rpx;
					}
				}
			}
		}
		li:nth-child(4) {
			margin-top: 20rpx;
		}
	}
}
</style>
