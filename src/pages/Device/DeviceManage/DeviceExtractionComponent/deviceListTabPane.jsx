import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Switch} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {messageGlobal, updateSelectedItem} from "../../../../utils";
import './../index.less'
import AddDevice from "../AddDevice/addDevice"
import BatchAddDevice from "./batchAddDevice"
import {batchDeleteDevice, deleteProductModel, deviceBatchOpenOrClose, getDeviceList} from "../../../../api/api";
import AddLabel from "../../ProductManage/ExtractionComponent/addLabel";


class DeviceListTabPane extends React.Component {
    // fromModeRef = React.createRef();
    addDeviceRef = (ref) => {
        this.addDeviceRefChild = ref
    }
    addBatchDeviceRef = (ref) => {
        this.addBatchDeviceRefChild = ref
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            initialValue: '',
            placeholder: '',
            list: [{id: '', label: '设备状态（全部）'}, {id: '1', label: '激活'},{id: '0', label: '未激活'}],
            field: 'state',
            width: '110px'
        },
        {
            type: 'select',
            initialValue: '1',
            placeholder: '',
            list: [{id: '1', label: 'DeviceName'}, {id: '2', label: '备注名称'}],
            field: 'nameType',
            width: '120px'
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'name',
            width: '160px',
            bordered: true,
        },
        {
            type: 'select',
            noDropDown:true,
            initialValue: null,
            label: '',
            placeholder: '请选择产品标签',
            list: [{id: '1', label: '超级管理员',value:'1'}, {id: '2', label: '普通用户',value:'2'}],
            field: 'productLabel',
            width: '150px',
            open:false
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
        title: '',
        nameType:'1',
        cfromList:[],
    }

    componentDidMount() {
        this.props.onRef(this);
        this.requestList();
    }

