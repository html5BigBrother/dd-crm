import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtFloatLayout, AtTextarea, AtIcon } from 'taro-ui'
import './saleManage.styl'

import { taskStatus, taskType, dealStatus, maturity, intentionDegree,
  normalSelect, secondarySalesWillingness, currentProgress, vipLevel,
  customerSource, leadType, companyType, registerSource, creditStatus,
  source, mark, giveUpReason
} from '../../utils/enums'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import request from '../../utils/request'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      isOpenedFloat: false,
      searchFormPrivate: {
        descs: ['last_get_customers_time'],
        pageNo: 1,
        pageSize: 10,
        menuSource: 7, // 菜单 我的客户
      },
      searchFormPublic: {
        descs: ['last_picked_out_time'],
        inHighSeas: 1,
        pageNo: 1,
        pageSize: 10,
        menuSource: 0, // 菜单 公海
      },
      privateList: [],
      publicList: [],
      giveUpReasonRange: [],
      giveUpReasonIndex: ''
    }
  }

  componentDidMount() {
    this.switchCurrent()
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
    this.switchCurrent(value)
  }

  onClickDaily() {
    this.setState({ isOpenedFloat: true })
  }

  onClickToDetail() {
    Taro.navigateTo({ url: '/pages/leadsDetail/leadsDetail' })
  }

  onClickSelect(item) {
    const userInfo = getGlobalData('userInfo')
    let surplusLeads = userInfo.leadsLimit - userInfo.hasLeads
    if (surplusLeads === 0) {
      Taro.showToast({ title: '您的客户数已满，无法从公海挑入' })
    } else {
      Taro.showModal({
        title: '挑入',
        content: '确定挑入吗？',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            request.post({
              url: '/leads/leads/chooseLeads',
              data: JSON.stringify({
                circulationSource: 0,
                leadsId: [item.id]
              }),
              bindLoading: true,
              loadingText: '加载中',
              success: () => {
                Taro.showToast({ title: '挑入成功' })
                this.switchCurrent()
              }
            })
          }
        }
      })
    }
  }

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  onChangeLoser(e) {
    this.setState({ rangeIndexLoser: e.detail.value })
  }

  initSearchFormPrivate () {
    const { searchFormPrivate } = this.state
    const userInfo = getGlobalData('userInfo')

    // searchFormPrivate.electricitySalerMemId = (userInfo.roleCode === 'DX' || userInfo.roleCode === 'DXZG') ? userInfo.memberId : ''
    // searchFormPrivate.salesmanMemId = (userInfo.roleCode === 'YW' || userInfo.roleCode === 'YWQZ' || userInfo.roleCode === 'YWSZ') ? userInfo.memberId : ''
    // searchFormPrivate.customerMemId = (userInfo.roleCode === 'KF') ? userInfo.memberId : ''
    searchFormPrivate.salesmanMemId = userInfo.memberId
    
    return searchFormPrivate
  }

  switchCurrent(value) {
    const current = value || this.state.current
    switch (current) {
      case 0:
        this.getLeadsListPrivate()
        break
      case 1:
        this.getLeadsListPublic()
        break
    }
  }

  getLeadsListPrivate() {
    const data = this.initSearchFormPrivate()
    request.post({
      url: '/leads/leads/getLeadsList',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        this.setState({ privateList: resData.data.pagedRecords })
      }
    })
  }

  getLeadsListPublic() {
    const data = this.state.searchFormPublic
    request.post({
      url: '/leads/leads/getLeadsList',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        this.setState({ publicList: resData.data.pagedRecords })
      }
    })
  }

  renderPrivateList() {
    const { privateList } = this.state
    const permissions = getGlobalData('permissions')
    return (
      <View className='p-section-private'>
        <View className='p-list list-style-sheet'>
          {
            privateList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                  <View className='sheet-item-title'>企业名称：{item.companyName}</View>
                  <View>leadsId：{item.id}</View>
                  <View>成熟度：{maturity[item.maturity]}</View>
                  <View>工单类型：{taskType[item.taskType]}</View>
                  <View>意向程度：{intentionDegree[item.intentionDegree]}</View>
                  <View>是否战败：{normalSelect[item.isLoser]}</View>
                  <View>二次销售意愿度：{secondarySalesWillingness[item.secondarySalesWillingness]}</View>
                  <View>当前进度：{currentProgress[item.currentProgress]}</View>
                  <View>最近联系时间：{item.lastContactTime}</View>
                  <View>最近一次获得客户时间：{item.lastGetCustomersTime}</View>
                  <View>会员等级：{item.userId ? vipLevel[item.vipLevel] : '-'}</View>
                  <View>客户来源：{customerSource[item.customerSource]}</View>
                  <View>所在地区：{`${item.provinceName} - ${item.cityName} - ${item.areaName}`}</View>
                  <View>客户属性：{leadType[item.leadType]}</View>
                  <View>客户类型：{companyType[item.companyType]}</View>
                  <View>是否注册：{item.hasRegister ? '是' : '否'}</View>
                  <View>注册手机号：{item.registerPhone}</View>
                  <View>注册来源：{registerSource[item.registerSource]}</View>
                  <View>注册时间：{item.registerTime}</View>
                  <View>是否已实名：{item.hasRealName ? '是' : '否'}</View>
                  <View>当前是否有赊销：{item.hasCreditGranting ? '是' : '否'}</View>
                  <View>赊销状态：{item.creditStatus === 'INVALID' ? item.creditSleep === '1' ? '休眠' : '失效' : (creditStatus[item.creditStatus] || '-')}</View>
                  <View>赊销额度生效时间：{item.gmtCreditChecked}</View>
                  <View>是否完成首次支付货款：{item.hasLoan ? '是' : '否'}</View>
                  <View>首次支付货款时间：{item.gmtLoan}</View>
                  <View>当前跟进电销：{item.electricitySaler ? `${item.electricitySaler.department}-${item.electricitySaler.name}(${item.electricitySaler.jobNumber})` : '-'}</View>
                  <View>当前跟进业务员：{item.salesman ? `${item.salesman.department}-${item.salesman.name}(${item.salesman.jobNumber})` : '-'}</View>
                  <View>当前跟进客服：{item.customerService ? `${item.customerService.department}-${item.customerService.name}(${item.customerService.jobNumber})` : '-'}</View>
                  <View>leads来源：{item.channelName ? item.channelName : source[item.source]}</View>
                  <View>任务名称：{item.whiteTaskName || '-'}</View>
                  {/* <View>渠道名称：{}</View> */}
                  <View>leads创建时间：{item.gmtCreated}</View>
                  <View>标记：{mark[item.mark]}</View>
                  <View>待跟进时间：{item.waitFollow || '-'}</View>
                </View>
                <View className='u-edit'>
                  <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickToDetail.bind(this)}>查看详情</AtButton>
                  { permissions && permissions["MY_GIVEUP_LEADS"] &&
                    <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickDaily.bind(this)}>放弃客户</AtButton>
                  }
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderPublicList() {
    const { publicList } = this.state
    return (
      <View className='p-section-public'>
        <View className='p-list list-style-sheet'>
          {
            publicList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                <View className='sheet-item-title'>企业名称：{item.companyName}</View>
                  <View>leadsId：{item.id}</View>
                  <View>成熟度：{maturity[item.maturity]}</View>
                  <View>工单类型：{taskType[item.taskType]}</View>
                  <View>意向程度：{intentionDegree[item.intentionDegree]}</View>
                  <View>是否战败：{normalSelect[item.isLoser]}</View>
                  <View>二次销售意愿度：{secondarySalesWillingness[item.secondarySalesWillingness]}</View>
                  <View>当前进度：{currentProgress[item.currentProgress]}</View>
                  <View>最近联系时间：{item.lastContactTime}</View>
                  <View>最近一次获得客户时间：{item.lastGetCustomersTime}</View>
                  <View>会员等级：{item.userId ? vipLevel[item.vipLevel] : '-'}</View>
                  <View>客户来源：{customerSource[item.customerSource]}</View>
                  <View>所在地区：{`${item.provinceName} - ${item.cityName} - ${item.areaName}`}</View>
                  <View>客户属性：{leadType[item.leadType]}</View>
                  <View>客户类型：{companyType[item.companyType]}</View>
                  <View>是否注册：{item.hasRegister ? '是' : '否'}</View>
                  <View>注册手机号：{item.registerPhone}</View>
                  <View>注册来源：{registerSource[item.registerSource]}</View>
                  <View>注册时间：{item.registerTime}</View>
                  <View>是否已实名：{item.hasRealName ? '是' : '否'}</View>
                  <View>当前是否有赊销：{item.hasCreditGranting ? '是' : '否'}</View>
                  <View>赊销状态：{item.creditStatus === 'INVALID' ? item.creditSleep === '1' ? '休眠' : '失效' : (creditStatus[item.creditStatus] || '-')}</View>
                  <View>赊销额度生效时间：{item.gmtCreditChecked}</View>
                  <View>是否完成首次支付货款：{item.hasLoan ? '是' : '否'}</View>
                  <View>首次支付货款时间：{item.gmtLoan}</View>
                  <View>当前跟进电销：{item.electricitySaler ? `${item.electricitySaler.department}-${item.electricitySaler.name}(${item.electricitySaler.jobNumber})` : '-'}</View>
                  <View>当前跟进业务员：{item.salesman ? `${item.salesman.department}-${item.salesman.name}(${item.salesman.jobNumber})` : '-'}</View>
                  <View>当前跟进客服：{item.customerService ? `${item.customerService.department}-${item.customerService.name}(${item.customerService.jobNumber})` : '-'}</View>
                  <View>leads来源：{item.channelName ? item.channelName : source[item.source]}</View>
                  <View>任务名称：{item.whiteTaskName || '-'}</View>
                  {/* <View>渠道名称：{}</View> */}
                  <View>leads创建时间：{item.gmtCreated}</View>
                </View>
                <View className='u-edit'>
                  <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickSelect.bind(this, item)}>挑入</AtButton>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderFloatLayout() {
    const { isOpenedFloat, giveUpReasonRange, giveUpReasonIndex } = this.state
    const permissions = getGlobalData('permissions')
    return (
      <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
        <View className='form-style'>
          <View className='form-item'>
            <View className='item-name'>是否战败</View>
            <View className='item-content'>
              <Picker
                mode='selector'
                range={giveUpReasonRange}
                value={giveUpReasonIndex}
                rangeKey='label'
                onChange={this.onChangeLoser.bind(this)}
              >
                <View className='item-select'>
                  <View className='flex-1'>{giveUpReasonRange[giveUpReasonIndex] ? giveUpReasonRange[giveUpReasonIndex].label : '请选择'}</View>
                  <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                </View>
              </Picker>
            </View>
          </View>
          <View className='form-item'>
            <View className='item-name'>跟踪日志</View>
            <View className='item-content'>
              <AtTextarea
                count={false}
                value={textValue}
                placeholder='请填写跟踪日志'
                maxLength={200}
              ></AtTextarea>
            </View>
          </View>
        </View>
        <AtButton className='p-btn-submit' type='primary'>提交</AtButton>
      </AtFloatLayout>
    )
  }

  render () {
    const { current } = this.state
    const tabList = [{ title: '我的客户' }, { title: '公海' }]
    return (
      <View className='p-page'>
        <View className='p-container'>
          <AtTabs current={current} tabList={tabList} onClick={this.onClickTab.bind(this)}>
            <AtTabsPane current={current} index={0}>
              { this.renderPrivateList() }
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              { this.renderPublicList() }
            </AtTabsPane>
          </AtTabs>
          {/* 底部弹框 */}
          { this.renderFloatLayout() }
        </View>
      </View>
    )
  }
}

export default Index
