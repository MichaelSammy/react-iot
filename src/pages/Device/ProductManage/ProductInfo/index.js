import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import BaseForm from '../../../../common/BaseForm'
import IconFont from '../../../../utils/IconFont';
import Etable from "../../../../common/Etable";
import request from '../../../../utils/request'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../../utils";
import {recursionRouterTwo} from "../../../../utils/recursion-router";
import defaultUser from '../../../../assets/images/defaultUser.png'
import EditProduct from "../EditProduct";
import './index.less'
import FunctionDefinition from "../ExtractionComponent/functionDefinition";
import DataSubscribe from "../ExtractionComponent/dataSubscribe";
import DataAnalysis from "../ExtractionComponent/dataAnalysis";
import AddCustomFeatures from "../ExtractionComponent/addCustomFeatures";
import AddLabel from "../ExtractionComponent/addLabel";

const {TabPane} = Tabs;
const FormItem = Form.Item
export default class Permission extends React.Component {
    onRef = (ref) => {
        this.child = ref
    }
    addCustomFeaturesRef = (ref) => {
        this.addCustomFeaturesRefChild = ref
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    state = {
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
        list: [],
        roleVisible: false,
        perVisible: false,
        authVisible: false,
        checkedKeys: [],
        targetKeys: [],
        detail: {},
        title: ''
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
            placeholder: '查询',
            field: 'username',
            width: '336px',
            bordered: true,
        }
    ]

    componentDidMount() {
        // this.requestList()
    }
    addTag = () => {
        this.addLabelRefChild.addTag()
    }
    editTag = (item) => {
        this.addLabelRefChild.editTag(item)
    }
    saveUserSubmit = () => {
        this.child.handleSubmit();
    }
    resetUserFrom = () => {
        this.setState({
            roleVisible: false
        })
        this.child.resetUserFrom()
    }
    addCustomFeatures= () => {
        this.addCustomFeaturesRefChild.showDrawer()
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
            roleVisible: true,
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
        const list = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }, {id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
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
                        "pathName": "add-device",
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
                    <div className="product-big-title">产品详情</div>
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
                            <img src={defaultUser} alt=""/>
                            <IconFont className='icon-img-edit' type='icon-xiugai1'/>
                        </div>
                        <div className='product-info-filed'>
                            <div>
                                <div className='card-title'>
                                    <span className='title-desc'>产品信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editProduct}> 编辑</span>
                                </div>
                                <div className='product-release'>发布</div>
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
                                <div style={{float: 'left', margin: '5px 0px'}}>标签：</div>
                                <div className='product-tag-list'>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-option'>
                                        <span onClick={this.editTag}> 编辑</span>
                                        /<span onClick={this.addTag}>添加</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <Tabs className="product-info-tabs" type="card">
                    <TabPane tab="功能定义" key="1">
                        <FunctionDefinition  addCustomFeatures={this.addCustomFeatures}></FunctionDefinition>
                    </TabPane>
                    <TabPane tab="数据解析" key="2">
                       <DataAnalysis></DataAnalysis>
                    </TabPane>
                    <TabPane tab="Topic列表" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                    <TabPane tab="数据订阅" key="5">
                       <DataSubscribe></DataSubscribe>
                    </TabPane>
                </Tabs>
                {
                    this.state.roleVisible &&
                    <Modal
                        title={this.state.title}
                        visible={this.state.roleVisible}
                        onCancel={this.resetUserFrom}
                        onOk={this.saveUserSubmit}
                        footer={[
                            <Button key="submit" type="primary" onClick={this.saveUserSubmit}>确定</Button>,
                            <Button key="back" onClick={this.resetUserFrom}>取消</Button>
                        ]}
                    >
                        <EditProduct
                            detail={this.state.detail}
                            onRef={this.onRef}
                        />
                    </Modal>
                },
                <AddCustomFeatures  onRef={this.addCustomFeaturesRef}></AddCustomFeatures>
                <AddLabel onRef={this.addLabelRef}></AddLabel>
            </div>
        )
    }
}

