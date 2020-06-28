<template>
<uni-shadow-root class="vant-weapp-progress-index"><view class="van-progress custom-class" :style="'height: '+(strokeWidthUnit)+';'">
  <view class="van-progress__portion" :style="'width: '+(percentage)+'%; background: '+(inactive ? '#cacaca' : color)">
    <view v-if="showPivot && getters.text(pivotText, percentage)" :style="'color: '+(textColor)+'; background: '+(pivotColor ? pivotColor : inactive ? '#cacaca' : color)" class="van-progress__pivot">
      {{ getters.text(pivotText, percentage) }}
    </view>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="./index.wxs" module="getters"></wxs>
<script>

global['__wxRoute'] = 'vant-weapp/progress/index'
import { VantComponent } from '../common/component';
import { BLUE } from '../common/color';
import { addUnit } from '../common/utils';
VantComponent({
    props: {
        inactive: Boolean,
        percentage: Number,
        pivotText: String,
        pivotColor: String,
        showPivot: {
            type: Boolean,
            value: true
        },
        color: {
            type: String,
            value: BLUE
        },
        textColor: {
            type: String,
            value: '#fff'
        },
        strokeWidth: {
            type: null,
            observer: 'setStrokeWidthUnit'
        }
    },
    data: {
        strokeWidthUnit: '4px'
    },
    methods: {
        setStrokeWidthUnit(val) {
            this.setData({
                strokeWidthUnit: addUnit(val)
            });
        }
    }
});
export default global['__wxComponents']['vant-weapp/progress/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-progress{position:relative;height:4px;border-radius:4px;background:#e5e5e5;background:var(--gray-light,#e5e5e5)}.van-progress__portion{position:absolute;left:0;height:100%;border-radius:inherit}.van-progress__pivot{position:absolute;top:50%;right:0;box-sizing:border-box;min-width:2em;padding:0 5px;font-size:10px;line-height:1.6;text-align:center;word-break:keep-all;border-radius:1em;-webkit-transform:translateY(-50%);transform:translateY(-50%);background-color:#e5e5e5;background-color:var(--gray-light,#e5e5e5)}
</style>