import React from "react";
import {Card, Modal, Form, Input, Button, Select} from "antd";
import BaseModel from "../../../../common/BaseModel";
import IconFont from '../../../../utils/IconFont';
import {messageGlobal} from "../../../../utils";
import {getProductInfo, saveOrUpdateLabel} from "../../../../api/api";

const FormItem = Form.Item

class AddLabel extends React.Component {
    fromModeRef = React.createRef();
    state = {
        addLabelVisible: false,
        formList: [],
        title: '',
        visibleBaseModel: false,
        baseModelContent: '是否删除？',
        productId:'',
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    submitOk = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    deleteTagColumn = (params) => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？'
        })
    }
    filterTag = () => {
        this.setState({
            addLabelVisible: true,
            title: '筛选标签'
        })
    }
    addTag = () => {
        this.setState({
            addLabelVisible: true,
            title: '新增标签'
        })
    }
    editTag = (item,id) => {
        this.setState({
            formList: item,
            addLabelVisible: true,
            title: '编辑标签',
            productId:id,
        })
    }
    saveSubmit = async () => {
      let  nextStep=true;
        this.state.formList.map((item,index)=>{
            if(item.key==""||item.value==""){
                messageGlobal('error','请将表单填写完整！');
                nextStep=false;
                return;
            }
        })
        if(nextStep){
            let params={
                productId:this.state.productId,
                list:this.state.formList
            }
            saveOrUpdateLabel(params).then(res => {
                if (res.status === '1') {
                    messageGlobal('success',"标签修改成功！")
                }
            })
            this.closeSubmit()
        }
        console.log(nextStep)
      //遍历 this.state.formList  校验表单
    }
    closeSubmit = () => {
        let params={
            productId:this.state.productId,
        }
        this.props.getProductLabelList(params)
        this.setState({
            addLabelVisible: false
        })
    }
    addTagColumn = () => {
        const formList=this.state.formList;
        formList[this.state.formList.length]={productId:this.state.productId,key:'',value:''};
        this.setState({formList})
        
    }
    onChange(type,index,e){
        let formList=this.state.formList;
        if(type=='key'){
            formList[index]={productId:this.state.productId,key:e.target.value,value:formList[index].value};
        }else{
            formList[index]={productId:this.state.productId,key:formList[index].key,value:e.target.value};
        }
        this.setState({ formList })
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        return (
            <div>
                {this.state.addLabelVisible &&
                <Modal
                    title={this.state.title}
                    visible={this.state.addLabelVisible}
                    centered
                    okText="保存"
                    cancelText="取消"
                    onOk={this.saveSubmit}
                    onCancel={this.closeSubmit}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                        <Button key="back" onClick={this.closeSubmit}>取消</Button>
                    ]}
                >
                    <Form ref={this.fromModeRef}>
                        {this.state.formList.map((item,index)=>{
                        return    <FormItem label={index > 0 ? " " : "定义取值范围"} colon={index > 0 ? false : true}  style={{marginBottom: -16}} {...formItemLayout} key={index}>
                                <FormItem
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="请输入标签key" defaultValue={item.key} name={'key'+index} onChange ={this.onChange.bind(this,'key',index) }/>
                                </FormItem>
                                <FormItem
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                                >
                                    <Input placeholder="请输入标签value" name={'name'+index} defaultValue={item.value} onChange ={this.onChange.bind(this,'value',index) }/>
                                </FormItem>
                                <div style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    marginLeft: '103%',
                                    wordBreak: 'keep-all',
                                    marginTop: '-48px',
                                    color: '#2979E7',
                                }} key={index} onClick={()=>this.deleteTagColumn(item)}>删除
                                </div>
                            </FormItem>
                        })
                        }
                        <div style={{color: '#2979E7', textAlign: 'center', position: 'relative'}}>
                            <span onClick={this.addTagColumn} style={{cursor: 'pointer'}}>
                            <IconFont style={{marginRight: '8px'}} type='icon-jiahao'/> 新增标签
                            </span>
                        </div>
                    </Form>
                </Modal>
                }
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
            </div>
        )
    }
}

export default AddLabel
