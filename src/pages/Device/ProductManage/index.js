import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb} from "antd";
import BaseForm from '../../../common/BaseForm'
import EditProduct from './EditProduct'
import IconFont from '../../../utils/IconFont';
import request from '../../../utils/request'
import './index.less'
import {filterRoutes, getBreadItem} from "../../../utils";
import {recursionRouterTwo} from "../../../utils/recursion-router";

const FormItem = Form.Item
export default class Permission extends React.Component {
    onRef = (ref) => {
        this.child = ref
    }
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
            width: '300px'
        }
    ]
    state = {
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
        type: 'radio',
        list: [],
        roleVisible: false,
        perVisible: false,
        authVisible: false,
        checkedKeys: [],
        targetKeys: [],
        detail: {},
        title: ''
    }
    //查询
    handleSearch = (data) => {
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }

    componentDidMount() {
        this.requestList()
    }

    //请求列表
    requestList() {
        request({
            url: '/user/list',
            type: 'get',
            params: {
                page: this.params.page,
                pageSize: this.params.pageSize
            }
        }).then(res => {
            if (res.code === 1) {
                let dataSource = res.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource
                })
            }
        })
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
    createProduct = () => {
        this.props.history.push({'pathname': "/user/device/product/add", params: true});
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
    showProductInfo=()=>{
        this.props.history.push({'pathname': "/user/device/product/info", params: true});
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
                    }
                ],
                "redirect": "/user/device/product"
            }
        ]
        return (

            <div>

                <div className='product-list-title-background'>
                    {/*<div>*/}
                <Breadcrumb>
                    {
                        getBreadItem(breadList)
                    }
                </Breadcrumb>
                    <div className="product-big-title">产品管理</div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。</div>
                    <div className="product-show-doc">查看文档</div>

                </div>
                <div className="product-list-card">
                <div className="product-list-card-search">
                    <div style={{float: 'left'}}>
                        <BaseForm
                            data={this.data}
                            show={false}
                            handleSearch={this.handleSearch}
                        />
                    </div>
                    <div style={{float: 'left'}}>
                        <div className="product-list-page-crete-product" type="primary" onClick={this.createProduct}>创建产品</div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                    <div>

                        {/*<div>左</div>*/}
                <List
                    grid={{
                        gutter: 13  ,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 3,
                        xxl: 3,
                    }}
                    dataSource={list}
                    renderItem={item => (
                        <List.Item>
                            <div className="card-tag">标准产品</div>
                            <div className="card-info-height">
                                <div className='card-title-info'>
                                    <div>
                                        <span className='title-font' onClick={this.showProductInfo}>S270B</span>
                                        <span className="split-symbol"> / </span>
                                        <span className='title-font'>S270B</span>
                                    </div>
                                    <div className='card-title-option'><span onClick={this.editProduct}>
                                  <IconFont style={{fontSize: '20px', color: '#89A0C2'}} type='icon-xiugai1'/></span>
                                        <span> <IconFont style={{fontSize: '20px', color: '#89A0C2'}}
                                                         type='icon-xiugai1'/></span>
                                        <span> <IconFont style={{fontSize: '20px', color: '#89A0C2'}}
                                                         type='icon-xiugai1'/></span></div>
                                </div>
                                <div className='row-split-line'></div>
                                <div className='card-content-into'>
                                    <div className='card-content-left'>
                                        <div className='card-content-left-info'>
                                            <div>
                                                <div>节点类型：设备</div>
                                                <div>连网方式：wifi</div>
                                            </div>
                                            <div>
                                                <div>接入方式：直连</div>
                                                <div>通讯协议：MQTT</div>
                                            </div>
                                        </div>
                                        <div className='card-create-time'>创建时间：2018/12/20 09:43:33</div>
                                    </div>
                                    <div className='column-spilt-line'></div>
                                    <div className='card-content-right'>
                                        <div className='device-count-num'>852<span
                                            style={{fontSize: '14px', fontWeight: '500'}}>个</span></div>
                                        <div className='device-count-desc'>设备总数</div>
                                    </div>
                                </div>
                            </div>
                        </List.Item>
                    )}
                />
                        {/*<div>右</div>*/}
                    </div>
                </div>,
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
                }

            </div>
        )
    }
}

