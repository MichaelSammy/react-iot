import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Switch} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {messageGlobal, updateSelectedItem} from "../../../../utils";
import './../index.less'
import AddDeviceToGruop from "./addDeviceToGruop";
import { deleteDeviceToGroup, deviceBatchOpenOrClose,getProductDropDownList, selectDeviceListByGroupId} from "../../../../api/api";
const {TextArea} = Input
const FormItem = Form.Item

class GroupDeviceList extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 10
    }
    data = [
        {
            type: 'select',
            initialValue: null,
            label: '',
            placeholder: '全部产品',
            list: [],
            field: 'productId',
            width: '130px'
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'name',
            width: '336px',
            bordered: true,
        }
    ]
    state = {
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: false,
            pageSizeOptions: ['10', '20', '30'],
            pageSize: this.params.pageSize,
            current: this.params.page,
            total: this.params.total,
            onChange: (page, pageSize) => this.changePage(page, pageSize),
            showTotal: (total) => `共${total}条`,
        },
        type: 'checkbox',
        list: [],
        visibleBaseModel: false,
        baseModelContent: '',
        addDeviceToGroupModel: false,
        detail: {},
        title: ''
    }

    componentDidMount() {
        this.props.onRef(this);
        this.getProductList();
        // this.requestList();
    }
    addDeviceToGroupRef=(ref)=>{
       this.addDeviceToGroupRefChild=ref
    }
    getProductList(){
        getProductDropDownList().then(res => {
            if (res.status === '1' && res.result != null) {
                res.result.push({
                    "id": null,
                    "label": "全部",
                    "value": null
                })
                res.result.reverse();
                this.data[0].list=res.result
            }
        })
    }
    callBackFatherMethod = () => {
        this.setState({
            addDeviceToGroupModel: true,
        })
        setTimeout(()=>{
            this.addDeviceToGroupRefChild.requestList();
        },600)
    }

    batchDelete = (type) => {
        if(this.state.rowSelection.selectedRows.length==0){
            messageGlobal('warning',"请选择需要移除的设备")
            return false;
        }
        let deviceIds=[];
        this.state.rowSelection.selectedRows.map((item,index)=>{
            deviceIds.push(item.id)
        })
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否批量移除？',
            operationType:type,
            deviceIds:deviceIds
        })
    }
    showDevice = () => {
        alert(2)
    }
    removeDevice = (item,type) => {
        let deviceIds=[];
        deviceIds.push(item.id)
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否移除设备？',
            operationType:type,
            deviceIds:deviceIds
        })
    }
    handleSearch = (data) => {
        this.setState({
            name:data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }
    changeSelect = (data,field) => {
        if(field=="productId"){
            this.setState({
                productId:data
            })
        }
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    //请求列表
    requestList=()=> {
        let  params= {
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[deviceName]":this.state.name,
            "map[groupId]":this.props.deviceGroupInfo.id,
            "map[productId]":this.state.productId
        }
        selectDeviceListByGroupId(params).then(res => {
            if (res.status === '1'&&res.result!=null) {
                let dataSource = res.result.resultList.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource,
                    pagination: {
                        showSizeChanger: true,
                        showQuickJumper: true,
                        hideOnSinglePage: false,
                        pageSizeOptions: ['10', '20', '30'],
                        pageSize: this.params.pageSize,
                        current: this.params.page,
                        total: res.result.recordCount,
                        onChange: (page, pageSize) => this.changePage(page, pageSize),
                        showTotal: (total) => `共${total}条`,
                    }
                })
            }else{
                this.setState({
                    dataSource:[],
                    pagination:{
                        total:0
                    }
                })
            }
        })
    }
    enableOrDisable=()=>{
        let params={
            disState:this.state.disState,
            deviceIds:this.state.deviceIds,
        }
        deviceBatchOpenOrClose(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }
        })
    }
    deleteDevice=()=>{
        let params=[]
        this.params.page=1;
        this.state.deviceIds.map((item)=>{
            params.push({
                groupId:this.props.deviceGroupInfo.id,
                deviceId:item
            })
        })
        deleteDeviceToGroup(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }else{
                messageGlobal('errInfo',res.msg)
            }
            this.setState({
                deviceIds:[],
                rowSelection:{
                    selectedRowKeys: [],
                    selectedRows: [],
                },
            })
        })
    }
    submitOk = () => {
        if(this.state.operationType=="isEnable"){
            this.enableOrDisable();
        }
        if(this.state.operationType=="delete"){
            this.deleteDevice();
        }
        this.props.getDeviceGroupInfo();
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    tableColumnChange = (item,type) => {
        let deviceIds=[];
        deviceIds.push(item.id)
        if(item.disState=='1'){
            this.setState({
                visibleBaseModel: true,
                baseModelContent: '是否禁用设备？',
                operationType:type,
                disState:'0',
                deviceIds:deviceIds
            })
        }else{
            this.setState({
                visibleBaseModel: true,
                baseModelContent: '是否启用设备？',
                operationType:type,
                disState:'1',
                deviceIds:deviceIds
            })
        }
    }
    hideAddDviceToGroupModel = () => {
        this.setState({
            addDeviceToGroupModel: false
        })
    }
    changePage = (page, pageSize) => {
        this.params.page = page;
        this.params.pageSize = pageSize;
        this.setState({
            pagination: {
                current: page,
                pageSize: pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                hideOnSinglePage: false,
                pageSizeOptions: ['10', '20', '30'],
                total: this.params.total,
                onChange: (page, pageSize) => this.changePage(page, pageSize),
                showTotal: (total) => `共${total}条`,
            }
        })
        this.requestList()
    }

    render() {
        const columns = [
            {
                title: 'DeviceName/备注名称',
                dataIndex: 'name',
                align: 'left'
            },
            {
                title: '设备所属产品',
                dataIndex: 'productName',
                align: 'left',
            },
            {
                title: '节点类型',
                align: 'left',
                render: (item) => {
                    return(
                        item.nodeType=="1"? "设备":(item.nodeType=="2"?"网关":"子设备")
                    )
                }
            },
            {
                title: '状态/启用状态',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div style={{
                                width: '6px',
                                height: '6px',
                                background: '#FF6D6D',
                                borderRadius: '3px',
                                marginRight: '10px'
                            }}></div>
                            <div className="option-button">{item.disState=='1'?'启用':'未启用'}</div>
                            <div className="option-button"><Switch defaultChecked={item.disState=='1'?true:false} onClick={()=>this.tableColumnChange(item,"isEnable")}/>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: '最后上线时间',
                dataIndex: 'onlieTime',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.showDevice.bind(this, item)}>查看</div>
                            <div className="split"></div>
                            <div className="option-button" onClick={this.removeDevice.bind(this, item,"delete")}>移除设备</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="function-search-from" style={{display: 'flex',justifyContent: 'space-between'}}>
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                        changeSelect={this.changeSelect}
                        show={false}
                    />
                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="add-stand-function" onClick={this.callBackFatherMethod}><div><IconFont
                                type='icon-jiahao' className="icon-font-offset-px"/>添加设备</div>
                            </div>
                            <div className="batch-delete" onClick={()=>this.batchDelete("delete")}><div><IconFont type='icon-a-shanchucopy'
                                                                                                    className="icon-font-offset-px"/>移除</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Etable
                    that={this}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowSelection={this.state.rowSelection}
                    updateSelectedItem={updateSelectedItem.bind(this)}
                    pagination={this.state.pagination}
                    type={this.state.type}
                >
                </Etable>
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
                {this.state.addDeviceToGroupModel &&
                <AddDeviceToGruop
                    visible={this.state.addDeviceToGroupModel}
                    deviceGroupInfo={this.props.deviceGroupInfo}
                    onRef={this.addDeviceToGroupRef}
                    requestList={this.requestList}
                    hideAddDviceToGroupModel={this.hideAddDviceToGroupModel}
                    title={'添加设备到分组'}
                ></AddDeviceToGruop>
                }
            </div>
        )
    }
}

export default GroupDeviceList;
