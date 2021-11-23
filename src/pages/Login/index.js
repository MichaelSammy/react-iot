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
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 16}
        }
        if(this.props.state.authed ||localStorage.getItem('authed')){
            return (
                <Redirect to="/user" />
            )
        }
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="wrapper_login">
                <div className="gif-css">
                    <div id="wrapper">
                        <div className="zoombie"></div>
                    </div>
                </div>
                <Form onFinish={this.handleSubmit} ref={this.formRef} name="control-ref" className="login-form login-form-login">
                    <div style={{width:"262px"}}>
                    <div className="login-title">欢迎登录</div>
                    <Form.Item
                        name="username"
                        initialValue="admin"
                        rules={[
                            {
                                required: true,
                                message: '请输入登录账号'
                            },
                        ]}>

                            <Input
                                placeholder="管理员账号/手机号"
                            />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        initialValue="1"
                        rules={[
                            {
                                required: true,
                                message: '请输入密码'
                            },
                        ]}>

                            <Input
                                type="password"
                                placeholder="密码"
                            />
                    </Form.Item>
                    <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: false,
                                    message: '请输入验证码'
                                },
                            ]}>
                        <Input.Group compact>
                            <Input
                                style={{ width: 'calc(100% - 95px)' }}
                                type="password"
                                placeholder="验证码"
                            />
                        <div className="get-code-button">获取验证码</div>
                        </Input.Group>
                        </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit"  className="login-form-button">
                           登录
                        </Button>
                    </Form.Item>
                    </div>
                </Form>
            </div>
        );
    }
}

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default NormalLoginForm
