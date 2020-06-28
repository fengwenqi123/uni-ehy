<template>
<uni-shadow-root class="vant-weapp-action-sheet-index"><van-popup :show="show" position="bottom" :round="round" :z-index="zIndex" :overlay="overlay" custom-class="van-action-sheet" :safe-area-inset-bottom="safeAreaInsetBottom" :close-on-click-overlay="closeOnClickOverlay" @close="onClickOverlay">
  <view v-if="title" class="van-hairline--bottom van-action-sheet__header">
    {{ title }}
    <van-icon name="close" custom-class="van-action-sheet__close" @click="onClose"></van-icon>
  </view>
  <view v-if="description" class="van-action-sheet__description">
    {{ description }}
  </view>
  <view v-if="actions && actions.length">
    
    <button v-for="(item,index) in (actions)" :key="item.index" :open-type="item.openType" :style="item.color ? 'color: ' + item.color : ''" :class="(utils.bem('action-sheet__item', { disabled: item.disabled || item.loading }))+' van-hairline--top '+(item.className || '')" hover-class="van-action-sheet__item--hover" :data-index="index" @click="onSelect">
      <block v-if="(!item.loading)">
        {{ item.name }}
        <text v-if="item.subname" class="van-action-sheet__subname">{{ item.subname }}</text>
      </block>
      <van-loading v-else size="20px"></van-loading>
    </button>
  </view>
  <slot></slot>
  <view v-if="cancelText" class="van-action-sheet__cancel" hover-class="van-action-sheet__cancel--hover" hover-stay-time="70" @click="onCancel">
    {{ cancelText }}
  </view>
</van-popup></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanPopup from '../popup/index.vue'
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-popup': VanPopup,'van-loading': VanLoading}}

global['__wxRoute'] = 'vant-weapp/action-sheet/index'
import { VantComponent } from '../common/component';
VantComponent({
    props: {
        show: Boolean,
        title: String,
        cancelText: String,
        description: String,
        round: {
            type: Boolean,
            value: true
        },
        zIndex: {
            type: Number,
            value: 100
        },
        actions: {
            type: Array,
            value: []
        },
        overlay: {
            type: Boolean,
            value: true
        },
        closeOnClickOverlay: {
            type: Boolean,
            value: true
        },
        closeOnClickAction: {
            type: Boolean,
            value: true
        },
        safeAreaInsetBottom: {
            type: Boolean,
            value: true
        }
    },
    methods: {
        onSelect(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.data.actions[index];
            if (item && !item.disabled && !item.loading) {
                this.$emit('select', item);
                if (this.data.closeOnClickAction) {
                    this.onClose();
                }
            }
        },
        onCancel() {
            this.$emit('cancel');
        },
        onClose() {
            this.$emit('close');
        },
        onClickOverlay() {
            this.$emit('click-overlay');
            this.onClose();
        }
    }
});
export default global['__wxComponents']['vant-weapp/action-sheet/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-action-sheet{max-height:90%!important;color:#333;color:var(--text-color,#333)}.van-action-sheet__cancel,.van-action-sheet__item{height:50px;font-size:16px;line-height:50px;text-align:center;background-color:#fff;background-color:var(--white,#fff)}.van-action-sheet__cancel--hover,.van-action-sheet__item--hover{background-color:#f2f3f5;background-color:var(--active-color,#f2f3f5)}.van-action-sheet__cancel{height:60px}.van-action-sheet__cancel:before{display:block;height:10px;content:" ";background-color:#f8f8f8;background-color:var(--background-color,#f8f8f8)}.van-action-sheet__item--disabled{color:#c9c9c9;color:var(--gray,#c9c9c9)}.van-action-sheet__item--disabled.van-action-sheet__item--hover{background-color:#fff;background-color:var(--white,#fff)}.van-action-sheet__subname{margin-left:5px;font-size:12px;color:#7d7e80;color:var(--gray-darker,#7d7e80)}.van-action-sheet__header{font-weight:500;font-size:16px;line-height:44px;text-align:center}.van-action-sheet__description{padding:16px;color:#7d7e80;font-size:14px;line-height:20px;text-align:center}.van-action-sheet__close{position:absolute!important;top:0;right:0;padding:0 15px;font-size:18px!important;line-height:inherit!important;color:#999;color:var(--gray-dark,#999)}
</style>