import fly from '@/network/request'
import flyNoLoading from '@/network/requestNoLoading'
import qs from 'qs'

export function login(form) {
  const data = qs.stringify(form)
  return fly.request('/login/user/login', data, {
    method: 'post'
  })
}

export function online(accessToken) {
  return flyNoLoading.request('/login/user/online', {accessToken}, {
    method: 'get'
  })
}
