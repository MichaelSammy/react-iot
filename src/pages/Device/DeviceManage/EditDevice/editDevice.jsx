import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import '../index.less'
import {addDevice, updateDevice} from "../../../../api/api";
import {messageGlobal} from "../../../../utils";

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
            values.id=this.props.deviceInfo.id
            this.updateDevice(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    updateDevice = async (values) => {
        values.createBy="1"
        updateDevice(values).then(res => {
            if(res.status==1){
                messageGlobal('success',res.msg);
                this.onClose()
            }else{
                messageGlobal('error',res.msg);
            }
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
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
        const detail = this.props.deviceInfo
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
                                  name="deviceName"
                                  initialValue={detail.deviceName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入设备名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入设备名称"/>
                        </FormItem>
                        <FormItem label="备注名称"
                                  name="deviceCname"
                                  initialValue={detail.deviceCname}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入备注名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入备注名称"/>
                        </FormItem>
                        <FormItem label="设备描述"
                                  name="remark"
                                  initialValue={detail.remark}
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

