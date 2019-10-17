<template>
	<view class="news-details">
		<div>
			<p>{{ form.title }}</p>
			<p>
			<span>{{ form.categoryName }}</span>
			<span>{{ form.addTimeString }}</span>
			</p>
			<p>{{ form.content }}</p>
		</div>
	</view>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  onLoad(option) {
    const item = option.details;
    this.form = JSON.parse(item);
    console.log(this.form);
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.news-details {
  width: 100%;
  padding: 20rpx;
  background-color: #fff;
  p:nth-child(1) {
    font-size: 40rpx;
    text-align: center;
  }
  p:nth-child(2) {
    font-size: 30rpx;
    color: #888;
    span {
      display: inline-block;
      line-height: 80rpx;
    }
    span:nth-child(2) {
      margin-left: 10rpx;
    }
  }
  p:nth-child(3) {
    font-size: 30rpx;
    line-height: 40rpx;
  }
}
</style>
