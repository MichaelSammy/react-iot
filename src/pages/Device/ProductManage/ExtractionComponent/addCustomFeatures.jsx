import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import AddInOutputParameters from './addInOutputParameters'
import AddStructureParameters from './addStructureParameters'
import request from "../../../../api/request";
import './../index.less'
import {handleCheckValueLenght, messageGlobal} from "../../../../utils";
import {getProductList, saveProductModel} from "../../../../api/api";

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class AddCustomFeatures extends React.Component {

    fromModeRef = React.createRef();
    addInOutputParametersRef= (ref) => {
        this.addInOutputParametersChildRef = ref
    }
    addStructureParametersRef= (ref) => {
        this.addStructureParametersChildRef = ref
    }
    state = {
        detail: {},
        visible: false,
        attributeType:true,
        eventType:false,
        serviceType:false,

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
    showAddStructureParameters=(item)=>{
        switch (item) {
            case '1':
                this.setState({
                    title:'添加参数'
                })
                this.addStructureParametersChildRef.showDrawer()
                break;
            case '2':
                this.setState({
                    title:'添加输出参数'
                })
                this.addInOutputParametersChildRef.showDrawer()
                break;
            case '3':
                this.setState({
                    title:'添加输入参数'
                })
                this.addInOutputParametersChildRef.showDrawer()
                break;
            default:
        }

    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    filterParamr(values){
        let params=values
        values.productId=this.props.productInfo.id
        values.required=0
        if(values.dataType=='int'){
            values.dataType={
                type:values.dataType,
                specs:{
                    min:values.min,
                    max:values.max,
                    unit:values.unit,
                    step:values.step
                }
            }
        }
        return params;
    }
    onSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            let params=this.filterParamr(values)
            saveProductModel(params).then(res => {
                if (res.status === '1') {
                    messageGlobal('success','添加成功！')

                    this.props.refresFunctionList();
                }
            })
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
    changeFunctionType = (item) => {
        switch(item){
            case '1':
                this.setState({
                    attributeType:true,
                    eventType:false,
                    serviceType:false,
                })
              break;
            case '2':
                this.setState({
                    attributeType:false,
                    eventType:true,
                    serviceType:false,
                })
             break;
            case '3':
                this.setState({
                    attributeType:false,
                    eventType:false,
                    serviceType:true,
                })
              break;
            default:
        }
    }
    changeDataType= (item) => {
       switch (item) {
           case 'int':
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
           case 'enum':
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
           case 'bool':
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
           case 'string':
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
           case 'struct':
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
           case 'date':
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
           case 'array':
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
            case 'int':
                this.setState({
                    elementNumberVisible:true,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:false,
                })
                break;
            case  'string':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:true,
                    elementDateVisible:false,
                    elementStructVisible:false,
                })
                break;
            case 'date':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:true,
                })
                break;
            case  'struct':
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
    changeReadWrite= (item) => {
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
        const functionTypeList = [{id: '1', value: '1',name:'属性类型'}, {id: '2', value: '2',name:'事件类型'}, {id: '3', value: '3',name:'服务类型'}];
        const dataTypeList=[{id: '1', value: 'int',name:'int32(整数型)'}, {id: '2', value: 'enum',name:'enum(枚举)'}, {id: '3', value: 'bool',name:'bool(布尔)'}, {id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}, {id: '7', value: 'array',name:'array(数组)'}];
        const readWriteList=[{id: '1', value: 'rw',name:'读写'}, {id: '2', value: 'r',name:'只读'}];
        const unitList=[{id: '1', value: 'v',name:'伏特/V'}, {id: '2', value: 's',name:'秒/s'}]
        const eventTypeList=[{id: '1', value: '1',name:'信息'}, {id: '2', value: '2',name:'告警'}, {id: '3', value: '3',name:'故障'}];
        const callTypeList= [{id: '1', value: '1',name:'同步'}, {id: '2', value: '2',name:'异步'}]
        const elementTypeList=[{id: '1', value: 'int',name:'int32(整数型)'},{id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}];
        return (
            <div>
                <Drawer
                    title="添加自定义功能点"
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
                                添加
                            </Button>
                            <Button onClick={this.onClose}>
                                关闭
                            </Button>

                        </div>
                    }
                >
                    <Form ref={this.fromModeRef} layout="vertical">
                        <FormItem label="功能类型"
                                  name="fieldType"
                                  initialValue={'1'}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择属性类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择属性类型"  onChange={(value) => {
                                this.changeFunctionType(value);
                            }}>
                                {functionTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <FormItem label="功能名称"
                                  name="name"
                                  initialValue={detail.name}
                                  rules={[
                                      {required: true,label:'功能名称',lenght:20,validator:handleCheckValueLenght},
                                  ]}{...formItemLayout}>
                            <Input   disabled={false} type="text" placeholder="请输入功能名称"/>
                        </FormItem>
                        <FormItem label="标识符"
                                  name="identifier"
                                  initialValue={detail.identifier}
                                  rules={[
                                      {required: true,label:'标识符',lenght:20,validator:handleCheckValueLenght},
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入标识符"/>
                        </FormItem>
                        {this.state.serviceType==true &&
                        <div>
                            <FormItem label="调用方式"
                                      name="name"
                                      rules={[
                                          {
                                              required: true,
                                              message: '请选择调用方式'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择调用方式"  defaultValue={'1'}>
                                    {callTypeList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输入参数</span></div>
                            <div style={{marginBottom:'8px',color:'#2979E7',cursor:'pointer'}} onClick={this.showAddStructureParameters.bind(this,'3')}> <IconFont  type='icon-jiahao'/>添加参数</div>
                            <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输出参数</span></div>
                            <div style={{marginBottom:'8px',color:'#2979E7',cursor:'pointer'}} onClick={this.showAddStructureParameters.bind(this,'2')}> <IconFont  type='icon-jiahao'/>添加参数</div>
                        </div>
                        }
                        {this.state.eventType==true &&
                    <div>
                        <FormItem label="事件类型"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择事件类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择事件类型"  defaultValue={'1'}>
                                {eventTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输出参数</span></div>
                        <div style={{marginBottom:'8px',color:'#2979E7',cursor:'pointer'}} onClick={this.showAddStructureParameters.bind(this,'2')}> <IconFont  type='icon-jiahao'/>添加参数</div>
                    </div>
                    }
                        {
                            this.state.attributeType &&
                       <FormItem label="数据类型"
                                  name="dataType"
                                 initialValue={'int'}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择数据类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择数据类型"   onChange={(value) => {
                                this.changeDataType(value);
                            }}>
                                {dataTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                      </FormItem>
                        }
                        {  this.state.arrayDataVisible && this.state.attributeType &&
                            <div>
                                <FormItem label="元素类型"
                                          name="elementType"
                                          rules={[
                                              {
                                                  required: true,
                                                  message: '请选择元素类型'
                                              },
                                          ]}{...formItemLayout}>
                                    <Select placeholder="请选择元素类型"   onChange={(value) => {
                                        this.changeElementType(value);
                                    }} defaultValue={'int'}>
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
                        {((this.state.numberDataVisible==true && this.state.attributeType)||(this.state.arrayDataVisible&&this.state.attributeType&&this.state.elementNumberVisible)) &&
                            <div>
                            <FormItem label="定义取值范围" name="name" rules={[{required: true, message: ' '}]}
                                      style={{marginBottom: 0}}>
                                <FormItem
                                    name="min"
                                    rules={[{required: true, message: '请输入最小值'}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="最小值"/>
                                </FormItem>
                                <FormItem
                                    name="max"
                                    rules={[{required: true, message: '请输入最大值'}]}
                                    style={{display: 'inline-block', width: 'calc(50%)', margin: '0px 0px 0px 8px'}}
                                >
                                    <Input placeholder="最大值"/>
                                </FormItem>
                            </FormItem>
                            <FormItem label="步长"
                                      name="step"
                                      rules={[
                                          {
                                              required: false,
                                              message: '请输入步长'
                                          },
                                      ]}{...formItemLayout}>
                                <Input placeholder="请输入步长"/>
                            </FormItem>
                            <FormItem label="单位"
                                      name="unit"
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
                            this.state.enumDataVisible==true  && this.state.attributeType &&
                            <div>
                               <div><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 枚举值</span></div>
                                <div style={{display:'flex',padding:'8px 0px'}}><div style={{width:'40%',float:'left',marginLeft:'10px'}}>参数值</div><div style={{width:'55%',float:'right'}}>参数类型</div></div>

                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          style={{marginBottom: 0}}>
                                    <FormItem
                                        name="min"
                                        rules={[{required: true, message: '请输入最小值'}]}
                                        style={{display: 'inline-block', width: 'calc(35% - 8px)'}}
                                    >
                                        <Input placeholder="最小值"/>
                                    </FormItem>
                                    <FormItem
                                        name="max"
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
                                <div style={{marginBottom:'24px',color:'#2979E7',cursor:'pointer'}}> <IconFont  type='icon-jiahao'/>添加枚举项</div>
                            </div>
                        }
                        {
                            this.state.booleanDataVisible==true  && this.state.attributeType &&
                            <div>
                                <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 布尔值</span></div>
                                <div style={{float: 'left', lineHeight: '32px',padding:'0px 10px 0px 10px'}}>0 -</div>
                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                   <Input placeholder="如  关"/>
                                </FormItem>
                                <div style={{float: 'left', lineHeight: '32px',padding:'0px 10px 0px 10px'}}>1 -</div>
                                <FormItem label="" name="name" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  开"/>
                                </FormItem>
                            </div>

                         }
                        {((this.state.dateDataVisible==true  && this.state.attributeType)||(this.state.arrayDataVisible==true  && this.state.attributeType&&this.state.elementDateVisible)) &&
                            <div>
                                <FormItem label="时间格式" name="name" rules={[{required: false, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="String类型的UTC时间戳（毫秒）" disabled={true}/>
                                </FormItem>
                            </div>
                        }
                        {((this.state.stringDataVisible==true  && this.state.attributeType) ||(this.state.arrayDataVisible==true  && this.state.attributeType&&this.state.elementStringVisible))&&
                        <div>
                            <FormItem label="数据长度" name="name" rules={[{required: true, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="" addonAfter="字节"/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.structDataVisible==true && this.state.attributeType) ||(this.state.arrayDataVisible==true && this.state.attributeType &&this.state.elementStructVisible)) &&
                        <div>
                            <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> Json对象</span></div>
                            <div style={{marginBottom:'8px',color:'#2979E7',cursor:'pointer'}} onClick={this.showAddStructureParameters.bind(this,'1')}> <IconFont  type='icon-jiahao'/>添加参数</div>
                        </div>
                        }
                        {
                            this.state.attributeType &&
                            <FormItem label="读写类型"
                                      name="accessMode"
                                      initialValue={'rw'}
                                      rules={[
                                          {
                                              required: true,
                                              message: '请选择读写类型'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择读写类型" onChange={(value) => {
                                    this.changeReadWrite(value)
                                }} defaultValue={'rw'}>
                                    {readWriteList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                        }
                        <FormItem label="描述"
                                  name="desc"
                                  initialValue={detail.desc}
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
                </Drawer>
                <AddInOutputParameters  onRef={this.addInOutputParametersRef} title={this.state.title}></AddInOutputParameters>
                <AddStructureParameters onRef={this.addStructureParametersRef} title={this.state.title}></AddStructureParameters>
            </div>
        )
    }
}

export default AddCustomFeatures
