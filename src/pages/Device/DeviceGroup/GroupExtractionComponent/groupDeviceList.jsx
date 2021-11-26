import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Switch} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import AddDeviceToGruop from "./addDeviceToGruop";
import {getDeviceList, getProductDropDownList, getUserList, selectDeviceListByGroupId} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

class GroupDeviceList extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            initialValue: null,
            label: '',
            placeholder: '全部产品',
            list: [],
            field: 'power',
            width: '130px'
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
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
        // this.props.onRef(this);
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
            }
        })
    }
    callBackFatherMethod = () => {
        this.setState({
            addDeviceToGroupModel: true,
        })
    }

    batchDelete = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否批量删除？'
        })
    }
    showDevice = () => {
        alert(2)
    }
    removeDevice = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否移除设备？'
        })
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
        selectDeviceListByGroupId(params).then(res => {
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
    tableColumnChange = () => {
        alert('12345');
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
                dataIndex: 'createTime',
                align: 'left',
                // render: (item) => {
                //     return (
                //         <div className="function-table-option-buttion">
                //             <div style={{width: '6px',height: '6px',background: '#FF6D6D',borderRadius:'3px',marginRight:'10px'}}></div>
                //             <div className="option-button">{item.state=='1'?'':''}</div>
                //             <div className="option-button"><Switch defaultChecked={item.state=='1'?true:false} onClick={()=>this.tableColumnChange(item,"isEnable")}/>
                //             </div>
                //         </div>
                //     )
                // }
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
                            <div className="option-button" onClick={this.removeDevice.bind(this, item)}>移除设备</div>
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
                        show={false}
                    />
                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="add-stand-function" onClick={this.callBackFatherMethod}><div><IconFont
                                type='icon-jiahao' className="icon-font-offset-px"/>添加设备</div>
                            </div>
                            <div className="batch-delete" onClick={this.batchDelete}><div><IconFont type='icon-a-shanchucopy'
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
                <AddDeviceToGruop
                    visible={this.state.addDeviceToGroupModel}
                    hideAddDviceToGroupModel={this.hideAddDviceToGroupModel}
                    title={'添加设备到分组'}
                ></AddDeviceToGruop>
            </div>
        )
    }
}

export default GroupDeviceList;
