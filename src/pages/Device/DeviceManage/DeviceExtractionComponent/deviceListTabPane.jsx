import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Switch} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../utils/request";
import './../index.less'
import AddDevice from "./addDevice"
import BatchAddDevice from "./batchAddDevice"

const {TextArea} = Input
const FormItem = Form.Item

class DeviceListTabPane extends React.Component {
    // fromModeRef = React.createRef();
    addDeviceRef = (ref) => {
        this.addDeviceRefChild = ref
    }
    addBatchDeviceRef = (ref) => {
        this.addBatchDeviceRefChild = ref
    }
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
            width: '100px'
        },
        {
            type: 'select',
            initialValue: '1',
            placeholder: '',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '80px'
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
            width: '160px',
            bordered: true,
        },
        {
            type: 'select',
            initialValue: '1',
            placeholder: '',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '80px'
        },
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

    addDevice = () => {
        this.addDeviceRefChild.showDrawer();
    }
    addBatchDevice = () => {
        this.addBatchDeviceRefChild.showDrawer();
    }
    callBackFatherMethod = () => {
        this.setState({
            addDeviceToGroupModel: true,
        })
    }
    enable = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否启用？'
        })
    }
    disable = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否禁用？'
        })
    }
    batchDelete = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？'
        })
    }
    showDevice = () => {
        this.props.forwardDeviceInfo();
    }
    removeDevice = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除设备？'
        })
    }
    childDevice = () => {

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
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    tableColumnChange = () => {
        alert('12345');
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
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div style={{
                                width: '6px',
                                height: '6px',
                                background: '#FF6D6D',
                                borderRadius: '3px',
                                marginRight: '10px'
                            }}></div>
                            <div className="option-button">已启用</div>
                            <div className="option-button"><Switch defaultChecked onChange={this.tableColumnChange}/>
                            </div>
                        </div>
                    )
                }
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
                            <div className="option-button" onClick={this.removeDevice.bind(this, item)}>删除</div>
                            <div className="split"></div>
                            <div className="option-button" onClick={this.childDevice.bind(this, item)}>子设备(1)</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="function-search-from" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                        show={false}
                    />
                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="add-stand-function" onClick={this.addDevice}>
                                <div><IconFont
                                    type='icon-jiahao' className="icon-font-offset-px"/>添加设备
                                </div>
                            </div>

                            <div className="add-stand-function" onClick={this.addBatchDevice}>
                                <div><IconFont
                                    type='icon-piliangtianjia' className="icon-font-offset-px"/>批量添加
                                </div>
                            </div>

                            <div className="add-stand-function" onClick={this.callBackFatherMethod}>
                                <div><IconFont
                                    type='icon-daochushebei' className="icon-font-offset-px"/>导出设备
                                </div>
                            </div>


                            <div className="batch-delete" onClick={this.enable}>
                                <div><IconFont type='icon-piliangqiyong'
                                               className="icon-font-offset-px"/>启用
                                </div>
                            </div>
                            <div className="batch-delete" onClick={this.disable}>
                                <div><IconFont type='icon-piliangjinyong'
                                               className="icon-font-offset-px"/>禁用
                                </div>
                            </div>
                            <div className="batch-delete" onClick={this.batchDelete}>
                                <div><IconFont type='icon-a-shanchucopy'
                                               className="icon-font-offset-px"/>删除
                                </div>
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
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
                <AddDevice title={'添加设备'} onRef={this.addDeviceRef}></AddDevice>
                <BatchAddDevice title={'批量添加设备'} onRef={this.addBatchDeviceRef}></BatchAddDevice>
            </div>
        )
    }
}

export default DeviceListTabPane;
