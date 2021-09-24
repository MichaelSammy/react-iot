var ServerConfig = window.externalConfig
if (!ServerConfig) {
    ServerConfig = {
        /**开发环境**/
        opensense_url: "http://114.116.119.117:9086/",
        // opensense_url: "http://10.17.86.108:9087/",
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
}
