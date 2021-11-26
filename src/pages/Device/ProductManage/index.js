import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import BaseForm from '../../../common/BaseForm'
import BaseModel from '../../../common/BaseModel'
import EditProduct from './EditProduct'
import IconFont from '../../../utils/IconFont';
import './index.less'
import {filterRoutes, getBreadItem, messageGlobal} from "../../../utils";
import AddLabel from "./ExtractionComponent/addLabel";
import {getProductList} from "../../../api/api";
import * as qs from "qs";

const FormItem = Form.Item
export default class Permission extends React.Component {
    params = {
        page: 1,
        pageSize: 6
    }
    data = [
        {
            type: 'search',
            // initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'name',
            width: '300px'
        },
        {
            type: 'select',
            initialValue: null,
            noDropDown:true,
            label: '',
            placeholder: '请选择产品标签',
            list: [{id: '1', label: '超级管理员',value:'1'}, {id: '2', label: '普通用户',value:'2'}],
            field: 'productLabel',
            width: '150px',
            open:false
        }
    ]
    state = {
        list: [],
        editProductVisible: false,
        detail: {},
        title: '',
        dataSource:[],
        cfromList:[],
        productLabel:null,
        total:0,
    }
    onRef = (ref) => {
        this.child = ref
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    //查询
    handleSearch = (data) => {
        this.setState({
            name:data
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },100)
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }
    setSearchLabel=(data)=>{
        let label=[];
        data.map((item,index)=>{
               label.push(item.key+":"+item.value)
        })
        this.setState({
            cfromList:data,
            productLabel:label.length>0?label.join(";"):null
        })
        this.params.page=1;
        setTimeout(()=>{
            this.requestList()
        },300)
    }
    clickSelect = (data) => {
        this.addLabelRefChild.filterTag(this.state.cfromList)
    }
    componentDidMount() {
        this.requestList()
    }
    prevPage=()=>{
        if(this.params.page>1){
            this.params.page= this.params.page-1;
            setTimeout(()=>{
                this.requestList()
            },500)
        }else{
            messageGlobal('warning','已经是第一页啦~');
        }
    }
    nextPage=()=>{
      let  result= this.state.total/this.params.pageSize
        if(this.params.page<result){
            this.params.page= this.params.page+1;
            setTimeout(()=>{
                this.requestList()
            },500)
        }else{
            messageGlobal('warning','已经是最后一页啦~');
        }
    }
    changePage=(page,pageSize)=>{
        this.params.page=page;
        this.params.pageSize=pageSize;
        this.requestList()
    }
    //请求列表
    requestList() {
      let  params= {
            name:this.state.name,
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            label:this.state.cfromList
        }
        getProductList(params).then(res => {
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
        this.child.handleSubmit('list');
    }
    closeSubmit = () => {
        this.child.closeSubmit()
        this.setState({
            editProductVisible: false
        })
    }
    createProduct = () => {
        this.props.history.push({'pathname': "/user/device/product/add", params: true});
    }
    editProduct = (item) => {
        this.setState({
            detail:item ,
            visibleBaseModel: false,
            baseModelContent: '',
            editProductVisible: true,
            title: '编辑'
        })
    }
    submitOk = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    deleteProduct = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？'
        })
    }
    showProductInfo = (item) => {
         this.props.history.push({ pathname: `/user/device/product/info`,  search: qs.stringify(item)})
    }
    render() {
        const list = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }, {id: '1', value: 'gold'}, {id: '2', value: 'lime'}];
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备接入与管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/product",
                        "pathName": "product-manage",
                        "name": "产品管理",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    }
                ],
                "redirect": "/user/device/product"
            }
        ]
        return (
            <div>
                <div className='product-list-title-background'>
                    {/*<div>*/}
                    <Breadcrumb>
                        {
                            getBreadItem(breadList)
                        }
                    </Breadcrumb>
                    <div className="product-big-title">产品管理</div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                    </div>
                </div>
                <div className="product-list-card">
                    <div className="product-list-card-search">
                        <div style={{float: 'left'}}>
                            <BaseForm
                                productLabel={this.state.productLabel}
                                data={this.data}
                                show={false}
                                handleSearch={this.handleSearch}
                                clickSelect={this.clickSelect}
                            />
                        </div>
                        <div style={{float: 'left'}}>
                            <Button type="primary"
                                    onClick={this.createProduct}>创建产品
                            </Button>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div>
                        <div className="product-left-arrow" onClick={()=>this.prevPage()}>
                            <IconFont style={{fontSize: '20px', color: '#ffffff'}}
                                      type='icon-jiantou-zuo'/>
                        </div>
                        <div className="product-right-arrow" onClick={()=>this.nextPage()}>
                            <IconFont style={{fontSize: '20px', color: '#ffffff'}}
                                      type='icon-jiantou-you'/>
                        </div>
                        <List
                            grid={{
                                gutter: 13,
                                xs: 3,
                                sm: 3,
                                md: 3,
                                lg: 3,
                                xl: 3,
                                xxl: 3,
                            }}
                            dataSource={this.state.dataSource}
                            renderItem={item => (
                                <List.Item>
                                    { item.productTypeId=="标准产品"&&
                                    <div className="card-tag" >标准产品</div>
                                    }
                                    <div className="card-info-height">
                                        <div className='card-title-info'>
                                            <div>
                                                <span className='title-font' onClick={()=>this.showProductInfo(item)}>{item.name}</span>
                                                <span className="split-symbol"> / </span>
                                                <span className='title-name-font'>{item.name}</span>
                                            </div>
                                            <div className='card-title-option'><span onClick={()=>this.editProduct(item)}>
                                  <IconFont style={{fontSize: '20px', color: '#89A0C2'}}
                                            type='icon-a-bianjicopy'/></span>
                                                <span onClick={this.deleteProduct}> <IconFont
                                                    style={{fontSize: '20px', color: '#89A0C2'}}
                                                    type='icon-a-shanchucopy'/></span>
                                                <span className="product-card-status"> {item.isPublish=='0'?'未发布':'已发布'}</span></div>
                                        </div>
                                        <div className='row-split-line'></div>
                                        <div className='card-content-into'>
                                            <div className='card-content-left'>
                                                <div className='card-content-left-info'>
                                                    <div>
                                                        <div>节点类型：{item.nodeType}</div>
                                                        <div>连网方式：{item.netType}</div>
                                                    </div>
                                                    <div>
                                                        <div>接入方式：{item.accessMethod}</div>
                                                        <div>通讯协议：{item.protocol}</div>
                                                    </div>
                                                </div>
                                                <div className='card-create-time'>创建时间：{item.createTime}</div>
                                            </div>
                                            <div className='column-spilt-line'></div>
                                            <div className='card-content-right'>
                                                <div className='device-count-num'>{item.num}<span
                                                    style={{fontSize: '14px', fontWeight: '500'}}></span></div>
                                                <div className='device-count-desc'>设备总数</div>
                                            </div>
                                        </div>
                                    </div>
                                </List.Item>
                            )}
                        />
                        <Pagination
                            style={{textAlign: "right"}}
                            total={this.state.total}
                            showSizeChanger
                            current={this.params.page}
                            pageSizeOptions={[6, 12, 24, 36]}
                            defaultPageSize={6}
                            onChange={(page,pageSize)=>this.changePage(page,pageSize)}
                            showQuickJumper
                            showTotal={total => `共 ${this.state.total} 条`}
                        />
                    </div>
                </div>
                {
                    this.state.editProductVisible &&
                    <Modal
                        title={this.state.title}
                        visible={this.state.editProductVisible}
                        onCancel={this.closeSubmit}
                        onOk={this.saveSubmit}
                        centered
                        footer={[
                            <Button key="submit" type="primary" onClick={this.saveSubmit}>确定</Button>,
                            <Button key="back" onClick={this.closeSubmit}>取消</Button>
                        ]}
                    >
                        <EditProduct
                            detail={this.state.detail}
                            onRef={this.onRef}
                            closeSubmit={this.closeSubmit}
                            requestList={()=>this.requestList()}
                        />
                    </Modal>
                }
                <AddLabel onRef={this.addLabelRef} setSearchLabel={this.setSearchLabel}></AddLabel>
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

