<template>
	<view>
		<div>
			<p>
				<button @click="showCityPicker">12312312312</button>
				<mpvue-city-picker
					ref="mpvueCityPicker"
					:pickerValueDefault="pickerValueDefault"
					
				></mpvue-city-picker>
			</p>
			<p></p>
		</div>
	</view>
</template>

<script>
import mpvueCityPicker from 'mpvue-citypicker';
export default {
	data() {
		return {
			pickerValueDefault: [0, 0, 1]
		};
	},
	components: {
		mpvueCityPicker
	},
	methods: {
		selectArea() {
			this.area = this.areaList[e.detail.value];
		},
		showCityPicker() {
			this.$refs.mpvueCityPicker.show();
		}
	}
};
</script>

<style></style>
