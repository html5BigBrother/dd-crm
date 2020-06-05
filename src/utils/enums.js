
// 工作台 办理状态
export const taskStatus = {
  0: '待处理',
  1: '已处理',
  2: '已失效'
}

// 工单类型
export const taskType = {
  1: '注册未实名',
  2: '实名未申请赊销',
  3: '获得赊销额度未下单',
  4: '下单未支付货款',
  5: '未偿还赊销款',
  6: '开票',
  7: '投诉回访'
}

// 工单处理状态
export const dealStatus = {
  1: '已完成',
  2: '未完成，仍需跟进',
  3: '沟通失败',
  4: '其他'
}

// 经销商成熟度
export const maturity = {
  // '-1': '无',
  1: '客户暂不配合、意愿未定',
  2: '获取KP联系人及联系方式',
  3: '客户认可有意愿',
  4: '客户有需求',
  5: '确认赊销申请意向',
  6: '申请资料准备',
  7: '收到客户申请资料',
  8: '赊销申请审核通过',
  9: '项目准入中',
  10: '资料准备',
  11: '下单',
  12: '签约',
  13: '支付货款',
  14: '还款',
  15: '开票'
}

// 经销商意向程度
export const intentionDegree = {
  // '-1': '无',
  // 0: '0类：新客户，意愿未定',
  // 1: '1类：赊销申请审核通过',
  // 2: '2类：确定赊销申请意向，并配合当场提供部分资料',
  // 3: '3+类：确定赊销申请意向，当场未提供资料',
  // 4: '3类：客户认可，且有意愿需要再次跟进',
  // 5: '4类：客户认可，但暂无需求',
  // 6: '5类：客户不认可/毁单',
  // 7: '6类：不准入'
  0: 'S0：新客户，未接通',
  1: 'S1：确定赊销申请意向，资料已收到',
  2: 'S2：确定赊销申请意向，7天内提供资料',
  3: 'S3+：确定赊销申请意向，15天内提供资料',
  4: 'S3：客户认可，且有意愿需要再次跟进',
  5: 'S4：客户认可，但暂无需求',
  6: 'S5：客户不认可/毁单',
  7: 'S6：不准入'
}

// 普通是否
export const normalSelect = {
  0: '否',
  1: '是'
}

// 二次销售意愿度
export const secondarySalesWillingness = {
  // '-1': '无',
  0: 'C0：未接通',
  1: 'C1：7天内有业务需求',
  2: 'C2：15天内有业务需求',
  3: 'C3+：有业务需求，时间未定',
  4: 'C3：有业务需求，暂无额度',
  5: 'C4：暂无业务需求',
  6: 'C5：客户不再愿意合作',
  7: 'C6：逾期/不再进行合作'
}

// 经销商当前进度
export const currentProgress = {
  1: 'leads',
  2: '已注册',
  3: '已实名',
  4: '已获得赊销额度',
  5: '已首次下单',
  6: '已首次支付货款',
  7: '已首次偿还赊销款',
  8: '已首次签收',
  9: '已首次开票'
}

// 会员等级
export const vipLevel = {
  0: 'V0',
  1: 'V1',
  2: 'V2',
  3: 'V3',
  4: 'V4',
  5: 'V5',
  6: 'V6',
  7: 'V7',
  8: 'V8'
}

// 客户来源
export const customerSource = {
  1: '自拓',
  2: '市场活动',
  3: '客户转介绍',
  4: '大客户名单输出',
  5: '渠道客户',
  6: '公司推荐',
  7: '核心企业白名单',
  999: '其他'
}

// leads属性
export const leadType = {
  0: '线下',
  1: '线上',
  2: '暂未确定'
}

// 客户类型
export const companyType = {
  1: '普通企业'
}

// leads注册来源
export const registerSource = {
  1: '官网',
  2: '口袋通',
  3: '钉钉',
  4: '代注册'
}

// 赊销状态
export const creditStatus = {
  TODO: '未审批',
  PROCESS: '审批中',
  DONE: '生效',
  REJECT: '审批未通过',
  INVALID: '失效',
  SLEEP: '休眠'
}

// leads渠道来源
export const source = {
  1: '渠道录入',
  13: '白名单导入',
  2: '电销录入',
  3: '电销经理录入',
  4: '业务员录入',
  5: '运营经理录入',
  6: '客服录入',
  7: '管理员录入',
  8: '系统录入',
  9: '客服经理录入',
  10: '电销主管录入',
  11: '区总录入',
  12: '省总录入'
}

// 客户标记
export const mark = {
  1: '销售'
}

// 放弃原因
export const giveUpReason = {
  1: '无执照或执照注销',
  2: '黑名单',
  3: '风控红线',
  4: '空号',
  5: '用户硬性条件不符',
  6: '无法确认KP',
  7: '用户无意向',
  8: '竞品'
}

// 职位
export const post = {
  1: '董事长',
  2: '总经理',
  3: '销售',
  4: '采购',
  5: '财务',
  6: '其他',
  7: '销售总监',
  8: '财务总监'
}
