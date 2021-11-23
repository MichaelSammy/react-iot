import React from "react";
import Etable from "../../../../common/Etable";
import {updateSelectedItem} from "../../../../utils";
import './../index.less'
import {getDeviceBatchList} from "../../../../api/api";

class BatchListTabPane extends React.Component {
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

    editDataSubscribe = () => {
        alert(2)
    }

    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize
        }
        getDeviceBatchList(params).then(res => {
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
                title: '产品名称',
                dataIndex: 'productName',
                align: 'left'
            },
            {
                title: 'ProductKey',
                dataIndex: 'productKey',
                align: 'left',
            },
            {
                title: '添加时间',
                dataIndex: 'createTime',
                align: 'left',
            },
            {
                title: '添加数量',
                dataIndex: 'num',
                align: 'left',
            },
            {
                title: '操作',
                align: 'left',
                render: (item) => {
                    return (
                        <div className="function-table-option-buttion">
                            <div className="option-button" onClick={this.editDataSubscribe.bind(this, item)}>下载CVS</div>
                        </div>
                    )
                }
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

export default BatchListTabPane;
