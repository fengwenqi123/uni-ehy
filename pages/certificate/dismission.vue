<template>
	<div class="container">
		<div class="title">当前任职情况</div>
		<div class="content" v-if="rzList.length > 0">
			<ul v-for="(item, index) in rzList" :key="index">
				<li>
					<div class="item">
						<div class="label">任职船名</div>
						<div class="value">{{ item.cbmc }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">上船任职时间</div>
						<div class="value">{{ item.createdate }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">职务</div>
						<div class="value">{{ item.zw }}</div>
					</div>
				</li>
			</ul>
		</div>
		<div class="title">历史任职情况</div>
		<div class="content" v-if="jzList.length > 0">
			<ul v-for="(item, index) in jzList" :key="index">
				<li>
					<div class="item">
						<div class="label">任职船名</div>
						<div class="value">{{ item.cbmc }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">上船任职时间</div>
						<div class="value">{{ item.createdate }}</div>
					</div>
				</li>
				<li>
					<div class="item">
						<div class="label">职务</div>
						<div class="value">{{ item.zw }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { jrzList } from '@/api/competencyCertificate';
export default {
	name: 'dismission',
	data() {
		return {
			page: 1,
			row: 99,
			dataList: null,
			rzList: [],
			jzList: [],
			name: null
		};
	},
	computed: {
		...mapGetters(['certificateInfo'])
	},
	created() {
		this.name = '王美琴';
		this.init();
	},
	methods: {
		init() {
			jrzList(this.page, this.row, this.name).then(response => {
				this.dataList = JSON.parse(response.data).records.data;
				this.getList();
			});
		},
		getList() {
			this.rzList = [];
			this.jzList = [];
			this.dataList.forEach((item, index) => {
				if (item.sfsc === 0) {
					this.jzList.push(item);
				} else {
					this.rzList.push(item);
				}
			});
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	.title {
		height: 70rpx;
		line-height: 70rpx;
		/*background: #ccc;*/
		color: #77777c;
		padding-left: 20rpx;
		font-size: 28rpx;
	}
	.content {
		padding:0 20rpx;
		
		ul {
			padding: 20rpx;
			background: #fff;
			display: flex;
			flex-wrap: wrap;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #ccc;
			li {
				width: 50%;
				margin-top: 20rpx;
				.value{
					margin-top: 16rpx;
				}
			}
		}
	}
}
</style>
