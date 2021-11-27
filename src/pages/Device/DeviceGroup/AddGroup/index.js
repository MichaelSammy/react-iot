import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import './../index.less'
import {addDeviceGroup, updateDeviceGroup} from "../../../../api/api";
import {messageGlobal} from "../../../../utils";

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class AddGroup extends React.Component {
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
            if(this.props.deviceGroupInfo){
                this.updateDeviceGroup(values)
                console.log('编辑');
            }else{
                this.addDeviceGroup(values)
                console.log('新增');
            }
            setTimeout(()=>{
                this.props.requestList();
            },600)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    updateDeviceGroup = async (values) => {
        values.createBy="1"
        values.parentId="0";
        values.parentIds="0";
        values.id=this.props.deviceGroupInfo.id;
        updateDeviceGroup(values).then(res => {
            if(res.status==1){
                messageGlobal('success',res.msg);
                this.onClose()
            }else{
                messageGlobal('error',res.msg);
            }
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
        })
    }
    addDeviceGroup = async (values) => {
        values.createBy="1";
        values.parentId="0";
        values.parentIds="0"
        addDeviceGroup(values).then(res => {
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
        const detail =this.props.deviceGroupInfo||{}
        const nameList = [{id: '0', value: '默认值'}];
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
                        <FormItem label="父组"
                                  name="parentId"
                                  initialValue="0"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择父组'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择父组">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="分组名称"
                                  name="name"
                                  initialValue={detail.name}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入分组名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入分组名称"/>
                        </FormItem>
                        <FormItem label="描述"
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

export default AddGroup
