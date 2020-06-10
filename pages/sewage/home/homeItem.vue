<template>
  <div class="container">
    <div class="container-child">
      <div v-for="item in list"
           :key="item.src"
           @click="pathTo(item.path)">
        <image :src="item.icon" />
        <span>{{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          value: '生活污水',
          icon: '/static/img/shws.png',
          path: '/lifeWaterRecord'
        },
        {
          value: '生活垃圾',
          icon: '/static/img/shlj.png',
          path: '/rubbishRecord'
        },
        {
          value: '油污水',
          icon: '/static/img/yws.png',
          path: ''
        },
        {
          value: '回收点位置查询',
          icon: '/static/img/hsdwz1.png',
          path: '/sewagePointSearch'
        },
        {
          value: '无法上岸问题上报',
          icon: '/static/img/wfsa.png',
          path: '/unableToLand'
        },
        {
          value: '上岸记录',
          icon: '/static/img/sajl.png',
          path: '/landRecord'
        }, {
          value: '积分兑换',
          icon: '/static/img/jfsc.png',
          path: '/integralMall'
        }
      ]
    }
  },
  created() {
  },
  methods: {
   }
}
</script>

<style lang="scss" scoped>
.container {
  width: 100% !important;
  .container-child {
    border-radius: 15rpx;
    margin: 0 10rpx;
    background-color: #fff;
    flex-wrap: wrap;
    display: flex;
    div {
      width: 33.1%;
      height: 210rpx;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border-bottom: 1rpx solid #d8d8d8;
      image {
        width: 96rpx;
        height: 96rpx;
      }
      span {
        font-size: 26rpx;
        padding: 10rpx 0;
      }
      &:nth-child(3n + 2) {
        border-left: 2rpx solid #d8d8d8;
        border-right: 2rpx solid #d8d8d8;
      }
      &:last-child {
        border-right: 2rpx solid #d8d8d8;
        border-bottom: 0;
      }
    }
  }
}
</style>
