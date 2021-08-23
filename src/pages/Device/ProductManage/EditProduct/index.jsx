import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";

const {TextArea} = Input
const FormItem = Form.Item

class EditProduct extends React.Component {
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
    resetUserFrom = () => {
        const form = this.formRefUser.current;
        form.resetFields();
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 16}
        }
        const detail = this.props.detail

        return (
            <Form ref={this.formRefUser} layout="vertical">
                <FormItem label="产品名称"
                          name="loginName"
                          initialValue={detail.loginName}
                          rules={[
                              {
                                  required: true,
                                  message: '请输入产品名称'
                              },
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="请输入产品名称"/>
                </FormItem>
                <FormItem label="产品描述"
                          name="loginName"
                          initialValue={detail.loginName}
                          rules={[
                              {
                                  required: false,
                                  message: '请输入产品描述'
                              },
                          ]}{...formItemLayout}>
                    <TextArea id='textAreaId' rows={5} maxLength={100} showCount placeholder="请输入产品描述"></TextArea>
                </FormItem>
            </Form>
        )
    }
}

export default EditProduct;
