<template>
	<view class="success">
		<div class="top" v-if="info.status === 2">
			<div><image src="../../../static/img/wait.png" class="img"></image></div>
			<div><p>等待审核中</p></div>
			<div><p>工作人员审核后积分记录生效</p></div>
		</div>
		<div class="middle">
			<div>
				<p>
					<span>排污类型</span>
					<span>{{ info.type === 1 ? '污水' : info.type === 2 ? '生活垃圾' : info.type === 3 ? '油污' : '--' }}</span>
				</p>
				<p>
					<span>船舶名称</span>
					<span>{{ info.shipName }}</span>
				</p>
				<p>
					<span>回收点</span>
					<span>{{ info.siteName }}</span>
				</p>
				<p>
					<span>排放口</span>
					<span>{{ info.outletName }}</span>
				</p>
				<p>
					<span>排放口类型</span>
					<span>{{ info.portType === 1 ? '智能' : info.portType === 2 ? '普通' : '--' }}</span>
				</p>
				<p>
					<span>排放容积（L）</span>
					<span>{{ info.amount }}</span>
				</p>
				<p>
					<span>排放开始时间</span>
					<span>{{ info.startTime||'--' }}</span>
				</p>
				<p>
					<span>排放结束时间</span>
					<span>{{ info.endTime ||'--' }}</span>
				</p>
			</div>
		</div>
		<div class="bottom">
			<p>积分记录</p>
			<div>
				<p>
					<span>基础分</span>
					<span>10分</span>
				</p>
				<p>
					<span>定位设备加分</span>
					<span>0分</span>
				</p>
				<p>
					<span>船载生活污水柜加分</span>
					<span>0分</span>
				</p>
			</div>
			<p>
				<span>合计积分</span>
				<span>10分</span>
			</p>
		</div>
		<div class="button"><button @click="download" v-if="info.status === 1">下载排污电子单据</button></div>
	</view>
</template>

<script>
export default {
  onLoad(option) {
    const item = option.info;
    console.log('详情', item);
    this.info = JSON.parse(item);
  },
  data() {
    return {
      info: {}
    };
  },
  methods: {
    download() {
      uni.showModal({
        content: "暂未开放，敬请期待！",
        showCancel: false,
        confirmText: "确定"
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.success {
  width: 100%;
  .top {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    div {
      text-align: center;
      padding: 20rpx 0;
    }
    div:nth-child(1) {
      padding: 50rpx 0 20rpx 0;
      .img {
        width: 150rpx;
        height: 150rpx;
      }
    }
    div:nth-child(2) {
      p {
        font-size: 35rpx;
      }
    }
    div:nth-child(3) {
      padding-bottom: 50rpx;
      p {
        color: #888;
      }
    }
  }
  .middle {
    background: #fff;
    padding: 0 30rpx;
    p {
      display: flex;
      justify-content: space-between;
      line-height: 80rpx;
      span:nth-child(1) {
        color: #888;
      }
      span:nth-child(2) {
        color: #333;
        font-size: 30rpx;
      }
    }
  }
  .bottom {
    background: #fff;
    margin-top: 15rpx;
    padding: 0 30rpx;
    p {
      display: flex;
      justify-content: space-between;
    }
    > p {
      line-height: 100rpx;
      font-size: 35rpx;
      border-bottom: 1px solid #eee;
    }
    > div {
      padding: 20rpx 0rpx;
      border-bottom: 1px solid #eee;
      p {
        line-height: 80rpx;
        span:nth-child(1) {
          color: #888;
        }
        span:nth-child(2) {
          color: #333;
          font-size: 30rpx;
          font-weight: bold;
        }
      }
    }
    > p:nth-child(3) {
      span:nth-child(1) {
        font-size: 32rpx;
        color: #888;
      }
      span:nth-child(2) {
        color: #f19d52;
        font-size: 30rpx;
        font-weight: bold;
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
