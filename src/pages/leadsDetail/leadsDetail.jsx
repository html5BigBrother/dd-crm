import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtTextarea, AtIcon, AtAccordion  } from 'taro-ui'
import './leadsDetail.styl'

import { taskStatus, taskType, dealStatus, maturity, intentionDegree,
  normalSelect, secondarySalesWillingness, currentProgress, vipLevel,
  customerSource, leadType, companyType, registerSource, creditStatus,
  source, mark
} from '../../utils/enums'
import { set as setGlobalData, get as getGlobalData } from '../../utils/globalData.js'
import request from '../../utils/request'

class Index extends Component {

  constructor (props) {
    super(props)
    this.state = {
      form: {
        leadsId: '',
        maturity: null, // 成熟度
        content: '', // 跟踪日志
        intentionDegree: null, // 意向程度
        isLoser: null, // 是否战败
        nextCommunicationTime: '', // 下次沟通时间
        secondarySalesWillingness: null // 二次销售意愿度
      }, // 提交跟踪日志表单
      openBaseInfo: true, // 企业信息显示
      openRecord: true, // 客户经理跟踪日志显示
      isOpenedFloat: false, // 填写跟踪日志显示
      detailInfo: {}, // 请求到的详情数据
      maturityRange: [], // 成熟度
      maturityIndex: '',
      normalSelectRange: [], // 是否战败
      normalSelectIndex: '',
      secondarySalesWillingnessRange: [], // 二次销售意愿度
      secondarySalesWillingnessIndex: '',
      intentionDegreeRange: [], // 意向程度
      intentionDegreeIndex: '',
      rangeIndexNextDate: '',
      rangeIndexNextTime: '',
    }
  }

