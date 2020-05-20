import Taro from '@tarojs/taro'

export function showModalError({ title, content, confirmText, confirmColor }) {
  Taro.showModal({
    title: title || '错误',
    content: content || '系统繁忙',
    showCancel: false,
    confirmText: confirmText || '确定',
    confirmColor: confirmColor || '#3CC51F',
  })
}

export function showInfoModal() {
  
}
