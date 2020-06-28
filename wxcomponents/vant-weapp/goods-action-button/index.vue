<template>
<uni-shadow-root class="vant-weapp-goods-action-button-index"><van-button square :id="id" size="large" :lang="lang" :type="type" :color="color" :loading="loading" :disabled="disabled" :open-type="openType" :custom-class="utils.bem('goods-action-button', [type, { first: isFirst, last: isLast }])" :business-id="businessId" :session-from="sessionFrom" :app-parameter="appParameter" :send-message-img="sendMessageImg" :send-message-path="sendMessagePath" :show-message-card="showMessageCard" :send-message-title="sendMessageTitle" @click="onClick" @error="bindError" @contact="bindContact" @opensetting="bindOpenSetting" @getuserinfo="bindGetUserInfo" @getphonenumber="bindGetPhoneNumber" @launchapp="bindLaunchApp">
  {{ text }}
</van-button></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanButton from '../button/index.vue'
global['__wxVueOptions'] = {components:{'van-button': VanButton}}

global['__wxRoute'] = 'vant-weapp/goods-action-button/index'
import { VantComponent } from '../common/component';
import { link } from '../mixins/link';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
    mixins: [link, button, openType],
    relation: {
        type: 'ancestor',
        name: 'goods-action',
        linked(parent) {
            this.parent = parent;
        }
    },
    props: {
        text: String,
        color: String,
        loading: Boolean,
        disabled: Boolean,
        type: {
            type: String,
            value: 'danger'
        }
    },
    mounted() {
        this.updateStyle();
    },
    methods: {
        onClick(event) {
            this.$emit('click', event.detail);
            this.jumpLink();
        },
        updateStyle() {
            const { parent } = this;
            const { children = [] } = parent;
            const index = children.indexOf(this);
            const { length } = children;
            let isFirst = false;
            let isLast = false;
            if (index === 0) {
                isFirst = true;
            }
            if (index === length - 1) {
                isLast = true;
            }
            this.setData({
                isFirst,
                isLast
            });
        }
    }
});
export default global['__wxComponents']['vant-weapp/goods-action-button/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.vant-weapp-goods-action-button-index{-webkit-flex:1;flex:1}.van-goods-action-button{height:36px!important;font-weight:500!important;font-size:14px!important;line-height:34px!important;border:none!important}.van-goods-action-button--first{display:block!important;width:auto!important;margin-left:5px;border-top-left-radius:18px!important;border-bottom-left-radius:18px!important}.van-goods-action-button--last{display:block!important;width:auto!important;margin-right:5px;border-top-right-radius:18px!important;border-bottom-right-radius:18px!important}.van-goods-action-button--warning{background:linear-gradient(90deg,#ffd01e,#ff8917)}.van-goods-action-button--danger{background:linear-gradient(90deg,#ff6034,#ee0a24)}@media (max-width:321px){.van-goods-action-button{font-size:13px}}
</style>