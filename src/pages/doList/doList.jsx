import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtFloatLayout, AtTextarea, AtIcon, AtMessage } from 'taro-ui'
import './doList.styl'

import validate from '../../utils/validate'
import { taskStatus, taskType, dealStatus } from '../../utils/enums'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import request from '../../utils/request'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      isOpenedFloat: false,
      rangeData: [],
      rangeIndex: 0,
      textValue: '',
      searchFormTodo: {
        pageNo: 1,
        pageSize: 10,
        descs: 'gmt_created',
        taskStatus: '0',
        memberType: '1',
        receiveName: '',
        receiveMemId: ''
      },
      searchFormDone: {
        pageNo: 1,
        pageSize: 10,
        descs: 'gmt_deal',
        taskStatus: '1',
        memberType: '2',
        receiveName: '',
        receiveMemId: ''
      },
      todoList: [],
      doneList: [],
      currentId: '',
    }
  }

  componentDidMount() {
    let rangeData = []
    for(let i in dealStatus) {
      rangeData.push({ key: i, label: dealStatus[i] })
    }
    this.setState({ rangeData })
    this.switchCurrent()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onReachBottom() {

  }

  config = {}

  onClickTab(value) {
    this.setState({
      current: value
    })
    this.switchCurrent(value)
  }

  onClickHandle(item) {
    this.setState({
      isOpenedFloat: true,
      rangeIndex: '',
      textValue: '',
      currentId: item.id
    })
  }

  onClickSubmit() {
    const { currentId, rangeData, rangeIndex, textValue } = this.state
    const data = {
      dealStatus: rangeData[rangeIndex].key,
      id: currentId,
      processResult: textValue
    }

    const vRes = validate([
      { type: 'vEmpty', value: data.dealStatus, msg: '请选择处理状态' },
      { type: 'vEmpty', value: data.processResult, msg: '请填写处理结果' },
    ])

    if (vRes !== true) {
      Taro.atMessage({ 'message': vRes, 'type': 'error', })
      return
    }

    request.post({
      url: '/leads/tasks/process',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: () => {
        Taro.showToast({ title: '成功' })
        this.onChangeIsOpenedFloat(false)
        this.switchCurrent()
      }
    })
  }

  onChangeTextarea(e) {
    this.setState({ textValue: e.detail.value })
  }

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  onChangeDealStatus(e) {
    this.setState({ rangeIndex: e.detail.value })
  }

  initSearchFormTodo () {
    const { searchFormTodo } = this.state
    const userInfo = getGlobalData('userInfo')

    searchFormTodo.receiveName = userInfo.name
    searchFormTodo.receiveMemId = userInfo.memberId
    
    return searchFormTodo
  }

  initSearchFormDone () {
    const { searchFormDone } = this.state
    const userInfo = getGlobalData('userInfo')

    searchFormDone.receiveName = userInfo.name
    searchFormDone.receiveMemId = userInfo.memberId

    return searchFormDone
  }

  switchCurrent(value) {
    debugger
    const current = value || this.state.current
    switch (current) {
      case 0:
        this.getLeadsListTodo()
        break
      case 1:
        this.getLeadsListDone()
        break
    }
  }

  getLeadsListTodo() {
    const data = this.initSearchFormTodo()
    request.get({
      url: '/leads/tasks/list',
      data: data,
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        this.setState({ todoList: resData.data.pagedRecords })
      }
    })
  }

  getLeadsListDone() {
    const data = this.initSearchFormDone()
    request.get({
      url: '/leads/tasks/list',
      data: data,
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        this.setState({ doneList: resData.data.pagedRecords })
      }
    })
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
                  <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickHandle.bind(this, item)}>处理</AtButton>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderDoneList() {
    const { doneList } = this.state
    return (
      <View className='p-section-done'>
        <View className='p-list-todo list-style-sheet'>
          {
            doneList.map((item) =>
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
    const { current, isOpenedFloat, textValue, rangeData, rangeIndex } = this.state
    const tabList = [{ title: '我的待办' }, { title: '我的办结' }]
    return (
      <View className='p-page'>
        <AtMessage />
        <View className='p-container'>
          <AtTabs current={current} tabList={tabList} swipeable={false} onClick={this.onClickTab.bind(this)}>
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
                  <Picker mode='selector' range={rangeData} value={rangeIndex} rangeKey='label' onChange={this.onChangeDealStatus.bind(this)}>
                    <View className='item-select'>
                      <View className='flex-1'>{rangeData[rangeIndex] ? rangeData[rangeIndex].label : '请选择'}</View>
                      <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                    </View>
                  </Picker>
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
                    onChange={this.onChangeTextarea.bind(this)}
                  ></AtTextarea>
                </View>
              </View>
            </View>
            <AtButton className='p-btn-submit' type='primary' onClick={this.onClickSubmit.bind(this)}>提交</AtButton>
          </AtFloatLayout>
        </View>
      </View>
    )
  }
}

export default Index
