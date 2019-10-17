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

