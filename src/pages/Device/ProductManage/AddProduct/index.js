import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Breadcrumb} from "antd";
import {getBreadItem, messageGlobal, updateSelectedItem} from '../../../../utils'
import './index.less'
import SelectProductCategory from "../ExtractionComponent/selectProductCategory";
import device from '../../../../assets/images/device.png'
import gateway from '../../../../assets/images/gateway.png'
import childDevice from '../../../../assets/images/childDevice.png'
import IconFont from "../../../../utils/IconFont";
import {saveProduct, updateOrPublishProduct} from "../../../../api/api";

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item
export default class AddProduct extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {},
        showStandard:true,
        showOption: false,
        showOtherOption: true,
        closeOtherOption: false,
        initIndex:0,
        accessState:false
    }
    onRef = (ref) => {
        this.child = ref
    }

    componentDidMount() {

    }

    showOtherOption = () => {
        this.setState({
            showOtherOption: !this.state.showOtherOption,
            closeOtherOption: !this.state.closeOtherOption,
            showOption: !this.state.showOption,
        })
    }
    closeOtherOption = () => {
        this.setState({
            showOtherOption: !this.state.showOtherOption,
            closeOtherOption: !this.state.closeOtherOption,
            showOption: !this.state.showOption,
        })
    }
    handleSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            this.addProduct(values)
            console.log('成功')
            console.log(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    addProduct = async (values) => {
        values.createBy="1"
        debugger
        saveProduct(values).then(res => {
            debugger
            if(res.status==1){
                messageGlobal('success',res.msg);
                this.props.history.push({
                    'pathname': "/user/device/product/",
                    params: true,
                    from: this.props.location.pathname
                });
            }else{
                messageGlobal('error',res.msg);
            }
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            debugger
        })
    }
    handleCancel = () => {
        this.props.history.push({
            'pathname': "/user/device/product/",
            params: true,
            from: this.props.location.pathname
        });
    }
    selectProductCategory = () => {
        this.child.showDrawer()
    }
    goBackPreviousPage = () => {
        this.props.history.go(-1)
    }
    selectDeviceType = (item,index) => {
        debugger
        this.setState({
            initIndex:index
        })
        this.fromModeRef.current.setFieldsValue({
            nodeType:item.value,
        })
    }
    onChangeTypeRadio = (item) => {
        if(item=='1'){
            this.setState({
                showStandard: true,
            })
        }else{
            this.setState({
                showStandard: false,
            })
        }
    }
    onChangeAccessRadio = (item) => {
        debugger
        if(item=='1'){
            this.setState({
                accessState:true
            });
        }else{
            this.setState({
                accessState:false
            });
        }
    }
    render() {
        const formItemLayout = {
            labelCol: {span: 2},
            wrapperCol: {span: 8}
        }
        const detail = {
            loginName: '',
            name: '',
            type: '',
            address: '',
            email: ''
        }
        const typeList = [{id: '1', label: '标准类别',value:'1'}, {id: '2', label: '自定义类别',value:'2'}];
        const productCategoryList=[];
        const accessList = [{id: '0', label: '设备接入',value:'0'}, {id: '1', label: '平台接入',value:'1'}];
        const nodeList = [{id: '1', label: '设备',value:'1'}, {id: '2', label: '网关',value:'2'}, {id: '3', label: '子设备',value:'3'}];
        const platformList=[{id: '1', label: '软通智慧',value:'1'}, {id: '2', label: '软通动力',value:'2'}]
        const authenMethodList=[{id: '1', label: '秘钥',value:'1'}];
        const safeTypeList=[{id: '1', label: '一机一密',value:'1'},{id: '2', label: '一型一密',value:'2'}];
        const netTypeList = [{id: '1', label: '蜂窝',value:'1'}, {id: '2', label: 'NB-iot',value:'2'}, {id: '3', label: 'lora',value:'3'}];
        const protocolTypeList = [{id: '1', label: 'MQTT',value:'1'}, {id: '2', label: 'CoAP',value:'2'}, {id: '3', label: 'HTTP',value:'3'}];
        const dataTypeList = [{id: '1', label: 'JSON',value:'1'},{id: '2', label: '自定义',value:'2'}];
        const encryptionTypeList = [{id: '1', label: '明文',value:'1'},{id: '2', label: 'SSL',value:'2'}];
        const productVendorList = [{id: '1', label: '软通',value:'1'}];
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
                        "pathName": "add-product",
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
                <div className="product-add-page-title"><IconFont onClick={this.goBackPreviousPage}
                                                                  className="product-info-go-back-list"
                                                                  type='icon-fanhuijiantou'/>创建产品
                </div>
                <div style={{clear: 'both'}}></div>
                <Form ref={this.fromModeRef} style={{width: '1150px', marginBottom: '10vh'}}>
                    <FormItem label="产品名称"
                              name="name"
                              rules={[
                                  {
                                      required: true,
                                      message: '请输入产品名称'
                                  },
                              ]}{...formItemLayout}>
                        <Input type="text" placeholder="请输入产品名称"/>
                    </FormItem>
                    <FormItem label="所属类别" name="type"
                        initialValue={'1'}
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择所属类别'
                                  },
                              ]}{...formItemLayout}>
                        <Radio.Group  onChange={(e) => {
                                this.onChangeTypeRadio(e.target.value);
                        }} >
                            {typeList.map((item) => (
                                <Radio value={item.value} key={item.value}>
                                    {item.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </FormItem>
                    {
                    this.state.showStandard &&
                    <FormItem label=" "
                              colon={false}
                              name="name"
                              rules={[
                                  {
                                      required: false,
                                      message: '请选择标准类别'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择标准类别" onClick={this.selectProductCategory} open={false}>
                            {productCategoryList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
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
                    }
                    <FormItem label="接入方式"
                              name="accessMethod"
                              initialValue={'0'}
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择接入方式'
                                  },
                              ]}{...formItemLayout}>
                        <Radio.Group onChange={(e) => {
                            this.onChangeAccessRadio(e.target.value);
                        }} >
                            {accessList.map((item) => (
                                <Radio value={item.value} key={item.value}>
                                    {item.label}
                                </Radio>
                            ))}
                        </Radio.Group>
                    </FormItem>
                    {this.state.accessState &&
                    <div>
                        <FormItem label="平台标识"
                                  name="platformId"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择平台标识'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择平台标识">
                                {platformList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="访问地址"
                                  name="platformUrl"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入访问地址'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入访问地址"/>
                        </FormItem>
                    </div>
                    }
                    {!this.state.accessState &&
                    <div>
                    <FormItem label="节点类型" name="nodeType"
                              initialValue={'1'}
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择节点类型'
                                  },
                              ]}{...formItemLayout}>
                        {/*<Radio.Group>*/}
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            {nodeList.map((item, index) => (
                                <div className={this.state.initIndex==index?'selected-node-type':'select-node-type'} onClick={()=>this.selectDeviceType(item,index)} key={item.value}>
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
                                    }}>{item.value == '1' ? '设备' : (item.value == '2' ? '网关' : '子设备')}
                                    </div>
                                    {this.state.initIndex==index &&
                                    <div ref={'abc' + index} className='select-device-type'>
                                        <IconFont className="select-device-type-icon" type='icon-duihao'/>
                                    </div>
                                    }
                                </div>

                            ))}
                        </div>
                        {/*</Radio.Group>*/}
                    </FormItem>
                    <FormItem label="认证方式"
                              name="authenMethod"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择认证方式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择认证方式">
                            {authenMethodList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="安全类型"
                              name="safeType"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择安全类型'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择安全类型">
                            {safeTypeList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="连网方式"
                              name="netType"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择连网方式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择连网方式">
                            {netTypeList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="通讯协议"
                              name="protocol"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择通讯协议'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择通讯协议">
                            {protocolTypeList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    </div>
                    }
                    <FormItem label="数据格式"
                              name="dataType"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择数据格式'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择数据格式">
                            {dataTypeList.map((item) => (
                                <Option value={item.value} key={item.value}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <div className={this.state.showOption == true ? 'word-style' : 'word-style-hide'}>
                        <FormItem label="加密方式"
                                  name="encryption"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择加密方式'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择加密方式">
                                {encryptionTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="产品型号"
                                  name="productModel"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入产品型号'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入产品型号"/>
                        </FormItem>
                        <FormItem label="产品厂商"
                                  name="productVendor"
                                  rules={[
                                      {
                                          required: false,
                                          message: '请选择产品厂商'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择产品厂商">
                                {productVendorList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.label}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="产品描述"
                                  name="productDesc"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入产品描述'
                                      },
                                  ]}{...formItemLayout}>
                            <TextArea id='textAreaId' rows={5} maxLength={100} showCount
                                      placeholder="请输入产品描述"></TextArea>
                        </FormItem>
                    </div>
                    {this.state.showOtherOption &&
                    <div onClick={this.showOtherOption} className="product-add-more-info">
                        <IconFont className="product-info-go-back-list" type='icon-zhankaijiantou'/>
                        更多信息
                    </div>
                    }
                    {this.state.closeOtherOption &&
                    <div onClick={this.closeOtherOption} className="product-add-more-info">
                        <IconFont className="product-info-go-back-list" type='icon-shouhuijiantou'/>
                        收起
                    </div>
                    }
                </Form>
                <div className='add-product-option-button'>
                    <div style={{marginLeft: '16px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}
                                style={{marginRight: '10px'}}>提交</Button>
                        <Button type="" onClick={this.handleCancel.bind(this)}>取消</Button>
                    </div>
                </div>
                <SelectProductCategory title='选择产品类别' onRef={this.onRef}></SelectProductCategory>
            </div>
        )
    }
}
