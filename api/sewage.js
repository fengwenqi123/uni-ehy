import fly from '@/network/request'
import qs from 'qs'

export function boatList(tags) {
	return fly.request('/member/memShip/selectByToken', {
		tags
	}, {
		method: 'get'
	})
}

export function recoveryInfo(shipName, code) {
	return fly.request('/sewage/sewageOutlet/findByCode', {
		shipName,
		code
	}, {
		method: 'get'
	})
}

export function discharge(form) {
	const data = qs.stringify(form)
	return fly.request('/sewage/sewageInfo/insertInfo', data, {
		method: 'post'
	})
}

export function recoveryPointList() {
	return fly.request({
		url: '/sewage/sewageSite/list',
		method: 'GET'
	})
}
export function outLetList(siteName) {
	return fly.request({
		url: '/sewage/sewageOutlet/list',
		method: 'GET',
		params: {
			siteName
		}
	})
}
export function questionReport(form) {
	const data = qs.stringify(form)
	return fly.request({
		url: '/sewage/recordLog/update',
		method: 'POST',
		data
	})
}

// 排污记录
export function sewageReport(pageNum, pageSize, time, type, shipName) {
	return fly.request({
		url: '/sewage/sewageInfo/getRecord',
		method: 'GET',
		params: {
			pageNum,
			pageSize,
			time,
			type,
			shipName
		}
	})
}

// 排污收集点列表
export function sewagePoint(pageNum, pageSize, city, area, fomesType, currentLon, currentLat) {
	return fly.request({
		url: '/sewage/sewageSite/',
		method: 'GET',
		params: {
			pageNum,
			pageSize,
			city,
			area,
			fomesType,
			currentLon,
			currentLat
		}
	})
}

//排污积分
export function pwList(pageNum, pageSize, time, type) {
	return fly.request({
		url: '/poi/sewage',
		method: 'GET',
		params: {
			pageNum,
			pageSize,
			time,
			type
		}
	})
}
