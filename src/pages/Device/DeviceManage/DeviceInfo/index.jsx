import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import IconFont from '../../../../utils/IconFont';
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../../utils";
import DeviceAttributeTabPane from '../DeviceExtractionComponent/deviceAttributeTabPane'
import EventRecordTabPane from '../DeviceExtractionComponent/eventRecordTabPane'
import ServiceRecordTabPane from '../DeviceExtractionComponent/serviceRecordTabPane'
import InstructIssueTabPane from '../DeviceExtractionComponent/instructIssueTabPane'
import DeviceTopicListTabPane from '../DeviceExtractionComponent/deviceTopicListTabPane'
import DeviceInfoGroupTabPane from '../DeviceExtractionComponent/deviceInfoGroupTabPane'
import ChildDeviceTabPane from '../DeviceExtractionComponent/childDeviceTabPane'
import DeviceShadowTabPane from '../DeviceExtractionComponent/deviceShadowTabPane'
import EditDevice from '../EditDevice/editDevice'
import '../../ProductManage/index.less'
import * as qs from "qs";
import {getDeviceInfo} from "../../../../api/api";
import AddLabel from "../../ProductManage/ExtractionComponent/addLabel";

const {TabPane} = Tabs;
const FormItem = Form.Item
export default class Permission extends React.Component {
    state = {
        deviceInfo:{
            label:[]
        },
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    deviceAttributeRef = (ref) => {
        this.deviceAttributeRefChild = ref
    }
    addTag = () => {
        this.addLabelRefChild.addTag()
    }
    editTag = () => {
        this.addLabelRefChild.editTag(this.state.deviceInfo.label,this.state.deviceInfo.id,"deviceLabel")
    }
    componentDidMount() {
        const deviceInfo = qs.parse(this.props.location.search,{ignoreQueryPrefix: true});
        let deviceParams={
            deviceId:deviceInfo.id
        }
        this.getDeviceDetails(deviceParams);
        setTimeout(()=>{
            this.deviceAttributeRefChild.requestList();
        },900)
    }
    getDeviceDetails=(params)=>{
        getDeviceInfo(params).then(res => {
            if (res.status === '1') {
                this.setState({
                    deviceInfo:res.result
                })
            }
        })
    }
    editDeviceRef = (ref) => {
        this.editDeviceRefChild = ref
    }
    editDevice=()=>{
        this.editDeviceRefChild.showDrawer()
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
                        "pathName": "device-managent",
                        "name": "设备管理",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    },
                    {
                        "path": "/user/device/managent/info",
                        "pathName": "device-info",
                        "name": "设备详情",
                        "icon": "iconxiangmu",
                        "show": false,
                        "children": null,
                        "redirect": null
                    },

                ],
                "redirect": "/user/device/managent"
            }
        ]
        return (
            <div>
                <div className='product-list-title-background'>
                    <Breadcrumb>
                        {
                            getBreadItem(breadList)
                        }
                    </Breadcrumb>
                    <div className="product-big-title"><IconFont onClick={this.goBackPreviousPage}
                                                                 className="product-info-go-back-list"
                                                                 type='icon-fanhuijiantou'/>分组详情
                    </div>
                    <div className="product-list-title-desc">产品是一组具有相同功能定义的设备集合，创建产品是使用平台的第一步快速创建产品后可定义产品物模型、添加对应设备。
                    </div>
                    <div>
                        <div className="product-show-doc">查看文档</div>
                    </div>
                </div>
                <div style={{clear: 'both'}}></div>
                <Card className='product-card-info'>
                    <div>

                        <div className='product-info-filed' style={{width: '100%'}}>
                            <div>
                                <div className='card-title'>
                                    <span className='title-desc'>设备信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editDevice}> 编辑</span>
                                </div>
                            </div>
                            <div className='card-top-spilt-line'></div>
                            <div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>设备所属产品：{this.state.deviceInfo.productName}</div>
                                    <div>设备节点类型：{this.state.deviceInfo.nodeType}</div>
                                    <div>最近在线时间：{this.state.deviceInfo.onlieTime}</div>
                                    <div>设备密钥：{this.state.deviceInfo.deviceSecret}</div>
                                </div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>所属产品ID：{this.state.deviceInfo.productId}</div>
                                    <div>设备创建时间：{this.state.deviceInfo.createTime}</div>
                                    <div>设备描述：{this.state.deviceInfo.remark}</div>
                                </div>
                                <div className='product-filed-item'>
                                    <div>设备状态：{this.state.deviceInfo.stateName}</div>
                                    <div>激活时间：{this.state.deviceInfo.activeTime}</div>
                                </div>
                            </div>
                            <div style={{padding: '10px 0px'}}>
                                <div className='card-title tag-title' style={{float: 'unset'}}>
                                    <span className='title-desc'>标签信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editTag}> 编辑</span>
                                </div>
                                <div style={{float: 'left', margin: '5px 0px'}}>设备标签：</div>
                                <div className='product-tag-list'>
                                    {
                                        this.state.deviceInfo.label.map((item,index)=>{
                                            return   <div className='tag-name' >{item.key+' : '+item.value}</div>
                                        })

                                    }
                                    {
                                        this.state.deviceInfo.label.length==0&&
                                        <div>无标签信息</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <Tabs id="product-info-tabs-id" className="product-info-tabs" type="card">
                    <TabPane tab="属性" key="1">
                        <DeviceAttributeTabPane  deviceInfo={this.state.deviceInfo}
                                                 onRef={this.deviceAttributeRef}></DeviceAttributeTabPane>
                    </TabPane>
                    <TabPane tab="事件记录" key="2">
                        <EventRecordTabPane
                            deviceInfo={this.state.deviceInfo}
                        ></EventRecordTabPane>
                    </TabPane>
                    <TabPane tab="服务记录" key="3">
                        <ServiceRecordTabPane deviceInfo={this.state.deviceInfo}></ServiceRecordTabPane>
                    </TabPane>
                    <TabPane tab="子设备" key="4">
                        <ChildDeviceTabPane  deviceInfo={this.state.deviceInfo}></ChildDeviceTabPane>
                    </TabPane>
                    <TabPane tab="指令下发" key="5">
                        <InstructIssueTabPane  deviceInfo={this.state.deviceInfo}></InstructIssueTabPane>
                    </TabPane>
                    <TabPane tab="Topic列表" key="6">
                        <DeviceTopicListTabPane  deviceInfo={this.state.deviceInfo}></DeviceTopicListTabPane>
                    </TabPane>
                    <TabPane tab="分组" key="7">
                        <DeviceInfoGroupTabPane  deviceInfo={this.state.deviceInfo}></DeviceInfoGroupTabPane>
                    </TabPane>
                    <TabPane tab="设备影子" key="8">
                        <DeviceShadowTabPane  deviceInfo={this.state.deviceInfo}></DeviceShadowTabPane>
                    </TabPane>
                </Tabs>
                <EditDevice onRef={this.editDeviceRef} title='编辑' deviceInfo={this.state.deviceInfo}></EditDevice>
                <AddLabel onRef={this.addLabelRef}
                          getProductLabelList={this.getProductLabelList}></AddLabel>
            </div>
        )
    }
}

