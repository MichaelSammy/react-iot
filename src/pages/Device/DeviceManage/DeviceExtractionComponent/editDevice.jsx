import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import './../index.less'

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

export  default class EditDevice extends React.Component {
    fromModeRef = React.createRef();
    state = {
        visible: false,
        detail: {}
    }

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            console.log('成功')
            console.log(values)
            this.onClose()
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
        const form = this.fromModeRef.current;
        form.resetFields();
    };

    requestList() {

    }

    render() {
        const formItemLayout = {}
        const detail = {
            loginName: '',
            name: '',
            mobile: '',
            address: '',
            email: ''
        }
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onCancel={this.onClose}
                    onOk={this.onSubmit}
                    centered
                    footer={[
                        <Button key="submit" type="primary" onClick={this.onSubmit}>确定</Button>,
                        <Button key="back" onClick={this.onClose}>取消</Button>
                    ]}
                >
                    <Form ref={this.fromModeRef} layout="vertical">
                        <FormItem label="设备名称"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入设备名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入设备名称"/>
                        </FormItem>
                        <FormItem label="设备描述"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入描述信息'
                                      },
                                  ]}{...formItemLayout}>
                            <TextArea id='textAreaId' rows={5} maxLength={100} showCount
                                      placeholder="请输入描述信息"></TextArea>
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

