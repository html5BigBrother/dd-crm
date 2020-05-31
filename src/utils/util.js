import Taro from '@tarojs/taro'

// 弹框
export function showModalError({ title, content, confirmText, confirmColor }) {
  Taro.showModal({
    title: title || '错误',
    content: content || '系统繁忙',
    showCancel: false,
    confirmText: confirmText || '确定',
    confirmColor: confirmColor || '#3CC51F',
  })
}

// 路由
function queryFromObjectToString(url, query) {
  let queryStr = ''
  if (query) {
    queryStr = url.indexOf('?') >= 0 ? '&' : '?'
    for (let key in query) {
      queryStr += `${key}=${query[key]}&`
    }
    queryStr = queryStr.substr(0, queryStr.length - 1)
  }
  return url + queryStr
}

export function navigateTo(url, query) {
  Taro.navigateTo({ url: queryFromObjectToString(url, query) })
}

export function redirectTo(url, query) {
  Taro.redirectTo({ url: queryFromObjectToString(url, query) })
}

export function reLaunch(url, query) {
  Taro.reLaunch({ url: queryFromObjectToString(url, query) })
}