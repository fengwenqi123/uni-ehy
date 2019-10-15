import Request from '../plugins/request/js/index';
let res = Request();
export function hydrology(province, city, pageNum, pageSize) {
	return res.request({
		url: '/environment/hydrology',
		method: 'GET',
		params: {
			province: province,
			city: city,
			pageNum: pageNum,
			pageSize: pageSize
		}
	});

}
