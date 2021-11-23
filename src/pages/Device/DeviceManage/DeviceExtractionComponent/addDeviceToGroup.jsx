import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import '../index.less'
import {saveDeviceGoGroup} from "../../../../api/api";
import {messageGlobal} from "../../../../utils";
const {Option} = Select
const FormItem = Form.Item

class AddDeviceToGroup extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {},
        visible: false,
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
            this.saveDeviceGoGroup(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    saveDeviceGoGroup = async (values) => {
        values.createBy="1"
        saveDeviceGoGroup(values).then(res => {
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

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    requestList() {

    }

    render() {
        const formItemLayout = {}
        const detail = {
            deviceName: '',
            deviceCname: '',
            productId: '',
            remark: '',
        }
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
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
                        <FormItem label="分组名称"
                                  name="productId"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择分组名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择分组名称">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default AddDeviceToGroup