import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import BaseModel from '../../../../common/BaseModel'
import IconFont from '../../../../utils/IconFont';
import {filterRoutes, getBreadItem, messageGlobal, updateSelectedItem} from "../../../../utils";
import deviceDefaultImg from '../../../../assets/images/deviceDefaultImg.jpg'
import EditProduct from "../EditProduct";
import './index.less'
import FunctionDefinition from "../ExtractionComponent/functionDefinition";
import DataSubscribe from "../ExtractionComponent/dataSubscribe";
import DataAnalysis from "../ExtractionComponent/dataAnalysis";
import AddCustomFeatures from "../ExtractionComponent/addCustomFeatures";
import AddStandardFeatures from "../ExtractionComponent/addStandardFeatures";
import AddLabel from "../ExtractionComponent/addLabel";
import TopicListTab from "../ExtractionComponent/topicListTab";
import ImportModel from "../ExtractionComponent/importModel";
import * as qs from "qs";
import {getProductInfo, getProductLabels, getProductList, updateOrPublishProduct} from "../../../../api/api";

const {TabPane} = Tabs;
const FormItem = Form.Item
export default class Permission extends React.Component {
    state = {
        list: [],
        editProductVisible: false,
        detail: {},
        title: '',
        visibleBaseModel: false,
        baseModelContent: '',
        productInfo:{},
        productLabelList:[],
    }
    data = [
        {
            type: 'select',
            initialValue: '1',
            placeholder: '',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '130px'
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
            width: '336px',
            bordered: true,
        }
    ]
    onRef = (ref) => {
        this.child = ref
    }
    addCustomFeaturesRef = (ref) => {
        this.addCustomFeaturesRefChild = ref
    }
    addStandardFeaturesRef = (ref) => {
        this.addStandardFeaturesRefChild = ref
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    importModelRef= (ref) => {
        this.importModelRefChild = ref
    }
    functionDefinitionRef= (ref) => {
        this.functionDefinitionRefChild=ref
    }
    submitOk = () => {
        this.publishProduct(this.state.productInfo)
        this.setState({
            visibleBaseModel: false
        })
    }
    publishProduct = async (params) => {
        let values={
            id:params.id,
            isPublish:params.isPublish==1?0:1
        }
            updateOrPublishProduct(values).then(res => {
                if(res.status==1){
                   const productInfo=this.state.productInfo;
                    productInfo.isPublish=values.isPublish;
                    this.setState({productInfo})
                    messageGlobal('success',res.msg);
                }else{
                    messageGlobal('error',res.msg);
                }
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息

        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    releaseProduct = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否发布该产品？'
        })
    }
    unpublishProduct = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否取消发布该产品？'
        })
    }
   componentDidMount() {
       const productInfo = qs.parse(this.props.location.search,{ignoreQueryPrefix: true});
       let productParams={
           productId:productInfo.id
       }
       this.getProductDetails(productParams);
       this.setState({
           deviceCount:productInfo.num
       })

       this.getProductLabelList(productParams)
       console.log(1234)
    }
    getProductDetails=(params)=>{
        getProductInfo(params).then(res => {
            res.result.num=this.state.deviceCount
            if (res.status === '1') {
                this.setState({
                    productInfo:res.result
                })
            }
        })
    }
    getProductLabelList=(params)=>{
        getProductLabels(params).then(res => {
            if (res.status === '1') {
                this.setState({
                    productLabelList:res.result
                })
            }
            console.log(this.state.productLabelList)

        })
    }
    goBackPreviousPage = () => {
        this.props.history.go(-1)
    }
    addTag = () => {
        this.addLabelRefChild.addTag()
    }
    editTag = () => {
        this.addLabelRefChild.editTag(this.state.productLabelList,this.state.productInfo.id)
    }
    saveSubmit = () => {
        this.child.handleSubmit('info');
    }
    closeSubmit = () => {
        this.child.closeSubmit()
        this.setState({
            editProductVisible: false
        })
    }
    refresFunctionList=()=>{

        this.functionDefinitionRefChild.requestList()
    }
    addCustomFeatures = (item,state) => {
        this.addCustomFeaturesRefChild.showDrawer(item,state)
    }
    addStandardFeatures = () => {
        this.addStandardFeaturesRefChild.showDrawer()
    }
    importModelFrom = () => {
        this.importModelRefChild.showDrawer()
    }
    editProduct = (params) => {

        this.setState({
            detail: params,
            editProductVisible: true,
            title: '编辑'
        })
    }
    //查询
    handleSearch = (data) => {
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }

    render() {
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备接入与管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/product",
                        "pathName": "product-manage",
                        "name": "产品管理",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    },
                    {
                        "path": "/user/device/product/info",
                        "pathName": "product-info",
                        "name": "产品详情",
                        "icon": "iconxiangmu",
                        "show": false,
                        "children": null,
                        "redirect": null
                    },

                ],
                "redirect": "/user/device/product"
            }
        ]
        return (
            <div>
                <div className='product-list-title-background'>
                    <Breadcrumb>
                        {
                            getBreadItem(breadList)
                        }
                    </Breadcrumb>
                    <div className="product-big-title"><IconFont onClick={this.goBackPreviousPage}
                                                                 className="product-info-go-back-list"
                                                                 type='icon-fanhuijiantou'/>产品详情
                    </div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                        <div className="product-show-doc">自动注册-已开启</div>
                        <div className="product-show-doc">生态接入认证</div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                <Card className='product-card-info'>
                    <div>
                        <div className='product-image'>
                            <img src={deviceDefaultImg} alt=""/>
                            <span className='icon-img-edit'>
                            <IconFont type='icon-a-bianjicopy'/>
                            </span>
                        </div>
                        <div className='product-info-filed'>
                            <div>
                                <div className='card-title'>
                                    <span className='title-desc'>产品信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={()=>this.editProduct(this.state.productInfo)}> 编辑</span>
                                </div>
                                {this.state.productInfo.isPublish == 0 &&
                                <div className='product-release' onClick={this.releaseProduct}> <div><IconFont type='icon-fabuicon' className="icon-font-offset-px"/>发布</div></div>
                                }
                                {this.state.productInfo.isPublish == 1 &&
                                <div className='product-release' onClick={this.unpublishProduct}><div><IconFont type='icon-fabuicon' className="icon-font-offset-px"/>取消发布</div></div>}
                            </div>
                            <div className='card-top-spilt-line'></div>
                            <div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>产品ID：{this.state.productInfo.id}</div>
                                    <div>数据协议：{this.state.productInfo.dataType}</div>
                                    <div>接入协议：{this.state.productInfo.protocol}</div>
                                    <div>产品类别：{this.state.productInfo.productModel}</div>
                                    <div>认证：{this.state.productInfo.encryption}</div>
                                </div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>节点类型：{this.state.productInfo.nodeType}</div>
                                    <div>创建时间：{this.state.productInfo.createTime}</div>
                                    <div>ProductSecret：{this.state.productInfo.productSecret}</div>
                                    <div>设备数量：{this.state.productInfo.num}</div>
                                    <div></div>
                                </div>
                                <div className='product-filed-item'>
                                    <div>连网类型：{this.state.productInfo.netType}</div>
                                    <div>产品厂商：{this.state.productInfo.productVendor}</div>
                                    <div>产品型号：{this.state.productInfo.productKey}</div>
                                    <div>产品描述：{this.state.productInfo.productDesc}</div>
                                </div>
                            </div>
                            <div style={{padding: '10px 0px'}}>
                                <div className='card-title tag-title' style={{float: 'unset'}}>
                                    <span className='title-desc'>标签信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editTag}> 编辑</span>
                                </div>
                                <div style={{float: 'left', margin: '5px 0px'}}>产品标签：</div>
                                <div className='product-tag-list'>
                                    {
                                        this.state.productLabelList.map((item,index)=>{
                                      return   <div className='tag-name' >{item.key+' : '+item.value}</div>
                                      })

                                    }
                                    {
                                        this.state.productLabelList.length==0&&
                                        <div>无标签信息</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <Tabs id="product-info-tabs-id" className="product-info-tabs" type="card">
                    <TabPane tab="功能定义" key="1">
                        <FunctionDefinition addCustomFeatures={this.addCustomFeatures}
                                            addStandardFeatures={this.addStandardFeatures}
                                            importModelFrom={this.importModelFrom}
                                            productInfo={this.state.productInfo}
                                            onRef={this.functionDefinitionRef}
                        ></FunctionDefinition>
                    </TabPane>
                    <TabPane tab="数据解析" key="2">
                        <DataAnalysis></DataAnalysis>
                    </TabPane>
                    <TabPane tab="Topic列表" key="3">
                        <TopicListTab></TopicListTab>
                    </TabPane>
                    <TabPane tab="数据订阅" key="5">
                        <DataSubscribe></DataSubscribe>
                    </TabPane>
                </Tabs>
                {
                    this.state.editProductVisible &&
                    <Modal
                        title={this.state.title}
                        visible={this.state.editProductVisible}
                        onCancel={this.closeSubmit}
                        onOk={this.saveSubmit}
                        centered
                        footer={[
                            <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                            <Button key="back" onClick={this.closeSubmit}>取消</Button>
                        ]}
                    >
                        <EditProduct
                            detail={this.state.detail}
                            onRef={this.onRef}
                            closeSubmit={this.closeSubmit}
                            getProductDetails={this.getProductDetails}
                        />
                    </Modal>
                }
                <AddCustomFeatures onRef={this.addCustomFeaturesRef}  refresFunctionList={this.refresFunctionList}  productInfo={this.state.productInfo}></AddCustomFeatures>
                <AddStandardFeatures onRef={this.addStandardFeaturesRef}></AddStandardFeatures>
                <AddLabel onRef={this.addLabelRef}
                          getProductLabelList={this.getProductLabelList}></AddLabel>
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
                <ImportModel onRef={this.importModelRef} title='导入物模型'></ImportModel>
            </div>
        )
    }
}

