<template>
	<view class="sewage">
		<div class="top">
			<p>您当前位于</p>
			<p>
				<span>{{ recoveryInfo.address }}</span>
				<span>生活垃圾投放点</span>
			</p>
		</div>
		<div class="content">
			<p>
				<span>回收类型</span>
				<span>生活垃圾投放</span>
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
				<span>回收点类型</span>
				<span>{{ recoveryInfo.attribute === 1 ? '智能' : '普通' }}</span>
			</p>
			<p>
				<span>垃圾分类</span>
				<span>{{ recoveryInfo.type === 3 ? '厨余垃圾' : recoveryInfo.type === 4 ? '其他垃圾' : recoveryInfo.type === 5 ? '可回收垃圾' : '有害垃圾' }}</span>
			</p>
			<p v-if="recoveryInfo.attribute !== 1">
				<span>投放重量(KG)</span>
				<input  v-model="amount" placeholder="请输入重量"></input>
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
	data() {
		return {
			value: '请输入重量',
			isLoading: false,
			amount: '',
			recoveryCode: '',
			recoveryInfo: {}
		};
	},
	components:{
		report
	},
	methods: {
		submit() {
			this.isLoading = true;
			const obj = {
				type: 3,
				shipName: this.recoveryInfo.shipName,
				code: this.recoveryCode,
				refuseType: parseFloat(this.recoveryInfo.type) - 2,
				orderWay: 1
			};
			discharge(obj).then(response => {
				uni.showToast({
					icon: 'success',
					title: response.msg
				});
				setTimeout(() => {
					uni.navigateTo({
						url: `/pages/sewage/success/index?type=3&attr=${this.recoveryInfo.attribute}`
					});
				}, 2000);
			});
		},
		submit1() {
			console.log('是是是', this.amount);
			if (this.amount === '') {
				uni.showToast({
					icon: 'none',
					title: '请填写投放重量'
				});
				return;
			}
			const obj = {
				type: 3,
				shipName: this.recoveryInfo.shipName,
				code: this.recoveryCode,
				refuseType: parseFloat(this.recoveryInfo.type) - 2,
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
						url: `/pages/sewage/success/index?type=3&attr=${this.recoveryInfo.attribute}`
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
