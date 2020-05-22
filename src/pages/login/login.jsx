import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text, Navigator, Image } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton } from 'taro-ui'
import './login.styl'

import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import { serverPermissionCodes } from '../../utils/role'
import request from '../../utils/request'


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
    const data = JSON.stringify({
      username: this.state.username,
      password: this.state.password
    })
    request.post({
      url: '/leads/user/login',
      data,
      bindLoading: true,
      loadingText: '登陆中',
      success: () => {
        this.getUserInfo()
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
    const resPermissions = {}
    let permissions = getGlobalData('permissions') || {}
    permissionCodes.forEach(item => {
      if (!permissions[item]) {
        needRequests.push(item)
      } else {
        resPermissions[item] = permissions[item]
      }
    })
    if (needRequests.length > 0) {
      request.post({
        url: '/leads/user/getAuthList',
        data: JSON.stringify(needRequests),
        success: () => {

        }
      })
      if (res.data && res.data.code === '0') {
        const ps = res.data.data
        const permissions = state.permissions
        ps.forEach(item => {
          permissions[serverPermissionCodes[item.permissionCode]] = item.isEnable
          resPermissions[serverPermissionCodes[item.permissionCode]] = item.isEnable
        })
        // console.log(resPermissions, ps)
        commit('save', { permissions })
        return resPermissions
      }
    } else {
      return resPermissions
    }
  }

  // 查询用户信息
  getUserInfo() {
    request.get({
      url: '/leads/user/getUserInfo',
      bindLoading: true,
      loadingText: '登陆中',
      success: (resData) => {
        setGlobalData('userInfo', resData.data)
        Taro.navigateTo({ url: '/pages/index/index' })
      }
    })
  }

  render () {
    const { username, password, loading } = this.state
    return (
      <View className='p-page'>
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
