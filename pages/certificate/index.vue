<template>
	<div class="container">
		<div class="form">
			<view class="input">
				<view class="title">姓名</view>
				<input v-model="form.name" placeholder="请输入姓名" />
			</view>
			<view class="input">
				<view class="title">身份证号码</view>
				<input v-model="form.idCard" type="text" placeholder="请输入身份证号码" />
			</view>
		</div>
		<div class="botton" @click="submit"><button type="primary">查 询</button></div>
	</div>
</template>
<script>
import { search } from '@/api/competencyCertificate';
export default {
	name: 'index',
	data() {
		return {
			form: {
				name: '',
				idCard: ''
			}
		};
	},
	methods: {
		submit() {
			search(this.form.name, this.form.idCard).then(response => {
				let data = null;
				if (response.data.dataList.length > 0) {
					data = response.data.dataList;
					this.$store.commit('SET_certificateInfo', data);
					uni.navigateTo({
						url: '/pages/certificate/cerDetails'
					});
				} else {
					uni.showToast({
						title: '查无数据',
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	background: #ffffff;
	.tab {
		position: relative;
	}
	.form {
		padding: 0 50rpx;
		.input {
			margin-top: 20rpx;
			border-bottom: 1rpx solid #d8d8d8;
			display: flex;
			height: 80rpx;
			justify-content: space-between;
			align-items: center;
			.title {
				image {
					width: 36rpx;
					height: 36rpx;
					margin-right: 30rpx;
				}
			}
			input {
				width: 450rpx;
				text-align: right;
			}
			.forget {
				font-size: 28rpx;

				font-weight: 500;
				color: rgba(102, 102, 102, 1);
			}
		}
	}
	.botton {
		width: 658rpx;
		margin: 60rpx auto;
		button {
			height: 94rpx;
			line-height: 94rpx;
			background: rgba(16, 142, 233, 1);
			border-radius: 20rpx;
			font-size: 30rpx;
			font-weight: 500;
			color: rgba(255, 255, 255, 1);
		}
	}
}
</style>
