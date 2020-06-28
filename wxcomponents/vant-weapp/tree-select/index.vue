<template>
<uni-shadow-root class="vant-weapp-tree-select-index"><view class="van-tree-select" :style="'height: '+(mainHeight)+'px'">
  <scroll-view scroll-y class="van-tree-select__nav">
    <view v-for="(item,index) in (items)" :key="item.index" :class="'van-ellipsis main-item-class '+(utils.bem('tree-select__nitem', { active: mainActiveIndex === index, disabled: item.disabled }))+' '+(mainActiveIndex === index ? 'main-active-class' : '')+' '+(item.disabled ? 'main-disabled-class' : '')" :data-index="index" @click="onClickNav">
      {{ item.text }}
    </view>
  </scroll-view>
  <scroll-view scroll-y class="van-tree-select__content" :style="'height: '+(itemHeight)+'px'">
    <slot name="content"></slot>
    <view v-for="(item,index) in (subItems)" :key="item.id" :class="'van-ellipsis van-hairline--bottom content-item-class '+(utils.bem('tree-select__item', { active: wxs.isActive(activeId, item.id), disabled: item.disabled }))+' '+(wxs.isActive(activeId, item.id) ? 'content-active-class' : '')+' '+(item.disabled ? 'content-disabled-class' : '')" :data-item="item" @click="onSelectItem">
      {{ item.text }}
      <van-icon v-if="wxs.isActive(activeId, item.id)" name="checked" size="16px" class="van-tree-select__selected"></van-icon>
    </view>
  </scroll-view>
</view></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs><wxs src="./index.wxs" module="wxs"></wxs>
<script>
import VanIcon from '../icon/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon}}

global['__wxRoute'] = 'vant-weapp/tree-select/index'
import { VantComponent } from '../common/component';
const ITEM_HEIGHT = 44;
VantComponent({
    classes: [
        'main-item-class',
        'content-item-class',
        'main-active-class',
        'content-active-class',
        'main-disabled-class',
        'content-disabled-class'
    ],
    props: {
        items: Array,
        activeId: null,
        mainActiveIndex: {
            type: Number,
            value: 0
        },
        maxHeight: {
            type: Number,
            value: 300
        },
        max: {
            type: Number,
            value: Infinity
        }
    },
    data: {
        subItems: [],
        mainHeight: 0,
        itemHeight: 0
    },
    watch: {
        items() {
            this.updateSubItems().then(() => {
                this.updateMainHeight();
            });
        },
        maxHeight() {
            this.updateItemHeight(this.data.subItems);
            this.updateMainHeight();
        },
        mainActiveIndex: 'updateSubItems'
    },
    methods: {
        // 当一个子项被选择时
        onSelectItem(event) {
            const { item } = event.currentTarget.dataset;
            const isArray = Array.isArray(this.data.activeId);
            // 判断有没有超出右侧选择的最大数
            const isOverMax = isArray && (this.data.activeId.length >= this.data.max);
            // 判断该项有没有被选中, 如果有被选中，则忽视是否超出的条件
            const isSelected = isArray ? this.data.activeId.indexOf(item.id) > -1 : this.data.activeId === item.id;
            if (!item.disabled && (!isOverMax || isSelected)) {
                this.$emit('click-item', item);
            }
        },
        // 当一个导航被点击时
        onClickNav(event) {
            const { index } = event.currentTarget.dataset;
            const item = this.data.items[index];
            if (!item.disabled) {
                this.$emit('click-nav', { index });
            }
        },
        // 更新子项列表
        updateSubItems() {
            const { items, mainActiveIndex } = this.data;
            const { children = [] } = items[mainActiveIndex] || {};
            this.updateItemHeight(children);
            return this.set({ subItems: children });
        },
        // 更新组件整体高度，根据最大高度和当前组件需要展示的高度来决定
        updateMainHeight() {
            const { items = [], subItems = [] } = this.data;
            const maxHeight = Math.max(items.length * ITEM_HEIGHT, subItems.length * ITEM_HEIGHT);
            this.setData({ mainHeight: Math.min(maxHeight, this.data.maxHeight) });
        },
        // 更新子项列表高度，根据可展示的最大高度和当前子项列表的高度决定
        updateItemHeight(subItems) {
            const itemHeight = Math.min(subItems.length * ITEM_HEIGHT, this.data.maxHeight);
            return this.setData({ itemHeight });
        }
    }
});
export default global['__wxComponents']['vant-weapp/tree-select/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-tree-select{position:relative;font-size:14px;-webkit-user-select:none;user-select:none}.van-tree-select__nav{position:absolute;top:0;bottom:0;left:0;width:35%;min-width:120px;background-color:#fafafa;background-color:var(--background-color-light,#fafafa)}.van-tree-select__nitem{position:relative;padding:0 9px 0 15px;line-height:44px}.van-tree-select__nitem--active:after{position:absolute;top:0;bottom:0;left:0;width:3.6px;content:"";background-color:#ee0a24;background-color:var(--red,#ee0a24)}.van-tree-select__nitem--active{font-weight:700;background-color:#fff;background-color:var(--white,#fff)}.van-tree-select__nitem--disabled{color:#999;color:var(--gray-dark,#999)}.van-tree-select__content{box-sizing:border-box;width:65%;margin-left:35%;padding-left:15px;background-color:#fff;background-color:var(--white,#fff)}.van-tree-select__item{position:relative;font-weight:700;line-height:44px}.van-tree-select__item--active{color:#ee0a24;color:var(--red,#ee0a24)}.van-tree-select__item--disabled{color:#999;color:var(--gray-dark,#999)}.van-tree-select__selected{position:absolute;top:0;right:15px;bottom:0;height:24px;margin:auto 0;line-height:24px}
</style>