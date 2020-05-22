
export const roles = {
  /** 经销商 */
  'DX': '电销',
  'DXJL': '电销经理', // 销售经理
  'DXZG': '电销主管',
  'YW': '客户经理',
  'YWJL': '运营经理',
  // 'LEADS_ADMIN': '管理员',
  'C_ADMIN': '经销商管理员',
  'KF': '客服',
  'KFJL': '客服经理',
  'YWQZ': '区总',
  'YWSZ': '省总',
  /** 厂家 */
  'S_PLJL': '品类经理',
  'S_PLFZ': '品类负责人',
  'S_CPJL': '金融产品经理',
  'S_CPZJ': '金融产品总监',
  'S_FK': '风控',
  'S_FKJL': '风控经理',
  'S_FW': '法务',
  'S_FWJL': '法务经理',
  'S_YYZY': '运营专员',
  'S_YYJL': '厂家运营经理',
  'S_ADMIN': '厂家管理员',
  /** 总运营 */
  'ZYYJL': '总运营经理',
  'ADMIN': '总管理员'
}
export const roleCode = {
  /** 经销商 */
  'LEADS_ELECTRICMAN': 'DX',
  'LEADS_ELECTRIC_CHARGE': 'DXZG',
  'LEADS_ELECTRIC_MANAGER': 'DXJL',
  'LEADS_SALESMAN': 'YW',
  'LEADS_DEALER_OPERATE_MANAGER': 'YWJL',
  'LEADS_DEALER_ADMIN': 'C_ADMIN',
  'LEADS_CUSTOMER_SERVICE': 'KF',
  'LEADS_CUSTOMER_SERVICE_MANAGER': 'KFJL',
  'LEADS_REGIONAL_GM': 'YWQZ',
  'LEADS_PROVINCIAL_GM': 'YWSZ',
  /** 厂家 */
  'LEADS_CATEGORY_MANAGER': 'S_PLJL',
  'LEADS_CATEGORY_LEADER': 'S_PLFZ',
  'LEADS_FINANCIAL_PRODUCTS_MANAGER': 'S_CPJL',
  'LEADS_FINANCIAL_PRODUCTS_DIRECTOR': 'S_CPZJ',
  'LEADS_RISK_MAN': 'S_FK',
  'LEADS_RISK_MANAGER': 'S_FKJL',
  'LEADS_LEGAL_MAN': 'S_FW',
  'LEADS_LEGAL_MANAGER': 'S_FWJL',
  'LEADS_SUPPLIER_OPERATE_MAN': 'S_YYZY',
  'LEADS_SUPPLIER_OPERATE_MANAGER': 'S_YYJL',
  'LEADS_SUPPLIER_ADMIN': 'S_ADMIN',
  /** 总运营 */
  'LEADS_OPERATE_MANAGER': 'ZYYJL',
  'LEADS_ADMIN': 'ADMIN'
}
export const permissionCodes = { // 废弃 不再维护
  /** 经销商 */
  'ALL_OPERATE_ONLINE_DATA': [],
  'ALL_OPERATE_OFFLINE_DATA': [],
  'ALL_OPERATE_UNKNOWN_DATA': [],
  'ALL_OPERATE_ONLINE_LEADS': ['ADMIN', 'ZYYJL', 'C_ADMIN', 'DXJL', 'DXZG', 'KFJL', 'YWJL', 'YWQZ', 'YWSZ'], // 全量 线上leads操作
  'ALL_OPERATE_OFFLINE_LEADS': ['ADMIN', 'ZYYJL', 'C_ADMIN', 'DXJL', 'KFJL', 'YWJL', 'YWQZ', 'YWSZ'], // 全量 线下leads操作
  'ALL_OPERATE_UNKNOWN_LEADS': ['ADMIN', 'ZYYJL', 'C_ADMIN', 'DXJL', 'KFJL', 'YWJL'], // 全量 暂未确定
  'ALL_CHECK_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL'], // 勾选
  'ALL_TAKEBAKE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL', 'ZYYJL'], // 收回
  'ALL_TO_TELEMARKETING_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL'], // 分配电销
  'ALL_CHANGE_LEADS': ['ADMIN', 'C_ADMIN', 'YWJL'], // 分配客户经理
  'ALL_MODIFY_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL', 'ZYYJL'], // 修改客户属性
  'ALL_PUSH_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL'], // 推送客户经理
  'ALL_TO_CUSTOMERSERVICE_LEADS': ['ADMIN', 'C_ADMIN', 'KFJL'], // 分配给客服
  'HIGHSEA_ONLINE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'DX'], // 线上leads查看
  'HIGHSEA_OFFLINE_LEADS': ['ADMIN', 'C_ADMIN', 'YWJL', 'YW'], // 线下leads查看
  'HIGHSEA_UNKNOWN_LEADS': [],
  'HIGHSEA_SELECT_LEADS': ['DX', 'YW'], // 挑入
  'HIGHSEA_TO_TELEMARKETING_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL'], // 分配电销
  'HIGHSEA_CHANGE_LEADS': ['ADMIN', 'C_ADMIN', 'YWJL'], // 分配客户经理
  'HIGHSEA_CREATE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL'], // 添加新客户
  'HIGHSEA_MODIFY_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL'], // 修改客户属性
  'MY_PUSH_LEADS': ['DX'], // 推送客户经理
  'MY_CREATE_LEADS': ['DX', 'YW'], // 添加新客户
  'MY_GIVEUP_LEADS': ['DX', 'YW'], // 放弃客户
  'COMMON_SHOW_LIMIT': ['DX', 'YW'], // 显示当前用户客户库存情况
  'STAFF_LIST': ['ADMIN', 'C_ADMIN'], // 所有员工列表查看
  'STAFF_DX_MODIFY_LIMIT': ['ADMIN', 'C_ADMIN', 'DXJL'], // 修改电销库容上限
  'STAFF_YW_MODIFY_LIMIT': ['ADMIN', 'C_ADMIN', 'YWJL', 'ZYYJL'], // 修改客户经理库容上限
  'NOSALES_CREATE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL', 'YWQZ', 'YWSZ', 'ZYYJL'], // 添加新客户
  'NOSALES_TO_TELEMARKETING_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL'], // 分配电销
  'NOSALES_CHANGE_LEADS': ['ADMIN', 'C_ADMIN', 'YWJL', 'YWQZ', 'YWSZ', 'ZYYJL'], // 分配客户经理
  'NOSALES_MODIFY_LEADS': ['ADMIN', 'C_ADMIN', 'YWJL', 'YWQZ', 'YWSZ', 'ZYYJL'], // 修改客户属性
  'NOSALES_ONLINE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL', 'ZYYJL'], // 线上leads操作
  'NOSALES_OFFLINE_LEADS': ['ADMIN', 'C_ADMIN', 'DXJL', 'YWJL', 'YWQZ', 'YWSZ'], // 线下leads操作
  'NOSALES_UNKNOWN_LEADS': [],
  'NOSALES_ONLINE_DATA': [],
  'NOSALES_OFFLINE_DATA': [],
  'NOSALES_UNKNOWN_DATA': [],
  /** 厂家功能权限 */
  // 厂家管理 / 我跟进的厂家
  'S_MY_CREATE_LEADS': ['S_PLJL', 'S_PLFZ'], // 创建厂家
  'S_MY_FOLLOWTOGETHER_LEADS': ['S_PLJL', 'S_PLFZ'], // 指定共同跟进人
  'S_MY_TAKEBAKE_LEADS': ['S_PLJL', 'S_PLFZ'], // 收回跟进人权限
  'S_MY_GIVEUP_LEADS': ['ZYYJL', 'S_PLJL', 'S_PLFZ', 'S_CPJL', 'S_CPZJ', 'S_FK', 'S_FKJL', 'S_FW', 'S_FWJL', 'S_YYZY', 'S_YYJL'], // 放弃厂家
  // 厂家管理 / 我跟进的厂家 / 厂家详情
  'S_UPDATE_FILES': ['ZYYJL', 'ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_CPJL', 'S_CPZJ', 'S_FK', 'S_FKJL', 'S_FW', 'S_FWJL', 'S_YYZY', 'S_YYJL'], // 附件上传
  'S_TRACE_LOG': ['ZYYJL', 'ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_CPJL', 'S_CPZJ', 'S_FK', 'S_FKJL', 'S_FW', 'S_FWJL', 'S_YYZY', 'S_YYJL'], // 填写跟踪日志
  'S_EDIT_RESEARCH_TABLE': ['ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ'], // 编辑厂家调研表
  'S_WHITELIST_MANAGE': ['ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ'], // 白名单管理
  'S_EDIT_DETAILS': ['ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ'], // 编辑
  'S_VIEW_CONTACT_INFO': ['ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ'], // 查看联系方式
  // 厂家管理 / 全量厂家
  'S_ALL_FOLLOW_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLFZ', 'S_CPZJ', 'S_FKJL', 'S_FWJL', 'S_YYJL'], // 指定跟进人
  'S_ALL_TAKEBAKE_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLFZ', 'S_CPZJ', 'S_FKJL', 'S_FWJL', 'S_YYJL'], // 收回跟进人权限
  // 厂家管理 / 公海
  'S_HIGHSEA_CREATE_LEADS': ['ADMIN', 'S_ADMIN', 'S_PLFZ'], // 创建厂家
  'S_HIGHSEA_ASSIGN_FOLLOW': ['ADMIN', 'S_ADMIN', 'S_PLFZ'], // 指定跟进人
  // 白名单管理 / 导入白名单
  'S_IMPORT_WHITELIST': ['ADMIN', 'S_ADMIN', 'S_PLJL', 'S_PLFZ'], // 导入白名单
  // 白名单管理 / 管理/数据查询
  'S_CHANGE_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_YYJL'], // 分配客户经理
  'S_TELEMARKETING_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_YYJL'], // 推送电销
  'S_RECOVER_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_YYJL'], // 收回客户
  'S_EXPORT_LEADS': ['ADMIN', 'ZYYJL', 'S_ADMIN', 'S_PLJL', 'S_PLFZ', 'S_YYJL'] // 导出
}
export const serverPermissionCodes = { // 接口值  权限
  /** 经销商 */
  'LEADS_LEADS:OPERATE:ALL_ONLINE_DATA': 'ALL_OPERATE_ONLINE_DATA', // 全量'线上'查看
  'LEADS_LEADS:OPERATE:ALL_OFFLINE_DATA': 'ALL_OPERATE_OFFLINE_DATA', // 全量'线下'查看
  'LEADS_LEADS:OPERATE:ALL_UNKNOWN_DATA': 'ALL_OPERATE_UNKNOWN_DATA', // 全量'暂未确定'查看
  'LEADS_LEADS:OPERATE:ALL_ONLINE': 'ALL_OPERATE_ONLINE_LEADS',
  'LEADS_LEADS:OPERATE:ALL_OFFLINE': 'ALL_OPERATE_OFFLINE_LEADS',
  'LEADS_LEADS:OPERATE:ALL_UNKNOWN': 'ALL_OPERATE_UNKNOWN_LEADS', // 全量'暂未确定'操作
  'LEADS_LEADS:OPERATE:ALL_CHECK': 'ALL_CHECK_LEADS',
  'LEADS_LEADS:OPERATE:ALL_TAKEBAKE': 'ALL_TAKEBAKE_LEADS',
  'LEADS_LEADS:OPERATE:ALL_TELEMARKETING': 'ALL_TO_TELEMARKETING_LEADS',
  'LEADS_LEADS:OPERATE:ALL_CUSTOMERSERVICE': 'ALL_TO_CUSTOMERSERVICE_LEADS',
  'LEADS_LEADS:OPERATE:ALL_SALESMAN': 'ALL_CHANGE_LEADS',
  'LEADS_LEADS:OPERATE:ALL_MODIFY': 'ALL_MODIFY_LEADS',
  'LEADS_LEADS:OPERATE:ALL_PUSH': 'ALL_PUSH_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_ONLINE': 'HIGHSEA_ONLINE_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_OFFLINE': 'HIGHSEA_OFFLINE_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_UNKNOWN': 'HIGHSEA_UNKNOWN_LEADS', // 公海 - 暂未确定leads查看
  'LEADS_LEADS:OPERATE:HIGH_SEA_SELECT': 'HIGHSEA_SELECT_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_TELEMARKETING': 'HIGHSEA_TO_TELEMARKETING_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_SALESMAN': 'HIGHSEA_CHANGE_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_CREATE': 'HIGHSEA_CREATE_LEADS',
  'LEADS_LEADS:OPERATE:HIGH_SEA_MODIFY': 'HIGHSEA_MODIFY_LEADS',
  'LEADS_LEADS:OPERATE:MY_PUSH': 'MY_PUSH_LEADS',
  'LEADS_LEADS:OPERATE:MY_CREATE': 'MY_CREATE_LEADS',
  'LEADS_LEADS:OPERATE:MY_GIVEUP': 'MY_GIVEUP_LEADS',
  'LEADS_LEADS:OPERATE:STAFF_MODIFY_ONLINE_LIMIT': 'STAFF_DX_MODIFY_LIMIT',
  'LEADS_LEADS:OPERATE:STAFF_MODIFY_OFFLINE_LIMIT': 'STAFF_YW_MODIFY_LIMIT',
  'LEADS_LEADS:OPERATE:STAFF_LIST': 'STAFF_LIST',
  'LEADS_LEADS:OPERATE:COMMON_SHOW': 'COMMON_SHOW_LIMIT',
  'LEADS_LEADS:OPERATE:NO_SALES_CREATE': 'NOSALES_CREATE_LEADS',
  'LEADS_LEADS:OPERATE:NO_SALES_TELEMARKETING': 'NOSALES_TO_TELEMARKETING_LEADS',
  'LEADS_LEADS:OPERATE:NO_SALES_SALESMAN': 'NOSALES_CHANGE_LEADS',
  'LEADS_LEADS:OPERATE:NO_SALES_MODIFY': 'NOSALES_MODIFY_LEADS',
  'LEADS_LEADS:OPERATE:NO_SALES_ONLINE': 'NOSALES_ONLINE_LEADS', // 待销售 - 线上leads操作
  'LEADS_LEADS:OPERATE:NO_SALES_OFFLINE': 'NOSALES_OFFLINE_LEADS', // 待销售 - 线下leads操作
  'LEADS_LEADS:OPERATE:NO_SALES_UNKNOWN': 'NOSALES_UNKNOWN_LEADS', // 待销售 - 暂未确定leads操作
  'LEADS_LEADS:OPERATE:NO_SALES_ONLINE_DATA': 'NOSALES_ONLINE_DATA', // 待销售 - 线上leads查看
  'LEADS_LEADS:OPERATE:NO_SALESL_OFFLINE_DATA': 'NOSALES_OFFLINE_DATA', // 待销售 - 线下leads查看
  'LEADS_LEADS:OPERATE:NO_SALES_UNKNOWN_DATA': 'NOSALES_UNKNOWN_DATA', // 待销售 - 暂未确定leads查看
  // 5.2填写跟踪日志
  'LEADS_LEADS:OPERATE:TRACE_LOG_SECONDARY_SALES_WILLINGNESS': 'LOG_SECONDARY_SALES_WILLINGNESS', // 经销商 - 跟踪日志 - 二次销售意愿度操作
  'LEADS_LEADS:OPERATE:TRACE_LOG_MATURITY': 'LOG_MATURITY', //  经销商 - 跟踪日志 - 成熟度操作
  'LEADS_LEADS:OPERATE:TRACE_LOG_INTENTIONDEGREE': 'LOG_INTENTIONDEGREE', // 经销商 - 跟踪日志 - 意向程度操作
  'LEADS_LEADS:OPERATE:TRACE_LOG_IS_LOSER': 'LOG_IS_LOSER', // 经销商 - 跟踪日志 - 是否战败操作
  'LEADS_LEADS:OPERATE:TRACE_LOG_SECONDARY_SALES_WILLINGNESS_DATA': 'LOG_SECONDARY_SALES_WILLINGNESS_DATA', // 经销商 - 跟踪日志 - 二次销售意愿度查看
  'LEADS_LEADS:OPERATE:TRACE_LOG_MATURITY_DATA': 'LOG_MATURITY_DATA', // 经销商 - 跟踪日志 - 成熟度查看
  'LEADS_LEADS:OPERATE:TRACE_LOG_INTENTIONDEGREE_DATA': 'LOG_INTENTIONDEGREE_DATA', // 经销商 - 跟踪日志 - 意向程度查看
  'LEADS_LEADS:OPERATE:TRACE_LOG_IS_LOSER_DATA': 'LOG_IS_LOSER_DATA', // 经销商 - 跟踪日志 - 是否战败查看
  'LEADS_LEADS:OPERATE:LEADS_DETAIL_SECONDARY_SALES_WILLINGNESS': 'DETAIL_SECONDARY_SALES_WILLINGNESS', // 经销商 - 线索详情 - 二次销售意愿度操作
  'LEADS_LEADS:OPERATE:LEADS_DETAIL_MATURITY': 'DETAIL_MATURITY', // 经销商 - 线索详情 - 成熟度操作
  'LEADS_LEADS:OPERATE:LEADS_DETAIL_INTENTIONDEGREE': 'DETAIL_INTENTIONDEGREE', // 经销商 - 线索详情 - 意向程度操作
  'LEADS_LEADS:OPERATE:LEADS_DETAIL_IS_LOSER': 'DETAIL_IS_LOSER', // '经销商 - 线索详情 - 是否战败操作
  /** 厂家 */
  'LEADS_LEADS:OPERATE:SUPPLIER:MY_CREATE': 'S_MY_CREATE_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MY_FOLLOW': 'S_MY_FOLLOWTOGETHER_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MY_TAKEBAKE': 'S_MY_TAKEBAKE_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MY_GIVEUP': 'S_MY_GIVEUP_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:DETAILS_EDIT_SURVEY': 'S_EDIT_RESEARCH_TABLE',
  'LEADS_LEADS:OPERATE:SUPPLIER:DETAILS_UPLOAD_ATTACHMENT': 'S_UPDATE_FILES',
  'LEADS_LEADS:OPERATE:SUPPLIER:DETAILS_TRACE_LOG': 'S_TRACE_LOG',
  'LEADS_LEADS:OPERATE:SUPPLIER:DETAILS_WHITELIST': 'S_WHITELIST_MANAGE',
  'LEADS_LEADS:OPERATE:SUPPLIERDETAIL_EDIT': 'S_EDIT_DETAILS',
  'LEADS_LEADS:OPERATE:SUPPLIER:DETAIL_CONTACT': 'S_VIEW_CONTACT_INFO',
  'LEADS_LEADS:OPERATE:SUPPLIER:ALL_FOLLOW': 'S_ALL_FOLLOW_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:ALL_TAKEBAKE': 'S_ALL_TAKEBAKE_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:HIGH_SEA_CREATE': 'S_HIGHSEA_CREATE_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:HIGH_SEA_FOLLOW': 'S_HIGHSEA_ASSIGN_FOLLOW',
  'LEADS_LEADS:OPERATE:SUPPLIER:WHITELIST_IMPORT': 'S_IMPORT_WHITELIST',
  'LEADS_LEADS:OPERATE:SUPPLIER:MGT_ASSIGN': 'S_CHANGE_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MGT_PUSH': 'S_TELEMARKETING_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MGT_RECOVER': 'S_RECOVER_LEADS',
  'LEADS_LEADS:OPERATE:SUPPLIER:MGT_EXPORT': 'S_EXPORT_LEADS'
}