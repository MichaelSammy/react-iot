import React from "react";
import {Card, Modal, Form, Input, Button} from "antd";
import BaseForm from '../../../../common/BaseForm'
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from '../../../../utils'
import request from '../../../../utils/request'

const FormItem = Form.Item
export default class Permission extends React.Component {
    // formRefUser = React.createRef();
    onRef = (ref) => {
        this.child = ref
    }
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'input',
            initialValue: '',
            label: '用户名',
            placeholder: '请输入用户名',
            field: 'username',
            width: '130px'
        },
        {
            type: 'chooseTime',
            initialValue: '',
            label: '开始时间',
            showTime: true,
            placeholder: '',
            field: 'beginTime',
            width: '130px'
        },
        {
            type: 'chooseTime',
            initialValue: '',
            label: '结束时间',
            placeholder: '',
            showTime: false,
            field: 'endTime',
            width: '130px'
        },
        {
            type: 'select',
            initialValue: '1',
            label: '权限',
            placeholder: '',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '130px'
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

    // 创建用户
    handleUser = () => {
        this.setState({
            detail: {
                loginName: '',
                name: '',
                mobile: '',
                address: '',
                email: ''
            },
            roleVisible: true,
            title: '创建用户'
        })
    }
    //编辑用户
    userEdit = (item) => {
        this.setState({
            detail: item,
            roleVisible: true,
            title: '编辑用户'
        })
    }
    //重置密码
    resetPassword = (values) => {
        const _this = this
        const _values=values
        Modal.confirm({
            title: '提示',
            content: '确认要重置密码吗?',
            okText: '确认',
            cancelText: '取消',
            onOk: _this.doResetPassword(_values)
        });
    }
    //确认重置
    doResetPassword = (_values) => {
        console.log(_values)
    }
    saveUserSubmit = () => {
        this.child.handleSubmit();
    }
    resetUserFrom = () =>{
            this.setState({
                roleVisible: false
            })
        this.child.resetUserFrom()
    }

    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            },
            {
                title: '登录名',
                dataIndex: 'loginName'
            },
            {
                title: '真实姓名',
                dataIndex: 'name'
            },
            {
                title: '联系电话',
                dataIndex: 'mobile'
            },
            {
                title: '权限',
                dataIndex: 'erpMemberRoles',
                render: (list) => {
                    return list.map(item => {
                        return item.roleName
                    }).join(",")
                }
            },
            {
                title: '联系地址',
                dataIndex: 'address'
            },
            {
                title: '操作',
                render: (item) => {
                    return (
                        <div>
                            <Button size="small" type="primary" onClick={this.userEdit.bind(this, item)}
                                    style={{marginRight: '10px'}}>编辑</Button>
                            <Button size="small" type="primary" onClick={this.resetPassword.bind(this,item)}>重置密码</Button>
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
                    <Button type="primary" onClick={this.handleUser}>创建用户</Button>
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
                {
                    this.state.roleVisible &&
                    <Modal
                        title={this.state.title}
                        visible={this.state.roleVisible}
                        okText="保存"
                        cancelText="取消"
                        onOk={this.saveUserSubmit}
                        onCancel={this.resetUserFrom}
                    >
                        <CreatUser
                            detail={this.state.detail}
                            onRef={this.onRef}
                        />
                    </Modal>
                }
            </div>
        )
    }
}

//创建角色
class CreatUser extends React.Component {
    formRefUser = React.createRef();

    componentDidMount() {
        this.props.onRef(this)
    }

    handleSubmit = async () => {
        const form = this.formRefUser.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            console.log('成功')
            console.log(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    resetUserFrom=()=>{
        const form = this.formRefUser.current;
        form.resetFields();
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        const detail = this.props.detail

        return (
            <Form ref={this.formRefUser}>
                <FormItem label="登录名"
                          name="loginName"
                          initialValue={detail.loginName}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入登录名'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="登录名"/>
                </FormItem>
                <FormItem label="真实姓名"
                          name="name"
                          initialValue={detail.name}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入真实姓名'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="真实姓名"/>
                </FormItem>
                <FormItem label="联系电话" name="mobile"
                          initialValue={detail.mobile}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入联系电话'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="联系电话"/>
                </FormItem>
                <FormItem label="联系地址" name="address"
                          initialValue={detail.address}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入联系地址'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="联系地址"/>
                </FormItem>
                <FormItem label="电子邮箱" name="email"
                          initialValue={detail.email}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入电子邮箱'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="电子邮箱"/>
                </FormItem>
            </Form>
        )
    }
}

// CreatUser = Form.create()(CreatUser)
