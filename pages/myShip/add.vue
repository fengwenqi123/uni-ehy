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
				<span>船舶登记证书</span>
				<span>点击上传图片</span>
			</li>
			<li>
				<span>船舶保险</span>
				<span>点击上传图片</span>
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
	export default {
		data() {
			return {
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

			li:first-child,
			li:nth-child(4) {
				border: 0;
				margin-bottom: 40rpx;
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
