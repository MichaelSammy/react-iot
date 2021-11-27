import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import '../index.less'
import {addDevice, getProductDropDownList, saveProduct} from "../../../../api/api";
import {messageGlobal} from "../../../../utils";

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class AddDevice extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {},
        visible: false,
        productList:[],
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
            this.addDevice(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    addDevice = async (values) => {
        values.createBy="1"
        addDevice(values).then(res => {
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
        this.getProductList();
        this.requestList()
    }

    requestList() {

    }
    getProductList(){
        getProductDropDownList().then(res => {
            if (res.status === '1' && res.result != null) {
                res.result.reverse();
                this.setState({
                    productList:res.result
                })
            }
        })
    }
    render() {
        const formItemLayout = {}
        const detail = {
            deviceName: '',
            deviceCname: '',
            productId: '',
            remark: '',
        }

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
                        <FormItem label="所属产品"
                                  name="productId"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择所属产品'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择所属产品">
                                {this.state.productList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="设备描述"
                                  name="remark"
                                  initialValue={detail.remark}
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入设备描述'
                                      },
                                  ]}{...formItemLayout}>
                            <TextArea id='textAreaId' rows={5} maxLength={100} showCount
                                      placeholder="请输入设备描述"></TextArea>
                        </FormItem>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default AddDevice