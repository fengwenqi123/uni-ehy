<template>
	<view class="sewage">
		<div class="top">
			<p>您当前位于</p>
			<p>
				<span>{{ recoveryInfo.address }}</span>
				<span>生活污水回收点</span>
			</p>
		</div>
		<div class="content">
			<p>
				<span>回收类型</span>
				<span>生活污水回收</span>
			</p>
			<p>
				<span>船舶名称</span>
				<span>{{ recoveryInfo.shipName }}</span>
			</p>
			<p>
				<span>回收点</span>
				<span>{{ recoveryInfo.siteName }}</span>
			</p>
			<p>
				<span>排放口</span>
				<span>{{ recoveryInfo.name }}</span>
			</p>
			<p>
				<span>排放口类型</span>
				<span>{{ recoveryInfo.attribute === 1 ? '智能' : '普通' }}</span>
			</p>
			<p v-if="recoveryInfo.attribute !== 1">
				<span>排放容积(L)</span>
				<input  v-model="amount" placeholder="请输入排放容积"></input>
			</p>
		</div>
		<div class="bottom" v-if="recoveryInfo.attribute === 1"><button :loading="isLoading" @click="submit">确认开始排放</button></div>
		<div class="bottom" v-if="recoveryInfo.attribute !== 1"><button :loading="isLoading" @click="submit1">确认排放</button></div>
	    <report></report>
	</view>
</template>

<script>
import { discharge } from '@/api/sewage.js';
import report from '../../../components/report.vue'
export default {
	onLoad(option) {
		const item = option;
		this.recoveryInfo = JSON.parse(item.info);
		console.log(this.recoveryInfo);
		this.recoveryCode = item.code;
		console.log(this.recoveryCode);
	},
	components:{
		report
	},
	data() {
		return {
			value: '请输入容积',
			isLoading: false,
			amount: '',
			recoveryCode: '',
			recoveryInfo: {}
		};
	},
	methods: {
		submit() {
			this.isLoading = true;
			const obj = {
				type: 1,
				shipName: this.recoveryInfo.shipName,
				code: this.recoveryCode,
				orderWay: 1
			};
			discharge(obj).then(response => {
				uni.showToast({
					icon: 'success',
					title: response.msg
				});
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/sewage/success/index?type=1&attr=${this.recoveryInfo.attribute}`
					});
				}, 2000);
			});
		},
		submit1() {
			console.log('是是是', this.amount);
			if (this.amount === '') {
				uni.showToast({
					icon: 'none',
					title: '请填写排放容积'
				});
				return;
			}
			const obj = {
				type: 1,
				shipName: this.recoveryInfo.shipName,
				code: this.recoveryCode,
				amount: this.amount,
				orderWay: 1
			};
			discharge(obj).then(response => {
				uni.showToast({
					icon: 'success',
					title: response.msg
				});
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/sewage/success/index?type=1&attr=${this.recoveryInfo.attribute}`
					});
				}, 2000);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.sewage {
	width: 100%;
	.top {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		background-color: #007aff;
		p {
			font-size: 28rpx;
			color: #fff;
		}
		p:nth-child(1) {
			width: 30%;
			line-height: 35rpx;
		}
		p:nth-child(2) {
			width: 50%;
			line-height: 35rpx;
			span {
				text-align: right;
				display: block;
			}
		}
	}
	.content {
		background: #fff;
		p {
			height: 80rpx;
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			span:nth-child(1) {
				color: #888;
			}
			span:nth-child(2) {
				color: #333;
			}
			input {
				text-align: right;
			}
		}
	}
	.bottom {
		width: 100%;
		padding: 5% 0;
		button {
			margin: 0 auto;
			width: 90%;
			background-color: #007aff;
			color: #ffffff;
		}
	}
}
</style>
