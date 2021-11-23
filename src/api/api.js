import request from './request'
import config from './serverConfig'

/**获取用户列表**/
export const getUserList = (params) => request.GET('/user/list', params)
export const login = (params) => request.POST('/user/login', params)
export const getUserInfo = (params) => request.GET('/user/info', params)


/**新增产品**/
export const saveProduct = (params) => request.POST(config.saveProduct, params)
/**更新或发布产品**/
export const updateOrPublishProduct = (params) => request.GET(config.updateOrPublishProduct, params);
/**产品列表**/
export const getProductList = (params) => request.POST(config.getProductList, params)
/**产品详情**/
export const getProductInfo=(params)=>request.GET(config.getProductInfo, params)
/**
 * 1.物模型新增属性 六大类型：int、boolean、enum、struct、array
 * 2.物模型新增事件
 * 3.物模型新增服务
 * **/
export const saveProductModel = (params) => request.POST(config.saveProductModel, params)
/**
 * 1.物模型更新属性 六大类型：int、boolean、enum、struct、array
 * 2.物模型更新事件
 * 3.物模型更新服务
 * **/
export const updateProductModel = (params) => request.POST(config.updateProductModel, params)
/**查询物模型元素列表**/
export const getProductModelList = (params) => request.GET(config.getProductModelList, params)
/**
 * 1.产品物模型元素详情
 * 2.查询物模型事件-服务元素详情
 * **/
export const getProductModelInfo = (params) => request.GET(config.getProductModelInfo, params)
/**获取struct元素详情**/
export const getStructInfo = (params) => request.GET(config.getStructInfo, params)
/**删除物模型元素**/
export const deleteProductModel = (params) => request.GET(config.deleteProductModel, params)
/**查询单个参数详情**/
export const getInOutInfo = (params) => request.GET(config.getInOutInfo, params)
/**产品标签查询**/
export const getProductLabels = (params) => request.GET(config.getProductLabels,params)
    /**新增（修改）产品标签**/
export const saveOrUpdateLabel = (params) => request.POST(config.saveOrUpdateLabel,params)
/**获取设备批次列表**/
export const getDeviceBatchList=(params)=> request.GET(config.getDeviceBatchList,params)
/**设备列表**/
export const getDeviceList=(params)=> request.GET(config.getDeviceList,params)
/**设备详情**/
export const getDeviceInfo=(params)=> request.GET(config.getDeviceInfo,params)
/**设备新增**/
export const addDevice=(params)=> request.POST(config.addDevice,params)
/**设备编辑**/
export const updateDevice=(params)=> request.POST(config.updateDevice,params)
/**新增（修改）设备标签**/
export const saveOrUpdateDeviceLabel = (params) => request.POST(config.saveDeviceLabel,params)
/**获取设备页签-属性列表**/
export const getDeviceTabPropertyInfoList=(params)=> request.GET(config.getDeviceTabPropertyInfo,params)
/**获取设备页签-事件列表**/
export const getDeviceTabEventInfoList=(params)=> request.GET(config.getDeviceTabEventInfo,params)
/**获取设备页签-服务列表**/
export const getDeviceTabServerInfoList=(params)=> request.GET(config.getDeviceTabServerInfo,params)
/**获取设备页签-子设备列表**/

/**获取设备页签-指令下发列表**/
export const getDeviceTabCommandSendList=(params)=> request.GET(config.getDeviceTabCommandSend,params)
/**获取设备页签-Topic列表**/
export const getDeviceCustomTopicList=(params)=> request.GET(config.getDeviceCustomTopicList,params)
/**批量添加设备（自动生成/手动导入）**/
export const batchCreateDevice=(params)=> request.POST(config.batchCreateDevice,params)
/**设备列表汇总数据**/
export const getDeviceSummaryList=(params)=> request.GET(config.getDeviceSummaryList,params)
/**设备（启用、禁用）批量**/
export const deviceBatchOpenOrClose=(params)=> request.GET(config.deviceBatchOpenOrClose,params)
/**获取设备页签-分组列表**/
export const getDeviceGroupList=(params)=> request.GET(config.getDeviceGroupList,params)
/**设备单个、批量删除**/
export const batchDeleteDevice=(params)=> request.GET(config.batchDeleteDevice,params)
/**添加设备到分组**/
export const saveDeviceGoGroup=(params)=> request.GET(config.saveDeviceGoGroup,params)
/**添加、修改设备分组**/
export const addOrUpdateDeviceGroup=(params)=> request.POST(config.addOrUpdateDeviceGroup,params)
/**获取设备分组详情**/
export const getDeviceGroupInfo=(params)=> request.GET(config.getDeviceGroupInfo,params)
/**分组下设备列表**/
export const selectDeviceListByGroupId=(params)=> request.GET(config.selectDeviceListByGroupId,params)
/**分页获取设备分组列表**/
export const selectDeviceListByPage=(params)=> request.GET(config.selectDeviceListByPage,params)
/**新增修改设备分组标签信息**/
export const saveOrUpdateDeviceGroupLabel=(params)=> request.GET(config.saveOrUpdateDeviceGroupLabel,params)
/**获取产品类别**/
export const getProductTypeList=(params)=> request.GET(config.getProductTypeList,params)
/**根据产品类别 获取物模型详情**/
export const getProductDetailList=(params)=> request.GET(config.getProductDetailList,params)
/**添加标准功能点**/
export const saveProductDetail=(params)=> request.POST(config.saveProductDetail,params)
/**批量删除标准功能点**/
export const delProductDetail=(params)=> request.POST(config.delProductDetail,params)
/**保存自定义Topics**/
export const saveProductTopics=(params)=> request.POST(config.saveProductTopics,params)
/**修改自定义Topics**/
export const updateProductTopics=(params)=> request.POST(config.updateProductTopics,params)
/**批量删除自定义Topics**/
export const delProductTopicsByIds=(params)=> request.GET(config.delProductTopicsByIds,params)