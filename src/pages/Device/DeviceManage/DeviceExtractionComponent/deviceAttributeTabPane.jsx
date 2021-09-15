import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination} from "antd";
import IconFont from '../../../../utils/IconFont';
import request from '../../../../utils/request'
import '../DeviceInfo/deviceInfo.less'
import DeviceHistoryData from './deviceHistoryData'

const FormItem = Form.Item
export default class DeviceAttributeTabPane extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    state = {
        list: [],
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
        this.requestList()
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
                let dataSource = res.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
                this.setState({
                    dataSource
                })
            }
        })
    }

    showHistoryData = () => {
        this.deviceHistoryDataRefChild.showDrawer()
    }

    render() {
        const list = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }, {id: '1', value: 'gold'}, {id: '2', value: 'lime'}];
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
                        dataSource={list}
                        renderItem={item => (
                            <List.Item>
                                <div className="device-attribute-card">
                                    <div className="device-attribute-card-title">
                                        <div>总累积量</div>
                                        <div style={{cursor: 'pointer'}} onClick={this.showHistoryData}><IconFont
                                            type='icon-xiugai1'
                                            style={{background: '#666666', marginRight: '8px'}}/>历史数据
                                        </div>
                                    </div>
                                    <div>-</div>
                                    <div>*未更新 | array | 只读</div>
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

