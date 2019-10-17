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
				<ss-upload-image :url="url" :file-list="fileList" :name="name" :limit="limit" @on-success="onSuccess" @on-error="onError" @on-remove="onRemove" @on-process="onProcess"></ss-upload-image>
			</li>
			<li class="img-up">
				<span>船舶保险</span>
				<ss-upload-image :url="url" :file-list="fileList" :name="name" :limit="limit" @on-success="onSuccess" @on-error="onError" @on-remove="onRemove" @on-process="onProcess"></ss-upload-image>
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
				fileList: [],
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
			 // this.fileList.push('https://api.cjbe88.com/storage/storage/'); 
		},
		methods: {
			// 上传成功
			onSuccess(res) {
			  // 响应示例
			  // {
			  //    code: 0,
			  //    data: {
			  //      image_url: 'http://www.xxxxx.png'
			  //    },
			  //    message: '上传成功'
			  // }
			  if (res.code === 200) {
			    this.fileList.push('https://api.cjbe88.com/storage/storage/'+ res.data); 
			  }
			  console.log(res)
			  console.log(this.fileList) 
			},
			// 上传进程
			onProcess(res) {
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			  console.log(err)
			},
			// 移除
			onRemove(index) {
			  this.fileList.splice(index, 1)
			},
			postSubmitAuthen() {
				console.log(this.input)
				submitAuthen(this.input.name,this.input.cbdjh,this.input.cbsbh)
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

				uni-input {
					text-align: right;
				}
			}

			li:first-child{
				border: 0;
				margin-bottom: 40rpx;
			}
			li:nth-child(5){
				height: 80rpx;
				color: #007AFF;
				background: #f2f2f2;
			}
			.img-up{
				height: 200rpx;
			}

			li:last-child {
				border: 0;
			}
		}
		.button{
			padding: 64rpx 32rpx;
		}
	}
</style>
