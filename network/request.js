// #ifdef APP-PLUS
const Fly = require("flyio/dist/npm/weex")
// #endif

// #ifdef MP-WEIXIN
var Fly=require("flyio/dist/npm/wx") 
// #endif
const fly = new Fly
import {
	getToken
} from '@/utils/cache.js'

const host = 'https://api.cjbe88.com'
const timeout = 6000

// 添加请求拦截器
fly.interceptors.request.use(request => {
	request.headers['accessToken'] = getToken()
	uni.showLoading({
		title: '正在加载...',
		mask: false
	});
	return request
}, error => {
	console.log(error)
	Promise.reject(error)
})

// 添加响应拦截器
fly.interceptors.response.use(response => {
	uni.hideLoading();
	const res = response.data
	if (res.code !== 200) {
		uni.showModal({
			content: res.msg, 
			showCancel: false,
			success: (data)=> {
				console.log(res)
				console.log(data)
				if (data.confirm) {
					if(res.msg === '未登录'){
						uni.showToast({
							title: '请重新登录'
						});
						setTimeout(() => {
							uni.navigateTo({
								url: '/pages/login/index',
								animationType: 'pop-in',
								animationDuration: 300
							});
						}, 1000);
					}
				}
			}
		})
		return Promise.reject('error')
	} else {
		return res
	}
}, err => {
	uni.hideLoading();
	uni.showToast({
		title: err.message,
		icon: "none",
		duration: 1500
	});
	return Promise.reject(err)
})

fly.config.baseURL = host
fly.config.timeout = timeout;

export default fly
