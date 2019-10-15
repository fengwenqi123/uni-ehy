<template>
	<view class="ehy-content">
		<div class="header">
			<div class="top">
				<div>
					<image src="../../static/img/address.png" alt="">
					<span>湖州市</span>
				</div>
				<p>e航运</p>
			</div>
			<div class="weather">
				<div>
					<p>21℃</p>
					<p>多云 西风 3级</p>
				</div>
				<div @click="water()">
					<image src="../../static/img/water.png" alt="">
				</div>
			</div>
		</div>
		<div class="login">

		</div>
		<div class="info">

		</div>
		<div class="box">
			<view class="padding-xl radius shadow-warp bg-white margin-top">
				<ul>
					<li>
						<image src="../../static/img/h1.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h2.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h3.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h4.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h5.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h6.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h1.png" alt="">
						<p>过闸申报</p>
					</li>
					<li>
						<image src="../../static/img/h8.png" alt="">
						<p>过闸申报</p>
					</li>
				</ul>
			</view>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadingType: 'more', //加载更多状态
				headerPosition: "fixed",
				headerTop: "0px",
				province: '浙江',
				city: '湖州',
				items: [],
				page: {
					pageSize: 20,
					pageNum: 1,
					total: 0
				}
			}
		},
		onLoad() {

		},
		methods: {
			water() {
				uni.navigateTo({
					url: '/pages/water/index'
				});
			}
		}
	}
</script>

<style lang="scss">
	.ehy-content {
		.header {
			width: 100%;
			height: 350rpx;
			background: rgb(15, 174, 255);
			position: relative;

			.top {
				height: 96rpx;
				padding-top: 45rpx;

				div {
					width: 100%;
					height: 96rpx;
					line-height: 96rpx;
					position: absolute;
					left: 0;
					top: 48rpx;

					image {
						width: 58rpx;
						height: 36rpx;
						padding-left: 24rpx;
					}

					span {
						padding-left: 21rpx;
						font-size: 30rpx;
						color: #fff;
					}
				}

				p {
					width: 100%;
					height: 96rpx;
					line-height: 96rpx;
					text-align: center;
					color: #fff;
					font-size: 36rpx;
				}
			}

			.weather {
				// height: 254rpx;

				div:first-child {
					float: left;
					margin-left: 39rpx;
					margin-top: 67rpx;

					p {
						color: #fff;
					}

					p:first-child {
						font-size: 60rpx;
					}

					p:last-child {
						font-size: 30rpx;
						margin-top: 23rpx;
					}
				}

				div:last-child {
					float: right;
					margin-right: 40rpx;
					margin-top: 103rpx;

					image {
						width: 66rpx;
						height: 66rpx;
					}
				}
			}

		}

		.box {
			padding: 24rpx;

			.padding-xl {
				padding: 0;
			}

			ul {
				height: 360rpx;

				li {
					width: 25%;
					height: 155rpx;
					text-align: center;
					float: left;

					image {
						width: 75rpx;
						height: 125rpx;
						padding-top: 50rpx;
					}

					p {
						color: #555555;
						font-size: 26rpx;
						padding-top: 10rpx;
					}
				}
			}
		}
	}
</style>
