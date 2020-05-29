import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Navigator, Image, Picker } from '@tarojs/components'
import { AtButton, AtFloatLayout, AtTextarea, AtIcon } from 'taro-ui'
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
      current: 0,
      isOpenedFloat: false,
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
    this.resetRange()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {}

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

    this.setState({ secondarySalesWillingnessRange })
  }

  renderFloatLayout() {
    const { isOpenedFloat, textValue, rangeIndexNextDate, rangeIndexNextTime, oldMaturity, oldIsLoser } = this.state
    const { maturityRange, maturityIndex, normalSelectRange, normalSelectIndex, secondarySalesWillingnessRange, secondarySalesWillingnessIndex, intentionDegreeRange, intentionDegreeIndex } = this.state
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
                  onChange={this.onChangeLoser.bind(this)}
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
                  onChange={this.onChangeLoser.bind(this)}
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
                value={textValue}
                placeholder='请填写跟踪日志'
                maxLength={200}
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
                  onChange={this.onChangeLoser.bind(this)}
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
        <AtButton className='p-btn-submit' type='primary'>提交</AtButton>
      </AtFloatLayout>
    )
  }

  render () {
    const { current, isOpenedFloat, textValue, rangeDataLoser, rangeIndexLoser, rangeIndexNextDate, rangeIndexNextTime } = this.state
    const tabList = [{ title: '我的客户' }, { title: '公海' }]
    return (
      <View className='p-page'>
        <View className='p-container'>
          { this.renderPrivateList() }
          {/* 底部弹框 */}
          { this.renderFloatLayout() }
        </View>
      </View>
    )
  }
}

export default Index
