<template>
	<view class="failReport">
		<view class="top">
			<div>
				<span>问题类型</span>
				<picker mode="selector" :range="problemList" @change="selectProblem">
					{{ form.questionName }}
					<image class="imgCell" src="../../../static/img/i-right.png"></image>
				</picker>
			</div>
			<div v-if="form.questionType === 2">
				<span>设备类型</span>
				<picker mode="selector" :range="typeList" @change="selectType">
					{{ form.deviceType }}
					<image class="imgCell" src="../../../static/img/i-right.png"></image>
				</picker>
			</div>
			<div>
				<span>回收点</span>
				<picker mode="selector" :range="siteColumns" @change="selectSite">
					{{ form.siteName }}
					<image class="imgCell" src="../../../static/img/i-right.png"></image>
				</picker>
			</div>
			<div v-if="form.questionType === 2">
				<span>排放口</span>
				<picker mode="selector" :range="outletColumns" @change="selectOutlet">
					{{ form.outletName }}
					<image class="imgCell" src="../../../static/img/i-right.png"></image>
				</picker>
			</div>
			<div>
				<span>问题描述</span>
				<input  v-model="form.describe" placeholder="请输入描述" style="text-align:right"></input>
			</div>
		</view>
		<div class="button"><button @click="submit">确认上报</button></div>
	</view>
</template>

<script>
import { recoveryPointList, outLetList,questionReport } from '@/api/sewage.js';
export default {
	data() {
		return {
			form: {
				questionType: 1,
				questionName: '请选择',
				siteName: '请选择',
				outletName: '请选择',
				describe: '',
				deviceType: '请选择'
			},

			problemList: ['排污点拒收', '设备故障'],
			siteName: '请选择',
			siteColumns: [],
			outletColumns: [],
			typeList: ['智能生活污水', '普通生活污水', '智能生活垃圾', '普通生活垃圾', '智能油污', '普通油污']
		};
	},
	created() {
		this.getRecoveryPointList();
	},
	methods: {
		selectProblem(e) {
			console.log(e.detail.value);
			this.form.questionName = this.problemList[e.detail.value];
			if (this.form.questionName === '排污点拒收') {
				this.form.questionType = 1;
			} else {
				this.form.questionType = 2;
			}
		},
		// 获取回收点
		getRecoveryPointList() {
			this.siteColumns = [];
			recoveryPointList().then(response => {
				response.data.map(item => {
					this.siteColumns.push(item.name);
				});
			});
		},
		// 获取排污口
		getOutLetList() {
			this.outletColumns = [];
			outLetList(this.form.siteName).then(response => {
				response.data.map(item => {
					this.outletColumns.push(item.name);
				});
			});
		},
		selectType(e) {
			this.form.deviceType = this.typeList[e.detail.value];
		},
		selectSite(e) {
			this.form.siteName = this.siteColumns[e.detail.value];
			this.getOutLetList();
			this.form.outletName = '请选择';
		},
		selectOutlet(e) {
			if (this.outletColumns[e.detail.value]) {
				this.form.outletName = this.outletColumns[e.detail.value];
			} else {
				this.form.outletName = '请选择';
			}
		},
		submit() {
		      if (this.form.questionName==='请选择') {
		        uni.showToast({
		        	icon: 'none',
		        	title: '请选择问题类型'
		        });
		        return
		      }
		      if (this.form.questionType === 1) {
		        if (this.form.siteName==='请选择') {
		          uni.showToast({
		          	icon: 'none',
		          	title: '请选择回收点'
		          });
		          return;
		        }
		        if (!this.form.describe) {
		          uni.showToast({
		          	icon: 'none',
		          	title: '请填写问题描述'
		          });
		          return;
		        }
		        let {
		          questionName: questionType,
		          siteName,
		          describe: describes
		        } = this.form
		        questionReport({ questionType, siteName, describes }).then(response => {
		         uni.showToast({
		         	icon: 'success',
		         	title: '上报成功'
		         });
		          setTimeout(() => {
		            uni.switchTab({
		            	url: '/pages/home/index'
		            });
		          }, 1000)
		        })
		      } else {
		        if (this.form.deviceType==='请选择') {
		          uni.showToast({
		          	icon: 'none',
		          	title: '请选择设备类型'
		          });
		          return;
		        }
		        if (this.form.siteName==='请选择') {
		         uni.showToast({
		         	icon: 'none',
		         	title: '请选择回收点'
		         });
		         return;
		        }
		        if (this.form.outletName==='请选择') {
		         uni.showToast({
		         	icon: 'none',
		         	title: '请选择排放口'
		         });
		         return;
		        }
		        if (this.form.describe==='') {
		          uni.showToast({
		          	icon: 'none',
		          	title: '请填写问题描述'
		          });
		          return;
		        }
		        let {
		          questionName: questionType,
		          siteName,
		          deviceType,
		          outletName,
		          describe: describes
		        } = this.form
		        questionReport({
		          questionType,
		          siteName,
		          deviceType,
		          outletName,
		          describes
		        }).then(response => {
		          uni.showToast({
		          	icon: 'success',
		          	title: '上报成功'
		          });
		          setTimeout(() => {
		           uni.switchTab({
		           	url: '/pages/home/index'
		           });
		          }, 1000)
		        })
		      }
		    },
	}
};
</script>

<style lang="scss" scoped>
.failReport {
	width: 100%;
	.top {
		width: 100%;
		margin-top: 20rpx;
		background-color: #fff;
		div {
			padding: 20rpx;
			display: flex;
			line-height: 60rpx;
			border-bototm:1px solid #eee;
			justify-content: space-between;
			span {
				color: #888;
			}
			.imgCell {
				width: 20rpx;
				height: 20rpx;
				margin-left: 10rpx;
			}
		}
	}
	.button {
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
