import React from "react";
import {Card, Modal, Form, Input, Button} from "antd";
import BaseForm from '../../../../common/BaseForm'
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from '../../../../utils'
import request from '../../../../api/request'
import {getUserList} from "../../../../api/api";

export default class RoleManage extends React.Component {
    params = {
        page: 1,
        pageSize: 10,
    }
    data = [
        {
            type: 'input',
            initialValue: '',
            label: '角色名称',
            placeholder: '请输入角色名称',
            field: 'rolename',
            width: '130px'
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
            // defaultCurrent: 1,
            pageSize:this.params.pageSize,
            current:this.params.page,
            total: this.params.total,
            onChange:(page,pageSize)=>this.changePage(page,pageSize),
            showTotal: (total) => `共${total}条`,
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
    changePage=(page,pageSize)=>{
        this.params.page=page;
        this.params.pageSize=pageSize;
        this.setState({
            pagination:{
                current: page,
                pageSize:pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                hideOnSinglePage: false,
                pageSizeOptions: ['10', '20', '30'],
                total: this.params.total,
                onChange:(page,pageSize)=>this.changePage(page,pageSize),
                showTotal: (total) => `共${total}条`,
            }
        })
        this.requestList()
    }
    createRole = () => {
        this.props.history.push({'pathname':"/user/permission/role/add",params:true,from: this.props.location.pathname});
    }
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
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getUserList(params).then(res => {
            if (res.code === 1) {
                // let dataSource = res.data.map((item, index) => {
                //     item.key = index;
                //     return item;
                // });
                this.params.total=12;
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

    userRole = () => {

    }
    deleteRole = () => {

    }

    render() {
        const columns = [
            {
                title: '角色名称',
                dataIndex: 'roleName',
                align: 'center'
            },
            {
                title: '归属机构',
                dataIndex: 'officeName',
                align: 'center',
            },
            {
                title: '创建人',
                dataIndex: 'createUser',
                align: 'center',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'center',
            },
            {
                title: '备注',
                dataIndex: 'remark',
                align: 'center',
            },
            {
                title: '操作',
                align: 'center',
                render: (item) => {
                    return (
                        <div>
                            <Button size="small" type="primary" onClick={this.userRole.bind(this, item)}
                                    style={{marginRight: '10px'}}>编辑</Button>
                            <Button size="small" type="primary" onClick={this.deleteRole.bind(this, item)}>删除</Button>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Card>
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                    />
                </Card>
                <Card style={{margin: '10px 0'}}>
                    <Button type="primary" onClick={this.createRole}>新增角色</Button>
                </Card>
                <Card>
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
                </Card>
            </div>
        )
    }
}
