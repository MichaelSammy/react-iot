import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'
import {getUserList} from "../../../../api/api";

const FormItem = Form.Item

class ModelDetails extends React.Component {

    params = {
        page: 1,
        pageSize: 10,
    }
    state = {
        rowSelection: false,
        visible: false,
        pagination: {
            showSizeChanger: true,
            type: '',
            showQuickJumper: true,
            hideOnSinglePage: false,
            pageSizeOptions: ['10', '20', '30'],
            // defaultCurrent: 1,
            pageSize: this.params.pageSize,
            current: this.params.page,
            total: this.params.total,
            onChange: (page, pageSize) => this.changePage(page, pageSize),
            showTotal: (total) => `共${total}条`,
        },
        list: [],
        detail: {},
        title: ''
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
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
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getUserList(params).then(res => {
            if (res.code === 1) {
                // let dataSource = res.data.map((item, index) => {
                //     item.key = index;
                //     return item;
                // });
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

    data = []

    render() {
        const columns = [
            {
                title: '功能类型',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '功能名称',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '标识符',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '数据类型',
                dataIndex: 'createUser',
                align: 'left',
            }
        ];
        return (
            <div style={{marginRight: '560px', position: 'absolute'}}>
                {this.state.visible==true && <Drawer
                    title='标准物模型定义详情'
                    width={560}
                    height={300}
                    style={{marginRight: '560px', position: 'absolute'}}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    placement={'right'}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onClose}>
                                关闭
                            </Button>

                        </div>
                    }
                >
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
                </Drawer>
                }
            </div>
        )
    }
}

export default ModelDetails
