<template>
<uni-shadow-root class="vant-weapp-tabbar-item-index"><view :class="(utils.bem('tabbar-item', { active }))+' custom-class'" :style="'color: '+(active ? activeColor : inactiveColor)" @click="onClick">
  <view :class="utils.bem('tabbar-item__icon', { dot })">
    <van-icon v-if="icon" :name="icon" customStyle="display: block"></van-icon>
    <block v-else>
      <slot v-if="active" name="icon-active"></slot>
      <slot v-else name="icon"></slot>
    </block>
    <van-info v-if="info !== null" :info="info" custom-style="margin-top: 2px"></van-info>
  </view>
  <view class="van-tabbar-item__text">
    <slot></slot>
  </view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanInfo from '../info/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-info': VanInfo}}

global['__wxRoute'] = 'vant-weapp/tabbar-item/index'
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        info: null,
        name: null,
        icon: String,
        dot: Boolean
    },
    relation: {
        name: 'tabbar',
        type: 'ancestor'
    },
    data: {
        active: false
    },
    methods: {
        onClick() {
            if (this.parent) {
                this.parent.onChange(this);
            }
            this.$emit('click');
        },
        updateFromParent() {
            const { parent } = this;
            if (!parent) {
                return;
            }
            const index = parent.children.indexOf(this);
            const parentData = parent.data;
            const { data } = this;
            const active = (data.name || index) === parentData.active;
            const patch = {};
            if (active !== data.active) {
                patch.active = active;
            }
            if (parentData.activeColor !== data.activeColor) {
                patch.activeColor = parentData.activeColor;
            }
            if (parentData.inactiveColor !== data.inactiveColor) {
                patch.inactiveColor = parentData.inactiveColor;
            }
            return Object.keys(patch).length > 0
                ? this.set(patch)
                : Promise.resolve();
        }
    }
});
export default global['__wxComponents']['vant-weapp/tabbar-item/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.vant-weapp-tabbar-item-index{-webkit-flex:1;flex:1}.van-tabbar-item{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;height:100%;font-size:12px;line-height:1;color:#7d7e80;color:var(--gray-darker,#7d7e80)}.van-tabbar-item__icon{position:relative;margin-bottom:5px;font-size:18px}.van-tabbar-item__icon--dot:after{position:absolute;top:0;right:-8px;width:8px;height:8px;border-radius:100%;content:" ";background-color:#ee0a24;background-color:var(--red,#ee0a24)}.van-tabbar-item__icon image{display:block;width:30px;height:18px}.van-tabbar-item--active{color:#1989fa;color:var(--blue,#1989fa)}
</style>