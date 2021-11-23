import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import {getDeviceGroupList} from "../../../../api/api";
import AddDeviceToGroup from "./addDeviceToGroup";

const {TextArea} = Input
const FormItem = Form.Item

export default class DeviceInfoGroupTabPane extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
    }
    state = {
        rowSelection: false,
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
        baseModelContent: '',
        detail: {},
        title: ''
    }

    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }
    addDeviceToGroupRef = (ref) => {
        this.addDeviceToGroupRefChild = ref
    }
    addDeviceToGroup = () => {
        this.addDeviceToGroupRefChild.showDrawer();
    }
    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getDeviceGroupList(params).then(res => {
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
    showDeviceGroup=()=>{
        alert("查看");
    }
    render() {
        const columns = [
            {
                title: '设备所在分组',
                dataIndex: 'groupName',
                align: 'left'
            },
            {
                title: '分组ID',
                dataIndex: 'groupId',
                align: 'left',
            },
            {
                title: '添加时间',
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
                                <div className="option-button" onClick={this.showDeviceGroup.bind(this, item)}>查看</div>
                            </div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="function-search-from" style={{float: 'right'}}>

                    <div className='product-function-mode-manager'>
                        <div className="product-mode-right-option">
                            <div className="add-stand-function" onClick={this.addDeviceToGroup}>
                                <div><IconFont
                                    type='icon-jiahao' className="icon-font-offset-px"/>添加设备
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
                <AddDeviceToGroup title={'添加设备到'} onRef={this.addDeviceToGroupRef}></AddDeviceToGroup>
            </div>
        )
    }
}

