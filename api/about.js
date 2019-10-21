import fly from '@/network/request'

// 水位信息
export function list(form) {
	return fly.request('/info/article/list', form, {
		method: 'get'
	})
}