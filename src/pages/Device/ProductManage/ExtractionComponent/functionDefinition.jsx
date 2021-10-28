import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import BaseModel from "../../../../common/BaseModel";
import Etable from "../../../../common/Etable";
import {messageGlobal, updateSelectedItem} from "../../../../utils";
import './../index.less'
import {
    deleteProductModel,
    getProductModelInfo,
    getProductModelList,
} from "../../../../api/api";

const {TextArea} = Input
const FormItem = Form.Item

class FunctionDefinition extends React.Component {
    params = {
        page: 1,
        pageSize: 10
    }
    data = [
        {
            type: 'select',
            initialValue: '0',
            placeholder: '',
            list:[{id: '0', value: '0',label:'功能类型（全部）'},{id: '1', value: '1',label:'属性类型'}, {id: '2', value: '2',label:'事件类型'}, {id: '3', value: '3',label:'服务类型'}],
            field: 'power',
            width: '160px'
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
        rowSelection: {
            selectedRowKeys: [],
            selectedRows: [],
        },
        pagination: {
            showSizeChanger: true,
            showQuickJumper: true,
            hideOnSinglePage: false,
            pageSizeOptions: ['10', '20', '30'],
            pageSize: this.params.pageSize,
            current: this.params.page,
            total: 0,
            onChange: (page, pageSize) => this.changePage(page, pageSize),
            showTotal: (total) => `共${total}条`,
        },
        type: 'checkbox',
        list: [],
        visibleBaseModel:false,
        baseModelContent:'',
        detail: {},
        title: ''
    }
    componentDidMount() {
        this.props.onRef(this);
        setTimeout(()=>{
            this.requestList();
        },1000)
    }
    callBackFatherMethod = () => {
        this.props.addCustomFeatures();
    }
    callBackAddStandardFeatures = () => {
        this.props.addStandardFeatures();
    }
    callBackImportModelMethod = () => {
        this.props.importModelFrom();
    }
    batchDelete = () => {
        this.setState({
            visibleBaseModel:true,
            baseModelContent:'是否批量删除？'
        })
    }
    showFunctionDefinition = (item,state) => {
        let  params= {
            productId:this.props.productInfo.id,
            fieldType:item.fieldTypeId,
            fieldId:item.fieldId,
            type:item.type
        }
        getProductModelInfo(params).then(res => {
            if (res.status === '1'&&res.result!=null) {
                res.result.fieldTypeId=item.fieldTypeId;
                res.result.fieldId=item.fieldId;
                res.result.productId=this.props.productInfo.id;
                this.props.addCustomFeatures(res.result,state)
            }else{

            }
        })
    }
    deleteFunctionDefinition=(item)=>{
        this.setState({
            modelInfo:item,
            visibleBaseModel:true,
            baseModelContent:'是否删除？'
        })
    }
    handleSearch = (data) => {
        this.setState({
            fildName:data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    changeSelect = (data) => {
        this.setState({
            fildType:data==0?"":data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
    }
    //请求列表
    requestList=()=> {
        let  params= {
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            'map[productId]':this.props.productInfo.id,
            'map[fildType]':this.state.fildType,
            'map[fildName]':this.state.fildName
        }
        getProductModelList(params).then(res => {
            if (res.status === '1'&&res.result!=null) {
                let dataSource = res.result.resultList.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource,
                    pagination: {
                        showSizeChanger: true,
                        showQuickJumper: true,
                        hideOnSinglePage: false,
                        pageSizeOptions: ['10', '20', '30'],
                        pageSize: this.params.pageSize,
                        current: this.params.page,
                        total: res.result.recordCount,
                        onChange: (page, pageSize) => this.changePage(page, pageSize),
                        showTotal: (total) => `共${total}条`,
                    }
                })
            }else{
                this.setState({
                    dataSource:[],
                    pagination:{
                        total:0
                    }
                })
            }
        })
    }
    deleteModel(){
        let params={
            productId:this.props.productInfo.id,
            fieldId:this.state.modelInfo.fieldId,
            fieldType:this.state.modelInfo.fieldTypeId
        }
        deleteProductModel(params).then(res => {
            if (res.status === '1') {
                messageGlobal('success',res.msg)
                this.requestList();
            }
        })
    }
    submitOk=()=>{
        this.setState({
            visibleBaseModel:false
        })
        this.deleteModel()
    }
    submitCancel=()=>{
        this.setState({
            visibleBaseModel:false
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
                title: '功能类型',
                dataIndex: 'fieldType',
                align: 'left'
            },
            {
                title: '功能名称',
                dataIndex: 'name',
                align: 'left',
            },
            {
                title: '标识符',
                dataIndex: 'identifier',
                align: 'left',
            },
            {
                title: '数据类型',
                dataIndex: 'type',
                align: 'left',
            },
            {
                title: '数据值定义',
                dataIndex: 'dataInfo',
                align: 'left',
            },
            {
                title: '读写类型',
                dataIndex: 'accessMode',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={()=>this.showFunctionDefinition(item,false)}>查看</div>
                            <div className="split"></div>
                            <div className="option-button" onClick={()=>this.showFunctionDefinition(item,true)}>编辑</div>
                            <div className="split"></div>
                            <div className="option-button" onClick={()=>this.deleteFunctionDefinition(item)}>删除</div>
                        </div>
                    )
                }
            }
        ];
        return (
            <div>
                <div className='product-function-mode-manager'>
                    <div className="product-function-mode-title">物模型管理</div>
                    <div className="product-mode-right-option">
                        <div className="add-stand-function" style={{marginRight: "10px"}}
                             onClick={this.callBackAddStandardFeatures}>
                            <div><IconFont
                                type='icon-jiahao' className="icon-font-offset-px"/>添加标准功能点
                            </div>
                        </div>
                        <div className="add-stand-function" onClick={this.callBackFatherMethod}>
                            <div><IconFont type='icon-jiahao' className="icon-font-offset-px"/>添加自定义功能点</div>
                        </div>
                        <div className="import-mode" onClick={this.callBackImportModelMethod}>
                            <div><IconFont type='icon-daochuwumoxing' className="icon-font-offset-px"/>导入物模型</div>
                        </div>
                        <div className="batch-delete" onClick={this.batchDelete}>
                            <div><IconFont type='icon-a-shanchucopy' className="icon-font-offset-px"/>删除</div>
                        </div>
                    </div>
                </div>
                <div className="function-search-from">
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                        show={false}
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

export default FunctionDefinition;
