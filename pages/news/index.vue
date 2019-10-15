<template>
		<mescroll-uni :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" >
			<view v-for="data in dataList" :key="data.id"> 
			  <view style="height:100px;">{{data.content}}</view>
			</view>
		</mescroll-uni>
	</template>

	<script>
		// 引入mescroll-uni组件
		import MescrollUni from "mescroll-uni"; // npm安装的引入方式
		import { newsList } from '@/api/news.js'
		
		export default {
			components: {
				MescrollUni
			},
			data() {
				return {
					// 下拉刷新的常用配置
					downOption: { 
						use: true, // 是否启用下拉刷新; 默认true
						auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
					},
					// 上拉加载的常用配置
					upOption: {
						use: true, // 是否启用上拉加载; 默认true
						auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
						page: {
							num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
							size: 10 // 每页数据的数量,默认10
						},
						noMoreSize: 1, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
						empty: {
							tip: '暂无相关数据'
						},
						textNoMore:'没有更多的数据了'
					},
					// 列表数据
					dataList: []
				}
			},
			methods: {
				/*下拉刷新的回调, 有三种处理方式: */
				downCallback(mescroll){	
					//下拉刷新和上拉加载调同样的接口, 那以上请求可删, 直接用mescroll.resetUpScroll()代替
					mescroll.resetUpScroll(); // 重置列表为第一页 (自动执行 page.num=1, 再触发upCallback方法 )		
				},
				/*上拉加载的回调*/
				upCallback(mescroll) {
					// 此时mescroll会携带page的参数:
					let pageNum = mescroll.num; // 页码, 默认从1开始
					let pageSize = mescroll.size; // 页长, 默认每页10条
					console.log(pageNum,pageSize)
					newsList({pageNum,pageSize}).then(response=>{
						console.log(response)
						// 接口返回的当前页数据列表 (数组)
								let curPageData = response.data.dataList; 
								// 接口返回的总数据量(比如列表有26个数据,每页10条,共3页; 则totalSize值为26)
								let totalSize = response.data.page.total; 
								if(mescroll.num == 1) this.dataList = []; //如果是第一页需手动置空列表
								this.dataList = this.dataList.concat(curPageData); //追加新数据
								mescroll.endByPage(curPageData.length, totalSize); 
					})
				}
			}
		}
	</script>

	<style>
	</style>
