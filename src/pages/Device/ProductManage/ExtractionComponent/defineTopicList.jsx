import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import Etable from "../../../../common/Etable";
import {messageGlobal, updateSelectedItem} from "../../../../utils";
import './../index.less'
import DefineTopicClass from "./defineTopicClass";
import {delProductTopicsByIds, selectProductTopics} from "../../../../api/api";
import BaseModel from "../../../../common/BaseModel";

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
        type: '',
        list: [],
        defineTopicVisible: false,
        detail: {},
        title: '',
        visibleBaseModel:false,
    }
    onRef = (ref) => {
        this.child = ref
    }

    componentDidMount() {
        this.requestList();
    }
    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
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

    saveSubmit = () => {
        this.child.saveSubmit();
    }
    editDefineTopic = (item) => {
        this.setState({
            detail:item,
            defineTopicVisible: true,
            title: '定义Topic类'
        })
    }
    deleteDefineTopic=(item)=>{
        this.setState({
            modelInfo:item,
            visibleBaseModel:true,
            baseModelContent:'是否删除？'
        })
    }
    submitOk=()=>{
        this.setState({
            visibleBaseModel:false
        })
        this.deleteTopic()
    }
    submitCancel=()=>{
        this.setState({
            visibleBaseModel:false
        })
    }
    deleteTopic(){
        let params={
            ids:this.state.modelInfo.id
        }
        delProductTopicsByIds(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }
        })
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
                title: '自定义 Topic',
                dataIndex: 'topicName',
                align: 'left'
            },
            {
                title: '操作权限',
                dataIndex: 'accessMode',
                align: 'left',
            },
            {
                title: 'remark',
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
                            <div className="split"></div>
                            <div className="option-button" onClick={this.deleteDefineTopic.bind(this, item)}>删除</div>
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
                </Etable>
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
                        <DefineTopicClass detail={this.state.detail} onRef={this.onRef} closeSubmit={this.closeSubmit}> </DefineTopicClass>
                    </Modal>
                }
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
            </div>
        )
    }
}

export default DefineTopicList;
