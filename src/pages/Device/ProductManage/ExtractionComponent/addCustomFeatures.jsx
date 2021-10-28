import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import AddInOutputParameters from './addInOutputParameters'
import AddStructureParameters from './addStructureParameters'
import './../index.less'
import {guid, handleCheckValueLenght, messageGlobal} from "../../../../utils";
import {saveProductModel, updateProductModel} from "../../../../api/api";

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
        fieldId:'',//编辑时使用
        detail: {},
        visible: false,
        attributeType:true,
        eventType:false,
        serviceType:false,
        showButton:true,
        drawerTitle:'添加自定义功能点',

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

        // title:'',
        enumList:[{id:guid(),value:'',remark:''}],
        childrenParamsList:[],
        inPutParamsList:[],
        childrenParams:{},
    }
    showAddStructureParameters=(item)=>{
        switch (item) {
            case '1':
                this.addStructureParametersChildRef.showDrawer();
                this.addStructureParametersChildRef.setChildrenParameters(this.state.childrenParamsList);
                break;
            case '2':
                this.addInOutputParametersChildRef.showDrawer('','',"out_put_params")
                this.addInOutputParametersChildRef.setChildrenParameters(this.state.childrenParamsList,"out_put_params");
                break;
            case '3':
                this.addInOutputParametersChildRef.showDrawer('','',"in_put_params")
                this.addInOutputParametersChildRef.setChildrenParameters(this.state.inPutParamsList,"in_put_params");
                break;
            default:
        }

    }
    showDrawer = (item,state) => {
        this.setState({
            showButton:state!=undefined?state:true,
            drawerTitle:state==false?'查看自定义功能点':(state==true?'编辑自定义功能点':'添加自定义功能点'),
            isEdit:state,
            visible: true
        });
        if(item){
            this.setValue(item)
        }
    };
    setValue(item){
        this.setState({
            fieldId:item.fieldId
        })
        if(item.fieldTypeId=='1'){//属性
            this.changeFunctionType(item.fieldTypeId.toString())
            this.fromModeRef.current.setFieldsValue({
                fieldType:item.fieldTypeId.toString(),
                name:item.name,
                identifier:item.identifier,
                remark:item.remark,
                dataType:item.type,
                accessMode:item.accessMode
            })
            this.changeDataType(item.type);
            if(item.type=='int'||item.type=='float'||item.type=='double'){
                this.fromModeRef.current.setFieldsValue({
                    max:item.dataType.specs.max,
                    min:item.dataType.specs.min,
                    step:item.dataType.specs.step,
                    unit:item.dataType.specs.unit,
                })
            }
            if(item.type=='bool'){
                this.fromModeRef.current.setFieldsValue({
                    unit:item.dataType.specs.unit,
                    zero: item.dataType.specs.zero,
                    one: item.dataType.specs.one,
                })
            }
            if(item.type=='enum'){
                this.setState({
                   enumList:item.dataType.specs
                })
            }
            if(item.type=='string'){
                this.fromModeRef.current.setFieldsValue({
                    length:item.dataType.specs.length
                })
            }
            if(item.type=='date'){
                this.fromModeRef.current.setFieldsValue({
                    date:item.dataType.specs.date
                })
            }
            if(item.type=='struct'){
                this.setState({
                    childrenParamsList:item.dataType.specs
                })
            }
            if(item.type=='array'){
                this.fromModeRef.current.setFieldsValue({
                    elementType:item.dataType.specs.item.type,
                    elementSize:item.dataType.specs.size,
                })
                this.changeElementType(item.dataType.specs.item.type)
                if(item.dataType.specs.item.type=='struct'){
                    this.setState({
                        childrenParamsList:item.dataType.specs.item.specs
                    })
                }
            }
        }else if(item.fieldTypeId=='2'){
            this.changeFunctionType(item.fieldTypeId.toString())
            this.setState({
                childrenParamsList:item.outputData
            })
            this.fromModeRef.current.setFieldsValue({
                fieldType:item.fieldTypeId.toString(),
                name:item.name,
                identifier:item.identifier,
                remark:item.remark,
                type:item.type,
            })
        }else{
            this.changeFunctionType(item.fieldTypeId.toString())
            this.setState({
                childrenParamsList:item.outputData,
                inPutParamsList:item.inputData
            })
            this.fromModeRef.current.setFieldsValue({
                fieldType:item.fieldTypeId.toString(),
                name:item.name,
                identifier:item.identifier,
                callType:item.call_type,
                remark:item.remark,
                type:item.type,
            })
        }
     }
    filterParams(values){
        let params=values
        values.productId=this.props.productInfo.id
        values.fieldId=this.state.fieldId
        values.required=0
        if(values.fieldType=='1'){
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
        }
        if(values.fieldType=='2'){
            values.outputData=this.state.childrenParamsList
        }
        if(values.fieldType=='3'){
            values.outputData=this.state.childrenParamsList;
            values.inputData=this.state.inPutParamsList
        }
        return params;
    }

    onChange(type,index,e){
        let enumList=this.state.enumList;
        if(type=='value'){
            enumList[index]={id:enumList[index].id,value:e.target.value,remark:enumList[index].remark};
        }else{
            enumList[index]={id:enumList[index].id,value:enumList[index].value,remark:e.target.value};
        }
        this.setState({ enumList })
    }
    onSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {
            let params=this.filterParams(values)
            if(values.fieldId){
                updateProductModel(params).then(res => {
                    if (res.status === '1') {
                        messageGlobal('success',res.msg)

                        this.props.refresFunctionList();
                    }
                })
            }else{
                saveProductModel(params).then(res => {
                    if (res.status === '1') {
                        messageGlobal('success',res.msg)

                        this.props.refresFunctionList();
                    }
                })
            }

            this.onClose()
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    onClose = () => {
        this.setState({
            visible: false,
            detail:{},
            fieldId:'',
            childrenParamsList:[],
            numberDataVisible:true,
            enumDataVisible:false,
            booleanDataVisible:false,
            dateDataVisible:false,
            stringDataVisible:false,
            structDataVisible:false,
            arrayDataVisible:false,
            elementStructVisible:false
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
                    elementDateVisible:true,
                    elementStructVisible:false,
                })
                break;
            case  'struct':
                this.setState({
                    elementNumberVisible:false,
                    elementStringVisible:false,
                    elementDateVisible:false,
                    elementStructVisible:true,
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
    addEnum=()=>{
        const enumList=this.state.enumList;
        enumList[this.state.enumList.length]={id:guid(),value:'',remark:''};
        this.setState({enumList})

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
    refresChildrenParams=(childrenParamsList,type)=>{
        if('out_put_params'==type){
            this.setState({
                childrenParamsList
            })
        }else if("in_put_params"==type){
            this.setState({
               inPutParamsList:childrenParamsList
            })
        }else{
            this.setState({
                childrenParamsList
            })
        }
    }
    editChildrenParams=(item,index,type,state)=>{
        if(type=='child_json'){
            this.addStructureParametersChildRef.showDrawer(item,index,state)
            this.addStructureParametersChildRef.setChildrenParameters(this.state.childrenParamsList);
        }else{
            this.addInOutputParametersChildRef.showDrawer(item,index,type,state);
            if(type=='out_put_params'){
                this.addInOutputParametersChildRef.setChildrenParameters(this.state.childrenParamsList,type);
            }else{
                this.addInOutputParametersChildRef.setChildrenParameters(this.state.inPutParamsList,type);
            }
        }
    }
    deleteChildrenParams=(item,index,type)=>{
        const childrenParamsList=[];
        if("in_put_params"==type){
            this.state.inPutParamsList.map((item1,index1)=>{
                if(index1!=index){
                    childrenParamsList.push(item1)
                }
            })
            this.setState({
                inPutParamsList:childrenParamsList
            })
            this.addInOutputParametersChildRef.setChildrenParameters(childrenParamsList,"in_put_params");
        }else if('out_put_params'==type){
            this.state.childrenParamsList.map((item1,index1)=>{
                if(index1!=index){
                    childrenParamsList.push(item1)
                }
            })
            this.setState({
                childrenParamsList
            })
            this.addInOutputParametersChildRef.setChildrenParameters(childrenParamsList,"out_put_params");
        }else{
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
    }
    render() {
        const formItemLayout = {}
        const functionTypeList = [{id: '1', value: '1',name:'属性类型'}, {id: '2', value: '2',name:'事件类型'}, {id: '3', value: '3',name:'服务类型'}];
        const dataTypeList=[{id: '1', value: 'int',name:'int32(整数型)'}, {id: '2', value: 'enum',name:'enum(枚举)'}, {id: '3', value: 'bool',name:'bool(布尔)'}, {id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}, {id: '7', value: 'array',name:'array(数组)'},{id: '8', value: 'float',name:'float(浮点型)'}, {id: '9', value: 'double',name:'double(浮点型)'}];
        const readWriteList=[{id: '1', value: 'rw',name:'读写'}, {id: '2', value: 'r',name:'只读'}];
        const unitList=[{id: '1', value: 'v',name:'伏特/V'}, {id: '2', value: 's',name:'秒/s'}]
        const eventTypeList=[{id: '1', value: 'info',name:'信息'}, {id: '2', value: 'alarm',name:'告警'}, {id: '3', value: 'fault',name:'故障'}];
        const callTypeList= [{id: '1', value: '1',name:'同步'}, {id: '2', value: '2',name:'异步'}]
        const elementTypeList=[{id: '1', value: 'int',name:'int32(整数型)'},{id: '4', value: 'string',name:'string(字符串)'}, {id: '5', value: 'struct',name:'struct(结构体)'}, {id: '6', value: 'date',name:'date(时间)'}];
        return (
            <div>
                {this.state.visible &&
                <Drawer
                    title={this.state.drawerTitle}
                    width={560}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div style={{ textAlign: 'right', }} >
                            {this.state.showButton&& <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}>添加</Button>}
                            <Button onClick={this.onClose}> 关闭</Button>
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
                            <Select placeholder="请选择属性类型" disabled={(this.state.isEdit==true||this.state.isEdit==false)?'disabled':''}  onChange={(value) => {
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
                                  rules={[
                                      {required: true,label:'功能名称',lenght:20,validator:handleCheckValueLenght},
                                  ]}{...formItemLayout}>
                            <Input   disabled={this.state.isEdit==false?'disabled':''} type="text" placeholder="请输入功能名称"/>
                        </FormItem>
                        <FormItem label="标识符"
                                  name="identifier"
                                  // initialValue={detail.identifier}
                                  rules={[
                                      {required: true,label:'标识符',lenght:20,validator:handleCheckValueLenght},
                                  ]}{...formItemLayout}>
                            <Input type="text"  disabled={this.state.isEdit==false?'disabled':''} placeholder="请输入标识符"/>
                        </FormItem>
                        {this.state.serviceType==true &&
                        <div>
                            <FormItem label="调用方式"
                                      name="callType"
                                      rules={[
                                          {
                                              required: true,
                                              message: '请选择调用方式'
                                          },
                                      ]}{...formItemLayout}>
                                <Select placeholder="请选择调用方式"  disabled={this.state.isEdit==false?'disabled':''}>
                                    {callTypeList.map((item) => (
                                        <Option value={item.value} key={item.value}>
                                            {item.name}
                                        </Option>
                                    ))}
                                </Select>
                            </FormItem>
                            <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输入参数</span></div>
                            {
                                this.state.inPutParamsList.map((item,index)=>{
                                    return   <div className="json-children-params" key={index}>
                                        <div>{item.name}</div>
                                        <div>{item.identifier} </div>
                                        <div>{item.dataType.type}</div>
                                        <div className="function-table-option-buttion">
                                            {
                                                this.state.isEdit != false && <div>
                                                    <div className="option-button"
                                                         onClick={() => this.editChildrenParams(item, index, 'in_put_params', true)}>编辑
                                                    </div>
                                                    <div className="split"></div>
                                                    <div className="option-button"
                                                         onClick={() => this.deleteChildrenParams(item, index, 'in_put_params')}>删除
                                                    </div>
                                                </div>
                                            }
                                            {this.state.isEdit==false&&
                                            <div className="option-button"
                                                 onClick={() => this.editChildrenParams(item, index, 'in_put_params', false)}>查看
                                            </div>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            {
                                this.state.isEdit != false &&
                            <div style={{marginBottom:'8px',color:'#2979E7',cursor:'pointer'}} onClick={this.showAddStructureParameters.bind(this,'3')}> <IconFont  type='icon-jiahao'/>添加参数</div>
                            }
                            <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输出参数</span></div>

                            {
                                this.state.childrenParamsList.map((item,index)=>{
                                    return   <div className="json-children-params" key={index}>
                                        <div>{item.name}</div>
                                        <div>{item.identifier} </div>
                                        <div>{item.dataType.type}</div>
                                        <div className="function-table-option-buttion">
                                            {
                                                this.state.isEdit != false && <div>
                                            <div className="option-button" onClick={()=>this.editChildrenParams(item,index,'out_put_params',true)}>编辑</div>
                                            <div className="split"></div>
                                            <div className="option-button" onClick={()=>this.deleteChildrenParams( item,index,'out_put_params')}>删除</div>
                                                </div>
                                            }
                                            {this.state.isEdit==false&&
                                            <div className="option-button"
                                                 onClick={() => this.editChildrenParams(item, index, 'out_put_params', false)}>查看
                                            </div>
                                            }
                                        </div>
                                    </div>
                                })
                            }
                            {this.state.isEdit != false &&
                            <div style={{marginBottom: '8px', color: '#2979E7', cursor: 'pointer'}}
                                 onClick={this.showAddStructureParameters.bind(this, '2')}><IconFont
                                type='icon-jiahao'/>添加参数</div>
                            }
                        </div>
                        }
                        {this.state.eventType==true &&
                    <div>
                        <FormItem label="事件类型"
                                  name="type"
                                  initialValue={'info'}
                                  rules={[
                                      {
                                          required: true,
                                          message: '请选择事件类型'
                                      },
                                  ]}{...formItemLayout}>
                            <Select placeholder="请选择事件类型"  disabled={this.state.isEdit==false?'disabled':''}>
                                {eventTypeList.map((item) => (
                                    <Option value={item.value} key={item.value}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 输出参数</span></div>
                        {
                            this.state.childrenParamsList.map((item,index)=>{
                                return   <div className="json-children-params" key={index}>
                                    <div>{item.name}</div>
                                    <div>{item.identifier} </div>
                                    <div>{item.dataType.type}</div>
                                    <div className="function-table-option-buttion">
                                        {
                                            this.state.isEdit!=false&&  <div>
                                        <div className="option-button" onClick={()=>this.editChildrenParams(item,index,'out_put_params',true)}>编辑</div>
                                        <div className="split"></div>
                                        <div className="option-button" onClick={()=>this.deleteChildrenParams( item,index,'out_put_params')}>删除</div>
                                        </div>
                                        }
                                        { this.state.isEdit==false&&
                                        <div className="option-button" onClick={()=>this.editChildrenParams(item,index,'out_put_params',false)}>查看</div>
                                        }
                                    </div>
                                </div>
                            })
                        }
                        {this.state.isEdit != false &&
                        <div style={{marginBottom: '8px', color: '#2979E7', cursor: 'pointer'}}
                             onClick={this.showAddStructureParameters.bind(this, '2')}><IconFont type='icon-jiahao'/>添加参数
                        </div>
                        }
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
                            <Select placeholder="请选择数据类型"  disabled={this.state.isEdit==false?'disabled':''}  onChange={(value) => {
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
                                          initialValue={'int'}
                                          rules={[
                                              {
                                                  required: true,
                                                  message: '请选择元素类型'
                                              },
                                          ]}{...formItemLayout}>
                                    <Select placeholder="请选择元素类型"   disabled={this.state.isEdit==false?'disabled':''} onChange={(value) => {
                                        this.changeElementType(value);
                                    }}>
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
                                    <Input type="text"  disabled={this.state.isEdit==false?'disabled':''} placeholder="请输入元素个数"/>
                                </FormItem>
                            </div>
                        }
                        {((this.state.numberDataVisible==true && this.state.attributeType)) &&
                            <div>
                            <FormItem label="定义取值范围" name="name" rules={[{required: true, message: ' '}]}
                                      style={{marginBottom: 0}}>
                                <FormItem
                                    name="min"
                                    rules={[{required: true, message: '请输入最小值'}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="最小值" disabled={this.state.isEdit==false?'disabled':''} />
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
                            this.state.enumDataVisible==true  && this.state.attributeType &&
                            <div>
                               <div><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 枚举值</span></div>
                                <div style={{display:'flex',padding:'8px 0px'}}><div style={{width:'40%',float:'left',marginLeft:'10px'}}>参数值</div><div style={{width:'55%',float:'right'}}>参数类型</div></div>
                                {this.state.enumList.map((item,index)=> {
                                return    <FormItem label=""  rules={[{required: true, message: ' '}]}
                                              style={{marginBottom: 0}} key={index}>
                                        <FormItem
                                            name={'value'+item.id}
                                            initialValue={item.value}
                                            rules={[{required: true, message: '请输入最小值'}]}
                                            style={{display: 'inline-block', width: 'calc(35% - 8px)'}}
                                        >
                                            <Input placeholder="最小值" onChange ={this.onChange.bind(this,'value',index) } disabled={this.state.isEdit==false?'disabled':''}/>
                                        </FormItem>
                                        <FormItem
                                            name={'remark'+item.id}
                                            initialValue={item.remark}
                                            rules={[{required: true, message: '请输入最大值'}]}
                                            style={{ display: 'inline-block',width: 'calc(55%)', margin: '0px 0px 0px 8px'}}
                                        >
                                            <Input placeholder="最大值" onChange ={this.onChange.bind(this,'remark',index) } disabled={this.state.isEdit==false?'disabled':''}/>
                                        </FormItem>
                                      {index>0&&this.state.isEdit!=false&&
                                          <div style={{ position: 'absolute',cursor: 'pointer',marginLeft: '93%', wordBreak: 'keep-all', marginTop: '-50px',color: '#2979E7', }}
                                               onClick={()=>this.deleteTagColumn(item,index)}>删除</div>
                                      }
                                    </FormItem>
                                })
                                }
                                {this.state.isEdit!=false&&
                                    <div style={{marginBottom: '24px', color: '#2979E7', cursor: 'pointer'}}
                                         onClick={this.addEnum}><IconFont type='icon-jiahao'/>添加枚举项</div>
                                }
                            </div>
                        }
                        {
                            this.state.booleanDataVisible==true  && this.state.attributeType &&
                            <div>
                                <div style={{padding:'0px 0px 8px'}}><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> 布尔值</span></div>
                                <div style={{float: 'left', lineHeight: '32px',padding:'0px 10px 0px 10px'}}>0 -</div>
                                <FormItem label="" name="zero" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                   <Input placeholder="如  关" disabled={this.state.isEdit==false?'disabled':''}/>
                                </FormItem>
                                <div style={{float: 'left', lineHeight: '32px',padding:'0px 10px 0px 10px'}}>1 -</div>
                                <FormItem label="" name="one" rules={[{required: true, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="如  开" disabled={this.state.isEdit==false?'disabled':''}/>
                                </FormItem>
                            </div>
                         }
                        {((this.state.dateDataVisible==true  && this.state.attributeType)||(this.state.arrayDataVisible==true  && this.state.attributeType&&this.state.elementDateVisible)) &&
                            <div>
                                <FormItem label="时间格式" name="dateType" rules={[{required: false, message: ' '}]}
                                          {...formItemLayout}>
                                    <Input placeholder="String类型的UTC时间戳（毫秒）" disabled={true}/>
                                </FormItem>
                            </div>
                        }
                        {((this.state.stringDataVisible==true  && this.state.attributeType) )&&
                        <div>
                            <FormItem label="数据长度" name="length" rules={[{required: true, message: ' '}]}
                                      {...formItemLayout}>
                                <Input placeholder="" addonAfter="字节" disabled={this.state.isEdit==false?'disabled':''}/>
                            </FormItem>
                        </div>
                        }
                        {((this.state.structDataVisible==true && this.state.attributeType) ||(this.state.arrayDataVisible==true && this.state.attributeType &&this.state.elementStructVisible)) &&
                        <div>
                            <div><span style={{color:'#ff4d4f',fontFamily: 'SimSun, sans-serif'}}>*</span><span> Json对象</span></div>
                            {
                                this.state.childrenParamsList.map((item,index)=>{
                                    return   <div className="json-children-params" key={index}>
                                        <div>{item.name}</div>
                                        <div>{item.identifier} </div>
                                        <div>{item.dataType.type}</div>
                                        <div className="function-table-option-buttion">
                                            { this.state.isEdit!=false&&
                                            <div>
                                                <div className="option-button"
                                                  onClick={() => this.editChildrenParams(item, index, 'child_json',true)}>编辑</div>
                                            < div className="split"></div>
                                                <div className="option-button" onClick={() => this.deleteChildrenParams(item, index, 'child_json')}>删除</div>
                                            </div>
                                            }
                                            {
                                                this.state.isEdit==false&&
                                                <div className="option-button"
                                                     onClick={() => this.editChildrenParams(item, index, 'child_json',false)}>查看</div>
                                            }
                                          </div>
                                    </div>
                                })
                            }
                            {this.state.isEdit != false &&
                            <div style={{marginBottom: '8px', color: '#2979E7', cursor: 'pointer'}}
                                 onClick={this.showAddStructureParameters.bind(this, '1')}><IconFont
                                type='icon-jiahao'/>添加参数</div>
                            }
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
                                <Select placeholder="请选择读写类型"  disabled={this.state.isEdit==false?'disabled':''} onChange={(value) => {
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
                                  name="remark"
                                  rules={[
                                      {
                                          required: false,
                                          message: '请输入描述信息'
                                      },
                                  ]}{...formItemLayout}>
                            <TextArea id='textAreaId' rows={5}  disabled={this.state.isEdit==false?'disabled':''} maxLength={100} showCount
                                      placeholder="请输入描述信息"></TextArea>
                        </FormItem>
                    </Form>
                </Drawer>
                }
                <AddInOutputParameters  onRef={this.addInOutputParametersRef} title={this.state.title} refresChildrenParams={this.refresChildrenParams}></AddInOutputParameters>
                <AddStructureParameters onRef={this.addStructureParametersRef} title={this.state.title}   refresChildrenParams={this.refresChildrenParams}></AddStructureParameters>
            </div>
        )
    }
}

export default AddCustomFeatures
