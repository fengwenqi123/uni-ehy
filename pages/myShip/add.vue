<template>
	<view class="ehy-content">
		<ul class="list">
			<li>
				<span>认证类型</span>
				<span>船主/船代</span>
			</li>
			<li>
				<span>船舶名称（必填）</span>
				<input type="text" placeholder="请输入船舶名称" v-model="input.name">
			</li>
			<li>
				<span>船舶登记号（必填）</span>
				<input type="text" placeholder="请输入船舶登记号" v-model="input.cbdjh">
			</li>
			<li>
				<span>船舶识别号（必填）</span>
				<input type="text" placeholder="请输入船舶识别号" v-model="input.cbsbh">
			</li>
			<li>
				<span>图片上传</span>
			</li>
			<li class="img-up">
				<p>船舶登记证书</p>
				<ss-upload-image :url="url" :file-list="fileList1" :name="name" :limit="limit" @on-success="onSuccess1" @on-error="onError1"
				 @on-remove="onRemove1" @on-process="onProcess1"></ss-upload-image>
			</li>
			<li class="img-up">
				<span>船舶保险</span>
				<ss-upload-image :url="url" :file-list="fileList2" :name="name" :limit="limit" @on-success="onSuccess2" @on-error="onError2"
				 @on-remove="onRemove2" @on-process="onProcess2"></ss-upload-image>
			</li>
		</ul>
		<view class="button">
			<button type="primary" @click="postSubmitAuthen()">申请认证</button>
		</view>
	</view>
</template>

<script>
	import {
		submitAuthen
	} from '../../api/home';
	import ssUploadImage from '../../components/ss-upload-image/ss-upload-image'
	export default {
		components: {
			ssUploadImage
		},
		data() {
			return {
				fileList1: [],  //'https://api.cjbe88.com/storage/storage/d1d1201910171527275110.jpeg'
				fileName1: '',
				fileList2: [],
				fileName2: '',
				url: 'https://api.cjbe88.com/storage/storage',
				name: 'file',
				limit: 1,
				input: {
					name: '',
					cbdjh: '',
					cbsbh: ''
				}
			}
		},
		created() {
		},
		methods: {
			// 上传成功
			onSuccess1(res) {
				if (res.code === 200) {
					this.fileList1.push('https://api.cjbe88.com/storage/storage/' + res.data);
					this.fileName1 = 'https://api.cjbe88.com/storage/storage/' + res.data;
				}
				console.log(res)
				console.log(this.fileList1)
			},
			// 上传进程
			onProcess1(res) {
				console.log(res)
			},
			// 上传失败
			onError1(err) {
				console.log(err)
			},
			// 移除
			onRemove1(index) {
				this.fileList1.splice(index, 1);
				this.fileName1 = "";

			},
			// 上传成功
			onSuccess2(res) {
				if (res.code === 200) {
					this.fileList2.push('https://api.cjbe88.com/storage/storage/' + res.data);
					this.fileName2 = 'https://api.cjbe88.com/storage/storage/' + res.data;
				}
				console.log(res)
				console.log(this.fileList2)
			},
			// 上传进程
			onProcess2(res) {
				console.log(res)
			},
			// 上传失败
			onError2(err) {
				console.log(err)
			},
			// 移除
			onRemove2(index) {
				this.fileList2.splice(index, 1);
				this.fileName2 = "";
			},
			postSubmitAuthen() {
				submitAuthen(this.input.name, this.input.cbdjh, this.input.cbsbh, this.fileName1, this.fileName2)
					.then(res => {
						console.log(res);
						uni.navigateTo({
							url: '/pages/myShip/index',
							animationType: 'pop-in',
							animationDuration: 300
						});
					})
			}
		}
	}
</script>

<style scoped lang="scss">
	.ehy-content {
		.list {
			li {
				width: 100%;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border-bottom: 1px solid #ddd;
				padding: 0 32rpx;
				background: #fff;
				box-sizing: border-box;

				input {
					text-align: right;
				}
			}

			li:first-child {
				border: 0;
				margin-bottom: 40rpx;
			}

			li:nth-child(5) {
				height: 80rpx;
				color: #007AFF;
				background: #f2f2f2;
			}

			.img-up {
				height: 200rpx;
			}

			li:last-child {
				border: 0;
			}
		}

		.button {
			padding: 64rpx 32rpx;
		}
	}
</style>
