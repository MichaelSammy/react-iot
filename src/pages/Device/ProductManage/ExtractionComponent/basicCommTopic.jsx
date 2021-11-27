import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import {selectProductTopics} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

class BasicCommTopic extends React.Component {
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
        type: '',
        list: [],
        detail: {},
        title: ''
    }

    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    editBasicCommTopic = () => {
        alert(2)
    }

    //请求列表
    requestList() {
        let  params= {
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[productId]":this.props.productInfo.id,
            "map[productKey]":this.props.productInfo.productKey,
            "map[topicType]":1
        }
        selectProductTopics(params).then(res => {
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

    data = [
        {
            type: 'select',
            initialValue: '1',
            placeholder: '',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
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
                title: '功能',
                dataIndex: 'topicFunction',
                align: 'left'
            },
            {
                title: 'Topic类',
                dataIndex: 'topicName',
                align: 'left',
            },
            {
                title: '操作权限',
                align: 'left',
                render:(item)=>{
                    return(
                        <div>
                            {item.accessMode==1?'发布':(item.accessMode==2?'订阅':"发布和订阅")}
                        </div>
                    )
                }
            },
            {
                title: '描述',
                dataIndex: 'remark',
                align: 'left',
            }
        ];
        return (
            <div>
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

export default BasicCommTopic;
