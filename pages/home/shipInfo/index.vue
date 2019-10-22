<template>
	<view class="ehy-content" v-if="flag">
		<van-tabs :active="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
			<van-tab title="基本信息" name="1"><info :cbsbh="cbsbh"></info></van-tab>
			<van-tab title="证书" name="2"><book :cbdjh="cbdjh"></book></van-tab>
			<van-tab title="违章" name="3"><rule :cm="cm"></rule></van-tab>
			<van-tab title="感知" name="4"><perception :cm="cm"></perception></van-tab>
		</van-tabs>
	</view>
</template>

<script>
import info from './info';
import book from './book';
import rule from './rule';
import perception from './perception';

export default {
	components: {
		info,
		book,
		rule,
		perception
	},
	data() {
		return {
			cbsbh: '',
			cbdjh: '',
			cm: '',
			active: '1',
			flag: false
		};
	},
	onLoad(option) {
		this.cbsbh = option.cbsbh;
		this.cbdjh = option.cbdjh;
		this.active = option.active || '1';
		this.cm = option.cm;
		this.flag = true;
	}
};
</script>

<style lang="scss">
.ehy-content {
	.tab-header {
		position: fixed;
		z-index: 9999;
	}
	.tab {
		width: 100%;
		background: #fff;
		position: absolute;
		top: 45px;
	}
}
</style>