    addDevice = () => {
        this.addDeviceRefChild.showDrawer();
    }
    addBatchDevice = () => {
        this.addBatchDeviceRefChild.showDrawer();
    }
    callBackFatherMethod = () => {
        this.setState({
            addDeviceToGroupModel: true,
        })
    }
    enable = (type) => {
        if(this.state.rowSelection.selectedRows.length==0){
            messageGlobal('warning',"请选择需要启用的设备")
            return false;
        }
        let deviceIds=[];
        this.state.rowSelection.selectedRows.map((item,index)=>{
            deviceIds.push(item.id)
        })
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否启用？',
            operationType:type,
            disState:'1',
            deviceIds:deviceIds
        })
    }

    disable = (type) => {
        if(this.state.rowSelection.selectedRows.length==0){
            messageGlobal('warning',"请选择需要禁用的设备")
            return false;
        }
        let deviceIds=[];
        this.state.rowSelection.selectedRows.map((item,index)=>{
            deviceIds.push(item.id)
        })
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否禁用？',
            operationType:type,
            disState:'0',
            deviceIds:deviceIds
        })
    }
    batchDelete = (type) => {
        if(this.state.rowSelection.selectedRows.length==0){
            messageGlobal('warning',"请选择需要删除的设备")
            return false;
        }
        let deviceIds=[];
        this.state.rowSelection.selectedRows.map((item,index)=>{
            deviceIds.push(item.id)
        })
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否批量删除？',
            operationType:type,
            deviceIds:deviceIds
        })
    }
    showDevice = (item) => {
        this.props.forwardDeviceInfo(item);
    }
    removeDevice = (item,type) => {
        let deviceIds=[];
        deviceIds.push(item.id)
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除设备？',
            operationType:type,
            deviceIds:deviceIds
        })
    }
    deleteDevice=()=>{
        let params={
            deviceIds:JSON.stringify(this.state.deviceIds),
        }
        batchDeleteDevice(params).then(res => {
            if (res.status === '1'&&res.result!=null) {
                messageGlobal('success',res.msg)
                this.requestList();
            }else{
                messageGlobal('errInfo',res.msg)
            }
        })
    }
    childDevice = () => {
            alert("跳转子设备页面");
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
       if(field=="nameType"){
           this.setState({
               nameType:data
           })
       }
        if(field=="state") {
            this.setState({
                state: data
            })
        }
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    setSearchLabel=(data)=>{
        let label=[];
        data.map((item,index)=>{
            label.push(item.key+":"+item.value)
        })
        this.setState({
            cfromList:data,
            productLabel:label.length>0?label.join(";"):null
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },300)
    }
    clickSelect = (data) => {
        this.addLabelRefChild.filterTag(this.state.cfromList)
    }
    //请求列表
    requestList() {
        let  params= {
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[deviceName]":this.state.nameType=='1'?this.state.name:null,
            "map[deviceCName]":this.state.nameType=='2'?this.state.name:null,
            "map[state]":this.state.state,
            "map[label]":JSON.stringify(this.state.cfromList),
            "map[productId]":this.props.productId
        }
        getDeviceList(params).then(res => {
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
    enableOrDisable=()=>{
        let params={
            disState:this.state.disState,
            deviceIds:JSON.stringify(this.state.deviceIds),
        }
        deviceBatchOpenOrClose(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }
        })
    }
    submitOk = () => {
        if(this.state.operationType=="isEnable"){
                this.enableOrDisable();
        }
        if(this.state.operationType=="delete"){
                this.deleteDevice();
        }
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
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
                align: 'left',
                render: (item) => {
                    return (
                        <div>
                            <div className="option-button">{item.deviceName}</div>
                            <div className="option-button" style={{color:"#bfbfbf"}}>{item.deviceCname}</div>
                        </div>
                    )
                }
            },
            {
                title: '设备所属产品',
                dataIndex: 'productName',
                align: 'center',
            },
            {
                title: '节点类型',
                dataIndex: 'nodeTypeName',
                align: 'left',
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
                            <div className="option-button">{item.disStateName}</div>
                            <div className="option-button"><Switch defaultChecked={item.disState=='1'?true:false} onClick={()=>this.tableColumnChange(item,"isEnable")}/>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: '最后上线时间',
                dataIndex: 'updataTime',
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
                            <div className="option-button" onClick={this.removeDevice.bind(this, item,"delete")}>删除</div>
                            {
                               item.nodeType=="2"&& <div>
                                    <div className="split"></div>
                                    <div className="option-button" onClick={this.childDevice.bind(this, item)}>子设备(1)
                                    </div>
                                </div>
                            }
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="function-search-from" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <BaseForm
                        data={this.data}
                        productLabel={this.state.productLabel}
                        handleSearch={this.handleSearch}
                        changeSelect={this.changeSelect}
                        clickSelect={this.clickSelect}
                        show={false}
                    />
                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="add-stand-function" onClick={this.addDevice}>
                                <div><IconFont
                                    type='icon-jiahao' className="icon-font-offset-px"/>添加设备
                                </div>
                            </div>

                            <div className="add-stand-function" onClick={this.addBatchDevice}>
                                <div><IconFont
                                    type='icon-piliangtianjia' className="icon-font-offset-px"/>批量添加
                                </div>
                            </div>

                            <div className="add-stand-function" onClick={this.callBackFatherMethod}>
                                <div><IconFont
                                    type='icon-daochushebei' className="icon-font-offset-px"/>导出设备
                                </div>
                            </div>
                            <div className="batch-delete" onClick={()=>this.enable("isEnable")}>
                                <div><IconFont type='icon-piliangqiyong'
                                               className="icon-font-offset-px"/>启用
                                </div>
                            </div>
                            <div className="batch-delete" onClick={()=>this.disable("isEnable")}>
                                <div><IconFont type='icon-piliangjinyong'
                                               className="icon-font-offset-px"/>禁用
                                </div>
                            </div>
                            <div className="batch-delete" onClick={()=>this.batchDelete("delete")}>
                                <div><IconFont type='icon-a-shanchucopy'
                                               className="icon-font-offset-px"/>删除
                                </div>
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
                <AddDevice title={'添加设备'} onRef={this.addDeviceRef}></AddDevice>
                <BatchAddDevice title={'批量添加设备'} onRef={this.addBatchDeviceRef}></BatchAddDevice>
                <AddLabel onRef={this.addLabelRef} setSearchLabel={this.setSearchLabel}></AddLabel>
            </div>
        )
    }
}

export default DeviceListTabPane;
