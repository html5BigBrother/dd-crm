import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text, Navigator, Image } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton, AtMessage } from 'taro-ui'
import './login.styl'

import validate from '../../utils/validate'
import { showModalError } from '../../utils/util'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import { serverPermissionCodes } from '../../utils/role'
import request from '../../utils/request'
import config from '../../utils/config'


class Login extends Component {

  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      loading: false
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {}

  onChangeInput(valueName, e) {
    this.setState({ [valueName]: e.detail.value })
  }

  onClickLogin() {
    // Taro.showLoading({ titile: '哈哈哈' })
    let data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })

    const vRes = validate([
      { type: 'vEmpty', value: this.state.username, msg: '请输入用户名' },
      { type: 'vEmpty', value: this.state.password, msg: '请输入密码' },
    ])

    if (vRes !== true) {
      Taro.atMessage({ 'message': vRes, 'type': 'error', })
      return
    }

    // 暂时测试账号，后续删除
    if (process.env.NODE_ENV !== 'development') {
      if (this.state.username === 'pres' && this.state.password === 'pres') {
        config.env = 'pres'
        data = JSON.stringify({
          username: 'huangzhenzhong',
          password: '123456'
        })
      } else {
        config.env = ''
      }
    }

    request.post({
      url: '/leads/user/login',
      data,
      bindLoading: true,
      loadingText: '登陆中',
      success: () => {
        this.verifyPermissions()
      }
    })
  }

  // 权限
  verifyPermissions() {
    let permissionCodes = []
    for (let i in serverPermissionCodes) {
      permissionCodes.push(i)
    }

    const needRequests = []
    // let permissions = getGlobalData('permissions') || {}
    let permissions = {}
    permissionCodes.forEach(item => {
      needRequests.push(item)
    })
    request.post({
      url: '/leads/user/getAuthList',
      data: JSON.stringify(needRequests),
      success: (res) => {
        const ps = res.data
        ps.forEach(item => {
          permissions[serverPermissionCodes[item.permissionCode]] = item.isEnable
        })
        setGlobalData('permissions', permissions)
        this.getUserInfo()
      }
    })
  }

  // 查询用户信息
  getUserInfo() {
    request.get({
      url: '/leads/user/getUserInfo',
      bindLoading: true,
      loadingText: '登陆中',
      success: (resData) => {
        if (resData.data.position !== '客户经理') {
          showModalError({
            content: '移动端目前只支持客户经理登录，请重新输入账号密码'
          })
          return
        }
        setGlobalData('userInfo', resData.data)
        Taro.navigateTo({ url: '/pages/index/index' })
      }
    })
  }

  render () {
    const { username, password, loading } = this.state
    return (
      <View className='p-page'>
        <AtMessage />
        <View className='p-container'>
          <View className='p-form-box'>
            <View className='p-input-wrap'>
              <Input className='u-input' placeholder='用户名' value={username} onInput={this.onChangeInput.bind(this, 'username')} />
            </View>
            <View className='p-input-wrap'>
              <Input className='u-input' password placeholder='密码' value={password} onInput={this.onChangeInput.bind(this, 'password')} />
            </View>
            <View className='p-input-wrap'>
            <AtButton className='u-btn-submit' type='primary' loading={loading} onClick={this.onClickLogin.bind(this)}>登录</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

export default Login
