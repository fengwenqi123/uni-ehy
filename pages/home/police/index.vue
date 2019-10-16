<template>
	<view class="ehy-content">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map id="map" ref="map" style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude"
				 show-location="true">
					<cover-view class="address"> {{address?'- 当前位置：' +address + '附近' : ''}}</cover-view>
					<cover-view class="tel" @click="tel('12395')">12395</cover-view>
					<cover-view class="tel tel2" @click="tel('110')">110</cover-view>
					<cover-view class="tel tel3" @click="moveToLocation()">⊙</cover-view>
				</map>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 30.22650314111872,
				longitude: 119.96861247015667,
				address: '',
				markers: [{
					latitude: 30.22650314111872,
					longitude: 119.96861247015667,
					iconPath: '../../../static/img/r.png',
					width: 30,
					height: 30
				}]
			}
		},
		onReady() {
				this.getLocation();
				this.moveToLocation();
		},
		methods: {
			tel(num) {
				uni.makePhoneCall({
					phoneNumber: num
				});
			},
			getLocation() {
				let _this = this
				console.log(this.latitude);
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						console.log(res);
						_this.latitude = res.latitude;
						_this.longitude = res.longitude;
						_this.markers[0].latitude = res.latitude;
						_this.markers[0].longitude = res.longitude;
						if (res.address) {
							_this.address = res.address.city + res.address.district + res.address.street;
						}
					}
				});
			},
			moveToLocation() {
				this.mapContext = uni.createMapContext('map', this);
				this.mapContext.moveToLocation();
			}
		}
	}
</script>

<style lang="scss">
	.ehy-content {
		.address {
			width: 100%;
			background: #fff;
			padding: 20rpx 0;
		}

		.tel {
			position: fixed;
			bottom: 140rpx;
			left: 5%;
			width: 90%;
			height: 80rpx;
			line-height: 80rpx;
			background: rgb(15, 174, 255);
			color: #fff;
			font-size: 35rpx;
			text-align: center;
			border-radius: 10rpx;
		}

		.tel2 {
			bottom: 40rpx;
		}

		.tel3 {
			width: 80rpx;
			height: 80rpx;
			bottom: 280rpx;
			right: 5%;
			left: initial;
			font-size: 50rpx;
		}
	}
</style>
