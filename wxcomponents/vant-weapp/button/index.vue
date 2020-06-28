<template>
<uni-shadow-root class="vant-weapp-button-index"><button :id="id" :class="'custom-class '+(utils.bem('button', [type, size, { block, round, plain, square, loading, disabled, hairline, unclickable: disabled || loading }]))+' '+(hairline ? 'van-hairline--surround' : '')" hover-class="van-button--active hover-class" :lang="lang" :style="(style)+' '+(customStyle)" :open-type="openType" :business-id="businessId" :session-from="sessionFrom" :send-message-title="sendMessageTitle" :send-message-path="sendMessagePath" :send-message-img="sendMessageImg" :show-message-card="showMessageCard" :app-parameter="appParameter" :aria-label="ariaLabel" @click="onClick" @getuserinfo="bindGetUserInfo" @contact="bindContact" @getphonenumber="bindGetPhoneNumber" @error="bindError" @launchapp="bindLaunchApp" @opensetting="bindOpenSetting">
  <block v-if="loading">
    <van-loading custom-class="loading-class" :size="loadingSize" :type="loadingType" :color="type === 'default' ? '#c9c9c9' : ''"></van-loading>
    <view v-if="loadingText" class="van-button__loading-text">
      {{ loadingText }}
    </view>
  </block>
  <block v-else>
    <van-icon v-if="icon" size="1.2em" :name="icon" class="van-button__icon" custom-style="line-height: inherit;"></van-icon>
    <view class="van-button__text">
      <slot></slot>
    </view>
  </block>
</button></uni-shadow-root>
</template>
<wxs src="../wxs/utils.wxs" module="utils"></wxs>
<script>
import VanIcon from '../icon/index.vue'
import VanLoading from '../loading/index.vue'
global['__wxVueOptions'] = {components:{'van-icon': VanIcon,'van-loading': VanLoading}}

global['__wxRoute'] = 'vant-weapp/button/index'
import { VantComponent } from '../common/component';
import { button } from '../mixins/button';
import { openType } from '../mixins/open-type';
VantComponent({
    mixins: [button, openType],
    classes: ['hover-class', 'loading-class'],
    data: {
        style: ''
    },
    props: {
        icon: String,
        plain: Boolean,
        block: Boolean,
        round: Boolean,
        square: Boolean,
        loading: Boolean,
        hairline: Boolean,
        disabled: Boolean,
        loadingText: String,
        customStyle: String,
        loadingType: {
            type: String,
            value: 'circular'
        },
        type: {
            type: String,
            value: 'default'
        },
        size: {
            type: String,
            value: 'normal'
        },
        loadingSize: {
            type: String,
            value: '20px'
        },
        color: {
            type: String,
            observer(color) {
                let style = '';
                if (color) {
                    style += `color: ${this.data.plain ? color : 'white'};`;
                    if (!this.data.plain) {
                        // Use background instead of backgroundColor to make linear-gradient work
                        style += `background: ${color};`;
                    }
                    // hide border when color is linear-gradient
                    if (color.indexOf('gradient') !== -1) {
                        style += 'border: 0;';
                    }
                    else {
                        style += `border-color: ${color};`;
                    }
                }
                if (style !== this.data.style) {
                    this.setData({ style });
                }
            }
        }
    },
    methods: {
        onClick() {
            if (!this.data.disabled && !this.data.loading) {
                this.$emit('click');
            }
        }
    }
});
export default global['__wxComponents']['vant-weapp/button/index']
</script>
<style platform="mp-weixin">
@import '../common/index.css';.van-button{position:relative;display:inline-block;box-sizing:border-box;height:44px;padding:0;font-size:16px;line-height:42px;text-align:center;vertical-align:middle;transition:opacity .2s;border-radius:2px;border-radius:var(--button-border-radius,2px);-webkit-appearance:none;-webkit-text-size-adjust:100%}.van-button:before{position:absolute;top:50%;left:50%;width:100%;height:100%;border:inherit;border-radius:inherit;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);opacity:0;content:" ";background-color:#000;background-color:var(--black,#000);border-color:#000;border-color:var(--black,#000)}.van-button:after{border-width:0}.van-button--active:before{opacity:.15}.van-button--unclickable:after{display:none}.van-button--default{color:#333;color:var(--button-default-color,#333);background-color:#fff;background-color:var(--button-default-background-color,#fff);border:1px solid #eee;border:1px solid var(--button-default-border-color,#eee)}.van-button--primary{color:#fff;color:var(--button-primary-color,#fff);background-color:#07c160;background-color:var(--button-primary-background-color,#07c160);border:1px solid #07c160;border:1px solid var(--button-primary-border-color,#07c160)}.van-button--info{color:#fff;color:var(--button-info-color,#fff);background-color:#1989fa;background-color:var(--button-info-background-color,#1989fa);border:1px solid #1989fa;border:1px solid var(--button-info-border-color,#1989fa)}.van-button--danger{color:#fff;color:var(--button-danger-color,#fff);background-color:#ee0a24;background-color:var(--button-danger-background-color,#ee0a24);border:1px solid #ee0a24;border:1px solid var(--button-danger-border-color,#ee0a24)}.van-button--warning{color:#fff;color:var(--button-warning-color,#fff);background-color:#ff976a;background-color:var(--button-warning-background-color,#ff976a);border:1px solid #ff976a;border:1px solid var(--button-warning-border-color,#ff976a)}.van-button--plain{background-color:#fff;background-color:var(--white,#fff)}.van-button--plain.van-button--primary{color:#07c160;color:var(--button-primary-background-color,#07c160)}.van-button--plain.van-button--info{color:#1989fa;color:var(--button-info-background-color,#1989fa)}.van-button--plain.van-button--danger{color:#ee0a24;color:var(--button-danger-background-color,#ee0a24)}.van-button--plain.van-button--warning{color:#ff976a;color:var(--button-warning-background-color,#ff976a)}.van-button--large{width:100%;height:50px;line-height:48px}.van-button--normal{padding:0 15px;font-size:14px}.van-button--small{min-width:60px;height:30px;padding:0 8px;font-size:12px;line-height:28px}.van-button--mini{display:inline-block;width:50px;height:22px;font-size:10px;line-height:20px}.van-button--mini+.van-button--mini{margin-left:5px}.van-button--block{display:block;width:100%}.van-button--round{border-radius:10em;border-radius:var(--button-round-border-radius,10em)}.van-button--square{border-radius:0}.van-button--disabled{opacity:.5}.van-button__text{display:inline}.van-button__loading-text{display:inline-block;margin-left:5px;vertical-align:middle}.van-button__icon{min-width:1em;line-height:inherit!important;vertical-align:top}.van-button__icon+.van-button__text:not(:empty){display:inline-block;margin-left:5px;vertical-align:top}.van-button--hairline{padding-top:1px;border-width:0}.van-button--hairline:after{border-color:inherit;border-width:1px;border-radius:4px;border-radius:calc(var(--button-border-radius, 2px)*2)}.van-button--hairline.van-button--round:after{border-radius:10em;border-radius:var(--button-round-border-radius,10em)}.van-button--hairline.van-button--square:after{border-radius:0}
</style>