import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio,Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import ModelDetails from  "../ExtractionComponent/modelDetails";
import request from "../../../../utils/request";
import './../index.less'

const FormItem = Form.Item

class SelectProductCategory extends React.Component {
    modelDetailsRef= (ref) => {
        this.modelDetailsChildRef = ref
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
    selectProduct= () => {

    }
    showMode= () => {
        this.modelDetailsChildRef.showDrawer()
    }
    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }
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
            pageSize:this.params.pageSize,
            current:this.params.page,
            total: this.params.total,
            onChange:(page,pageSize)=>this.changePage(page,pageSize),
            showTotal: (total) => `共${total}条`,
        },
        list: [],
        roleVisible: false,
        perVisible: false,
        authVisible: false,
        checkedKeys: [],
        targetKeys: [],
        detail: {},
        title: ''
    }
    changePage=(page,pageSize)=>{
        this.params.page=page;
        this.params.pageSize=pageSize;
        this.setState({
            pagination:{
                current: page,
                pageSize:pageSize,
                showSizeChanger: true,
                showQuickJumper: true,
                hideOnSinglePage: false,
                pageSizeOptions: ['10', '20', '30'],
                total: this.params.total,
                onChange:(page,pageSize)=>this.changePage(page,pageSize),
                showTotal: (total) => `共${total}条`,
            }
        })
        this.requestList()
    }
    //请求列表
    requestList() {
        request({
            url: '/user/list',
            type: 'get',
            params: {
                page:  this.params.page,
                pageSize: this.params.pageSize
            }
        }).then(res => {
            if (res.code === 1) {
                // let dataSource = res.data.map((item, index) => {
                //     item.key = index;
                //     return item;
                // });
                this.params.total=12;
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
    data = [
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '模拟类型：自定义',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            // width: '516px',
        },
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
            // width: '100vw',
        }
    ]
    render() {
        const columns = [
            {
                title: '产品类别',
                dataIndex: 'roleName',
                align: 'left'
            },
            {
                title: '行业名称',
                dataIndex: 'officeName',
                align: 'left',
            },
            {
                title: '应用场景',
                dataIndex: 'createUser',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                width:'200px',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.selectProduct.bind(this, item)}>选择</div>
                            <div className="option-button" onClick={this.showMode.bind(this, item)}>查看标准物模型</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <Drawer
                    title={this.props.title}
                    width={560}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div className="product-drawer-close">
                            <div onClick={this.onClose} type="primary">
                                关闭
                            </div>
                        </div>
                    }
                    id='selectProductCategory'
                >
                    <div className="product-drawer-topic-info">若无满足条件的产品模版，您可以选择其他类别。同时可通过主页面右下角的用户建议功能，将新产品类别反馈给我们。</div>
                    <div style={{width:'100%'}}>
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
                </Drawer>
                <ModelDetails  onRef={this.modelDetailsRef} style={{marginRight:'560px',position:'absolute'}}></ModelDetails>
            </div>
        )
    }
}

export default SelectProductCategory
