import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtFloatLayout, AtTextarea, AtIcon, AtMessage, AtPagination, AtSearchBar, AtModal, AtModalContent, AtAccordion } from 'taro-ui'
import './saleManage.styl'

import validate from '../../utils/validate'
import { taskStatus, taskType, dealStatus, maturity, intentionDegree,
  normalSelect, secondarySalesWillingness, currentProgress, vipLevel,
  customerSource, leadType, companyType, registerSource, creditStatus,
  source, mark, giveUpReason, post
} from '../../utils/enums'
import { navigateTo } from '../../utils/util'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import request from '../../utils/request'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      isOpenedFloat: false,
      isOpenedModal: false,
      searchFormPrivate: {
        companyName: '',
        descs: ['last_get_customers_time'],
        pageNo: 1,
        pageSize: 10,
        menuSource: 7, // 菜单 我的客户
      },
      searchFormPublic: {
        companyName: '',
        descs: ['last_picked_out_time'],
        inHighSeas: 1,
        pageNo: 1,
        pageSize: 10,
        menuSource: 0, // 菜单 公海
      },
      totalPrivate: 0,
      totalPublic: 0,
      searchValuePrivate: '',
      searchValuePublic: '',
      privateList: [],
      publicList: [],
      giveUpReasonRange: [],
      giveUpReasonIndex: '',
      giveUpReasonText: '',
      currentId: '',
      phoneList: [] // 电话列表
    }
  }

  componentDidMount() {
    this.resetRange()
    this.switchCurrent(this.state.current)
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

  onClickGiveUp(item, e) {
    console.log('isOpenedFloat:' + this.state.isOpenedFloat)
    e.stopPropagation()
    this.setState({
      isOpenedFloat: true,
      giveUpReasonIndex: '',
      giveUpReasonText: '',
      currentId: item.id
    })
  }

  onClickPhoneList(item) {
    const data = { leadsId: item.id }
    request.get({
      url: '/leads/leads/contacts/getContactsList',
      data,
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        let phoneList = resData.data || []
        if (phoneList && phoneList.length > 0) {
          phoneList.forEach((phoneItem) => phoneItem.openPhone = true)
          this.setState({
            isOpenedModal: true,
            phoneList
          })
        } else {
          Taro.atMessage({ 'message': '该企业下暂无可联系人电话', 'type': 'error', })
        }
      }
    })
  }

  // 拨打电话弹框控制手风琴
  onClickOpen(index) {
    let { phoneList } = this.state
    phoneList[index].openPhone = !phoneList[index].openPhone
    this.setState({ phoneList })
  }

  // 拨打电话
  onClickPhone(phoneNum) {
    dd.showCallMenu({
      phoneNumber: phoneNum, // 期望拨打的电话号码
      code: '+86', // 国家代号，中国是+86
      showDingCall: false, // 是否显示钉钉电话
    })
  }

  onClickToDetail(item) {
    navigateTo('/pages/leadsDetail/leadsDetail', { id: item.id })
  }

  onClickSelect(item) {
    const userInfo = getGlobalData('userInfo')
    let surplusLeads = userInfo.leadsLimit - userInfo.hasLeads
    console.log(!!Taro.showmOdal)
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
                this.switchCurrent(this.state.current)
              }
            })
          }
        }
      })
    }
  }

  // 放弃客户
  onClickSubmit() {
    const { currentId, giveUpReasonRange, giveUpReasonIndex, giveUpReasonText } = this.state

    const vRes = validate([
      { type: 'vEmpty', value: giveUpReasonIndex, msg: '请选择放弃原因' },
      { type: 'vEmpty', value: giveUpReasonText, msg: '请填写备注' },
    ])

    if (vRes !== true) {
      Taro.atMessage({ 'message': vRes, 'type': 'error', })
      return
    }

    const data = {
      circulationSource: 7,
      leadsId: [currentId],
      reason: giveUpReasonRange[giveUpReasonIndex].key,
      remark: giveUpReasonText
    }

    request.post({
      url: '/leads/leads/giveUpLeads',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: () => {
        Taro.showToast({ title: '成功' })
        this.onChangeIsOpenedFloat(false)
        this.switchCurrent(this.state.current)
      }
    })
  }

  onChangeTextarea(e) {
    this.setState({ giveUpReasonText: e.detail.value })
  }

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  onChangeLoser(e) {
    this.setState({ giveUpReasonIndex: e.detail.value })
  }

  onChangeSearchPrivate(value) {
    this.setState({ searchValuePrivate: value })
  }

  onChangeSearchPublic(value) {
    this.setState({ searchValuePublic: value })
  }

  // 关闭拨打电话弹框
  onCloseModal() {
    this.setState({ isOpenedModal: false })
  }

  onActionClickSearchPrivate() {
    let { searchFormPrivate, searchValuePrivate } = this.state
    searchFormPrivate.companyName = searchValuePrivate
    this.setState({ searchFormPrivate }, () => {
      this.getLeadsListPrivate(1)
    })
  }

  onActionClickSearchPublic() {
    let { searchFormPublic, searchValuePublic } = this.state
    searchFormPublic.companyName = searchValuePublic
    this.setState({ searchFormPublic }, () => {
      this.getLeadsListPublic(1)
    })
  }

  onPageChangePrivate(e) {
    const { type, current } = e
    this.getLeadsListPrivate(current)
  }

  onPageChangePublic(e) {
    const { type, current } = e
    this.getLeadsListPublic(current)
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

  resetRange() {
    // 放弃原因
    let giveUpReasonRange = []
    for(let i in giveUpReason) {
      giveUpReasonRange.push({ key: i, label: giveUpReason[i] })
    }

    this.setState({ giveUpReasonRange })
  }

  switchCurrent(current) {
    switch (current) {
      case 0:
        this.getLeadsListPrivate()
        break
      case 1:
        this.getLeadsListPublic()
        break
    }
  }

  getLeadsListPrivate(pageNo) {
    const data = this.initSearchFormPrivate()
    if (pageNo) data.pageNo = pageNo
    request.post({
      url: '/leads/leads/getLeadsList',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        let { searchFormPrivate } = this.state
        searchFormPrivate.pageNo = resData.data.pageNo
        this.setState({
          privateList: resData.data.pagedRecords,
          totalPrivate: resData.data.totalCount,
          searchFormPrivate
        })
      }
    })
  }

  getLeadsListPublic(pageNo) {
    const data = this.state.searchFormPublic
    if (pageNo) data.pageNo = pageNo
    request.post({
      url: '/leads/leads/getLeadsList',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        let { searchFormPublic } = this.state
        searchFormPublic.pageNo = resData.data.pageNo
        this.setState({
          publicList: resData.data.pagedRecords,
          totalPublic: resData.data.totalCount,
          searchFormPublic
        })
      }
    })
  }

  renderPrivateList() {
    const { privateList, searchFormPrivate, totalPrivate, searchValuePrivate } = this.state
    const permissions = getGlobalData('permissions')
    return (
      <View className='p-section-private'>
        <AtSearchBar
          showActionButton
          placeholder='企业名称'
          value={searchValuePrivate}
          onChange={this.onChangeSearchPrivate.bind(this)}
          onActionClick={this.onActionClickSearchPrivate.bind(this)}
        />
        <View className='p-pagination-wrap'>
          <AtPagination
            total={totalPrivate}
            pageSize={searchFormPrivate.pageSize}
            current={searchFormPrivate.pageNo}
            icon
            onPageChange={this.onPageChangePrivate.bind(this)}
          ></AtPagination>
        </View>
        <View className='p-list list-style-sheet'>
          {
            privateList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                  <View className='sheet-item-title'>企业名称：{item.companyName}</View>
                  <View>leadsId：{item.id}</View>
                  <View>成熟度：{maturity[item.maturity]}</View>
                  {/* <View>工单类型：{taskType[item.taskType]}</View> */}
                  {/* <View>意向程度：{intentionDegree[item.intentionDegree]}</View> */}
                  <View>是否战败：{normalSelect[item.isLoser]}</View>
                  {/* <View>二次销售意愿度：{secondarySalesWillingness[item.secondarySalesWillingness]}</View> */}
                  <View>当前进度：{currentProgress[item.currentProgress]}</View>
                  <View>最近联系时间：{item.lastContactTime}</View>
                  <View>最近一次获得客户时间：{item.lastGetCustomersTime}</View>
                  <View>会员等级：{item.userId ? vipLevel[item.vipLevel] : '-'}</View>
                  {/* <View>客户来源：{customerSource[item.customerSource]}</View> */}
                  <View>所在地区：{`${item.provinceName} - ${item.cityName} - ${item.areaName}`}</View>
                  {/* <View>客户属性：{leadType[item.leadType]}</View> */}
                  {/* <View>客户类型：{companyType[item.companyType]}</View> */}
                  {/* <View>是否注册：{item.hasRegister ? '是' : '否'}</View>
                  <View>注册手机号：{item.registerPhone}</View>
                  <View>注册来源：{registerSource[item.registerSource]}</View>
                  <View>注册时间：{item.registerTime}</View> */}
                  {/* <View>是否已实名：{item.hasRealName ? '是' : '否'}</View> */}
                  {/* <View>当前是否有赊销：{item.hasCreditGranting ? '是' : '否'}</View> */}
                  <View>赊销状态：{item.creditStatus === 'INVALID' ? item.creditSleep === '1' ? '休眠' : '失效' : (creditStatus[item.creditStatus] || '-')}</View>
                  {/* <View>赊销额度生效时间：{item.gmtCreditChecked}</View> */}
                  {/* <View>是否完成首次支付货款：{item.hasLoan ? '是' : '否'}</View> */}
                  {/* <View>首次支付货款时间：{item.gmtLoan}</View> */}
                  {/* <View>当前跟进电销：{item.electricitySaler ? `${item.electricitySaler.department}-${item.electricitySaler.name}(${item.electricitySaler.jobNumber})` : '-'}</View> */}
                  {/* <View>当前跟进业务员：{item.salesman ? `${item.salesman.department}-${item.salesman.name}(${item.salesman.jobNumber})` : '-'}</View> */}
                  {/* <View>当前跟进客服：{item.customerService ? `${item.customerService.department}-${item.customerService.name}(${item.customerService.jobNumber})` : '-'}</View> */}
                  <View>leads来源：{item.channelName ? item.channelName : source[item.source]}</View>
                  {/* <View>任务名称：{item.whiteTaskName || '-'}</View> */}
                  {/* <View>渠道名称：{}</View> */}
                  {/* <View>leads创建时间：{item.gmtCreated}</View> */}
                  {/* <View>标记：{mark[item.mark]}</View> */}
                  {/* <View>待跟进时间：{item.waitFollow || '-'}</View> */}
                </View>
                <View className='u-edit'>
                  <Button className='p-btn-handle' plain hoverClass='button-hover' onClick={this.onClickToDetail.bind(this, item)}>跟踪日志</Button>
                  { permissions && permissions["MY_GIVEUP_LEADS"] &&
                    <Button className='p-btn-handle' plain hoverClass='button-hover' onClick={this.onClickGiveUp.bind(this, item)}>放弃客户</Button>
                  }
                  <Button className='p-btn-handle' plain hoverClass='button-hover' onClick={this.onClickPhoneList.bind(this, item)}>拨打电话</Button>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderPublicList() {
    const { publicList, searchFormPublic, totalPublic, searchValuePublic } = this.state
    return (
      <View className='p-section-public'>
        <AtSearchBar
          showActionButton
          placeholder='企业名称'
          value={searchValuePublic}
          onChange={this.onChangeSearchPublic.bind(this)}
          onActionClick={this.onActionClickSearchPublic.bind(this)}
        />
        <View className='p-pagination-wrap'>
          <AtPagination
            total={totalPublic}
            pageSize={searchFormPublic.pageSize}
            current={searchFormPublic.pageNo}
            icon
            onPageChange={this.onPageChangePublic.bind(this)}
          ></AtPagination>
        </View>
        <View className='p-list list-style-sheet'>
          {
            publicList.map((item) =>
              <View className='sheet-item' key={item.id}>
                <View className='sheet-item-content'>
                <View className='sheet-item-title'>企业名称：{item.companyName}</View>
                  <View>leadsId：{item.id}</View>
                  <View>成熟度：{maturity[item.maturity]}</View>
                  {/* <View>工单类型：{taskType[item.taskType]}</View>
                  <View>意向程度：{intentionDegree[item.intentionDegree]}</View> */}
                  <View>是否战败：{normalSelect[item.isLoser]}</View>
                  {/* <View>二次销售意愿度：{secondarySalesWillingness[item.secondarySalesWillingness]}</View> */}
                  <View>当前进度：{currentProgress[item.currentProgress]}</View>
                  <View>最近联系时间：{item.lastContactTime}</View>
                  <View>最近一次获得客户时间：{item.lastGetCustomersTime}</View>
                  <View>会员等级：{item.userId ? vipLevel[item.vipLevel] : '-'}</View>
                  {/* <View>客户来源：{customerSource[item.customerSource]}</View> */}
                  <View>所在地区：{`${item.provinceName} - ${item.cityName} - ${item.areaName}`}</View>
                  {/* <View>客户属性：{leadType[item.leadType]}</View>
                  <View>客户类型：{companyType[item.companyType]}</View>
                  <View>是否注册：{item.hasRegister ? '是' : '否'}</View>
                  <View>注册手机号：{item.registerPhone}</View>
                  <View>注册来源：{registerSource[item.registerSource]}</View>
                  <View>注册时间：{item.registerTime}</View>
                  <View>是否已实名：{item.hasRealName ? '是' : '否'}</View>
                  <View>当前是否有赊销：{item.hasCreditGranting ? '是' : '否'}</View> */}
                  <View>赊销状态：{item.creditStatus === 'INVALID' ? item.creditSleep === '1' ? '休眠' : '失效' : (creditStatus[item.creditStatus] || '-')}</View>
                  {/* <View>赊销额度生效时间：{item.gmtCreditChecked}</View>
                  <View>是否完成首次支付货款：{item.hasLoan ? '是' : '否'}</View>
                  <View>首次支付货款时间：{item.gmtLoan}</View>
                  <View>当前跟进电销：{item.electricitySaler ? `${item.electricitySaler.department}-${item.electricitySaler.name}(${item.electricitySaler.jobNumber})` : '-'}</View>
                  <View>当前跟进业务员：{item.salesman ? `${item.salesman.department}-${item.salesman.name}(${item.salesman.jobNumber})` : '-'}</View>
                  <View>当前跟进客服：{item.customerService ? `${item.customerService.department}-${item.customerService.name}(${item.customerService.jobNumber})` : '-'}</View> */}
                  <View>leads来源：{item.channelName ? item.channelName : source[item.source]}</View>
                  {/* <View>任务名称：{item.whiteTaskName || '-'}</View> */}
                  {/* <View>渠道名称：{}</View> */}
                  {/* <View>leads创建时间：{item.gmtCreated}</View> */}
                </View>
                <View className='u-edit'>
                  <Button className='p-btn-handle' plain hoverClass='button-hover' onClick={this.onClickSelect.bind(this, item)}>挑入</Button>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  // renderFloatLayout() {
  //   const { isOpenedFloat, giveUpReasonRange, giveUpReasonIndex, giveUpReasonText } = this.state
  //   return (
  //     <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
  //       <View className='form-style'>
  //         <View className='form-item'>
  //           <View className='item-name'>放弃原因</View>
  //           <View className='item-content'>
  //             <Picker
  //               mode='selector'
  //               range={giveUpReasonRange}
  //               value={giveUpReasonIndex}
  //               rangeKey='label'
  //               onChange={this.onChangeLoser.bind(this)}
  //             >
  //               <View className='item-select'>
  //                 <View className='flex-1'>{giveUpReasonRange[giveUpReasonIndex] ? giveUpReasonRange[giveUpReasonIndex].label : '请选择'}</View>
  //                 <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //               </View>
  //             </Picker>
  //           </View>
  //         </View>
  //         <View className='form-item'>
  //           <View className='item-name'>备注</View>
  //           <View className='item-content'>
  //             <AtTextarea
  //               count={false}
  //               value={giveUpReasonText}
  //               placeholder='请说明原因'
  //               maxLength={200}
  //               onChange={this.onChangeTextarea.bind(this)}
  //             ></AtTextarea>
  //           </View>
  //         </View>
  //       </View>
  //       <AtButton className='p-btn-submit' type='primary' onClick={this.onClickSubmit.bind(this)}>提交</AtButton>
  //     </AtFloatLayout>
  //   )
  // }

  render () {
    const { current } = this.state
    const { isOpenedFloat, isOpenedModal, giveUpReasonRange, giveUpReasonIndex, giveUpReasonText, phoneList } = this.state
    const tabList = [{ title: '我的客户' }, { title: '公海' }]
    return (
      <View className='p-page'>
        <AtMessage />
        <View className='p-container'>
          <AtTabs current={current} tabList={tabList} swipeable={false} onClick={this.onClickTab.bind(this)}>
            <AtTabsPane current={current} index={0}>
              { this.renderPrivateList() }
            </AtTabsPane>
            <AtTabsPane current={current} index={1}>
              { this.renderPublicList() }
            </AtTabsPane>
          </AtTabs>
          {/* 底部弹框 */}
          {/* { this.renderFloatLayout() } */}
          <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
            <View className='form-style'>
              <View className='form-item'>
                <View className='item-name'>放弃原因</View>
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
                <View className='item-name'>备注</View>
                <View className='item-content'>
                  <AtTextarea
                    count={false}
                    value={giveUpReasonText}
                    placeholder='请说明原因'
                    maxLength={200}
                    onChange={this.onChangeTextarea.bind(this)}
                  ></AtTextarea>
                </View>
              </View>
            </View>
            <AtButton className='p-btn-submit' type='primary' onClick={this.onClickSubmit.bind(this)}>提交</AtButton>
          </AtFloatLayout>

          {/* 拨打电话列表弹框 */}
          <AtModal isOpened={isOpenedModal} onClose={this.onCloseModal.bind(this)}>
            <AtModalContent>
              {
                phoneList && phoneList.map((item, index) =>
                  <AtAccordion
                    open={item.openPhone}
                    title={`${item.name}（${post[item.post]}）`}
                    key={item.id}
                    onClick={this.onClickOpen.bind(this, index)}
                  >
                    {
                      item.phoneNums.map((item2) =>
                        <View className='p-phone-item' key>
                          <View className='flex-1'>
                            <Text onClick={this.onClickPhone.bind(this, item2)}>{item2}</Text>
                          </View>
                          <AtIcon value='phone' color='#2eadb6' size='20' onClick={this.onClickPhone.bind(this, item2)}></AtIcon>
                        </View>
                      )
                    }
                  </AtAccordion>
                )
              }
            </AtModalContent>
          </AtModal>
        </View>
      </View>
    )
  }
}

export default Index
