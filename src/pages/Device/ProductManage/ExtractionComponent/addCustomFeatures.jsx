import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio,Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../utils/request";
import './../index.less'
const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class AddCustomFeatures extends React.Component {
    formRefUser = React.createRef();
    state = {
        detail: {}
    }
    showDrawer = () => {
        debugger
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    state = {
        visible: false,
    }
    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    requestList() {

    }

    render() {
        const formItemLayout = {

        }
        const detail = {
            loginName: '',
            name: '',
            mobile: '',
            address: '',
            email: ''
        }
        const typeList = [{id: '1', value: '标准类别'}, {id: '2', value: '自定义类别'}];
        const accessList = [{id: '1', value: '设备接入'}, {id: '2', value: '平台接入'}];
        const nodeList = [{id: '1', value: '设备'}, {id: '2', value: '网关'}, {id: '3', value: '子设备'}];
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
        return (
            <div>
                <Drawer
                    title="添加自定义功能点"
                    width={560}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div className="product-drawer-close">
                            <div onClick={this.onClose} type="primary">
                                关闭
                            </div>
                        </div>
                    }
                >
                    <Form ref={this.formRefUser} layout="vertical">
                        <FormItem label="功能类型"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择属性类型s'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择属性类型">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="功能名称"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入功能名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="1-32位，中文，英文，数字，特殊字符"/>
                        </FormItem>
                        <FormItem label="标识符"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入标识符'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="1-32位，中文，英文，数字，特殊字符"/>
                        </FormItem>
                        <FormItem label="数据类型"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择数据类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择数据类型">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="定义取值范围"  name="name"  rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                            <FormItem
                                name="name"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                            >
                                <Input placeholder="最小值" />
                            </FormItem>
                            <FormItem
                                name="name"
                                rules={[{ required: true }]}
                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                            >
                                <Input placeholder="最大值" />
                            </FormItem>
                        </FormItem>
                        <FormItem label="步长"
                                  name="name"
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入数据精度'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请输入数据精度">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="单位"
                                  name="name"
                                  rules={[
                                      {
                                          required: false,
                                          message: '请选择单位'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择单位">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="读写类型"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择读写类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择读写类型">
                                {nameList.map((item) => (
                                    <Option value={item.id} key={item.id}>
                                        {item.value}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="描述"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入描述信息'
                                      },
                                  ]}{...formItemLayout}>
                            <TextArea id='textAreaId' rows={5} maxLength={100} showCount placeholder="请输入描述信息"></TextArea>
                        </FormItem>
                    </Form>
                </Drawer>
            </div>
        )
    }
}

export default AddCustomFeatures
