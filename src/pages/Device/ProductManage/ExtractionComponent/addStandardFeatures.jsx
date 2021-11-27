import React from "react";
import BaseForm from '../../../../common/BaseForm'
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer,Checkbox} from "antd";
import './../index.less'
import IconFont from '../../../../utils/IconFont';
import {getDeviceList, getProductDetailList, saveProductDetail, saveProductModel} from "../../../../api/api";
import {messageGlobal} from "../../../../utils";
class AddStandardFeatures extends React.Component {
    state = {
        visible: false,
        dataSource:[],
        selectedDataSource:[]
    }
    data = [
        {
            type: 'select',
            initialValue: null,
            label: '',
            placeholder: '请选择功能类型',
            list: [{id: 'null', label: '功能类别（全部）',value:null}, {id: '1', label: '属性',value:'1'}
                , {id: '2', label: '事件',value:'2'}, {id: '3', label: '服务',value:'3'}],
            field: 'fieldType',
            width: '370px'
        }]
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };
    onSubmit= () => {
        if(this.state.selectedDataSource.length==0){
            messageGlobal('warning',"请选择需要添加的功能点！")
           return false;
        }
        let params={
            list:this.state.selectedDataSource,
            productId:this.props.productInfo.id
        }
        saveProductDetail(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.props.refresFunctionList();
            }
        })
        this.onClose()
    };
    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }
    changeSelect = (data,field) => {
        if(field=="fieldType"){
            this.setState({
                fieldType:data
            })
        }
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    onChange=(params,index,currentTarget)=>{
        if(currentTarget.target.checked){
            params.checked=true
            const selectedDataSource=this.state.selectedDataSource;
            selectedDataSource[this.state.selectedDataSource.length]=params;
            this.setState({selectedDataSource})
        }else{
            let selectedDataSource= [];
            params.checked=false;
            this.state.selectedDataSource.map((item,index1)=>{
                if(index!=index1){
                    selectedDataSource.push(item)
                }
            })
            this.setState({
                selectedDataSource:selectedDataSource
            })
        }
    }
    cancelAll=()=>{
        this.setState({
            selectedDataSource:[]
        })
        this.state.dataSource.map((item,index1)=>{
           item.checked=false
        })
    }
    deleteThis=(params,index)=>{
        let selectedDataSource= [];
        this.state.selectedDataSource.map((item,index1)=>{
            if(index!=index1){
                selectedDataSource.push(item)
            }
        })
        this.setState({
            selectedDataSource:selectedDataSource
        })
        this.state.dataSource.map((item,index1)=>{
            if(params.id==item.id){
                item.checked=false
            }
        })
    }
    requestList() {
        let  params= {
            "map[fieldType]":this.state.fieldType
        }
        getProductDetailList(params).then(res => {
            if (res.status === '1'&&res.result!=null) {
                let dataSource = res.result.resultList.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource,
                    total:res.result.recordCount
                })
            }else{
                this.setState({
                    dataSource:[],
                    total:0
                })
            }
        })
    }

    render() {
        return (
            <div>
                <Drawer
                    title="添加标准功能点"
                    width={860}
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
                <div className="add-standard-function">
                    <div className="function-left-list">
                        <div className="to-be-add-function-list">功能点列表：</div>
                        <BaseForm
                            data={this.data}
                            show={false}
                            changeSelect={this.changeSelect}
                        />
                        {this.state.dataSource.map((item, index) => {
                          return  <div className="function-card">
                            <div className="add-function-list-title">
                                <div>
                                    <Checkbox className="function-checkbox" checked={item.checked} onChange={this.onChange.bind(this,item,index,)}></Checkbox>
                                <div className="function-name">{item.name}</div>
                                <div className="function-attribute">{item.fieldType=='1'?"属性":(item.fieldType=='2'?'事件':'服务')}</div>
                                </div>
                                <div className="show-function-info">查看</div>
                            </div>
                            <div className="function-params">$GeoLocation</div>
                        </div>
                        })
                        }
                    </div>
                    <div className="function-right-list">
                        <div className="select-function-list flex-box">
                            <div>已选择要添加的功能点：</div>
                            <div className="show-function-info" onClick={this.cancelAll}>全部取消选择</div>
                        </div>
                        {this.state.selectedDataSource.map((item, index) => {
                          return <div className="function-card cancel-margin">
                            <div className="add-function-list-title">
                                <div>
                                    <div className="function-name">{item.name}</div>
                                    <div className="function-attribute">{item.fieldType=='1'?"属性":(item.fieldType=='2'?'事件':'服务')}</div>
                                </div>
                                <div>
                                    <div className="show-function-info"><span>查看</span>
                                    <IconFont onClick={()=>this.deleteThis(item,index)}
                                        style={{fontSize: '14px', color: '#666666',marginLeft:'12px'}}
                                        type='icon-guanbianniu'/></div>
                                </div>
                            </div>
                            <div className="function-params">$GeoLocation</div>
                        </div>
                        })
                        }
                    </div>
                </div>
                </Drawer>
            </div>
        )
    }
}

export default AddStandardFeatures
