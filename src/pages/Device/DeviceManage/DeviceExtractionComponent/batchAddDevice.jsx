import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import './../index.less'

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class BatchAddDevice extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {},
        visible: false,
        showDeviceCount: true
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onSubmit = () => {
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

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    onChangeTypeRadio = (item) => {
        if (item == '1') {
            this.setState({
                showDeviceCount: true,
            })
        } else {
            this.setState({
                showDeviceCount: false,
            })
        }
    }

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
        const addTypeList = [{id: '1', label: '自动生成', value: '1'}, {id: '2', label: '批量上传', value: '2'}];
        return (
            <div>
                <Drawer
                    title={this.props.title}
                    width={560}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}>
                                确定
                            </Button>
                            <Button onClick={this.onClose}>
                                取消
                            </Button>

                        </div>
                    }
                >
                    <Form ref={this.fromModeRef} layout="vertical">
                        <FormItem label="产品"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择产品'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择产品">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="添加方式" name="type"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择添加方式'
                                      },
                                  ]}{...formItemLayout}>
                            <Radio.Group onChange={(e) => {
                                this.onChangeTypeRadio(e.target.value);
                            }} defaultValue={'1'}>
                                {addTypeList.map((item) => (
                                    <Radio value={item.value}>
                                        {item.label}
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </FormItem>
                        {this.state.showDeviceCount &&
                        <FormItem label="设备数量"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入设备数量'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入设备数量"/>
                        </FormItem>
                        }
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default BatchAddDevice