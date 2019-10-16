<template>
	<view class="ehy-content">
		<scroll-view scroll-x class="bg-white nav tab-header">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in tabs" :key="index"
				 @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<div class="tab" v-if="TabCur==0">
			<info :cbsbh="cbsbh"></info>
		</div>
		<div class="tab" v-if="TabCur==1">
			<book :cbdjh="cbdjh"></book>
		</div>
		<div class="tab" v-if="TabCur==2">
			<rule :cm="cm"></rule>
		</div>
		<div class="tab" v-if="TabCur==3">
			<perception :cm="cm"></perception>
		</div>
	</view>
</template>

<script>
	import {
		selectByToken
	} from '../../../api/home';
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
				tabs: ['基本信息', '证书', '违章', '感知'],
				TabCur: 0,
				cbsbh: '',
				cbdjh: '',
				cm: '',
				page: {
					pageSize: 20,
					pageNum: 1,
					total: 0
				}
			}
		},
		onLoad() {
			console.log(this.$route.query.cbsbh)
			this.cbsbh = this.$route.query.cbsbh;
			this.cbdjh = this.$route.query.cbdjh;
			this.cm = this.$route.query.cm;
			// this.getSelectByToken();
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;

			},
			getSelectByToken() {
				selectByToken(2)
					.then(res => {
						console.log(res);
						this.swiperList = res.data;
					})
			}
		}
	}
</script>

<style lang="scss">
	.ehy-content {
		.tab-header{
			position: fixed;
			z-index: 9999;
		}
	.tab{
		width: 100%;
		background: #fff;
		position: absolute;
		top: 45px;
	}
	}
</style>
