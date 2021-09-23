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