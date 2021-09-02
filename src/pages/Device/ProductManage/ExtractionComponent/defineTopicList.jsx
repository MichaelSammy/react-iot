import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../utils/request";
import './../index.less'
import DefineTopicClass from "./defineTopicClass";

const {TextArea} = Input
const FormItem = Form.Item

class DefineTopicList extends React.Component {
    // fromModeRef = React.createRef();
    params = {
        page: 1,
        pageSize: 5
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
            placeholder: '查询',
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
        type: '',
        list: [],
        defineTopicVisible: false,
        detail: {},
        title: ''
    }
    onRef = (ref) => {
        this.child = ref
    }

    componentDidMount() {
        this.requestList();
    }

    addDefineTopicClass = () => {

    }
    editDefineTopic = () => {
        alert(2)
    }
    //请求列表
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

    saveSubmit = () => {
        this.child.saveSubmit();
    }
    closeSubmit = () => {
        this.setState({
            defineTopicVisible: false
        })
        this.child.closeSubmit()
    }
  
    addDefineTopicClass = () => {
        this.setState({
            detail: {},
            defineTopicVisible: true,
            title: '定义Topic类'
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
                title: '订阅类型',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '订阅消息',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '创建时间',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.editDefineTopic.bind(this, item)}>编辑</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className="add-topic-class" onClick={this.addDefineTopicClass}>定义Topic类</div>
                <Etable
                    that={this}
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowSelection={this.state.rowSelection}
                    updateSelectedItem={updateSelectedItem.bind(this)}
                    pagination={this.state.pagination}
                    type={this.state.type}
                >
                </Etable>,
                {
                    this.state.defineTopicVisible &&
                    <Modal
                        title={this.state.title}
                        visible={this.state.defineTopicVisible}
                        onCancel={this.closeSubmit}
                        onOk={this.saveSubmit}
                        centered
                        footer={[
                            <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                            <Button key="back" onClick={this.closeSubmit}>取消</Button>
                        ]}
                    >
                        <DefineTopicClass detail={this.state.detail} onRef={this.onRef}> </DefineTopicClass>
                    </Modal>
                }
            </div>
        )
    }
}

export default DefineTopicList;
