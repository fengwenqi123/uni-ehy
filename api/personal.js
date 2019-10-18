import fly from '@/network/request'
import qs from 'qs'

export function updatePhoto(form) {
  const data = qs.stringify(form)
  return fly.request('/member/user/updatePhoto', data, {
    method: 'post'
  })
}
export function updateName(form) {
  const data = qs.stringify(form)
  return fly.request('/member/user/updateName', data, {
    method: 'post'
  })
}

export function userInfoById() {
  return fly.request('/member/user/my', null, {
    method: 'get'
  })
}

export function updateCity() {
  return fly.request('/member/user/updateAddress', null, {
    method: 'get'
  })
}