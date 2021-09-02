import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../utils/request";
import './../index.less'
import AddDeviceToGruop from "./addDeviceToGruop";

const {TextArea} = Input
const FormItem = Form.Item

class GroupDeviceList extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
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
    state = {
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
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
        type: 'checkbox',
        list: [],
        visibleBaseModel: false,
        baseModelContent: '',
        addDeviceToGroupModel: false,
        detail: {},
        title: ''
    }

    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    callBackFatherMethod = () => {
        this.setState({
            addDeviceToGroupModel: true,
        })
    }

    batchDelete = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否批量删除？'
        })
    }
    showDevice = () => {
        alert(2)
    }
    removeDevice = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否移除车陂？'
        })
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
    hideAddDviceToGroupModel = () => {
        this.setState({
            addDeviceToGroupModel: false
        })
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

    render() {
        const columns = [
            {
                title: 'DeviceName/备注名称',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '设备所属产品',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '节点类型',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '状态/启用状态',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '最后上线时间',
                dataIndex: 'remark',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.showDevice.bind(this, item)}>查看</div>
                            <div className="split"></div>
                            <div className="option-button" onClick={this.removeDevice.bind(this, item)}>移除设备</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="function-search-from" style={{display: 'flex',justifyContent: 'space-between'}}>
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                        show={false}
                    />
                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="batch-delete" onClick={this.batchDelete}><IconFont type='icon-a-shanchucopy'
                                                                                               className="icon-font-offset-px"/>批量删除
                            </div>
                            <div className="add-stand-function" onClick={this.callBackFatherMethod}><IconFont
                                type='icon-jiahao' className="icon-font-offset-px"/>添加设备到分组
                            </div>
                        </div>
                    </div>
                </div>
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
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancle={this.submitCancle}
                           content={this.state.baseModelContent}
                ></BaseModel>
                <AddDeviceToGruop
                    visible={this.state.addDeviceToGroupModel}
                    hideAddDviceToGroupModel={this.hideAddDviceToGroupModel}
                ></AddDeviceToGruop>
            </div>
        )
    }
}

export default GroupDeviceList;
