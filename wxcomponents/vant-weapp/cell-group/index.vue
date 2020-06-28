<template>
<uni-shadow-root class="vant-weapp-cell-group-index"><view v-if="title" class="van-cell-group__title">
  {{ title }}
</view>
<view :class="'custom-class van-cell-group '+(border ? 'van-hairline--top-bottom' : '')">
  <slot></slot>
</view></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'vant-weapp/cell-group/index'
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        title: String,
        border: {
            type: Boolean,
            value: true
        }
    }
});
export default global['__wxComponents']['vant-weapp/cell-group/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-cell-group__title{padding:15px 15px 5px;font-size:14px;line-height:16px;color:#999;color:var(--gray-dark,#999)}
</style>