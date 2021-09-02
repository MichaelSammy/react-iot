import React from "react";
import {Card, Modal, Form, Input, Button} from "antd";
import BaseForm from '../../../../../common/BaseForm'
import Etable from "../../../../../common/Etable";
import {updateSelectedItem} from '../../../../../utils'
import request from '../../../../../utils/request'
import './index.less'

const FormItem = Form.Item
export default class AddRole extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {}
    }

    componentDidMount() {

    }

    handleSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            console.log('成功')
            console.log(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    handleCancel=()=>{
        this.props.history.push({'pathname':"/user/permission/role",params:true,from: this.props.location.pathname});
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        const detail = {
            loginName: '',
            name: '',
            mobile: '',
            address: '',
            email: ''
        }
        return (
            <div>
                {/*<Card>*/}
                <Form ref={this.fromModeRef}>
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
                <div className='option-button'>
                    <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}
                            style={{marginRight: '10px'}}>提交</Button>
                    <Button size="small" type="primary" onClick={this.handleCancel.bind(this)}>取消</Button>
                </div>
                {/*</Card>*/}
            </div>
        )
    }
}
