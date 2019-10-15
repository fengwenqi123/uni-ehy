<template>
	<view class="ehy-content">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 100vh;" :latitude="latitude" :longitude="longitude" :markers="markers">
					<view class="box">
						<p>{{address || '--'}}</p>
						  <button type="primary"><a href="tel:12395">12395</a></button>
						  <button type="primary"><a href="tel:110">110</a></button>
					</view>
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
					iconPath: '../../../static/img/address.png',
					width: 30,
					height: 30
				}]
			}
		},
		onLoad() {
			setTimeout(() => {
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
						if(res.address){
							_this.address = res.address.city + res.address.district + res.address.street + res.address.streetNum;
						}
					}
				});
			}, 10);
			// uni.chooseLocation({
			// 	success: function(res) {
			// 		console.log('位置名称：' + res.name);
			// 		console.log('详细地址：' + res.address);
			// 		console.log('纬度：' + res.latitude);
			// 		console.log('经度：' + res.longitude);
			// 	}
			// });
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.ehy-content {
	
		.box{
				position: fixed;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 400rpx;
				background: #fff;
				z-index: 99999999999999999999999;
				padding: 32rpx;
				button{
					margin-top: 50rpx;
					a{
						color: #fff;
					}
				}
		}
	}
</style>
