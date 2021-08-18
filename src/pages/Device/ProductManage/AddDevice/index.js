import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Breadcrumb} from "antd";
import {getBreadItem, updateSelectedItem} from '../../../../utils'
import './index.less'
import SelectProductCategory from  "../ExtractionComponent/selectProductCategory";
const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item
export default class AddRole extends React.Component {
    formRefUser = React.createRef();
    state = {
        detail: {}
    }
    onRef = (ref) => {
        this.child = ref
    }
    componentDidMount() {

    }

    showOtherOpion = () => {
        alert('11')
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
    handleCancel = () => {
        this.props.history.push({
            'pathname': "/user/device/product/",
            params: true,
            from: this.props.location.pathname
        });
    }
    selectProductCategory=()=>{
        this.child.showDrawer()
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 10}
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
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/product",
                        "pathName": "product-manage",
                        "name": "产品管理",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    },
                    {
                        "path": "/user/device/product/add",
                        "pathName": "add-device",
                        "name": "创建产品",
                        "icon": "iconxiangmu",
                        "show": false,
                        "children": null,
                        "redirect": null
                    },

                ],
                "redirect": "/user/device/product"
            }
        ]
        return (
            <div>
                <Breadcrumb style={{margin: '16px 16px'}}>
                    {
                        getBreadItem(breadList)
                    }
                </Breadcrumb>
                <Form ref={this.formRefUser}>
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
                    <FormItem label="所属类别" name="mobile"
                        // initialValue={detail.mobile}
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择所属类别'
                                  },
                              ]}{...formItemLayout}>
                        <Radio.Group>
                            {typeList.map((item) => (
                                <Radio value={item.id}>
                                    {item.value}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </FormItem>
                    <FormItem label=" "
                              colon={false}
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择标准品类'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择标准品类" onClick={this.selectProductCategory}>
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                        <div style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            marginLeft: '103%',
                            wordBreak: 'keep-all',
                            marginTop: '-26px',
                            color: '#999999'
                        }}>查看功能
                        </div>
                    </FormItem>
                    <FormItem label="接入方式" name="mobile"
                        // initialValue={detail.mobile}
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择接入方式'
                                  },
                              ]}{...formItemLayout}>
                        <Radio.Group>
                            {accessList.map((item) => (
                                <Radio value={item.id}>
                                    {item.value}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </FormItem>
                    <FormItem label="节点类型" name="mobile"
                        // initialValue={detail.mobile}
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择节点类型'
                                  },
                              ]}{...formItemLayout}>
                        {/*<Radio.Group>*/}
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {nodeList.map((item) => (
                                <div style={{
                                    width: '145px',
                                    height: '80px',
                                    background: '#FFFFFF',
                                    border: '1px solid #D8D8D8',
                                    float: 'left'
                                }}></div>
                            ))}
                        </div>
                        {/*</Radio.Group>*/}
                    </FormItem>
                    <FormItem label="认证方式"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择认证方式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择认证方式">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="安全类型"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择安全类型'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择安全类型">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="连网方式"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择连网方式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择连网方式">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="通讯协议"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择通讯协议'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择通讯协议">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="数据格式"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择数据格式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择数据格式">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="加密方式"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择加密方式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择加密方式">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="产品型号"
                              name="loginName"
                              initialValue={detail.loginName}
                              rules={[
                                  {
                                      required: false,
                                      message: '请输入产品型号'
                                  },
                              ]}{...formItemLayout}>
                        <Input type="text" placeholder="请输入产品型号"/>
                    </FormItem>
                    <FormItem label="产品厂商"
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择产品厂商'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择产品厂商">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
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
                    <div onClick={this.showOtherOpion}
                         style={{paddingLeft: '16px', color: '#2979E7', cursor: 'pointer'}}>更多信息
                    </div>
                    <div onClick={this.showOtherOpion}
                         style={{paddingLeft: '16px', color: '#2979E7', cursor: 'pointer'}}>收起
                    </div>
                </Form>
                <div className='option-button'>
                    <Button size="small" type="primary" onClick={this.handleSubmit.bind(this)}
                            style={{marginRight: '10px'}}>提交</Button>
                    <Button size="small" type="primary" onClick={this.handleCancel.bind(this)}>取消</Button>
                </div>,
                <SelectProductCategory  title='选择产品类别'  onRef={this.onRef}></SelectProductCategory>
            </div>
        )
    }
}
