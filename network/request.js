// #ifdef APP-PLUS
const Fly = require("flyio/dist/npm/weex")
// #endif
// #ifdef H5
var Fly = require("flyio/dist/npm/fly")
// #endif

const fly = new Fly
import {
	getToken
} from '@/utils/cache.js'

const host = 'https://api.cjbe88.com'

// 添加请求拦截器
fly.interceptors.request.use(request => {
	request.headers['accessToken'] = getToken()
	uni.showLoading({
		title: '正在加载...',
		mask: true
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
			confirmText: "确定"
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

export default fly