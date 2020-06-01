
import Taro from '@tarojs/taro'

import { showModalError } from './util.js'
import config from './config.js'
import { set as setGlobalData, get as getGlobalData } from './globalData.js'

function getHost() {
  const env = 'pres'
  let res = ''
  switch (env) {
    case 'pres':
      res = config.hostPres
      break
    default:
      res = config.hostOnline
  }
  return res
}

function ajaxUrl(url) {
  const host = getHost()
  url = host + url
  console.log(`request url: ${url}`)
  return url
}

// function parseCookie(cookieStr) {
//   let cookieNow = getGlobalData('setCookie') || {}
//   if (cookieStr) {
//     cookieStr.split(';').forEach((item) => {
//       item.trim().split(',').forEach((item2) => {
//         let arr = item2.split('=')
//         if (arr.length === 2) {
//           cookieNow[arr[0].trim()] = arr[1].trim()
//         }
//       })
//     })
//   }
//   setGlobalData('setCookie', cookieNow)

//   return cookieNow
// }

// function stringifyCookie() {
//   let cookieNow = getGlobalData('setCookie') || {}
//   let cookieStr = ''
//   for (let key in cookieNow) {
//     cookieStr += `${key}=${cookieNow[key]}; `
//   }
//   return cookieStr
// }

function request(opts) {
  doAjax(opts)
}

request.post = function (opts) {
  opts.method = 'POST'
  request(opts)
}

request.get = function (opts) {
  opts.method = 'GET'
  request(opts)
}

function doAjax({ method, url, contentType = 'json', data, loadingText, success, fail, complete }) {
  let isSuccess = false
  const requestData = data

  if (loadingText && Taro.showLoading) {
    Taro.showLoading({ title: loadingText || '', mask: true })
  }

  // let header = { 'Cookie': 'JSESSIONID=' + sessionId }
  // let header = { Cookie: stringifyCookie() }
  let header = {}
  if (/^post$/i.test(method)) {
    header['content-type'] = 'application/' + contentType
  }

  Taro.request({
    method: method.toUpperCase(),
    url: ajaxUrl(url),
    header,
    data,
    success(resData) {
      const responseData = resData.data
      // const responseHeader = resData.header
      // if (responseHeader) {
      //   for (let i in responseHeader) {
      //     // 兼容部分手机set-cookie大小写的问题
      //     /^set-cookie$/i.test(i.trim()) && parseCookie(responseHeader[i])
      //   }
      // }

      if (loadingText && Taro.showLoading) {
        Taro.hideLoading()
        isSuccess = true
      }
      if (responseData.code === '0') {
        success && success(responseData)
      } else {
        if (!fail) {
          showModalError({ content: responseData.message })
        } else {
          fail(responseData)
        }
      }
    },
    complete(res) {
      // console 请求
      consoleRequest({ url, requestData, responseData: res })

      if (loadingText && Taro.showLoading && !isSuccess) {
        Taro.hideLoading()
      }
      let errMsg = res.errMsg
      if (/timeout|请求超时/.test(errMsg)) {
        showModalError({ content: '请求超时' })
      } else if (/fail/.test(errMsg)) {
        showModalError({ content: '系统繁忙，请稍后再试' })
      }
      complete && complete(res)
    }
  })
}

function consoleRequest({ url, requestData, responseData }) {
  console.log('<---------------------------------------------------------------')
  console.log('请求接口：')
  console.log(`${url}`)
  console.log('请求数据：')
  console.log(requestData || {})
  console.log('返回数据：')
  console.log(responseData || {})
  console.log('---------------------------------------------------------------->')
}

export default request
