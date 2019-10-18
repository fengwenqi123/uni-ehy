<template>
	<div class="container">
		<div class="header">
			<div class="line">
				<div class="name">{{ name }}</div>
				<div class="sex">
					<image :src="image" mode=""></image>
					{{ xb === 1 ? '男' : '女' }}
				</div>
				<div class="score">
					累计记分:
					<span>0</span>
				</div>
			</div>
			<div class="line">
				<div class="label">身份证号码</div>
				<div class="value">{{ idCard }}</div>
			</div>
		</div>
		<div class="certificate">
			<ul v-for="(item, index) in data" :key="index">
				<li>
					<div class="item">
						<div class="label">证书编号</div>
						<div class="value">{{ item.zshm }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">适任等级/职务</div>
						<div class="value">{{ item.srzwmc }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">签发机构</div>
						<div class="value">{{ item.qfjg }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">签发日期</div>
						<div class="value">{{ item.qfrq }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">有效期止</div>
						<div class="value">{{ item.jzrq }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	data() {
		return {
			image: require('@/static/img/man.png'),
			name: null,
			xb: null,
			idCard: null,
			data:null
		};
	},
	computed: {
		...mapGetters(['certificateInfo'])
	},
	created() {
		console.log(this.certificateInfo)
		this.name = this.certificateInfo[0].xm
		this.xb = this.certificateInfo[0].xb
		this.idCard = this.certificateInfo[0].sfzhm
		this.data=this.certificateInfo
	}
};
</script>

<style scoped lang="scss">
.container {
	width: 100%;
	padding: 0 24rpx;
	.header {
		margin-top: 20rpx;
		background: #ffffff;
		padding: 24rpx;
		.line {
			display: flex;
			align-items: flex-end;
			.name {
				font-size: 40rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
			.sex {
				margin-left: 70rpx;
				font-size: 30rpx;
				font-weight: 400;
				color: rgba(51, 51, 51, 1);
				display: flex;
				align-items: flex-end;
				image {
					width: 32rpx;
					height: 32rpx;
					margin-right: 10rpx;
				}
			}
			.score {
				text-align: right;
				margin-left: 120rpx;
				width: 250rpx;
				font-size: 26rpx;
				font-weight: 400;
				color: rgba(102, 102, 102, 1);
			}
		}
		.line:nth-child(2) {
			margin-top: 20rpx;
			.label {
				font-size:26rpx;
				font-weight:400;
				color:rgba(102,102,102,1);
			}
			.value {
				font-size: 30rpx;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				margin-left: 22rpx;
			}
		}
	}
	.certificate {
		background: #fff;
		margin-top: 30rpx;

		ul {
			display: flex;
			flex-wrap: wrap;
			padding: 30rpx;
			border-bottom: 1rpx solid #ccc;

			li {
				width: 50%;
				margin-top: 20rpx;

				.item {
					.value {
						margin-top: 10rpx;
					}
				}
			}

			li:nth-child(1) {
				width: 100%;
			}
		}
	}
}
</style>
