import fly from '@/network/request'
import qs from 'qs'

export function getSms(type, loginName) {
	return fly.request('/member/user/sendSmsCode', {type, loginName}, {
	  method: 'get'
	})
}
export function getRegister(form) {
	const data = qs.stringify(form)
	return fly.request('/member/user/eRegister', data, {
	  method: 'POST'
	})
}
export function forgetpassword(form) {
	const data = qs.stringify(form)
	return fly.request('/member/user/forgetPassword', data, {
	  method: 'POST'
	})
}