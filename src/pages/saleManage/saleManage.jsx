import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtButton, AtFloatLayout, AtTextarea, AtIcon } from 'taro-ui'
import './saleManage.styl'

import { taskStatus, taskType, dealStatus, maturity, intentionDegree,
  normalSelect, secondarySalesWillingness, currentProgress, vipLevel,
  customerSource, leadType, companyType, registerSource, creditStatus,
  source, mark
} from '../../utils/enums'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      isOpenedFloat: false,
      rangeDataLoser: [
        { key: '0', label: '否' },
        { key: '1', label: '是' },
      ],
      rangeIndexLoser: 0,
      rangeIndexNextDate: '',
      rangeIndexNextTime: '',
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

  componentDidMount() {}

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

  onClickDaily() {
    this.setState({ isOpenedFloat: true })
  }

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  onChangeLoser(e) {
    this.setState({ rangeIndexLoser: e.detail.value })
  }

  onChangeNextDate(e) {
    this.setState({ rangeIndexNextDate: e.detail.value })
  }

  onChangeNextTime(e) {
    this.setState({ rangeIndexNextTime: e.detail.value })
  }

  renderPrivateList() {
    const { todoList } = this.state
    return (
      <View className='p-section-private'>
        <View className='p-list list-style-sheet'>
          {
            todoList.map((item) =>
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
                  <AtButton className='u-btn-handle' type='secondary' size='small' onClick={this.onClickDaily.bind(this)}>填写跟踪日志</AtButton>
                </View>
              </View>
            )
          }
        </View>
      </View>
    )
  }

  renderPublicList() {
    const { todoList } = this.state
    return (
      <View className='p-section-public'>
        <View className='p-list list-style-sheet'>
          {
            todoList.map((item) =>
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
              </View>
            )
          }
        </View>
      </View>
    )
  }

  render () {
    const { current, isOpenedFloat, textValue, rangeDataLoser, rangeIndexLoser, rangeIndexNextDate, rangeIndexNextTime } = this.state
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
          <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
            <View className='form-style'>
              <View className='form-item'>
                <View className='item-name'>是否战败</View>
                <View className='item-content'>
                  <Picker mode='selector' range={rangeDataLoser} value={rangeIndexLoser} rangeKey='label' onChange={this.onChangeLoser.bind(this)}>
                    <View className='item-select'>
                      <View className='flex-1'>{rangeDataLoser[rangeIndexLoser] ? rangeDataLoser[rangeIndexLoser].label : '请选择'}</View>
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
              <View className='form-item'>
                <View className='item-name'>约定下次沟通时间</View>
                <View className='item-content'>
                  <Picker mode='date' value={rangeIndexNextDate} onChange={this.onChangeNextDate.bind(this)}>
                    <View className='item-select'>
                      <View className='flex-1'>{rangeIndexNextDate ? rangeIndexNextDate : '请选择下次沟通日期'}</View>
                      <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                    </View>
                  </Picker>
                  <Picker mode='time' value={rangeIndexNextTime} onChange={this.onChangeNextTime.bind(this)}>
                    <View className='item-select'>
                      <View className='flex-1'>{rangeIndexNextTime ? rangeIndexNextTime : '请选择下次沟通时间'}</View>
                      <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                    </View>
                  </Picker>
                </View>
              </View>
            </View>
            <AtButton className='p-btn-submit' type='primary'>提交</AtButton>
          </AtFloatLayout>
        </View>
      </View>
    )
  }
}

export default Index
