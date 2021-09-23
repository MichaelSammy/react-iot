import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'
import {getUserList} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

class DataSubscribe extends React.Component {
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
            placeholder: '请输入搜索内容',
            field: 'username',
            width: '336px',
            bordered: true,
        }
    ]
    state = {
        rowSelection:false,
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
        type: '',
        list: [],
        detail: {},
        title: ''
    }
    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    editDataSubscribe = () => {
        alert(2)
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
                title: '订阅类型',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '订阅消息',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '创建时间',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.editDataSubscribe.bind(this, item)}>编辑</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
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
        )
    }
}

export default DataSubscribe;
