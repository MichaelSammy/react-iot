import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'
import {getUserList} from "../../../../api/api";

class AddDeviceToGruop extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            initialValue: '1',
            placeholder: '请先选择分组',
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
        detail: {},
        title: '添加设备到分组'
    }

    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    saveSubmit = async () => {
        this.props.hideAddDviceToGroupModel()
    }
    resetModelFrom = () => {
        this.props.hideAddDviceToGroupModel()
    }

    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getUserList(params).then(res => {
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
                title: '设备名称',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '设备ID',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '设备编号/IMEI',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '节点类型',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '状态',
                dataIndex: 'remark',
                align: 'left',
            },
        ];
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onCancel={this.resetModelFrom}
                    onOk={this.saveSubmit}
                    width={900}
                    centered
                    footer={[
                        <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                        <Button key="back" onClick={this.resetModelFrom}>取消</Button>
                    ]}
                >
                    <div className='product-function-mode-manager'>
                        <div className="function-search-from">
                            <BaseForm
                                data={this.data}
                                handleSearch={this.handleSearch}
                                show={false}
                            />
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
                </Modal>
            </div>
        )
    }
}

export default AddDeviceToGruop;