  componentDidMount() {
    const { form } = this.state
    form.leadsId = this.$router.params.id
    this.setState({ form })

    this.resetRange()
    this.getDetail()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {}

  onChangeIsOpenedFloat(isOpened) {
    const isOpenedFloat = isOpened
    this.setState({ isOpenedFloat })
  }

  // 成熟度选择
  onChangeMaturity(e) {
    let { form, maturityRange } = this.state
    const maturityIndexIndex = e.detail.value
    form.maturity = maturityRange[maturityIndexIndex].key
    this.setState({ maturityIndexIndex, form })
  }

  // 是否战败
  onChangeLoser(e) {
    let { form, normalSelectRange } = this.state
    const normalSelectIndex = e.detail.value
    form.isLoser = normalSelectRange[normalSelectIndex].key
    this.setState({ normalSelectIndex, form })
  }

  // 二次销售意愿度
  onChangeSecondarySalesWillingness(e) {
    let { form, secondarySalesWillingnessRange } = this.state
    const secondarySalesWillingnessIndex = e.detail.value
    form.secondarySalesWillingness = secondarySalesWillingnessRange[secondarySalesWillingnessIndex].key
    this.setState({ secondarySalesWillingnessIndex, form })
  }

  // 意向程度
  onChangeIntentionDegree(e) {
    let { form, intentionDegreeRange } = this.state
    const intentionDegreeIndex = e.detail.value
    form.intentionDegree = intentionDegreeRange[intentionDegreeIndex].key
    this.setState({ intentionDegreeIndex, form })
  }

  // 跟踪日志内容
  onChangeTextarea(e) {
    let { form } = this.state
    form.content = e.detail.value
    console.log(form)
    this.setState({ form })
  }

  // 下次日期
  onChangeNextDate(e) {
    this.setState({ rangeIndexNextDate: e.detail.value })
  }

  // 下次时间
  onChangeNextTime(e) {
    this.setState({ rangeIndexNextTime: e.detail.value })
  }

  onClickEdit() {
    this.onChangeIsOpenedFloat(true)
  }

  onClickOpen(prop) {
    this.setState({ [prop]: !this.state[prop] })
  }

  // 提交跟踪日志
  onClickSubmit() {
    const data = this.initParams()
    request.post({
      url: '/leads/leads/log/addLog',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: () => {
        Taro.showToast({ title: '成功' })
        this.onChangeIsOpenedFloat(false)
      }
    })
  }

  resetRange() {
    const { oldMaturity } = this.state
    // 成熟度
    let maturityRange = []
    for(let i in maturity) {
      maturityRange.push({ key: i, label: maturity[i] })
    }
    maturityRange.filter((item) => {
      const index = item.key
      return !(parseInt(index) >= 5 && oldMaturity < 5) || (parseInt(index) !== 6 && oldMaturity === 5 && parseInt(index) !== oldMaturity)
    })

    // 是否战败
    let normalSelectRange = []
    for(let i in normalSelect) {
      normalSelectRange.push({ key: i, label: normalSelect[i] })
    }

    // 二次销售意愿度
    let secondarySalesWillingnessRange = []
    for(let i in secondarySalesWillingness) {
      secondarySalesWillingnessRange.push({ key: i, label: secondarySalesWillingness[i] })
    }

    // 意向程度
    let intentionDegreeRange = []
    for(let i in intentionDegree) {
      intentionDegreeRange.push({ key: i, label: intentionDegree[i] })
    }

    this.setState({ maturityRange, normalSelectRange, secondarySalesWillingnessRange, intentionDegreeRange })
  }

  initParams () {
    const permissions = getGlobalData('permissions')
    const { rangeIndexNextDate, rangeIndexNextTime } = this.state
    let data = this.state.form
    let params = {}

    if (rangeIndexNextDate && rangeIndexNextTime) {
      data.nextCommunicationTime = `${rangeIndexNextDate} ${rangeIndexNextTime}:00`
    }
    if (!permissions['LOG_MATURITY_DATA']) {
      data.maturity = ''
    }
    if (!permissions['LOG_SECONDARY_SALES_WILLINGNESS_DATA']) {
      data.secondarySalesWillingness = ''
    }
    if (!permissions['LOG_INTENTIONDEGREE_DATA']) {
      data.intentionDegree = ''
    }
    for (let key in data) {
      if (data[key] !== '') {
        params[key] = data[key]
      }
    }
    return params
  }


  // 查询详情
  getDetail() {
    const data = {
      id: this.$router.params.id
    }
    request.get({
      url: '/leads/leads/getLeadsInfo',
      data: data,
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        this.setState({ detailInfo: resData.data })
      }
    })
  }

  // 企业信息
  renderBaseInfo() {
    const { detailInfo } = this.state
    return (
      <View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
        <View>Leads ID：{detailInfo.id}</View>
      </View>
    )
  }

  // 跟踪日志
  renderRecord() {
    return (
      <View></View>
    )
  }

