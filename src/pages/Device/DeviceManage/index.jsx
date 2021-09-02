import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import BaseForm from '../../../common/BaseForm'
import BaseModel from '../../../common/BaseModel'
import IconFont from '../../../utils/IconFont';
import request from '../../../utils/request'
import './index.less'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../utils";

const FormItem = Form.Item
export default class DeviceManage extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '请选择分组标签',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '150px'
        }
    ]
    state = {
        list: [],
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

    }

    resetUserFrom = () => {
        this.setState({
            roleVisible: false
        })
        this.child.resetUserFrom()
    }
    submitOk = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancle = () => {
        this.setState({
            visibleBaseModel: false
        })
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
                    <div className="product-big-title">设备管理</div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                    </div>
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
                    </div>
                    <div style={{clear: 'both'}}></div>


                </div>
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancle={this.submitCancle}
                           content={this.state.baseModelContent}
                ></BaseModel>
            </div>
        )
    }
}

