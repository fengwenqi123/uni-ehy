import fly from '@/network/request'
import qs from 'qs'

export function search(xm, sfzhm) {
  return fly.request('/collaboration/crew/findByname', {xm, sfzhm}, {
    method: 'get'
  })
}
export function jrzList(page, row, cyxm) {
	const data = qs.stringify({page, row, cyxm})
	return fly.request('/check/dataForward/data/rzcyxx', data, {
	  method: 'post'
	})
}