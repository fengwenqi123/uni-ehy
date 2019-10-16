import Request from '../plugins/request/js/index';
let res = Request();
export function getSms(type, loginName) {
	return res.request({
		url: '/member/user/sendSmsCode',
		method: 'GET',
		params: {
			type,
			loginName
		}
	});
}
export function getRegister(form) {
	return res.request({
		url: '/member/user/eRegister',
		method: 'POST',
		data: form
	});
}
