import Taro, { Component } from '@tarojs/taro'
import { View, Input, Button, Text, Navigator, Image } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton } from 'taro-ui'

import './login.styl'
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
