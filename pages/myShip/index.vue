<template>
<div class="container">
<cu-custom bgColor="bg-gradual-white" :isBack="true">
 <block slot="content">我的船舶</block>
  <block slot="right"><image class="add" @click="add" src="../../static/img/add.png" mode=""></image></block>
  </cu-custom>
</div>
</template>

<script>
  export default {
    name: 'index',
	methods:{
		add(){
			alert(111)
		}
	}
  }
</script>

<style scoped lang="scss">
.container{
	width: 100%;
	.add{
		margin-right: 20rpx;
		width: 40rpx;
		height: 40rpx;
	}
}
</style>
