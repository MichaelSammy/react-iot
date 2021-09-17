import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer, DatePicker} from "antd";
import './../index.less'
import moment from 'moment';
import IconFont from "../../../../utils/IconFont";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../utils/request";
import * as echarts from 'echarts';

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item
const {RangePicker} = DatePicker;
export default class DeviceHistoryData extends React.Component {
    fromModeRef = React.createRef();
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
        type: '',
        list: [],
        visible: false,
        selectTabIndex: '1',
        detail: {},
        title: ''
    }

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        setTimeout(()=>{
            this.echartsData()
        },600)
    };
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    requestList() {
        request({
            url: '/user/list',
            type: 'get',
            params: {
                page: this.params.page,
                pageSize: this.params.pageSize
            }
        }).then(res => {
            if (res.code === 1) {
                this.params.total = 12;
                let dataSource = [
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                    {
                        roleName: '超级管理员',
                        officeName: '物联网部门 ',
                        createUser: '张三',
                        createTime: '2021-07-26 16:56:21',
                        'remark': '备注'
                    },
                ];
                dataSource = dataSource.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource
                })
            }
        })
    }

    selectChartsOrList = (index) => {
        this.setState({
            selectTabIndex: index,
            showScript: true,
            showResult: false,
        })
        // if(index=='1'){
        //     this.echartsData()
        // }
    }
    echartsData(){
        let myChart = echarts.init(document.getElementById("main"))
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
            }]
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
                title: '属性名称',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '标识符',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '当前值',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '时间',
                dataIndex: 'createUser',
                align: 'left',
            }
        ];
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onCancel={this.onClose}
                    width={1000}
                    centered
                    footer={[]}
                >
                    <div>
                        <div>
                            <div className="history-data-table-title">
                                <div className="history-data-filed-desc">属性名称：基站定位</div>
                                <div className="history-data-filed-desc">标识符：$OneNET_LBS</div>
                                <div className="history-data-filed-desc">数据类型：array</div>
                            </div>
                            <div className="history-data-search-refresh">
                                <div><RangePicker
                                    ranges={{
                                        Today: [moment(), moment()],
                                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    }}
                                    showTime
                                    format="YYYY/MM/DD HH:mm:ss"
                                    //  onChange={onChange}
                                /></div>
                                <div className="history-data-function-button">
                                    <div
                                        className={this.state.selectTabIndex == '1' ? 'history-data-charts-list-selected' : 'history-data-charts-list-unselected'}
                                        onClick={() => this.selectChartsOrList('1')}>图表
                                    </div>
                                    <div
                                        className={this.state.selectTabIndex == '2' ? 'history-data-charts-list-selected' : 'history-data-charts-list-unselected'}
                                        onClick={() => this.selectChartsOrList('2')}>列表
                                    </div>
                                    <div className="history-data-refresh"><IconFont
                                        type='icon-shuaxinicon' className="icon-font-offset-px"/><span>刷新</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="history-data-charts-list">
                            {this.state.selectTabIndex == '2' && <Etable
                                that={this}
                                dataSource={this.state.dataSource}
                                columns={columns}
                                rowSelection={this.state.rowSelection}
                                updateSelectedItem={updateSelectedItem.bind(this)}
                                pagination={this.state.pagination}
                                type={this.state.type}
                            >
                            </Etable>
                            }
                            <div id="main" style={{ width: 1000, height: 400, display:this.state.selectTabIndex=='1'?'':'none'}}></div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

