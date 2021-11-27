import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import BaseForm from '../../../common/BaseForm'
import BaseModel from '../../../common/BaseModel'
import AddGroup from './AddGroup'
import './index.less'
import {filterRoutes, getBreadItem, messageGlobal, updateSelectedItem} from "../../../utils";
import Etable from "../../../common/Etable";
import {deleteDeviceGroupById, selectDeviceListByPage} from "../../../api/api";
import AddLabel from "../ProductManage/ExtractionComponent/addLabel";
import * as qs from "qs";

const FormItem = Form.Item
export default class DeviceGroup extends React.Component {
    params = {
        page: 1,
        pageSize: 10
    }
    data = [
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入分组名称',
            field: 'username',
            width: '300px'
        },
        {
            type: 'select',
            initialValue: null,
            noDropDown:true,
            label: '',
            placeholder: '请选择产品标签',
            list: [{id: '1', label: '超级管理员',value:'1'}, {id: '2', label: '普通用户',value:'2'}],
            field: 'label',
            width: '150px',
            open:false
        }
    ]
    state = {
        rowSelection: null,
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: false,
            pageSizeOptions: ['10', '20', '30'],
            pageSize: this.params.pageSize,
            current: this.params.page,
            total: 0,
            onChange: (page, pageSize) => this.changePage(page, pageSize),
            showTotal: (total) => `共${total}条`,
        },
        type: false,
        list: [],
        detail: {},
        title: '',
        cfromList:[]
    }

    componentDidMount() {
        this.requestList()
    }

    addGroupRef = (ref) => {
        this.addGroupRefChild = ref
    }
    createGroup = () => {
        this.addGroupRefChild.showDrawer()
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    //查询
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

    //请求列表
    requestList=()=> {
        let  params= {
            map:{
                name:this.state.name,
                label:this.state.cfromList
            },
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
        }
        selectDeviceListByPage(params).then(res => {
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

    showDroupInfo = (item) => {
        this.props.history.push({'pathname': "/user/device/group/info", search: qs.stringify(item)});
    }
    deleteDeviceDroup=()=>{
        let params={
            id:this.state.groupId,
        }
        deleteDeviceGroupById(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }else{
                messageGlobal('errInfo',res.msg)
            }
        })
    }
    submitOk = () => {
        if(this.state.operationType=="delete"){
            this.deleteDeviceDroup();
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
    deleteDroup = (item,type) => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？',
            groupId:item.id,
            operationType:type
        })
    }
    setSearchLabel=(data)=>{
        let label=[];
        data.map((item,index)=>{
            label.push(item.key+":"+item.value)
        })
        this.setState({
            cfromList:data,
            label:label.length>0?label.join(";"):null
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },300)
    }
    clickSelect = (data) => {
        this.addLabelRefChild.filterTag(this.state.cfromList)
    }
    render() {
        const columns = [
            {
                title: '分组名称',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '分组ID',
                dataIndex: 'id',
                align: 'left',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div>
                            <div className="function-table-option-buttion">
                                <div className="option-button" onClick={this.showDroupInfo.bind(this, item)}>查看</div>
                                <div className="split"></div>
                                <div className="option-button" onClick={this.deleteDroup.bind(this, item,"delete")}>删除</div>
                            </div>
                        </div>
                    )
                }
            }
        ];
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备接入与管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/group",
                        "pathName": "device-group",
                        "name": "设备分组",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    }
                ],
                "redirect": "/user/device/product"
            }
        ]
        return (
            <div>
                <div className='product-list-title-background'>
                    {/*<div>*/}
                    <Breadcrumb>
                        {
                            getBreadItem(breadList)
                        }
                    </Breadcrumb>
                    <div className="product-big-title">设备分组</div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                    </div>
                </div>
                <div className="product-list-card">
                    <div className="product-list-card-search">
                        <div style={{float: 'left'}}>
                            <BaseForm
                                label={this.state.label}
                                data={this.data}
                                show={false}
                                handleSearch={this.handleSearch}
                                clickSelect={this.clickSelect}
                            />
                        </div>
                        <div style={{float: 'left'}}>
                            <Button type="primary"
                                    onClick={this.createGroup}>创建分组
                            </Button>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
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
                </div>
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
                <AddGroup onRef={this.addGroupRef} requestList={()=>this.requestList()} title='创建分组'></AddGroup>
                <AddLabel onRef={this.addLabelRef} setSearchLabel={this.setSearchLabel}></AddLabel>
            </div>
        )
    }
}

