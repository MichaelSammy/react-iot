var ServerConfig = window.externalConfig
if (!ServerConfig) {
    ServerConfig = {
        /**开发环境**/
        opensense_url: "http://114.116.119.117:9086/",
        // opensense_url: "http://10.17.86.108:9087/",
        // opensense_url:"http://114.116.119.117:38080/app/mock/16/",
    }
}

export default {
    springboot_security_url: ServerConfig.springboot_security_url,
    /**新增产品**/
    saveProduct: ServerConfig.opensense_url + "rest/product/save",
    /**产品列表**/
    getProductList: ServerConfig.opensense_url + "rest/product/getProductList",
    /**产品详情**/
    getProductInfo: ServerConfig.opensense_url + 'rest/product/getProductInfo',
    /**更新或发布产品**/
    updateOrPublishProduct: ServerConfig.opensense_url + "rest/product/update",
    /**
     * 1.物模型新增属性 六大类型：int、boolean、enum、struct、array
     * 2.物模型新增事件
     * 3.物模型新增服务
     * **/
    saveProductModel: ServerConfig.opensense_url + 'rest/productModel/saveProductModel',
    /**
     * 1.物模型更新属性 六大类型：int、boolean、enum、struct、array
     * 2.物模型更新事件
     * 3.物模型更新服务
     * **/
    updateProductModel: ServerConfig.opensense_url + 'rest/productModel/updateProductModel',
    /**查询物模型元素列表**/
    getProductModelList: ServerConfig.opensense_url + 'rest/productModel/getProductModelList',
    /**
     * 1.产品物模型元素详情
     * 2.查询物模型事件-服务元素详情
     * **/
    getProductModelInfo: ServerConfig.opensense_url + 'rest/productModel/getProductModelInfo',
    /**获取struct元素详情**/
    getStructInfo: ServerConfig.opensense_url + 'rest/productModel/getStructInfo',
    /**删除物模型元素**/
    deleteProductModel: ServerConfig.opensense_url + 'rest/productModel/deleteProductModel',
    /**查询单个参数详情**/
    getInOutInfo: ServerConfig.opensense_url + 'rest/productModel/getInOutInfo',
    /**产品标签查询**/
    getProductLabels:ServerConfig.opensense_url+"rest/product/getProductLabels",
    /**新增（修改）产品标签**/
    saveOrUpdateLabel:ServerConfig.opensense_url+"rest/product/saveLabel",

    /**获取设备批次列表**/
    getDeviceBatchList:ServerConfig.opensense_url+"rest/device/getDeviceBatchList",
    /**设备管理列表**/
    getDeviceList:ServerConfig.opensense_url+"rest/device/getDeviceList",
    /**设备详情**/
    getDeviceInfo:ServerConfig.opensense_url+"rest/device/getDeviceInfo",
    /**设备新增**/
    addDevice:ServerConfig.opensense_url+"rest/device/save",
    /**设备编辑**/
    updateDevice:ServerConfig.opensense_url+"rest/device/update",
    /**添加设备标签**/
    saveDeviceLabel:ServerConfig.opensense_url+"/rest/device/saveLabel",
    /**获取设备页签-属性列表**/
    getDeviceTabPropertyInfo:ServerConfig.opensense_url+"rest/device/getDeviceTabPropertyInfo",
    /**获取设备页签-事件列表**/
    getDeviceTabEventInfo:ServerConfig.opensense_url+"rest/device/getDeviceTabEventInfo",
    /**获取设备页签-服务列表**/
    getDeviceTabServerInfo:ServerConfig.opensense_url+"rest/device/getDeviceTabServerInfo",
    /**获取设备页签-子设备列表**/

    /**获取设备页签-指令下发列表**/
    getDeviceTabCommandSend:ServerConfig.opensense_url+"rest/device/getDeviceTabCommandSend",
    /**批量添加设备（自动生成/手动导入）**/
    batchCreateDevice:ServerConfig.opensense_url+"rest/device/batchCreate",
    /**设备列表汇总数据**/
    getDeviceSummaryList:ServerConfig.opensense_url+"rest/device/getDeviceSummaryList",
    /**设备（启用、禁用）批量**/
    deviceBatchOpenOrClose:ServerConfig.opensense_url+"rest/device/deviceBatchOpenOrClose",
    /**获取设备页签-分组列表**/
    getDeviceGroupList:ServerConfig.opensense_url+"rest/device/getDeviceGroupList",
    /**设备单个、批量删除**/
    batchDeleteDevice:ServerConfig.opensense_url+"rest/device/batchDelete",
    /**添加设备到分组**/
    saveDeviceGoGroup:ServerConfig.opensense_url+"rest/device/saveDeviceGoGroup",
    /**添加设备分组**/
    addDeviceGroup:ServerConfig.opensense_url+"rest/deviceGroup/insertGroup",
    /**修改设备分组**/
    updateDeviceGroup:ServerConfig.opensense_url+"rest/deviceGroup/updateGroup",
    /**获取设备分组详情**/
    getDeviceGroupInfo:ServerConfig.opensense_url+"rest/deviceGroup/selectById",
    /**分组下设备列表**/
    selectDeviceListByGroupId:ServerConfig.opensense_url+"rest/deviceGroup/selectDeviceListByGroupId",
    /**分页获取设备分组列表**/
    selectDeviceListByPage:ServerConfig.opensense_url+"rest/deviceGroup/selectDeviceListByPage",
    /**新增修改设备分组标签信息**/
    saveOrUpdateDeviceGroupLabel:ServerConfig.opensense_url+"rest/deviceGroup/insertGroupLabel",
    /**获取产品类别**/
    getProductTypeList:ServerConfig.opensense_url+"rest/productPublic/getProductTypeList",
    /**根据产品类别 获取物模型详情**/
    getProductDetailList:ServerConfig.opensense_url+"rest/productPublic/getProductDetailList",
    /**添加标准功能点**/
    saveProductDetail:ServerConfig.opensense_url+"rest/productPublic/saveProductDetail",
    /**批量删除标准功能点**/
    delProductDetail:ServerConfig.opensense_url+"rest/productPublic/delProductDetail",
    /**保存自定义Topics**/
    saveProductTopics:ServerConfig.opensense_url+"rest/productTopics/saveProductTopics",
    /**修改自定义Topics**/
    updateProductTopics:ServerConfig.opensense_url+"rest/productTopics/updateProductTopics",
    /**批量删除自定义Topics**/
    delProductTopicsByIds:ServerConfig.opensense_url+"rest/productTopics/delProductTopicsByIds",
    /**查询自定义Topics列表**/
    selectProductTopics:ServerConfig.opensense_url+"rest/productTopics/selectProductTopics",
    /**获取产品列表-select选择框使用**/
    getProductDropDownList:ServerConfig.opensense_url+"rest/product/getProductDropDownList",
    /**
     * 字典表
     * iot_product_category ——>产品类别
     * iot_industry_name---->行业名称
     * iot_appli_scenario----->应用场景
     * **/
    getSysDictList:ServerConfig.opensense_url+"rest/sysDict/getSysDictList",
    /**删除设备分组**/
    deleteDeviceGroupById:ServerConfig.opensense_url+"rest/deviceGroup/deleteGroupById",
    /**批量添加设备到分组**/
    insertDeviceToGroup:ServerConfig.opensense_url+"rest/deviceGroup/insertDeviceToGroup",
    /**批量移除分组内设备**/
    deleteDeviceToGroup:ServerConfig.opensense_url+"rest/deviceGroup/deleteDeviceToGroup",
    /**查询不在设备分组内的设备列表**/
    getDeviceListOutGroup:ServerConfig.opensense_url+"rest/device/getDeviceListOutGroup",
    /**数据解析脚本保存**/
    saveProductParseScript:ServerConfig.opensense_url+"rest/product/saveProductParseScript",
    /**数据解析脚本查询**/
    selectScriptByParam:ServerConfig.opensense_url+"rest/product/selectScriptByParam",
}
