import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtFloatLayout, AtTextarea } from 'taro-ui'
import './doList.styl'

import { taskStatus, taskType, dealStatus } from '../../utils/enums'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      isOpenedFloat: false,
      rangeData: [],
      todoList: [
        {
          "id":1443,
          "taskType":"1",
          "content":"????",
          "leadsId":1,
          "companyName":"上海西前实业有限公司",
          "gmtExpect":"2028-02-01 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"silulin",
          "receiveName":"斯路林",
          "receiveCode":"u170007",
          "receiveGroup":"虚拟部门,特区,杭州区",
          "createRole":"9",
          "createMemId":"silulin",
          "createName":"斯路林",
          "createCode":"154606878,154804574",
          "createGroup":"虚拟部门,特区,杭州区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-04-01 10:04:41",
          "gmtDeal":"",
          "gmtModified":"2020-04-01 10:04:41",
          "leadsIds":"",
          "receiveType":""
        },
        {
          "id":1444,
          "taskType":"1",
          "content":"????",
          "leadsId":2,
          "companyName":"苏州德威鸿业国际贸易有限公司",
          "gmtExpect":"2028-02-01 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"silulin",
          "receiveName":"斯路林",
          "receiveCode":"u170007",
          "receiveGroup":"虚拟部门,特区,杭州区",
          "createRole":"9",
          "createMemId":"silulin",
          "createName":"斯路林",
          "createCode":"154606878,154804574",
          "createGroup":"虚拟部门,特区,杭州区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-04-01 10:04:41",
          "gmtDeal":"",
          "gmtModified":"2020-04-01 10:04:41",
          "leadsIds":"",
          "receiveType":""
        },
        {
          "id":1441,
          "taskType":"1",
          "content":"????",
          "leadsId":1,
          "companyName":"上海西前实业有限公司",
          "gmtExpect":"2028-02-01 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"silulin",
          "receiveName":"斯路林",
          "receiveCode":"u170007",
          "receiveGroup":"虚拟部门,特区,杭州区",
          "createRole":"9",
          "createMemId":"silulin",
          "createName":"斯路林",
          "createCode":"154606878,154804574",
          "createGroup":"虚拟部门,特区,杭州区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-03-16 09:19:25",
          "gmtDeal":"",
          "gmtModified":"2020-03-16 09:19:25",
          "leadsIds":"",
          "receiveType":""
        },
        {
          "id":1440,
          "taskType":"1",
          "content":"????",
          "leadsId":2,
          "companyName":"苏州德威鸿业国际贸易有限公司",
          "gmtExpect":"2028-02-01 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"silulin",
          "receiveName":"斯路林",
          "receiveCode":"u170007",
          "receiveGroup":"虚拟部门,特区,杭州区",
          "createRole":"9",
          "createMemId":"silulin",
          "createName":"斯路林",
          "createCode":"154606878,154804574",
          "createGroup":"虚拟部门,特区,杭州区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-03-16 09:17:13",
          "gmtDeal":"",
          "gmtModified":"2020-03-16 09:17:13",
          "leadsIds":"",
          "receiveType":""
        },
        {
          "id":1438,
          "taskType":"1",
          "content":"????",
          "leadsId":2,
          "companyName":"苏州德威鸿业国际贸易有限公司",
          "gmtExpect":"2028-02-01 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"silulin",
          "receiveName":"斯路林",
          "receiveCode":"u170007",
          "receiveGroup":"虚拟部门,特区,杭州区",
          "createRole":"9",
          "createMemId":"silulin",
          "createName":"斯路林",
          "createCode":"154606878,154804574",
          "createGroup":"虚拟部门,特区,杭州区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-03-13 17:31:01",
          "gmtDeal":"",
          "gmtModified":"2020-03-13 17:31:01",
          "leadsIds":"",
          "receiveType":""
        },
        {
          "id":1396,
          "taskType":"3",
          "content":"对已经有额度未下单的客户进行需求排摸",
          "leadsId":98816,
          "companyName":"仟金顶弯弯测试-1",
          "gmtExpect":"2020-03-17 00:00:00",
          "setExpired":false,
          "dealRole":"0",
          "dealMemId":"",
          "dealName":"",
          "dealCode":"",
          "dealGroup":"",
          "receiveRole":"2",
          "receiveMemId":"zhangyanxin",
          "receiveName":"张彦新",
          "receiveCode":"u190352",
          "receiveGroup":"北京区",
          "createRole":"9",
          "createMemId":"zhangyu",
          "createName":"张宇",
          "createCode":"57508456",
          "createGroup":"北京区",
          "dealResult":"",
          "dealStatus":"",
          "status":"0",
          "gmtCreated":"2020-03-11 19:27:23",
          "gmtDeal":"",
          "gmtModified":"2020-03-11 19:27:23",
          "leadsIds":"",
          "receiveType":""
        }
      ]
    }
  }

  componentDidMount() {
    let rangeData = []
    for(let i in dealStatus) {
      rangeData.push({ key: i, label: dealStatus[i] })
    }
    this.setState(rangeData)
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {}

  onClickTab(value) {
    this.setState({
      current: value
    })
  }

  onClickHandle() {
    this.setState({ isOpenedFloat: true })
  }

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  renderTodoList() {
    const { todoList } = this.state
    return (
      <View className='p-section-todo'>
        <View className='p-list-todo list-style-sheet'>
          {
            todoList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                  <View className='sheet-item-title'>工单编号：{item.id}</View>
                  <View>企业名称：{item.companyName}</View>
                  <View>创建人：{item.id}</View>
                  <View>工单类型：{taskType[item.taskType]}</View>
                  <View>工单内容：{item.content}</View>
                  <View>创建时间：{item.gmtCreated }</View>
                  <View>期望完成时间：{item.gmtExpect}</View>
                  <View>是否过期失效：{item.setExpired ? '是' : '否'}</View>
                  <View>leads ID：{item.leadsId}</View>
                  <View>当前状态：{taskStatus[item.status]}</View>
                </View>
                <View className='u-edit'>
                  <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickHandle.bind(this)}>处理</AtButton>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderDoneList() {
    const { todoList } = this.state
    return (
      <View className='p-section-done'>
        <View className='p-list-todo list-style-sheet'>
          {
            todoList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                  <View className='sheet-item-title'>工单编号：{item.id}</View>
                  <View>创建人：{item.id}</View>
                  <View>接收人：{item.id}</View>
                  <View>工单类型：{taskType[item.taskType]}</View>
                  <View>工单内容：{item.content}</View>
                  <View>处理状态：{dealStatus[item.dealStatus]}</View>
                  <View>创建时间：{item.gmtCreated }</View>
                  <View>期望完成时间：{item.gmtExpect}</View>
                  <View>是否过期失效：{item.setExpired ? '是' : '否'}</View>
                  <View>leads ID：{item.leadsId}</View>
                  <View>企业名称：{item.companyName}</View>
                  <View>当前状态：{taskStatus[item.status]}</View>
                  <View>处理结果：{item.dealResult}</View>
                  <View>处理时间：{item.gmtDeal}</View>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  render () {
    const { current, isOpenedFloat, textValue, rangeData } = this.state
    const tabList = [{ title: '我的待办' }, { title: '我的办结' }]
    return (
      <View className='p-page'>
        <View className='p-container'>
          <AtTabs current={current} tabList={tabList} onClick={this.onClickTab.bind(this)}>
            <AtTabsPane current={current} index={0}>
              { this.renderTodoList() }
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              { this.renderDoneList() }
            </AtTabsPane>
          </AtTabs>
          <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
            <View className='form-style'>
              <View className='form-item'>
                <View className='item-name'>处理状态</View>
                <View className='item-content'>
                  <Picker mode='selector' range={rangeData} ></Picker>
                </View>
              </View>
              <View className='form-item'>
                <View className='item-name'>处理结果</View>
                <View className='item-content'>
                  <AtTextarea
                    count={false}
                    value={textValue}
                    placeholder='请填写处理结果'
                    maxLength={50}
                  ></AtTextarea>
                </View>
              </View>
            </View>
          </AtFloatLayout>
        </View>
      </View>
    )
  }
}

export default Index
