import React from "react";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import { getDeviceTabEventInfoList} from "../../../../api/api";

export default class EventRecordTabPane extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            initialValue: '',
            placeholder: '',
            list: [{id:'',label:'事件类型（全部）'},{id: 'info', label: '信息'}, {id: 'alert', label: '告警'},{id:'error',label:'故障'}],
            field: 'filedType',
            width: '130px'
        },
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
            field: 'identifier',
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
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[deviceId]":this.props.deviceInfo.id,
            "map[productId]":this.props.deviceInfo.productId,
            "map[startTime]":this.state.startTime,
            "map[endTime]":this.state.endTime,
            "map[type]":this.state.filedType,
            "map[identifier]":this.state.identifier,
        }
        getDeviceTabEventInfoList(params).then(res => {
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
    handleSearch = (data) => {
        this.setState({
            identifier:data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    changeSelect = (data) => {
        this.setState({
            filedType:data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
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
                title: '事件类型',
                dataIndex: 'type',
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
                        changeRangePicker={this.changeRangePicker}
                        changeSelect={this.changeSelect}
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

