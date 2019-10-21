<template>
	<div class="container">
		<ul v-if="!content">
			<li v-for="(item, index) in dataList" :key="index" @click="showContent(item)">
				<div class="item">
					<div class="title">{{ item.title }}</div>
				</div>
			</li>
		</ul>
		<div v-else class="content"><rich-text :nodes="content"></rich-text></div>
	</div>
</template>

<script>
import { list } from '@/api/about';

export default {
	name: 'index',
	data() {
		return {
			dataList: null,
			content: null
		};
	},
	created() {
		this.getList();
	},
	methods: {
		getList() {
			list({
				articleClassId: '',
				articleClassCode: 'ehy_about',
				status: 1
			}).then(response => {
				if (response.data.length === 1) {
					this.content = response.data[0].content;
				} else {
					this.dataList = response.data;
				}
			});
		},
		showContent(item) {
			const content = item.content;
			uni.navigateTo({
				url: `/pages/about/aboutContent?content=${content}`,
				animationType: 'pop-in',
				animationDuration: 300
			});
			// this.$router.push({
			//   path: '/page/about/aboutContent',
			//   query: {
			//     content,
			//     title,
			//     flag
			//   }
			// })
		}
	}
};
</script>

<style scoped lang="scss">
.container {
	position: absolute;
	width: 100%;
	height: 100%;
	background: #fff;

	.header {
		position: fixed;
		width: 100%;
		z-index: 9;
	}

	ul {
		padding-top: 100rpx;

		li {
			.item {
				height: 80rpx;
				line-height: 80rpx;
				margin: 0 40rpx;
			}

			border-bottom: 1rpx solid #ccc;
		}
	}
	.content {
		margin: 10rpx 20rpx;
		line-height: 50rpx;
		text-indent: 60rpx;
	}
}
</style>
