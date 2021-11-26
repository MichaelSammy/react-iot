import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio,Drawer} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import ModelDetails from  "../ExtractionComponent/modelDetails";
import './../index.less'
import { getProductTypeList, getSysDictList} from "../../../../api/api";

const FormItem = Form.Item

class SelectProductCategory extends React.Component {
    params = {
        page: 1,
        pageSize: 10,
    }
    data = [
        {
            type: 'select',
            initialValue: null,
            label: '',
            placeholder: '请选择行业',
            list: [],
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
        detail: {},
        title: '',
        productCategoryInfo:{}
    }
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
    showMode= (item) => {
        this.setState({
            productCategoryInfo:item
        })
        this.modelDetailsChildRef.showDrawer()
    }
    componentDidMount() {
        this.props.onRef(this);
        this.getProductCategory();
        this.requestList();
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
    getProductCategory(){
        let params={
            type:"iot_industry_name"
        }
        getSysDictList(params).then(res => {
            if (res.status === '1' && res.result != null) {
                // res.result.forEach((item,index)=>{
                //     res.result[index].label=item.name
                // })
                res.result.push({
                    "id": null,
                    "label": "全部行业",
                    "value": null
                })
                res.result.reverse();
                this.data[0].list=res.result
            }
        })
    }
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
    changeSelect=(item)=>{
        this.setState({
            industryId:item
        })
        setTimeout(()=>{
            this.requestList();
        },100)
    }
    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize,
            "map[searchKeyword]":this.state.name,
            "map[industryName]":this.state.industryId
        }
        getProductTypeList(params).then(res => {
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
    render() {
        const columns = [
            {
                title: '产品类别',
                dataIndex: 'productType',
                align: 'left'
            },
            {
                title: '行业名称',
                dataIndex: 'industryName',
                align: 'left',
            },
            {
                title: '应用场景',
                dataIndex: 'appScenario',
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
                    id='selectProductCategory'
                >
                    <div className="product-drawer-topic-info">
                        <div style={{width: '7%', float: 'left'}}>
                            <IconFont style={{fontSize: '20px', color: '#2979E7'}}
                                      type='icon-gantanhao'/>
                        </div>
                        <div style={{width: '93%', float: 'right', wordBreak: 'break-all'}}>
                            若无满足条件的产品模版，您可以选择其他类别。同时可通过主页面右下角的用户建议功能，将新产品类别反馈给我们。
                        </div>

                    </div>
                    <div style={{width:'100%'}}>
                    <BaseForm
                        data={this.data}
                        handleSearch={this.handleSearch}
                        changeSelect={this.changeSelect}
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
                <ModelDetails  onRef={this.modelDetailsRef} productCategoryInfo={this.state.productCategoryInfo} style={{marginRight:'560px',position:'absolute'}}></ModelDetails>
            </div>
        )
    }
}

export default SelectProductCategory
