import fly from '@/network/request'
import qs from 'qs'

export function search(xm, sfzhm) {
  return fly.request('/collaboration/crew/findByname', {xm, sfzhm}, {
    method: 'get'
  })
}
