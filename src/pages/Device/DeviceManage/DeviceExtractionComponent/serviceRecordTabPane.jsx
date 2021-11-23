import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'
import {getDeviceTabEventInfoList, getDeviceTabServerInfoList, getUserList} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

export default class ServiceRecordTabPane extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'rangePicker',
            initialValue: '1',
            placeholder: '',
            field: 'rangeTime',
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
        getDeviceTabServerInfoList(params).then(res => {
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
                title: '时间',
                dataIndex: 'monitorTime',
                align: 'left'
            },
            {
                title: '标识符',
                dataIndex: 'identifier',
                align: 'left',
            },
            {
                title: '事件名称',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '输入参数',
                dataIndex: 'inData',
                align: 'left',
            },
            {
                title: '输出参数',
                dataIndex: 'outData',
                align: 'left',
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
            </div>
        )
    }
}

