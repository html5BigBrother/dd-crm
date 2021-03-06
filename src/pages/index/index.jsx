import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image } from '@tarojs/components'
import { AtTabBar, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'

import './index.styl'

import icon_demo from '../../static/imgs/icon_demo.jpg'
import icon_avatar from '../../static/imgs/icon_avatar.svg'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'

// @connect(({ counter }) => ({
//   counter
// }), (dispatch) => ({
//   add () {
//     dispatch(add())
//   },
//   dec () {
//     dispatch(minus())
//   },
//   asyncAdd () {
//     dispatch(asyncAdd())
//   }
// }))
class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      menuOptions: [
        { text: '工作台', iconName: 'bullet-list', url: '/pages/doList/doList' },
        { text: '销售管理', iconName: 'shopping-bag', url: '/pages/saleManage/saleManage' },
      ]
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {}

  onClickTabBar(value) {
    this.setState({
      current: value
    })
  }

  renderIndex() {
    const { menuOptions } = this.state
    return (
      <View className='p-section-index'>
        <View className='u-head'></View>
        <View className='u-body'>
          <View className='p-list-menu'>
            {
              menuOptions.map((item) =>
                <Navigator className='u-menu-item' hoverClass='u-menu-item-hover' url={item.url} key={item.text}>
                  {/* <Image className='u-menu-icon' src={icon_demo}></Image> */}
                  <AtIcon className='u-menu-icon' value={item.iconName} size='30' color='#2eadb6'></AtIcon>
                  <View className='u-menu-text'>{item.text}</View>
                </Navigator>
              )
            }
          </View>
        </View>
      </View>
    )
  }

  renderUser() {
    const userInfo = getGlobalData('userInfo')
    return (
      <View className='p-section-user'>
        <View className='u-head'>
          <View className='p-avatar'>
            <open-avatar
              nickName='.'
              avatar={icon_avatar}
              size='huge'
            ></open-avatar>
          </View>
          <View className='p-person-name'>{userInfo.name}</View>
        </View>
        <View className='u-body'>
          <View className='p-list-describe'>
            <View className='u-item'>
              <AtIcon value='iphone' color='#2eadb6'></AtIcon>
              <View className='u-name'>手机号码</View>
              <View className='u-value'>{userInfo.mobile}</View>
            </View>
            <View className='u-item'>
              <AtIcon value='user' color='#2eadb6'></AtIcon>
              <View className='u-name'>身份</View>
              <View className='u-value'>{userInfo.position}</View>
            </View>
          </View>
        </View>
        
      </View>
    )
  }

  render () {
    const { current } = this.state
    return (
      <View className='p-page'>
        <View className='p-container'>
          {
            {
              0: this.renderIndex(),
              1: this.renderUser()
            }[current]
          }
        </View>
        <AtTabBar
          fixed
          color='#888888'
          selectedColor='#2eadb6'
          backgroundColor='#FAFAFA'
          tabList={[
            { title: '主页', iconType: 'home' },
            { title: '我的', iconType: 'user' }
          ]}
          onClick={this.onClickTabBar.bind(this)}
          current={current}
        />
      </View>
    )
  }
}

export default Index
