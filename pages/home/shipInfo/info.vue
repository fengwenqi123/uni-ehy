<template>
	<view class="padding bg-white">
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船名</p>
					<p>{{items.zwcm || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船籍港</p>
					<p>{{items.cjgmc || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船检登记号</p>
					<p>{{items.cjdjh || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船舶登记号</p>
					<p>{{items.cbdjh || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船舶种类</p>
					<p>{{items.cbzlmc || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船舶识别号</p>
					<p>{{items.cbsbh || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>主机功率（千瓦）</p>
					<p>{{items.zjzgl || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>参考载货量</p>
					<p>{{items.ckzzd || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>总吨位</p>
					<p>{{items.zdw || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>净吨位</p>
					<p>{{items.jdw || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>吃水空载（米）</p>
					<p>{{items.kzcs || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>吃水满载（米）</p>
					<p>{{items.mzcs || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>总长</p>
					<p>{{items.cbzc || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>型宽（米）</p>
					<p>{{items.cbxk || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>型深（米）</p>
					<p>{{items.cbxs || '--'}}</p>
				</div>
			</view>
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船舶所有人</p>
					<p>{{items.syr || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>所有人法人</p>
					<p>{{items.syrfrdb || '--'}}</p>
				</div>
			</view><view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>经营人电话</p>
					<p>{{items.jyrlxdh || '--'}}</p>
				</div>
			</view>
		</view>
		<view class="flex">
			<view class="flex-sub padding-sm margin-xs radius">
				<div class="info">
					<p>船舶经营人</p>
					<p>{{items.jyr || '--'}}</p>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		shipInfo
	} from '../../../api/home';

	export default {
		data() {
			return {
				items: []
			}
		},
		props: ['cbsbh'],
		created() {
			this.getShipInfo();
		},
		methods: {
			getShipInfo() {
				shipInfo(this.cbsbh)
					.then(res => {
						console.log(res);
						this.items = res.data;
					})
			}
		}
	}
</script>

<style lang="scss">
	.info{
		p:first-child{
			color: #888;
		}
		p:last-child{
			line-height: 50rpx;
			color: #333333;
			font-size: 36rpx;
			padding-top: 20rpx;
		}
	}
</style>
