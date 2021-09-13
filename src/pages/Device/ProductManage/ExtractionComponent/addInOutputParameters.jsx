import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import AddStructureParameters from './addStructureParameters'
import request from "../../../../utils/request";
import './../index.less'

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class AddInOutputParameters extends React.Component {
    fromModeRef = React.createRef();
    state = {
        detail: {},
        visible: false,
        numberDataVisible:true,
        enumDataVisible:false,
        booleanDataVisible:false,
        dateDataVisible:false,
        stringDataVisible:false,
        structDataVisible:false,
        arrayDataVisible:false,

        elementNumberVisible:true,
        elementStringVisible:false,
        elementDateVisible:false,
        elementStructVisible:false,
        title:'',

    }
    addStructureParametersRef= (ref) => {
        this.addStructureParametersChildRef = ref
    }
    showAddStructureParameters=(item)=>{
        switch (item) {
            case '1':
                this.setState({
                    title:'添加参数'
                })
                break;
            case '2':
                this.setState({
                    title:'添加输出参数'
                })
                break;
            case '3':
                this.setState({
                    title:'添加输入参数'
                })
                break;
            default:
        }
        this.addStructureParametersChildRef.showDrawer()
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
            numberDataVisible: true,
            enumDataVisible: false,
            booleanDataVisible: false,
            dateDataVisible: false,
            stringDataVisible: false,
        });
        const form = this.fromModeRef.current;
        form.resetFields();
    };
    changeDataType= (item) => {
        switch (item) {
            case '1':
                this.setState({
                    numberDataVisible: true,
                    enumDataVisible:false,
                    booleanDataVisible:false,
                    dateDataVisible:false,
                    stringDataVisible:false,
                    structDataVisible:false,
                    arrayDataVisible:false,
                });
                break;
            case '2':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:true,
                    booleanDataVisible:false,
                    dateDataVisible:false,
                    stringDataVisible:false,
                    structDataVisible:false,
                    arrayDataVisible:false,
                });
                break;
            case '3':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:false,
                    booleanDataVisible:true,
                    dateDataVisible:false,
                    stringDataVisible:false,
                    structDataVisible:false,
                    arrayDataVisible:false,
                });
                break;
            case '4':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:false,
                    booleanDataVisible:false,
                    dateDataVisible:false,
                    stringDataVisible:true,
                    structDataVisible:false,
                    arrayDataVisible:false,
                });
                break;
            case '5':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:false,
                    booleanDataVisible:false,
                    dateDataVisible:false,
                    stringDataVisible:false,
                    structDataVisible:true,
                    arrayDataVisible:false,
                });
                break;
            case '6':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:false,
                    booleanDataVisible:false,
                    dateDataVisible:true,
                    stringDataVisible:false,
                    structDataVisible:false,
                    arrayDataVisible:false,
                });
                break;
            case '7':
                this.setState({
                    numberDataVisible: false,
                    enumDataVisible:false,
                    booleanDataVisible:false,
                    dateDataVisible:false,
                    stringDataVisible:false,
                    structDataVisible:false,
                    arrayDataVisible:true,
                });
                break;
            default:
        }
    }
    changeElementType= (item) => {
        switch (item) {
            case '1':
                this.setState({
                    elementNumberVisible:true,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:false,
                })
                break;
            case  '4':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:true,
                    elementDateVisible:false,
                    elementStructVisible:false,
                })
                break;
            case '5':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:true,
                })
                break;
            case  '6':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:false,
                    elementDateVisible:true,
                    elementStructVisible:false,
                })
                break;
            default:
        }
    }
    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    requestList() {

    }

    render() {
        const formItemLayout = {}
        const detail = {
            dataType:'',
            functionType:'',
            elementType:'',
            loginName: '',
            name: '',
            mobile: '',
            address: '',
            email: ''
        }
        const dataTypeList=[{id: '1', value: '1',name:'int32(整数型)'}, {id: '2', value: '2',name:'enum(枚举)'}, {id: '3', value: '3',name:'bool(布尔)'}, {id: '4', value: '4',name:'string(字符串)'}, {id: '5', value: '5',name:'struct(结构体)'}, {id: '6', value: '6',name:'date(时间)'}, {id: '7', value: '7',name:'array(数组)'}];
        const unitList=[{id: '1', value: '1',name:'伏特/V'}, {id: '2', value: '2',name:'秒/s'}]
        const elementTypeList=[{id: '1', value: '1',name:'int32(整数型)'},{id: '4', value: '4',name:'string(字符串)'}, {id: '5', value: '5',name:'struct(结构体)'}, {id: '6', value: '6',name:'date(时间)'}];
        return (
            <div>
                 <Drawer
                    title={this.props.title}
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}>
                                添加
                            </Button>
                            <Button onClick={this.onClose}>
                                关闭
                            </Button>

                        </div>
                    }
                >
                    <Form ref={this.fromModeRef} layout="vertical">
                        <FormItem label="参数名称"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入参数名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入参数名称"/>
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
                            <Input type="text" placeholder="请输入标识符"/>
                        </FormItem>
                        <FormItem label="数据类型"
                                  name="dataType"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择数据类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择数据类型" onChange={(value) => {
                                this.changeDataType(value);
                            }} defaultValue={'1'}>
                                {dataTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        {this.state.arrayDataVisible &&
                        <div>
                            <FormItem label="元素类型"
                                      name="elementType"
                                      rules={[
                                          {
                                              required: true,
                                              message: '请选择元素类型'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择元素类型" onChange={(value) => {
                                    this.changeElementType(value);
                                }} defaultValue={'1'}>
                                    {elementTypeList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <FormItem label="元素个数"
                                      name="loginName"
                                      initialValue={detail.loginName}
                                      rules={[
                                          {
                                              required: true,
                                              message: '请输入元素个数'
                                          },
                                      ]}{...formItemLayout}>
                                <Input type="text" placeholder="请输入元素个数"/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.numberDataVisible == true) || (this.state.arrayDataVisible && this.state.elementNumberVisible)) &&
                        <div>
                            <FormItem label="定义取值范围" name="name" rules={[{required: true, message: ' '}]}
                                      style={{marginBottom: 0}}>
                                <FormItem
                                    name="name"
                                    rules={[{required: true, message: '请输入最小值'}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="最小值"/>
                                </FormItem>
                                <FormItem
                                    name="name"
                                    rules={[{required: true, message: '请输入最大值'}]}
                                    style={{display: 'inline-block', width: 'calc(50%)', margin: '0px 0px 0px 8px'}}
                                >
                                    <Input placeholder="最大值"/>
                                </FormItem>
                            </FormItem>
                            <FormItem label="步长"
                                      name="name"
                                      rules={[
                                          {
                                              required: false,
                                              message: '请输入步长'
                                          },
                                      ]}{...formItemLayout}>
                                <Input placeholder="请输入步长"/>
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
                                    {unitList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                        </div>
                        }
                        {
                            this.state.enumDataVisible == true &&
                            <div>
                                <div><span style={{
                                    color: '#ff4d4f',
                                    fontFamily: 'SimSun, sans-serif'
                                }}>*</span><span> 枚举值</span></div>
                                <div style={{display: 'flex', padding: '8px 0px'}}>
                                    <div style={{width: '40%', float: 'left', marginLeft: '10px'}}>参数值</div>
                                    <div style={{width: '55%', float: 'right'}}>参数类型</div>
                                </div>

                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          style={{marginBottom: 0}}>
                                    <FormItem
                                        name="name"
                                        rules={[{required: true, message: '请输入最小值'}]}
                                        style={{display: 'inline-block', width: 'calc(35% - 8px)'}}
                                    >
                                        <Input placeholder="最小值"/>
                                    </FormItem>
                                    <FormItem
                                        name="name"
                                        rules={[{required: true, message: '请输入最大值'}]}
                                        style={{display: 'inline-block', width: 'calc(55%)', margin: '0px 0px 0px 8px'}}
                                    >
                                        <Input placeholder="最大值"/>
                                    </FormItem>
                                    <div style={{
                                        position: 'absolute',
                                        cursor: 'pointer',
                                        marginLeft: '93%',
                                        wordBreak: 'keep-all',
                                        marginTop: '-50px',
                                        color: '#2979E7',
                                    }} onClick={this.deleteTagColumn}>删除
                                    </div>
                                </FormItem>
                                <div style={{marginBottom: '24px', color: '#2979E7', cursor: 'pointer'}}><IconFont
                                    type='icon-jiahao'/>添加枚举项
                                </div>
                            </div>
                        }
                        {
                            this.state.booleanDataVisible == true &&
                            <div>
                                <div style={{padding: '0px 0px 8px'}}><span style={{
                                    color: '#ff4d4f',
                                    fontFamily: 'SimSun, sans-serif'
                                }}>*</span><span> 布尔值</span></div>
                                <div style={{float: 'left', lineHeight: '32px', padding: '0px 10px 0px 10px'}}>0 -</div>
                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  关"/>
                                </FormItem>
                                <div style={{float: 'left', lineHeight: '32px', padding: '0px 10px 0px 10px'}}>1 -</div>
                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  开"/>
                                </FormItem>
                            </div>

                        }
                        {((this.state.dateDataVisible == true) || (this.state.arrayDataVisible == true && this.state.elementDateVisible)) &&
                        <div>
                            <FormItem label="时间格式" name="name" rules={[{required: false, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="String类型的UTC时间戳（毫秒）" disabled={true}/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.stringDataVisible == true) || (this.state.arrayDataVisible == true && this.state.elementStringVisible)) &&
                        <div>
                            <FormItem label="数据长度" name="name" rules={[{required: true, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="" addonAfter="字节"/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.structDataVisible == true) || (this.state.arrayDataVisible == true && this.state.elementStructVisible)) &&
                        <div>
                            <div style={{padding: '0px 0px 8px'}}><span style={{
                                color: '#ff4d4f',
                                fontFamily: 'SimSun, sans-serif'
                            }}>*</span><span> Json对象</span></div>
                            <div style={{marginBottom: '8px', color: '#2979E7', cursor: 'pointer'}}
                                 onClick={this.showAddStructureParameters.bind(this, '1')}><IconFont
                                type='icon-jiahao'/>添加参数
                            </div>
                        </div>
                        }
                    </Form>
                </Drawer>
                <AddStructureParameters onRef={this.addStructureParametersRef} title={this.state.title}></AddStructureParameters>
            </div>
        )
    }
}

export default AddInOutputParameters
