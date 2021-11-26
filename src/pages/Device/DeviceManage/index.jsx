import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Pagination, Tabs} from "antd";
import BaseForm from '../../../common/BaseForm'
import BaseModel from '../../../common/BaseModel'
import device from '../../../assets/images/device.png'
import './index.less'
import './device.less'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../utils";
import DeviceListTabPane from "../DeviceManage/DeviceExtractionComponent/deviceListTabPane";
import BatchListTabPane from "../DeviceManage/DeviceExtractionComponent/batchListTabPane";
import * as qs from "qs";
import {getDeviceSummaryList, getProductDropDownList, getSysDictList} from "../../../api/api";
import EditProduct from "../ProductManage/EditProduct";
const {TabPane} = Tabs;
export default class DeviceManage extends React.Component {
    params = {
        page: 1,
        pageSize: 5
    }
    data = [
        {
            type: 'select',
            initialValue: null,
            label: '',
            placeholder: '全部产品',
            list: [],
            field: 'power',
            width: '400px'
        }
    ]
    state = {
        title: '',
        deviceStateNumber: {
            DeviceCount: "",
            onlineNum: "",
            activateNum: ""
        },
    }
    onRef = (ref) => {
        this.child = ref
    }
    batchListRef=(ref)=>{
        this.batchListChildRef = ref
    }
    //查询
    handleSearch = (data) => {
        //日期转换
        // data.beginTime= data.beginTime.format("YYYY-MM-DD HH:mm:ss");
        console.log(data)
    }
    changeSelect=(item)=>{
        this.setState({
            productId:item
        })
        setTimeout(()=>{
            this.requestList();
            this.child.requestList();
            this.batchListChildRef&&this.batchListChildRef.requestList();
        },100)
    }
    componentDidMount() {
        this.getProductList();
        this.requestList();
    }
    getProductList(){
        getProductDropDownList().then(res => {
            if (res.status === '1' && res.result != null) {
                res.result.push({
                    "id": null,
                    "label": "全部",
                    "value": null
                })
                res.result.reverse();
                this.data[0].list=res.result
            }
        })
    }
    //请求列表
    requestList() {
        let params={
            productId:this.state.productId
        }
        getDeviceSummaryList(params).then(res => {
            if (res.status === '1' && res.result != null) {
                this.setState({
                    deviceStateNumber: res.result
                })
            } else {
                this.setState({
                    deviceStateNumber: {
                        DeviceCount: "",
                        onlineNum: "",
                        activateNum: ""
                    }
                })
            }
        })
    }
    submitOk = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    forwardDeviceInfo = (item) => {
        this.props.history.push({'pathname': "/user/device/managent/info", search: qs.stringify(item)});
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }

    render() {
        const breadList = [
            {
                "path": "/user/device",
                "pathName": "device",
                "name": "设备接入与管理",
                "icon": "iconxiangmu",
                "children": [
                    {
                        "path": "/user/device/managent",
                        "pathName": "device-manage",
                        "name": "设备管理",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    }
                ],
                "redirect": "/user/device/managent"
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
                    <div className="product-big-title">设备管理</div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                    </div>
                </div>
                <div className="product-list-card">
                    <div className="device-manage-list-header">
                        <div className="device-manage-search">
                            <div className="device-manage-search-title">产品范围</div>
                            <BaseForm
                                data={this.data}
                                show={false}
                                handleSearch={this.handleSearch}
                                changeSelect={this.changeSelect}
                            />
                        </div>
                        <div className="device-state-count">
                            <div className="device-state-count-category">
                                <div className="device-state-count-picture"></div>
                                <div className="device-state-count-number">
                                    <div>{this.state.deviceStateNumber.DeviceCount}</div>
                                    <div>设备总数</div>
                                </div>
                            </div>
                            <div className="device-state-count-category">
                                <div className="device-state-count-picture"></div>
                                <div className="device-state-count-number">
                                    <div>{this.state.deviceStateNumber.onlineNum}</div>
                                    <div><span className="device-count online"></span>在线设备数</div>
                                </div>
                            </div>
                            <div className="device-state-count-category">
                                <div className="device-state-count-picture"></div>
                                <div className="device-state-count-number">
                                    <div>{this.state.deviceStateNumber.activateNum}</div>
                                    <div><span className="device-count activation"></span> 激活设备数</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <Tabs id="product-info-tabs-id" type="card">
                        <TabPane tab="设备列表" key="1">
                            <DeviceListTabPane forwardDeviceInfo={this.forwardDeviceInfo}
                                               productId={this.state.productId}
                                               onRef={this.onRef}
                            ></DeviceListTabPane>
                        </TabPane>
                        <TabPane tab="批次列表" key="2">
                            <BatchListTabPane
                                productId={this.state.productId}
                                onRef={this.batchListRef}
                            ></BatchListTabPane>
                        </TabPane>
                    </Tabs>

                </div>
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

