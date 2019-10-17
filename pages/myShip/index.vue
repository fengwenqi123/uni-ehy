<template>
	<view class="ehy-content">
		        <view class="status_bar">
		            <!-- 这里是状态栏 -->
		        </view>
		<view class="header">
			<van-nav-bar
			  title="标题"
			  left-text="返回"
			  right-text=""
			  left-arrow
			/> 
			<!-- <cu-custom bgColor="bg-blue" :isBack="true"><block slot="content">我的船舶</block></cu-custom>
			<text class="lg cuIcon-add" @click="add()"></text> -->
			
			<!-- <text class="lg cuIcon-back" @click="back()"></text> -->
			<!-- <i class="uni-btn-icon" style="color: rgb(255, 255, 255); font-size: 27px;"></i>
			 <p>我的船舶</p>
			<text class="lg cuIcon-add" @click="add()"></text> -->
			
		</view>

		<div class="list">
			<ul>
				<li v-for="(item, index) in items" :key="index">
					<div class="item" @click="localTo(item)">
						<div class="label">
							<image src="../../static/img/ships.png" mode=""></image>
							<p>{{ item.shipName }}</p>
							<p>船舶识别号:{{ item.cbsbh }}</p>
							<p>添加时间:{{ item.addTimeString }}</p>
						</div>
						<div class="right">
							<span :class="{one:item.auditStatus===1,two:item.auditStatus===2,three:item.auditStatus===3}">{{item.auditStatus===1?'待审核':item.auditStatus===2?'通过':item.auditStatus===3?'未通过':'--'}}</span>
							<button class="button" type="warn" size="mini" plain="true" @click.stop="clearBoat(item)">解绑</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</view>
</template>

<script>
	import {
		selectByToken,
		removeShip
	} from '../../api/home';
	export default {
		data() {
			return {
				items: [],
				page: {
					pageSize: 20,
					pageNum: 1,
					total: 0
				}
			}
		},
		created() {
			this.getSelectByToken();
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			add() {
				uni.navigateTo({
					url: '/pages/myShip/add',
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			putRemove(id) {
				removeShip(id).then(res => {
					console.log(res)
					this.getSelectByToken()
				})
			},
			clearBoat(item) {
				const _this = this;
				console.log(this)
				uni.showModal({
					title: "提示",
					content: "确定解绑船舶：" + item.shipName,
					success: function(res) {
						if (res.confirm) {
							console.log(_this)
							_this.putRemove(item.id);
						}
					}
				})
			},
			localTo(item) {
				uni.navigateTo({
					url: '/pages/home/shipInfo/index?cm=' + item.shipName + '&cbdjh=' + item.cbdjh + '&cbsbh=' + item.cbsbh,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			getSelectByToken() {
				selectByToken(2)
					.then(res => {
						console.log(res);
						this.items = res.data;
					})
					.catch(err => {
						console.log(err);
					});
			}
		}
	}
</script>

<style scoped lang="scss">
	    .status_bar {
	        height: var(--status-bar-height);
	        width: 100%;
	    }
	.ehy-content {
		.header {
			// height: 100rpx; 
			// line-height: 92rpx;
			// border-bottom: 1px solid #ddd;
			// background-color: rgb(0, 122, 255);
			// color: rgb(255, 255, 255);
			// position: relative;

			.cuIcon-add {
				color: #fff;
				font-size: 60rpx;
				position: absolute;
				right: 24rpx;
				top: 66rpx;
				z-index: 999999999;
			}

		}

		.list {
			ul {
				li {
					padding: 0 32rpx;
					background: rgba(255, 255, 255, 1);
					position: relative;

					.item {
						width: 100%;
						height: 180rpx;
						display: flex;
						align-items: center;
						justify-content: space-between;
						border-bottom: 1px solid #ddd;

						.label {
							image {
								width: 80rpx;
								height: 80rpx;
								position: absolute;
								left: 32rpx;
								top: 50rpx;
							}

							p {
								width: 100%;
								font-size: 30rpx;
								color: #888;
								padding: 10rpx 0 0 120rpx;
							}

							p:nth-child(2) {
								font-size: 36rpx;
								padding-top: 10rpx;
								font-weight: 500;
								color: #333;
							}

							p:nth-child(3) {
								color: #333;
							}
						}

						.right {
							span {
								position: absolute;
								right: 32rpx;
								top: 32rpx;
							}

							.button {
								padding: 0 32rpx;
								position: absolute;
								right: 32rpx;
								bottom: 32rpx;
							}

							.one {
								color: #ffbe00;
							}

							.two {
								color: #09bb07;
							}

							.three {
								color: #f76260;
							}
						}
					}
				}

				li:last-child {
					.item {
						border: 0;
					}
				}
			}
		}
	}
</style>
