import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import AddStructureParameters from './addStructureParameters'
import './../index.less'
import {guid} from "../../../../utils";

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
        childrenParamsList:[],
        enumList:[{uuid:guid(),value:'',remark:''}],
        childrenAttribute:[],
        inPutChildrenAttribute:[],
        editIndex:'',
    }
    addStructureParametersRef= (ref) => {
        this.addStructureParametersChildRef = ref
    }
    showAddStructureParameters=()=>{
        this.addStructureParametersChildRef.showDrawer()
    }
    showDrawer = (params,index,type,state) => {
        setTimeout(()=>{
            if(params){
                this.changeDataType(params.dataType.type)
                this.fromModeRef.current.setFieldsValue({
                    dataType:params.dataType.type,
                    name:params.name,
                    identifier:params.identifier,
                    remark:params.remark,
                })
                if(params.dataType.type=='int'||params.dataType.type=='float'||params.dataType.type=='double'){
                    this.fromModeRef.current.setFieldsValue({
                        dataType:params.dataType.type,
                        max:params.dataType.specs.max,
                        min:params.dataType.specs.min,
                        step:params.dataType.specs.step,
                        unit:params.dataType.specs.unit,
                        accessMode:params.accessMode
                    })
                }
                if(params.dataType.type==' enum') {
                    this.setState({
                        enumList: params.dataType.specs
                    })
                }
                if(params.dataType.type=='struct'){
                    this.setState({
                        childrenParamsList:params.dataType.specs
                    })
                    this.addStructureParametersChildRef.initData(params.dataType.specs)
                }
                if(params.dataType.type=='array'){
                    this.setState({
                        childrenParamsList:params.dataType.specs.item.specs
                    })
                    this.fromModeRef.current.setFieldsValue({
                        elementType:params.dataType.specs.item.type,
                        elementSize:params.dataType.specs.size
                    })
                    this.addStructureParametersChildRef.initData(params.dataType.specs.item.specs)
                    this.changeElementType(params.dataType.specs.item.type)
                }
                if(params.dataType.type=='bool'){
                    this.fromModeRef.current.setFieldsValue({
                        zero:params.dataType.specs.zero,
                        one:params.dataType.specs.one,
                    })
                }
                if(params.dataType.type=='string'){
                    this.fromModeRefs.current.setFieldsValue({
                        length:params.dataType.specs.length
                    })
                }
                if(params.dataType.type=='date'){
                    this.fromModeRefs.current.setFieldsValue({
                        date:params.dataType.specs.date
                    })
                }
            }
        },100)
        this.setState({
            visible: true,
            isEdit:state,
            showButton:state!=undefined?state:true,
            editIndex:index!=undefined?index:'',
            paramsType:type!=undefined?type:"",
        });
        if('out_put_params'==type){
            this.setState({
                drawerTitle:state==false?'查看输出参数':(state==true?'编辑输出参数':'添加输出参数'),
            })
        }else if("in_put_params"==type){
            this.setState({
                drawerTitle:state==false?'查看输入参数':(state==true?'编辑输入参数':'添加输入参数'),
            })
        }
    };
    onSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {
             let params=this.filterParams(values)
            if('in_put_params'==this.state.paramsType){
                let temp=this.state.inPutChildrenAttribute;
                if(this.state.editIndex!==''){
                    temp[this.state.editIndex]= params
                }else{
                    temp.push(params)
                }
                this.setState({
                    inPutChildrenAttribute:temp
                })
                this.props.refresChildrenParams(this.state.inPutChildrenAttribute,this.state.paramsType)
            }else if("out_put_params"==this.state.paramsType){
                let temp=this.state.childrenAttribute;
                if(this.state.editIndex!==''){
                    temp[this.state.editIndex]= params
                }else{
                    temp.push(params)
                }
                this.setState({
                    childrenAttribute:temp
                })
                this.props.refresChildrenParams(this.state.childrenAttribute,this.state.paramsType)
            }else{
                let temp=this.state.childrenAttribute;
                if(this.state.editIndex!==''){
                    temp[this.state.editIndex]= params
                }else{
                    temp.push(params)
                }
                this.setState({
                    childrenAttribute:temp
                })
                this.props.refresChildrenParams(this.state.childrenAttribute,this.state.paramsType)
            }
            this.addStructureParametersChildRef.resetData()
            this.resetData();
            console.log('成功')
            console.log(values)
            this.onClose()
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    filterParams(values){
        let params=values
        params.type=values.dataType
        if(values.dataType=='int'||values.dataType=='float'||values.dataType=='double'){
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
        if (values.dataType == 'enum') {
            values.dataType = {
                type: values.dataType,
                specs: this.state.enumList
            }
        }
        if (values.dataType == 'bool') {
            values.dataType = {
                type:values.dataType,
                specs:{
                    zero: values.zero,
                    one: values.one
                },
            }
        }
        if (values.dataType == 'struct') {
            values.dataType = {
                type:values.dataType,
                specs:this.state.childrenParamsList,
            }
        }
        if(values.dataType == 'string'){
            values.dataType = {
                type:values.dataType,
                specs:{
                    length:values.length,
                    remark:values.remark,
                }
            }
        }
        if(values.dataType == 'date'){
            values.dataType = {
                type:values.dataType,
                specs:{
                    data:'',
                }
            }
        }
        if(values.dataType == 'array'){
            if(values.elementType=='int'){
                values.dataType = {
                    type:values.dataType,
                    specs:{
                        size:values.elementSize,
                        item:{
                            type:values.elementType,
                            specs:{
                                min:values.min,
                                max:values.max,
                                unit:values.unit,
                                step:values.step
                            }
                        },
                    }
                }
            }
            if(values.elementType=='date'){
                values.dataType = {
                    type:values.dataType,
                    specs:{
                        size:values.elementSize,
                        item:{
                            type:values.elementType,
                            specs:{
                                data:'',
                            }
                        },
                    }
                }
            }
            if(values.elementType=='string'){
                values.dataType = {
                    type:values.dataType,
                    specs:{
                        size:values.elementSize,
                        item:{
                            type:values.elementType,
                            specs:{
                                length:values.length,
                                remark:values.remark,
                            }
                        },
                    }
                }
            }
            if(values.elementType=='struct'){
                values.dataType = {
                    type:values.dataType,
                    specs:{
                        size:values.elementSize,
                        item:{
                            type:values.elementType,
                            specs:this.state.childrenParamsList,
                        },
                    }
                }
            }
        }
        return params;
    }
    onClose = () => {
        this.setState({
            visible: false,
            numberDataVisible: true,
            enumDataVisible: false,
            booleanDataVisible: false,
            dateDataVisible: false,
            stringDataVisible: false,
            arrayDataVisible:false,
            structDataVisible:false,
        });
        const form = this.fromModeRef.current;
        form.resetFields();
    };
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
            case 'struct':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:true,
                })
                break;
            case  'date':
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
    addEnum=()=>{
        const enumList=this.state.enumList;
        enumList[this.state.enumList.length]={uuid:guid(),value:'',remark:''};
        this.setState({enumList})
    }
    onChange(type,index,e){
        let enumList=this.state.enumList;
        if(type=='value'){
            enumList[index]={uuid:enumList[index].uuid,value:e.target.value,remark:enumList[index].remark};
        }else{
            enumList[index]={uuid:enumList[index].uuid,value:enumList[index].value,remark:e.target.value};
        }
        this.setState({ enumList })
    }
    deleteTagColumn=(item,index)=>{
        const enumList=[];
        this.state.enumList.map((item1,index1)=>{
            if(index1!=index){
                enumList.push(item1)
            }
        })
        this.setState({
            enumList
        })
    }
    requestList() {

    }
    resetData=()=>{
        this.setState({
            childrenParamsList:[]
        })
    }
    setChildrenParameters=(params,type)=>{
        if("in_put_params"==type){
            this.setState({
                inPutChildrenAttribute:params
            })
        }else if('out_put_params'==type){
            this.setState({
                childrenAttribute:params
            })
        }else{
            this.setState({
                childrenAttribute:params
            })
        }
    }
    refresChildrenParams=(childrenParamsList)=>{
        this.setState({
            childrenParamsList
        })
    }
    editChildrenParams=(item,index,state)=>{
        this.addStructureParametersChildRef.showDrawer(item,index,state)
    }
    deleteChildrenParams=(item,index)=>{
        const childrenParamsList=[];
        this.state.childrenParamsList.map((item1,index1)=>{
            if(index1!=index){
                childrenParamsList.push(item1)
            }
        })
        this.setState({
            childrenParamsList
        })
        this.addStructureParametersChildRef.setChildrenParameters(childrenParamsList);
    }
    render() {
        const formItemLayout = {}
        const dataTypeList=[{id: '1', value: 'int',name:'int32(整数型)'}, {id: '2', value: 'enum',name:'enum(枚举)'}, {id: '3', value: 'bool',name:'bool(布尔)'}, {id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}, {id: '7', value: 'array',name:'array(数组)'}];
        const unitList=[{id: '1', value: '1',name:'伏特/V'}, {id: '2', value: '2',name:'秒/s'}]
        const elementTypeList=[{id: '1', value: 'int',name:'int32(整数型)'},{id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}];
        return (
            <div>
                {this.state.visible == true && <Drawer
                    title={this.state.drawerTitle}
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div
                            style={{textAlign: 'right', }}>
                            {this.state.showButton&&   <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}> 添加</Button>}
                            <Button onClick={this.onClose}>关闭</Button>
                        </div>
                    }
                >
                    <Form ref={this.fromModeRef} layout="vertical">
                        <FormItem label="参数名称"
                                  name="name"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入参数名称'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入参数名称" disabled={this.state.isEdit==false?'disabled':''}/>
                        </FormItem>
                        <FormItem label="标识符"
                                  name="identifier"
                                  rules={[
                                      {
                                          required: true,
                                          message: '请输入标识符'
                                      },
                                  ]}{...formItemLayout}>
                            <Input type="text" placeholder="请输入标识符" disabled={this.state.isEdit==false?'disabled':''}/>
                        </FormItem>
                        <FormItem label="数据类型"
                                  name="dataType"
                                  initialValue={'int'}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择数据类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择数据类型" onChange={(value) => {
                                this.changeDataType(value);
                            }} disabled={this.state.isEdit==false?'disabled':''}>
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
                                      initialValue={'int'}
                                      rules={[
                                          {
                                              required: true,
                                              message: '请选择元素类型'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择元素类型" onChange={(value) => {
                                    this.changeElementType(value);
                                }} disabled={this.state.isEdit==false?'disabled':''}>
                                    {elementTypeList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <FormItem label="元素个数"
                                      name="elementSize"
                                      rules={[
                                          {
                                              required: true,
                                              message: '请输入元素个数'
                                          },
                                      ]}{...formItemLayout}>
                                <Input type="text" placeholder="请输入元素个数" disabled={this.state.isEdit==false?'disabled':''}/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.numberDataVisible == true)) &&
                        <div>
                            <FormItem label="定义取值范围" name="name" rules={[{required: true, message: ' '}]}
                                      style={{marginBottom: 0}}>
                                <FormItem
                                    name="min"
                                    rules={[{required: true, message: '请输入最小值'}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="最小值" disabled={this.state.isEdit==false?'disabled':''}/>
                                </FormItem>
                                <FormItem
                                    name="max"
                                    rules={[{required: true, message: '请输入最大值'}]}
                                    style={{display: 'inline-block', width: 'calc(50%)', margin: '0px 0px 0px 8px'}}
                                >
                                    <Input placeholder="最大值" disabled={this.state.isEdit==false?'disabled':''}/>
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
                                <Input placeholder="请输入步长" disabled={this.state.isEdit==false?'disabled':''}/>
                            </FormItem>
                            <FormItem label="单位"
                                      name="unit"
                                      rules={[
                                          {
                                              required: false,
                                              message: '请选择单位'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择单位" disabled={this.state.isEdit==false?'disabled':''}>
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
                                <div><span style={{ color: '#ff4d4f',fontFamily: 'SimSun, sans-serif'
                                }}>*</span><span> 枚举值</span></div>
                                <div style={{display: 'flex', padding: '8px 0px'}}>
                                    <div style={{width: '40%', float: 'left', marginLeft: '10px'}}>参数值</div>
                                    <div style={{width: '55%', float: 'right'}}>参数类型</div>
                                </div>
                                {this.state.enumList.map((item, index) => {
                                    return <FormItem label="" rules={[{required: true, message: ' '}]}
                                                     style={{marginBottom: 0}}>
                                        <FormItem
                                            name={'value' + item.uuid}
                                            rules={[{required: true, message: '请输入最小值'}]}
                                            initialValue={item.value}
                                            style={{display: 'inline-block', width: 'calc(35% - 8px)'}}
                                        >
                                            <Input placeholder="最小值"
                                                   onChange={this.onChange.bind(this, 'value', index)} disabled={this.state.isEdit==false?'disabled':''}/>
                                        </FormItem>
                                        <FormItem
                                            name={'remark' + item.uuid}
                                            rules={[{required: true, message: '请输入最大值'}]}
                                            initialValue={item.remark}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(55%)',
                                                margin: '0px 0px 0px 8px'
                                            }}
                                        >
                                            <Input placeholder="最大值"
                                                   onChange={this.onChange.bind(this, 'remark', index)} disabled={this.state.isEdit==false?'disabled':''}/>
                                        </FormItem>
                                        {index > 0 &&
                                        <div style={{
                                            position: 'absolute',
                                            cursor: 'pointer',
                                            marginLeft: '93%',
                                            wordBreak: 'keep-all',
                                            marginTop: '-50px',
                                            color: '#2979E7',
                                        }} onClick={() => this.deleteTagColumn(item, index)}>删除
                                        </div>
                                        }
                                    </FormItem>
                                })
                                }
                                <div style={{marginBottom: '24px', color: '#2979E7', cursor: 'pointer'}}
                                     onClick={this.addEnum}><IconFont
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
                                <FormItem label="" name="zero" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  关" disabled={this.state.isEdit==false?'disabled':''}/>
                                </FormItem>
                                <div style={{float: 'left', lineHeight: '32px', padding: '0px 10px 0px 10px'}}>1 -</div>
                                <FormItem label="" name="one" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  开" disabled={this.state.isEdit==false?'disabled':''}/>
                                </FormItem>
                            </div>
                        }
                        {((this.state.dateDataVisible == true)) &&
                        <div>
                            <FormItem label="时间格式" name="dateType" rules={[{required: false, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="String类型的UTC时间戳（毫秒）" disabled={true}/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.stringDataVisible == true) ) &&
                        <div>
                            <FormItem label="数据长度" name="length" rules={[{required: true, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="" addonAfter="字节" disabled={this.state.isEdit==false?'disabled':''}/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.structDataVisible == true) || (this.state.arrayDataVisible == true && this.state.elementStructVisible)) &&
                        <div>
                            <div style={{padding: '0px 0px 8px'}}><span style={{
                                color: '#ff4d4f',
                                fontFamily: 'SimSun, sans-serif'
                            }}>*</span><span> Json对象</span></div>
                            {
                                this.state.childrenParamsList.map((item, index) => {
                                    return <div className="json-children-params" key={index}>
                                        <div>{item.name}</div>
                                        <div>{item.identifier} </div>
                                        <div>{item.dataType.type}</div>
                                        <div className="function-table-option-buttion">
                                            {
                                                this.state.isEdit != false && <div>
                                            <div className="option-button"
                                                 onClick={() => this.editChildrenParams(item, index,true)}>编辑
                                            </div>
                                            <div className="split"></div>
                                            <div className="option-button"
                                                 onClick={() => this.deleteChildrenParams(item, index)}>删除
                                            </div>
                                                </div>
                                            }
                                            {
                                                this.state.isEdit==false&&
                                                <div className="option-button"  onClick={() => this.editChildrenParams(item, index,false)}>查看
                                                </div>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            {
                                this.state.isEdit != false &&
                                <div style={{marginBottom: '8px', color: '#2979E7', cursor: 'pointer'}}
                                     onClick={this.showAddStructureParameters.bind(this, '1')}><IconFont
                                    type='icon-jiahao'/>添加参数
                                </div>
                            }
                        </div>
                        }
                    </Form>
                </Drawer>
                }
                <AddStructureParameters onRef={this.addStructureParametersRef} title={this.state.title} refresChildrenParams={this.refresChildrenParams}></AddStructureParameters >
            </div>
        )
    }
}
export default AddInOutputParameters
