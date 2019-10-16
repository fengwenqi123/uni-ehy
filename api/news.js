import fly from '@/network/request'

export function newsList(form) {
  return fly.request('/news/news', form, {
    method: 'get'
  })
}
