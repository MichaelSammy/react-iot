import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import BaseForm from '../../../common/BaseForm'
import BaseModel from '../../../common/BaseModel'
import AddGroup from './AddGroup'
import IconFont from '../../../utils/IconFont';
import request from '../../../utils/request'
import './index.less'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../utils";
import Etable from "../../../common/Etable";
import AddGroupLabel from "./GroupExtractionComponent/addGroupLabel"

const FormItem = Form.Item
export default class DeviceGroup extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入分组名称',
            field: 'username',
            width: '300px'
        },
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
        rowSelection: null,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: false,
            pageSizeOptions: ['10', '20', '30'],
            pageSize: this.params.pageSize,
            current: this.params.page,
            total: this.params.total,
            onChange: (page, pageSize) => this.changePage(page, pageSize),
            showTotal: (total) => `共${total}条`,
        },
        type: false,
        list: [],
        detail: {},
        title: ''
    }

    componentDidMount() {
        this.requestList()
    }

    addGroupRef = (ref) => {
        this.addGroupRefChild = ref
    }
    createGroup = () => {
        this.addGroupRefChild.showDrawer()
    }
    addGroupLabelRef = (ref) => {
        this.addGroupLabelRefChild = ref
    }
    //查询
    handleSearch = (data) => {
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }
    clickSelect = (data) => {
        this.addGroupLabelRefChild.filterTag()
    }
    changePage = (page, pageSize) => {
        this.params.page = page;
        this.params.pageSize = pageSize;
        this.setState({
            pagination: {
                current: page,
                pageSize: pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                hideOnSinglePage: false,
                pageSizeOptions: ['10', '20', '30'],
                total: this.params.total,
                onChange: (page, pageSize) => this.changePage(page, pageSize),
                showTotal: (total) => `共${total}条`,
            }
        })
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
                // let dataSource = res.data.map((item, index) => {
                //     item.key = index;
                //     return item;
                // });
                this.params.total = 12;
                let dataSource = [
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                ];
                dataSource = dataSource.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource
                })
            }
        })
    }

    showDroupInfo = () => {
        this.props.history.push({'pathname': "/user/device/group/info", params: true});
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
    deleteDroup = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？'
        })
    }

    render() {
        const columns = [
            {
                title: '功能类型',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '分组名称',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '分组ID',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div>
                            <div className="function-table-option-buttion">
                                <div className="option-button" onClick={this.showDroupInfo.bind(this, item)}>查看</div>
                                <div className="split"></div>
                                <div className="option-button" onClick={this.deleteDroup.bind(this, item)}>删除</div>
                            </div>
                        </div>
                    )
                }
            }
        ];
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/group",
                        "pathName": "device-group",
                        "name": "设备分组",
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
                    <div className="product-big-title">设备分组</div>
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
                                clickSelect={this.clickSelect}
                            />
                        </div>
                        <div style={{float: 'left'}}>
                            <Button type="primary"
                                    onClick={this.createGroup}>创建分组
                            </Button>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <Etable
                        that={this}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        rowSelection={this.state.rowSelection}
                        updateSelectedItem={updateSelectedItem.bind(this)}
                        pagination={this.state.pagination}
                        type={this.state.type}
                    >
                    </Etable>
                </div>
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancle={this.submitCancle}
                           content={this.state.baseModelContent}
                ></BaseModel>
                <AddGroup onRef={this.addGroupRef} title='创建分组'></AddGroup>
                <AddGroupLabel onRef={this.addGroupLabelRef}></AddGroupLabel>
            </div>
        )
    }
}

