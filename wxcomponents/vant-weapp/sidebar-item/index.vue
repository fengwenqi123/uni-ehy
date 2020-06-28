<template>
<uni-shadow-root class="vant-weapp-sidebar-item-index"><view :class="(utils.bem('sidebar-item', { active }))+' van-hairline custom-class'" hover-class="van-sidebar-item--hover" hover-stay-time="70" @click="onClick">
  <view class="van-sidebar-item__text">
    <van-info v-if="info !== null || dot" :dot="dot" :info="info" custom-style="right: 4px"></van-info>
    {{ title }}
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanInfo from '../info/index.vue'
global['__wxVueOptions'] = {components:{'van-info': VanInfo}}

global['__wxRoute'] = 'vant-weapp/sidebar-item/index'
import { VantComponent } from '../common/component';
VantComponent({
    relation: {
        type: 'ancestor',
        name: 'sidebar',
        linked(target) {
            this.parent = target;
        }
    },
    props: {
        dot: Boolean,
        info: null,
        title: String
    },
    methods: {
        onClick() {
            const { parent } = this;
            if (!parent) {
                return;
            }
            const index = parent.items.indexOf(this);
            parent.setActive(index).then(() => {
                this.$emit('click', index);
                parent.$emit('change', index);
            });
        },
        setActive(active) {
            return this.setData({ active });
        }
    }
});
export default global['__wxComponents']['vant-weapp/sidebar-item/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-sidebar-item{display:block;box-sizing:border-box;padding:20px 12px 20px 9px;overflow:hidden;font-size:14px;line-height:1.4;word-wrap:break-word;border-left:3px solid transparent;-webkit-user-select:none;user-select:none;color:#7d7e80;color:var(--gray-darker,#7d7e80);background-color:#f8f8f8;background-color:var(--background-color,#f8f8f8)}.van-sidebar-item--hover{background-color:#f2f3f5;background-color:var(--active-color,#f2f3f5)}.van-sidebar-item:after{border-bottom-width:1px}.van-sidebar-item--active{font-weight:700;color:#333;color:var(--text-color,#333);border-color:#ee0a24;border-color:var(--red,#ee0a24)}.van-sidebar-item--active:after{border-right-width:1px}.van-sidebar-item--active,.van-sidebar-item--active.van-sidebar-item--hover{background-color:#fff;background-color:var(--white,#fff)}.van-sidebar-item__text{position:relative}
</style>