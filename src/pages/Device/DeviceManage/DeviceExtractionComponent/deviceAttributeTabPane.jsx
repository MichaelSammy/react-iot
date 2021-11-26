import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import IconFont from '../../../../utils/IconFont';
import request from '../../../../api/request'
import '../DeviceInfo/deviceInfo.less'
import DeviceHistoryData from './deviceHistoryData'
import {getDeviceBatchList, getDeviceTabPropertyInfoList, getUserList} from "../../../../api/api";

const FormItem = Form.Item
export default class DeviceAttributeTabPane extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    state = {
        detail: {},
        title: ''
    }
    onRef = (ref) => {
        this.child = ref
    }
    deviceHistoryDataRef = (ref) => {
        this.deviceHistoryDataRefChild = ref
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    //请求列表
    requestList() {
        let  params= {
            page: this.params.page,
            pageSize: this.params.pageSize,
            "map[deviceId]":this.props.deviceInfo.id,
            "map[productId]":this.props.deviceInfo.productId,
        }
        getDeviceTabPropertyInfoList(params).then(res => {
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

    showHistoryData = () => {
        this.deviceHistoryDataRefChild.showDrawer()
    }

    render() {
        return (

            <div>
                <div>
                    <List
                        grid={{
                            gutter: 13,
                            xs: 4,
                            sm: 4,
                            md: 4,
                            lg: 4,
                            xl: 4,
                            xxl: 4,
                        }}
                        dataSource={this.state.dataSource}
                        renderItem={item => (
                            <List.Item>
                                <div className="device-attribute-card">
                                    <div className="device-attribute-card-title">
                                        <div>{item.name}</div>
                                        <div style={{cursor: 'pointer'}} onClick={this.showHistoryData}><IconFont
                                            type='icon-lishishujuicon'
                                            style={{color: '#666666', marginRight: '8px'}}/>历史数据
                                        </div>
                                    </div>
                                    <div>{item.value}</div>
                                    <div>{item.updateTime||"*未更新"} | {item.type} | {item.accessModeName}</div>
                                </div>
                            </List.Item>
                        )}
                    />
                    <Pagination
                        style={{textAlign: "right"}}
                        total={85}
                        showSizeChanger
                        showQuickJumper
                        showTotal={total => `共 ${total} 条`}
                    />
                </div>
                <DeviceHistoryData title={'属性历史数据'} onRef={this.deviceHistoryDataRef}></DeviceHistoryData>
            </div>
        )
    }
}

