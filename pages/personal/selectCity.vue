<template>
	<view class="content">
		<uni-select :listData="listData" :quickPanelData="quickPanelData" :listAttr="listAttr" :navAttr="navAttr" @chooseItem="chooseItem"></uni-select>
	</view>
</template>

<script>
	import {updateAddress} from '@/api/home.js';
	import city from '@/utils/city.js';
	import cityList from '@/utils/citys.js';
	import uniSelect from '@/components/lee-select/lee-select.vue';
	export default {
		components: {
			uniSelect
		},
		data() {
			return {
				listData: city,
				cityLists: cityList,
				quickPanelData: [{
					title: '热门城市',
					navName: '热',
					data: ['上海', '北京', '成都', '昆明', '西安'],
					height: 224
				}],
				listAttr: {
					listBackgroundColor: 'none',
					titleFontSize: 28,
					titleColor: '#333',
					titleHeight: 60,
					titleBackground: '#ccc',
					titlePadding: 20,
					itemHeight: 88,
					itemFontSize: 28,
					itemBorderBottom: '1px solid rgba(0, 0, 0, 0.1)',
					itemColor: '#333'
				},
				navAttr: {
					enable: true,
					backgroundColor: 'rgba(0, 0, 0, 0.4)',
					color: '#333',
					activeColor: '#fff',
					fontSize: 20,
					itemPadding: '6 0',
					borderRadius: 100,
					padding: '20 0'
				},
				city:'',
				province:''
			};
		},
		onLoad(option) {
			var nowCity = option.city;
			var obj = {
				title: '当前城市',
				navName: '当',
				data: [nowCity],
				height: 150
			};
			this.quickPanelData.unshift(obj);
		},
		methods: {
			userInfoBy(province,city){
				updateAddress(province,city).then(response => {
					console.log(response);
					uni.navigateBack({
						delta: 1
					})
				});
			},
			chooseItem(item) {
				for (let i = 0; i < this.cityLists.length; i++) {
					let d = this.cityLists[i].citys;
					for (let j = 0; j < d.length; j++) {
						if (d[j].citysName === item + "市") {
							this.city = item + "市"; 
							this.province = this.cityLists[i].provinceName;
							console.log(this.province,this.city);
							this.userInfoBy(this.province,this.city);
							return;
						}
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
	}
</style>
