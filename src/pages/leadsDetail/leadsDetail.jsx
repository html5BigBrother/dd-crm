import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtTextarea, AtIcon, AtAccordion, AtMessage, AtPagination } from 'taro-ui'
import './leadsDetail.styl'

import validate from '../../utils/validate'
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
      searchForm: {
        pageNo: 1,
        pageSize: 10,
        leadsId: '',
        createrType: 2,
        descs: 'gmt_created'
      },
      pageTotal: 0,
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
      logList: [], // 客户经理历史跟踪日志
      maturityRange: [], // 成熟度
      maturityIndex: '',
      normalSelectRange: [], // 是否战败
      normalSelectIndex: '',
      secondarySalesWillingnessRange: [], // 二次销售意愿度
      secondarySalesWillingnessIndex: '',
      intentionDegreeRange: [], // 意向程度
      intentionDegreeIndex: '',
      rangeIndexNextTime: '',
      oldMaturity: '', // 上次成熟度
      oldIsLoser: '', // 上次是否战败
    }
  }

  componentDidMount() {
    const { form, searchForm } = this.state
    form.leadsId = this.$router.params.id
    searchForm.leadsId = this.$router.params.id
    this.setState({ form, searchForm })

    this.resetRange()
    this.getDetail()
    this.getLogList()
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
    const maturityIndex = e.detail.value
    form.maturity = maturityRange[maturityIndex].key
    this.setState({ maturityIndex, form })
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

    const vRes = validate([
      { type: 'vEmpty', value: data.isLoser, msg: '请选择是否战败' },
      { type: 'vEmpty', value: data.content, msg: '请填写跟踪日志' },
    ])

    if (vRes !== true) {
      Taro.atMessage({ 'message': vRes, 'type': 'error', })
      return
    }

    request.post({
      url: '/leads/leads/log/addLog',
      data: JSON.stringify(data),
      bindLoading: true,
      loadingText: '加载中',
      success: () => {
        Taro.showToast({ title: '成功' })
        this.onChangeIsOpenedFloat(false)
        this.getDetail()
        this.getLogList()
      }
    })
  }

  // 客户经理跟踪日志分页
  onPageChange(e) {
    const { type, current } = e
    this.getLogList(current)
  }

  resetRange() {
    const { oldMaturity } = this.state
    // 成熟度
    let maturityRange = []
    for(let i in maturity) {
      maturityRange.push({ key: i, label: maturity[i] })
    }
    // maturityRange.filter((item) => {
    //   const index = item.key
    //   return !(parseInt(index) >= 5 && oldMaturity < 5) || (parseInt(index) !== 6 && oldMaturity === 5 && parseInt(index) !== oldMaturity)
    // })

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

  resetDetail(data) {
    let { form, maturityRange, normalSelectRange, secondarySalesWillingnessRange, intentionDegreeRange } = this.state
    let maturityIndex = ''
    let normalSelectIndex = ''
    let secondarySalesWillingnessIndex = ''
    let intentionDegreeIndex = ''
    const maturityData = data.maturity || '-1'
    const isLoser = data.isLoser.toString()
    const intentionDegreeData = data.intentionDegree || '-1'
    const secondarySalesWillingnessData = data.secondarySalesWillingness.toString() || '-1'

    form.maturity = parseInt(maturityData) > -1 ? maturityData.toString() : ''
    form.isLoser = isLoser
    form.intentionDegree = parseInt(intentionDegreeData) > -1 ? intentionDegreeData.toString() : ''
    form.secondarySalesWillingness = parseInt(secondarySalesWillingnessData) > -1 ? secondarySalesWillingnessData.toString() : ''
    
    if (form.maturity) {
      maturityRange.forEach((item, index) => {
        if (item.key == form.maturity) maturityIndex = index
      })
    }
    if (form.isLoser) {
      normalSelectRange.forEach((item, index) => {
        if (item.key == form.isLoser) normalSelectIndex = index
      })
    }
    if (form.intentionDegree) {
      intentionDegreeRange.forEach((item, index) => {
        if (item.key == form.intentionDegree) intentionDegreeIndex = index
      })
    }
    if (form.secondarySalesWillingness) {
      secondarySalesWillingnessRange.forEach((item, index) => {
        if (item.key == form.secondarySalesWillingness) secondarySalesWillingnessIndex = index
      })
    }
    
    const oldMaturity = parseInt(form.maturity)
    const oldIsLoser = isLoser

    this.setState({ form, oldMaturity, oldIsLoser, maturityIndex, normalSelectIndex, intentionDegreeIndex, secondarySalesWillingnessIndex, detailInfo: data })
  }

  initParams () {
    const permissions = getGlobalData('permissions')
    const { rangeIndexNextTime } = this.state
    let data = this.state.form
    let params = {}

    if (rangeIndexNextTime) {
      if (rangeIndexNextTime.length > 12) data.nextCommunicationTime = rangeIndexNextTime + ':00'
      else data.nextCommunicationTime = rangeIndexNextTime + ' 00:00:00'
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
        this.resetDetail(resData.data)
      }
    })
  }

  // 查询历史客户经理跟踪日志
  getLogList(pageNo) {
    const data = this.state.searchForm
    if (pageNo) data.pageNo = pageNo
    request.get({
      url: '/leads/leads/log/getLogList',
      data: data,
      bindLoading: true,
      loadingText: '加载中',
      success: (resData) => {
        let { searchForm } = this.state
        searchForm.pageNo = resData.data.pageNo
        this.setState({
          logList: resData.data.pagedRecords,
          pageTotal: resData.data.totalCount,
          searchForm,
        })
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
    const { logList, pageTotal, searchForm } = this.state
    return (
      <View className='p-log-list'>
        <View className='list-style-sheet'>
          {
            logList && logList.length > 0 ?
              logList.map((item) =>
                item.type === 0 &&
                  <View className='sheet-item' key={item.id}>
                    <View className='sheet-item-content'>
                      <View>录入人：{item.createrMemId}</View>
                      { maturity[item.maturity] && <View>成熟度：{maturity[item.maturity]}</View> }
                      { secondarySalesWillingness[item.secondarySalesWillingness] && <View>二次销售意愿度：{secondarySalesWillingness[item.secondarySalesWillingness]}</View> }
                      { item.content && <View>追踪日志：{item.content}</View> }
                      { intentionDegree[item.intentionDegree] && <View>意向程度：{intentionDegree[item.intentionDegree]}</View> }
                      { normalSelect[item.isLoser] && <View>是否战败：{normalSelect[item.isLoser]}</View> }
                      { item.nextCommunicationTime && <View>约定下次沟通时间：{item.nextCommunicationTime}</View> }
                      { item.gmtCreated && <View>创建时间：{item.gmtCreated}</View> }
                    </View>
                  </View>
              ) :
              <View className='u-empty'>暂无数据</View>
          }
        </View>
        <AtPagination
          total={pageTotal}
          pageSize={searchForm.pageSize}
          current={searchForm.pageNo}
          icon
          onPageChange={this.onPageChange.bind(this)}
        ></AtPagination>
      </View>
    )
  }

  // 底部弹框
  // renderFloatLayout() {
  //   const { isOpenedFloat, rangeIndexNextTime, oldMaturity, oldIsLoser } = this.state
  //   const { form, maturityRange, maturityIndex, normalSelectRange, normalSelectIndex, secondarySalesWillingnessRange, secondarySalesWillingnessIndex, intentionDegreeRange, intentionDegreeIndex } = this.state
  //   const permissions = getGlobalData('permissions')
  //   return (
  //     <AtFloatLayout isOpened={isOpenedFloat} onClose={this.onChangeIsOpenedFloat.bind(this, false)}>
  //       <View className='form-style'>
  //         { permissions && permissions['LOG_MATURITY_DATA'] &&
  //           <View className='form-item'>
  //             <View className='item-name'>成熟度</View>
  //             <View className='item-content'>
  //               <Picker
  //                 mode='selector'
  //                 range={maturityRange}
  //                 value={maturityIndex}
  //                 rangeKey='label'
  //                 disabled={oldMaturity > 5 || oldIsLoser === "1" || !permissions["LOG_MATURITY"]}
  //                 onChange={this.onChangeMaturity.bind(this)}
  //               >
  //                 <View className='item-select'>
  //                   <View className='flex-1'>{maturityRange[maturityIndex] ? maturityRange[maturityIndex].label : '请选择'}</View>
  //                   <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //                 </View>
  //               </Picker>
  //             </View>
  //           </View>
  //         }
  //         { permissions && permissions['LOG_IS_LOSER_DATA'] &&
  //           <View className='form-item'>
  //             <View className='item-name'>是否战败</View>
  //             <View className='item-content'>
  //               <Picker
  //                 mode='selector'
  //                 range={normalSelectRange}
  //                 value={normalSelectIndex}
  //                 rangeKey='label'
  //                 disabled={oldMaturity >= 8 || !permissions["LOG_IS_LOSER"]}
  //                 onChange={this.onChangeLoser.bind(this)}
  //               >
  //                 <View className='item-select'>
  //                   <View className='flex-1'>{normalSelectRange[normalSelectIndex] ? normalSelectRange[normalSelectIndex].label : '请选择'}</View>
  //                   <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //                 </View>
  //               </Picker>
  //             </View>
  //           </View>
  //         }
  //         { permissions && permissions['LOG_SECONDARY_SALES_WILLINGNESS_DATA'] &&
  //           <View className='form-item'>
  //             <View className='item-name'>二次销售意愿度</View>
  //             <View className='item-content'>
  //               <Picker
  //                 mode='selector'
  //                 range={secondarySalesWillingnessRange}
  //                 value={secondarySalesWillingnessIndex}
  //                 rangeKey='label'
  //                 disabled={!permissions["LOG_SECONDARY_SALES_WILLINGNESS"]}
  //                 onChange={this.onChangeSecondarySalesWillingness.bind(this)}
  //               >
  //                 <View className='item-select'>
  //                   <View className='flex-1'>{secondarySalesWillingnessRange[secondarySalesWillingnessIndex] ? secondarySalesWillingnessRange[secondarySalesWillingnessIndex].label : '请选择'}</View>
  //                   <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //                 </View>
  //               </Picker>
  //             </View>
  //           </View>
  //         }
  //         <View className='form-item'>
  //           <View className='item-name'>跟踪日志</View>
  //           <View className='item-content'>
  //             <AtTextarea
  //               count={false}
  //               value={form.content}
  //               placeholder='请填写跟踪日志'
  //               maxLength={200}
  //               onChange={this.onChangeTextarea.bind(this)}
  //             ></AtTextarea>
  //           </View>
  //         </View>
  //         { permissions && permissions['LOG_INTENTIONDEGREE_DATA'] &&
  //           <View className='form-item'>
  //             <View className='item-name'>意向程度</View>
  //             <View className='item-content'>
  //               <Picker
  //                 mode='selector'
  //                 range={intentionDegreeRange}
  //                 value={intentionDegreeIndex}
  //                 rangeKey='label'
  //                 disabled={!permissions["LOG_INTENTIONDEGREE"]}
  //                 onChange={this.onChangeIntentionDegree.bind(this)}
  //               >
  //                 <View className='item-select'>
  //                   <View className='flex-1'>{intentionDegreeRange[intentionDegreeIndex] ? intentionDegreeRange[intentionDegreeIndex].label : '请选择'}</View>
  //                   <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //                 </View>
  //               </Picker>
  //             </View>
  //           </View>
  //         }
  //         <View className='form-item'>
  //           <View className='item-name'>约定下次沟通时间</View>
  //           <View className='item-content'>
  //             <Picker mode='date' value={rangeIndexNextTime} onChange={this.onChangeNextTime.bind(this)}>
  //               <View className='item-select'>
  //                 <View className='flex-1'>{rangeIndexNextTime ? rangeIndexNextTime : '请选择下次沟通时间'}</View>
  //                 <AtIcon value='chevron-right' color='rgba(0,0,0,0.3)'></AtIcon>
  //               </View>
  //             </Picker>
  //           </View>
  //         </View>
  //       </View>
  //       <AtButton className='p-btn-submit' type='primary' onClick={this.onClickSubmit.bind(this)}>提交</AtButton>
  //     </AtFloatLayout>
  //   )
  // }

  render () {
    const { openBaseInfo, openRecord, detailInfo } = this.state
    const { isOpenedFloat, rangeIndexNextTime, oldMaturity, oldIsLoser } = this.state
    const { form, maturityRange, maturityIndex, normalSelectRange, normalSelectIndex, secondarySalesWillingnessRange, secondarySalesWillingnessIndex, intentionDegreeRange, intentionDegreeIndex } = this.state
    const permissions = getGlobalData('permissions')
    return (
      <View className='p-page'>
        <AtMessage />
        <View className='p-container'>
          <View className='p-company-name'>{detailInfo.companyName}</View>
          <AtButton className='u-btn-handle' type='secondary' size='small' circle onClick={this.onClickEdit.bind(this)}>填写跟踪日志</AtButton>
          {/* <AtAccordion
            open={openBaseInfo}
            title='企业信息'
            onClick={this.onClickOpen.bind(this, 'openBaseInfo')}
          >
            { this.renderBaseInfo() }
          </AtAccordion> */}
          <AtAccordion
            open={openRecord}
            title='客户经理跟踪日志'
            onClick={this.onClickOpen.bind(this, 'openRecord')}
          >
            { this.renderRecord() }
          </AtAccordion>
          {/* 底部弹框 */}
          {/* { this.renderFloatLayout() } */}
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
                  <Picker mode='date' value={rangeIndexNextTime} onChange={this.onChangeNextTime.bind(this)}>
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
        </View>
      </View>
    )
  }
}

export default Index
