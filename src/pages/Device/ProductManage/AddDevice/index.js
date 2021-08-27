import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Breadcrumb} from "antd";
import {getBreadItem, updateSelectedItem} from '../../../../utils'
import './index.less'
import SelectProductCategory from  "../ExtractionComponent/selectProductCategory";
import device from '../../../../assets/images/device.png'
import gateway from '../../../../assets/images/gateway.png'
import childDevice from '../../../../assets/images/childDevice.png'
import IconFont from "../../../../utils/IconFont";
const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item
export default class AddRole extends React.Component {
    formRefUser = React.createRef();
    state = {
        detail: {},
        showOption:false,
        showOtherOpion:true,
        closeOtherOpion:false,
    }
    onRef = (ref) => {
        this.child = ref
    }
    componentDidMount() {

    }

    showOtherOpion = () => {
        this.setState({
            showOtherOpion: !this.state.showOtherOpion,
            closeOtherOpion: !this.state.closeOtherOpion,
            showOption:!this.state.showOption,
        })
    }
    closeOtherOpion= () => {
        this.setState({
            showOtherOpion: !this.state.showOtherOpion,
            closeOtherOpion: !this.state.closeOtherOpion,
            showOption:!this.state.showOption,
        })
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
    goBackProductList= () => {
        this.props.history.go(-1)
    }
    selectDeviceType= (item,index) => {

    }
    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 8}
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
                <div className="product-add-page-title">  <IconFont onClick={this.goBackProductList} className="product-info-go-back-list" type='icon-fanhuijiantou'/>创建产品</div>
                <div style={{clear: 'both'}}></div>
                <Form ref={this.formRefUser} style={{width:'1150px',marginBottom:'10vh'}}>
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
                                      required: true,
                                      message: '请选择节点类型'
                                  },
                              ]}{...formItemLayout}>
                        {/*<Radio.Group>*/}
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {nodeList.map((item, index) => (
                                <div style={{
                                    width: '32%',
                                    height: '80px',
                                    border: '1px solid #2979E7',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    cursor:'pointer'
                                }} onClick={this.selectDeviceType.bind(item)}>
                                    <div style={{
                                        width: '90px',
                                        height: '80px',
                                        float: 'left',
                                        backgroundImage: 'url(' + (item.id == '1' ? device : (item.id == '2' ? gateway : childDevice)) + ')',
                                        backgroundRepeat: 'no-repeat'
                                    }}></div>
                                    <div style={{
                                        textAlign: 'left',
                                        float: 'left',
                                        width: '50px',
                                        lineHeight: '80px'
                                    }}>{item.id == '1' ? '设备' : (item.id == '2' ? '网关' : '子设备')}
                                    </div>
                                    <div ref={'abc'+index} className='select-device-type'>
                                        <IconFont  className="select-device-type-icon" type='icon-duihao'/>
                                    </div>
                                </div>

                            ))}
                        </div>
                        {/*</Radio.Group>*/}
                    </FormItem>
                    <FormItem label="认证方式"
                              name="name"
                              rules={[
                                  {
                                      required: true,
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
                                      required: true,
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
                                      required: true,
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
                                      required: true,
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
                                      required: true,
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
                    <div className={this.state.showOption==true?'word-style':'word-style-hide'}>
                        <FormItem label="加密方式"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
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
                                          required: true,
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
                    </div>
                    {this.state.showOtherOpion&&
                      <div onClick={this.showOtherOpion} className="product-add-more-info">
                        <IconFont  className="product-info-go-back-list" type='icon-zhankaijiantou'/>
                        更多信息
                    </div>
                    }
                    {this.state.closeOtherOpion && <div onClick={this.closeOtherOpion} className="product-add-more-info">
                        <IconFont className="product-info-go-back-list" type='icon-shouhuijiantou'/>
                        收起
                    </div>
                    }
                </Form>
                <div className='add-product-option-button'>
                    <div style={{marginLeft:'16px'}}>
                    <Button  type="primary" onClick={this.handleSubmit.bind(this)}
                            style={{marginRight: '10px'}}>提交</Button>
                    <Button  type="" onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>
                </div>,
                <SelectProductCategory  title='选择产品类别'  onRef={this.onRef}></SelectProductCategory>
            </div>
        )
    }
}