  // 底部弹框
  renderFloatLayout() {
    const { isOpenedFloat, rangeIndexNextDate, rangeIndexNextTime, oldMaturity, oldIsLoser } = this.state
    const { form, maturityRange, maturityIndex, normalSelectRange, normalSelectIndex, secondarySalesWillingnessRange, secondarySalesWillingnessIndex, intentionDegreeRange, intentionDegreeIndex } = this.state
    const permissions = getGlobalData('permissions')
    return (
      <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
        <View className='form-style'>
          { permissions && permissions['LOG_MATURITY_DATA'] &&
            <View className='form-item'>
              <View className='item-name'>成熟度</View>
              <View className='item-content'>
                <Picker
                  mode='selector'
                  range={maturityRange}
                  value={maturityIndex}
                  rangeKey='label'
                  disabled={oldMaturity > 5 || oldIsLoser === "1" || !permissions["LOG_MATURITY"]}
                  onChange={this.onChangeMaturity.bind(this)}
                >
                  <View className='item-select'>
                    <View className='flex-1'>{maturityRange[maturityIndex] ? maturityRange[maturityIndex].label : '请选择'}</View>
                    <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                  </View>
                </Picker>
              </View>
            </View>
          }
          { permissions && permissions['LOG_IS_LOSER_DATA'] &&
            <View className='form-item'>
              <View className='item-name'>是否战败</View>
              <View className='item-content'>
                <Picker
                  mode='selector'
                  range={normalSelectRange}
                  value={normalSelectIndex}
                  rangeKey='label'
                  disabled={oldMaturity >= 8 || !permissions["LOG_IS_LOSER"]}
                  onChange={this.onChangeLoser.bind(this)}
                >
                  <View className='item-select'>
                    <View className='flex-1'>{normalSelectRange[normalSelectIndex] ? normalSelectRange[normalSelectIndex].label : '请选择'}</View>
                    <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                  </View>
                </Picker>
              </View>
            </View>
          }
          { permissions && permissions['LOG_SECONDARY_SALES_WILLINGNESS_DATA'] &&
            <View className='form-item'>
              <View className='item-name'>二次销售意愿度</View>
              <View className='item-content'>
                <Picker
                  mode='selector'
                  range={secondarySalesWillingnessRange}
                  value={secondarySalesWillingnessIndex}
                  rangeKey='label'
                  disabled={!permissions["LOG_SECONDARY_SALES_WILLINGNESS"]}
                  onChange={this.onChangeSecondarySalesWillingness.bind(this)}
                >
                  <View className='item-select'>
                    <View className='flex-1'>{secondarySalesWillingnessRange[secondarySalesWillingnessIndex] ? secondarySalesWillingnessRange[secondarySalesWillingnessIndex].label : '请选择'}</View>
                    <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                  </View>
                </Picker>
              </View>
            </View>
          }
          <View className='form-item'>
            <View className='item-name'>跟踪日志</View>
            <View className='item-content'>
              <AtTextarea
                count={false}
                value={form.content}
                placeholder='请填写跟踪日志'
                maxLength={200}
                onChange={this.onChangeTextarea.bind(this)}
              ></AtTextarea>
            </View>
          </View>
          { permissions && permissions['LOG_INTENTIONDEGREE_DATA'] &&
            <View className='form-item'>
              <View className='item-name'>意向程度</View>
              <View className='item-content'>
                <Picker
                  mode='selector'
                  range={intentionDegreeRange}
                  value={intentionDegreeIndex}
                  rangeKey='label'
                  disabled={!permissions["LOG_INTENTIONDEGREE"]}
                  onChange={this.onChangeIntentionDegree.bind(this)}
                >
                  <View className='item-select'>
                    <View className='flex-1'>{intentionDegreeRange[intentionDegreeIndex] ? intentionDegreeRange[intentionDegreeIndex].label : '请选择'}</View>
                    <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
                  </View>
                </Picker>
              </View>
            </View>
          }
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
        <AtButton className='p-btn-submit' type='primary' onClick={this.onClickSubmit.bind(this)}>提交</AtButton>
      </AtFloatLayout>
    )
  }

  render () {
    const { openBaseInfo, openRecord } = this.state
    return (
      <View className='p-page'>
        <View className='p-container'>
          <View className='p-company-name'>芜湖鹏运建材贸易有限公司</View>
          <AtButton className='u-btn-handle' type='secondary' size='small' circle onClick={this.onClickEdit.bind(this)}>填写跟踪日志</AtButton>
          {/* <AtAccordion
            open={openBaseInfo}
            title='企业信息'
            onClick={this.onClickOpen.bind(this, 'openBaseInfo')}
          >
            { this.renderBaseInfo() }
          </AtAccordion>
          <AtAccordion
            open={openRecord}
            title='客户经理跟踪日志'
            onClick={this.onClickOpen.bind(this, 'openRecord')}
          >
            { this.renderRecord() }
          </AtAccordion> */}
          {/* 底部弹框 */}
          { this.renderFloatLayout() }
        </View>
      </View>
    )
  }
}

export default Index
