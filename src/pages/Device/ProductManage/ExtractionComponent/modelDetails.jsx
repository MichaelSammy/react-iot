import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import {getDeviceList, getProductDetailList, getUserList} from "../../../../api/api";

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
            currentPage: this.params.page,
            pageSize: this.params.pageSize,
            "map[dataId]":this.props.productCategoryInfo.dataId,
        }
        getProductDetailList(params).then(res => {
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

    data = []

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
                align: 'left'
            },
            {
                title: '标识符',
                dataIndex: 'identifier',
                align: 'left',
            },
            {
                title: '数据类型',
                dataIndex: 'dataType',
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
