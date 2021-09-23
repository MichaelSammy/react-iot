import { Form, Icon, Input, Button } from 'antd'
import React from 'react'
import { Redirect } from 'react-router-dom'
import connect from '../../utils/connect'
import './index.less'
import {login} from "../../api/api";
@connect
class NormalLoginForm extends React.Component {
    formRef = React.createRef();
    handleSubmit = (values) => {
        // this.formRef
        const _this = this
        _this.authChange(values)
    }


    authChange =  (values)=>{
        const { dispatch, authChangeAction } = this.props
        login(values).then(res =>{
            const action =  authChangeAction(res.data.token)
            dispatch(action)
        })
    }

    render() {
        if(this.props.state.authed ||localStorage.getItem('authed')){
            return (
                <Redirect to="/user" />
            )
        }
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="flex_center wrapper_login">
                <Form onFinish={this.handleSubmit} ref={this.formRef} name="control-ref" className="login-form login-form-login">
                    <div className="login-title">用户管理系统</div>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: '请输入登录账号'
                            },
                        ]}>

                            <Input
                                placeholder="请输入登录账号"
                            />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            },
                        ]}>

                            <Input
                                type="password"
                                placeholder="请输入密码"
                            />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"  className="login-form-button">
                           登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="loginTip">默认账号：admin，密码：1</div>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default NormalLoginForm
