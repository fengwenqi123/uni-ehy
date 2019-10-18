<template>
	<view class="container">
		<div class="list">
			<ul>
				<li @click="check">
					<div class="item header">
						<div class="label"><div class="name">头像</div></div>
						<div class="right">
							<ss-upload-image
								:url="url"
								ref="upload"
								:file-list="fileList"
								:name="name"
								:limit="limit"
								@on-success="onSuccess"
								@on-error="onError"
							></ss-upload-image>
							<image src="../../static/img/i-right.png" mode=""></image>
						</div>
					</div>
				</li>
				<li @click="editName">
					<div class="item nicheng">
						<div class="label"><div class="name">账号昵称</div></div>
						<div class="right">
							<div class="name">{{ user.name }}</div>
							<image src="../../static/img/i-right.png" mode=""></image>
						</div>
					</div>
				</li>
				<li @click="editCity">
					<div class="item nicheng">
						<div class="label"><div class="name">地区</div></div>
						<div class="right">
							<div class="name">{{ province }} {{ city }}</div>
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
import { getUserInfo, getToken, removeToken, removeUserInfo, saveUserInfo } from '@/utils/cache.js';
import { updatePhoto, userInfoById } from '@/api/personal.js';
import ssUploadImage from '@/components/ss-upload-image/ss-upload-image1';
import { online } from '@/api/login.js';
export default {
	data() {
		return {
			user: null,
			token: getToken(),
			city: '',
			province: '',
			list: [
				{
					name: '修改密码',

					path: ''
				},
				{
					name: '退出',

					path: ''
				}
			],
			url: 'https://api.cjbe88.com/storage/storage/',
			fileList: [], //'https://api.cjbe88.com/storage/storage/d1d1201910171527275110.jpeg'
			fileName: '',
			name: 'file',
			limit: 1
		};
	},

	components: {
		ssUploadImage
	},
	onShow() {
		this.checkOnline();
		this.getCity();
	},
	methods: {
		checkOnline() {
			if (this.token) {
				online(this.token)
					.then(response => {
						this.user = response.data;
						this.fileList = [response.data.headImage];
						saveUserInfo(response.data);
					})
					.catch(err => {
						console.log(err);
						removeToken();
						removeUserInfo();
					});
			}
		},
		getCity() {
			userInfoById().then(response => {
				this.city = response.data.city;
				this.province = response.data.province;
			});
		},
		check() {
			this.$refs.upload.chooseImage();
		},
		// 上传成功
		onSuccess(res) {
			if (res.code === 200) {
				this.fileName = 'https://api.cjbe88.com/storage/storage/' + res.data;
				this.set_updatePhoto(this.fileName);
			}
			console.log(res);
			console.log(this.fileList);
		},
		// 上传进程
		onProcess(res) {
			uni.showLoading({
				title: '正在加载...',
				mask: false
			});
		},
		// 上传失败
		onError(err) {
			uni.showToast({
				title: '上传失败',
				icon: 'none'
			});
		},
		localTo(index) {
			const url = this.list[index].path;
			uni.navigateTo({
				url,
				animationType: 'pop-in',
				animationDuration: 300
			});
		},
		set_updatePhoto(photo) {
			updatePhoto({ photo }).then(response => {
				uni.hideLoading();
				this.fileList = [photo];
				console.log(response);
			});
		},
		editName() {
			uni.navigateTo({
				url: '/pages/personal/newName',
				animationType: 'pop-in',
				animationDuration: 300  
			});
		},
		editCity() {
			console.log(this.city)
			uni.navigateTo({
				url: `/pages/personal/selectCity?city=${this.city}`,
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
