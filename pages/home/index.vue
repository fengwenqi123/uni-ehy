<template>
	<view class="ehy-content">
		<div class="header">
			<div class="top">
				<div>
					<image src="../../static/img/address.png" alt="">
						<span>{{city}}</span>
				</div>
				<p>e航运</p>
			</div>
			<div class="weather">
				<div v-if="weather">
					<p>{{weather.nighttemp}} ~{{weather.daytemp}}℃</p>
					<p>
						<span>{{weather.dayweather }}</span>
						<span>{{ weather.daywind}}风</span>
						<span>{{ weather.daypower}}级</span>
					</p>
				</div>
				<div @click="water()">
					<p>{{waterInfo.depth}}米</p>
					<p>{{waterInfo.name}}<text class="lg cuIcon-right"></text></p>
				</div>
			</div>
		</div>
		<view class="login" v-if="isLogin">
			<view class="padding-xl radius bg-white" @click="login()">去登录</view>
		</view>
		<div class="info" v-if="isInfo">
			<view class="padding-xl radius bg-white">
				<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="5000" duration="500" indicator-color="#8799a3" indicator-active-color="#0081ff">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<div v-if="item.shipName !== 'add'" class="ship-info" @click="tabClick(item)">
							<p>{{item.shipName}}</p>
							<p>船舶登记号：{{item.cbdjh}}</p>
							<p>点击查看详情</p>
							<image src="../../static/img/ship.png" mode=""></image>
						</div>
						<div v-else class="ship-add" @click="addClick()">
							<p><image src="../../static/img/ship.png" mode=""></image>立即添加船舶</p>
							
						</div>
					</swiper-item>
				</swiper>
			</view>
		</div>

		<div class="box">
			<view class="padding-xl radius bg-white">
				<ul>
					<li @click="port()">
						<image src="../../static/img/h1.png" alt="">
							<p>过闸申报</p>
					</li>
					<li @click="sewage()">
						<image src="../../static/img/h2.png" alt="">
							<p>船舶排污</p>
					</li>
					<li @click="port()">
						<image src="../../static/img/h3.png" alt="">
							<p>电子报告</p>
					</li>
					<li @click="port()">
						<image src="../../static/img/h4.png" alt="">
							<p>问题上报</p>
					</li>
					<li @click="police()">
						<image src="../../static/img/h5.png" alt="">
							<p>一键报警</p>
					</li>
					<li @click="port()">
						<image src="../../static/img/h6.png" alt="">
							<p>法律法规</p>
					</li>
					<li @click="port()">
						<image src="../../static/img/h1.png" alt="">
							<p>船员采集点</p>
					</li>
					<li @click="port()">
						<image src="../../static/img/h8.png" alt="">
							<p>浙里办</p>
					</li>
				</ul>
			</view>
		</div>
	</view>
</template>

<script>
	import {
		selectByToken,
		findByCity
	} from '../../api/home';

	export default {
		data() {
			return {
				loadingType: 'more', //加载更多状态
				headerPosition: "fixed",
				headerTop: "0px",
				province: '浙江省',
				city: '杭州市',
				waterInfo: {},
				weather: {},
				items: [],
				swiperList: [],
				isLogin: false,
				isInfo: false,
				dotStyle: false,
				cardCur: 0,
				page: {
					pageSize: 20,
					pageNum: 1,
					total: 0
				}
			}
		},
		onShow() {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				this.isLogin = false;
				this.isInfo = true;
				this.getSelectByToken();
			} else {
				this.isLogin = true;
				this.isInfo = false;
			}
		},
		created() {
			this.getLocation();
			this.getWeather();
			this.getFindByCity();
		},
		methods: {
			login() {
				uni.navigateTo({
					url: '/pages/login/index',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			water() {
				// uni.removeStorageSync('userInfo');
				uni.navigateTo({
					url: '/pages/home/water/index?city=' + this.city,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			police() {
				uni.navigateTo({
					url: '/pages/home/police/index',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			sewage() {
				uni.navigateTo({
					url: '/pages/sewage/index',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			port() {
				uni.showModal({
					content: "暂未开放，敬请期待！",
					showCancel: false,
					confirmText: "确定"
				})
			},
			tabClick(item) {
				uni.navigateTo({
					url: '/pages/home/shipInfo/index?cm=' + item.shipName + '&cbdjh=' + item.cbdjh + '&cbsbh=' + item.cbsbh,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			addClick(){
				uni.navigateTo({
					url: '/pages/myShip/add',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			getLocation() {
				let _this = this
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						// console.log(res);
						if (res.address) {
							_this.city = res.address.city;
						}
					}
				});
			},
			getWeather() {

				uni.request({
					url: 'http://jhzhgh.jtysj.jinhua.gov.cn:8002/common/getWeather',
					data: {
						city: this.city
					},
					success: (res) => {
						this.weather = JSON.parse(res.data.Data).forecasts[0].casts[0];
					}
				});
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			getSelectByToken() {
				selectByToken(2)
					.then(res => {
						console.log(res);
						this.swiperList = res.data;
						let obj = {};
						obj.shipName = 'add';
						this.swiperList.push(obj);
					});
			},
			getFindByCity() {
				findByCity(this.province, this.city)
					.then(res => {
						// console.log(res);
						this.waterInfo = res.data;
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

						span {
							padding-left: 20rpx;
						}
					}
				}

				div:last-child {
					float: right;
					margin-right: 40rpx;
					margin-top: 90rpx;

					p {
						font-size: 40rpx;
						color: #fff;
						text-align: right;
					}

					p:last-child {
						font-size: 32rpx;
						padding-top: 20rpx;
					}
				}
			}
		}

		.login {
			padding: 0 24rpx 0 24rpx;
			position: relative;
			top: -30rpx;
			z-index: 999;
			height: 90rpx;
			text-align: center;

			.padding-xl {
				height: 100%;
				line-height: 90rpx;
				padding: 0;
			}
		}

		.info {
			padding: 0 24rpx 0 24rpx;
			position: relative;
			top: -30rpx;
			z-index: 999;
			height: 230rpx;

			.padding-xl {
				padding: 0;
				height: 100%;

				.screen-swiper {
					height: 100%;
					min-height: initial;
				}
			}

			.ship-info {
				padding: 30rpx 26rpx;
				position: relative;

				p {
					font-size: 36rpx;
					color: #666666;
					padding-bottom: 23rpx;
				}

				p:first-child {
					font-weight: bold;
					color: #333;
				}

				p:nth-child(3) {
					font-size: 24rpx;
				}

				image {
					width: 70rpx;
					height: 70rpx;
					position: absolute;
					right: 30rpx;
					top: 30rpx;
				}
			}
			.ship-add{
				p{
					width: 100%;
					height: 230rpx;
					line-height: 230rpx;
					text-align: center;
					font-size: 40rpx;
					font-weight: bold;
					color: #666; 
				}
				image {
					width: 70rpx;
					height: 70rpx;
					    position: absolute;
					    left: 150rpx;
					    top: 0;
					    bottom: 0;
					    margin: auto;
				}
			}
		}

		.box {
			padding: 0 24rpx 0 24rpx;
			position: relative;
			top: -10rpx;

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
