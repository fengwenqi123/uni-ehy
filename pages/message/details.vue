<template>
<div class="container">
	<div class="header">
		<div class="title">
			{{title}}
		</div>
		<div class="date">
			{{time}}
		</div>
	</div>
	<div class="main">
		{{content}}
	</div>
</div>
</template>

<script>
  export default {
    name: 'details',
	data(){
		return{
			time:null,
			title:null,
			content:null
		}
	},
	onLoad(option) {
	    this.time = option.time
	    this.title = option.title
	    this.content = option.content
	}
  }
</script>

<style scoped lang="scss">
.container{
	background: #ffffff;
	.header{
		text-align: center;
		padding-bottom: 36rpx;
		border-bottom: 1px solid #D8D8D8;
		.title{
			margin-top: 36rpx;
			font-size:36rpx;
			font-weight:500;
			color:rgba(51,51,51,1);
		}
		.date{
			margin-top: 40rpx;
			font-size:24rpx;
			font-weight:500;
			color:rgba(153,153,153,0.6);
		}
	}
	.main{
		margin-top: 32rpx;
		padding: 0 34rpx;
		text-indent: 40rpx;
	}
}
</style>
