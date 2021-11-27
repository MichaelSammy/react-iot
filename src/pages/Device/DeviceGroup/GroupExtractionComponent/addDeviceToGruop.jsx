import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {messageGlobal, updateSelectedItem} from "../../../../utils";
import './../index.less'
import {
    getDeviceListOutGroup,
    getProductDropDownList,
    insertDeviceToGroup,
} from "../../../../api/api";

class AddDeviceToGruop extends React.Component {
    params = {
        page: 1,
        pageSize:10
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
        detail: {},
        title: '添加设备到分组'
    }

    componentDidMount() {
        this.props.onRef(this);
        this.getProductList();
        this.requestList();
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
                this.setState({
                    list:res.result
                })
            }
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
    saveSubmit = async () => {
        this.batchDeviceToGroup();
    }
    batchDeviceToGroup=()=>{
        if(this.state.rowSelection.selectedRows.length==0){
            messageGlobal('warning',"请选择设备")
            return false;
        }
        let deviceIds=[];
        this.state.rowSelection.selectedRows.map((item,index)=>{
            deviceIds.push(
                {
                    groupId:this.props.deviceGroupInfo.id,
                    deviceId:item.id
                }
            )
        })
        insertDeviceToGroup(deviceIds).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.props.hideAddDviceToGroupModel()
                this.props.requestList();
            }
            this.setState({
                rowSelection: {
                    selectedRowKeys: [],
                    selectedRows: [],
                },
            })
        })
    }
    resetModelFrom = () => {
        this.props.hideAddDviceToGroupModel()
    }

    //请求列表
    requestList() {
        let  params= {
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[groupId]":this.props.deviceGroupInfo.id,
            "map[deviceName]":this.state.name,
            "map[productTypeId]":this.state.productId
        }
        getDeviceListOutGroup(params).then(res => {
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
                    total:0
                })
            }
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
                title: '设备名称',
                dataIndex: 'deviceName',
                align: 'left'
            },
            {
                title: '设备ID',
                dataIndex: 'id',
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
                title: '状态',
                align: 'left',
                render: (item) => {
                    return(
                        item.nodeType=="1"? "未激活":(item.nodeType=="2"?"在线":"断线")
                    )
                }
            },
        ];
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.props.visible}
                    onCancel={this.resetModelFrom}
                    onOk={this.saveSubmit}
                    width={900}
                    centered
                    footer={[
                        <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                        <Button key="back" onClick={this.resetModelFrom}>取消</Button>
                    ]}
                >
                    <div className='product-function-mode-manager'>
                        <div className="function-search-from">
                            <BaseForm
                                data={this.data}
                                handleSearch={this.handleSearch}
                                changeSelect={this.changeSelect}
                                show={false}
                                list={this.state.list}
                            />
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
                </Modal>
            </div>
        )
    }
}

export default AddDeviceToGruop;
