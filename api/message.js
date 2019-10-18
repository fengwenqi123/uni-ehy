import fly from '@/network/request'
// import qs from 'qs'

export function getMessage() {
	return fly.get('/news/personalNews/selectByUserId')
}