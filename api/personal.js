import fly from '@/network/request'
import qs from 'qs'

export function updatePhoto(form) {
  const data = qs.stringify(form)
  return fly.request('/member/user/updatePhoto', data, {
    method: 'post'
  })
}