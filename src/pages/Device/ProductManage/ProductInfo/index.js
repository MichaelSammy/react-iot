import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import BaseModel from '../../../../common/BaseModel'
import IconFont from '../../../../utils/IconFont';
import request from '../../../../utils/request'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../../utils";
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
    submitOk = () => {
        this.setState({
            visibleBaseModel: false
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
        // this.requestList()
    }

    goBackPreviousPage = () => {
        this.props.history.go(-1)
    }
    addTag = () => {
        this.addLabelRefChild.addTag()
    }
    editTag = (item) => {
        this.addLabelRefChild.editTag(item)
    }
    saveSubmit = () => {
        this.child.handleSubmit();
    }
    closeSubmit = () => {
        this.setState({
            editProductVisible: false
        })
        this.child.closeSubmit()
    }
    addCustomFeatures = () => {
        this.addCustomFeaturesRefChild.showDrawer()
    }
    addStandardFeatures = () => {
        this.addStandardFeaturesRefChild.showDrawer()
    }
    importModelFrom = () => {
        this.importModelRefChild.showDrawer()
    }
    editProduct = () => {
        this.setState({
            detail: {
                loginName: '',
                name: '',
                mobile: '',
                address: '',
                email: ''
            },
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
                "name": "设备管理",
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
                                    <span className='edit-card-title-option' onClick={this.editProduct}> 编辑</span>
                                </div>
                                <div className='product-release' onClick={this.releaseProduct}> <div><IconFont type='icon-fabuicon' className="icon-font-offset-px"/>发布</div></div>
                                {this.state.visibleBaseModel != false &&
                                <div className='product-release' onClick={this.unpublishProduct}><div><IconFont type='icon-fabuicon' className="icon-font-offset-px"/>取消发布</div></div>}
                            </div>
                            <div className='card-top-spilt-line'></div>
                            <div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                </div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div></div>
                                </div>
                                <div className='product-filed-item'>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
                                    <div>产品ID：a9r2uwwJ1n</div>
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
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    {/*<div className='tag-option'>*/}
                                        {/*<span onClick={this.editTag}> 编辑</span>*/}
                                        {/*/<span onClick={this.addTag}>添加</span></div>*/}
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
                        />
                    </Modal>
                }
                <AddCustomFeatures onRef={this.addCustomFeaturesRef}></AddCustomFeatures>
                <AddStandardFeatures onRef={this.addStandardFeaturesRef}></AddStandardFeatures>
                <AddLabel onRef={this.addLabelRef}></AddLabel>
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

