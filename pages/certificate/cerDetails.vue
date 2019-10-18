<template>
	<div class="container">
		<div class="list">
			<van-tabs v-model="active" sticky animated swipeable color="#1989FA" title-active-color="#1989FA">
				<van-tab title="适任证"><Competence></Competence></van-tab>
				<van-tab title="任解职"><dismission></dismission></van-tab>
			</van-tabs>
		</div>
	</div>
</template>

<script>
import Competence from './Competence';
import dismission from './dismission';
export default {
	data() {
		return {
			active: 0
		};
	},
	components: {
		Competence,
		dismission
	},
	methods: {}
};
</script>

<style scoped lang="scss"></style>
