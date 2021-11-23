import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'
import InstructIssueInfo from "../../DeviceManage/DeviceExtractionComponent/instructIssueInfo";
import {getDeviceTabCommandSendList, getDeviceTabServerInfoList, getUserList} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

export default class InstructIssueTabPane extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入指令ID',
            field: 'username',
            width: '336px',
            bordered: true,
        },
        {
            type: 'rangePicker',
            initialValue: '1',
            placeholder: '',
            field: 'rangeTime',
            width: '130px'
        },
        {
            type: 'select',
            initialValue: null,
            placeholder: '请选择下发状态',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '130px'
        }
    ]
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
        title: '',
        startTime: '',
        endTime: '',
    }
    onRef=(ref)=>{
        this.child = ref
    }
    showInstructIssueInfo=()=>{
       this.child.showDrawer();
    }
    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getDeviceTabCommandSendList(params).then(res => {
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
    changeRangePicker=(val,str)=>{
        this.setState({
            startTime: str[0],
            endTime: str[1],
        });
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
                title: '设备ID',
                dataIndex: 'deviceId',
                align: 'left'
            },
            {
                title: '指令ID',
                dataIndex: 'commandId',
                align: 'left',
            },
            {
                title: '指令下发状态',
                dataIndex: 'commandState',
                align: 'left',
            },
            {
                title: '指令下发时间',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '指令完成时间',
                dataIndex: 'completeTime',
                align: 'left',
            },
            {
                title: '指令级别',
                dataIndex: 'commandLevel',
                align: 'left',
            },
            {
                title: '操作员',
                dataIndex: 'createBy',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.showInstructIssueInfo.bind(this, item)}>查看</div>
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
                        handleSearch={this.handleSearch}
                        show={false}
                    />
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
                <InstructIssueInfo  onRef={this.onRef} title={'详情'}></InstructIssueInfo>
            </div>
        )
    }
}

