import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import IconFont from '../../../../utils/IconFont';
import GroupDeviceList from "../GroupExtractionComponent/groupDeviceList"
import GroupSubscrList from "../GroupExtractionComponent/groupSubscrList"
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../../utils";
import AddGroup from '../AddGroup'
import '../../ProductManage/index.less'
import * as qs from "qs";
import {getDeviceGroupInfo, getDeviceInfo} from "../../../../api/api";
import AddLabel from "../../ProductManage/ExtractionComponent/addLabel";

const {TabPane} = Tabs;
const FormItem = Form.Item
export default class Permission extends React.Component {
    state = {
        deviceGroupInfo: {
            labelList:[]
        },
        id:"",
    }

    componentDidMount() {
        const deviceGroupInfo = qs.parse(this.props.location.search,{ignoreQueryPrefix: true});
        let params={
            id:deviceGroupInfo.id
        }
        this.getDeviceGroupInfo(params);
        setTimeout(()=>{
            this.groupDeviceListRefChild.requestList();
        },900)
    }
    getDeviceGroupInfo=(params)=>{
        getDeviceGroupInfo(params).then(res => {
            if (res.status === '1') {
                this.setState({
                    deviceGroupInfo:res.result
                })
            }
        })
    }
    addGroupRef = (ref) => {
        this.addGroupRefChild = ref
    }
    addLabelRef = (ref) => {
        this.addLabelRefChild = ref
    }
    groupDeviceListRef = (ref) => {
        this.groupDeviceListRefChild=ref;
    }
    addTag = () => {

        this.addLabelRefChild.addTag()
    }
    editTag = () => {
        this.addLabelRefChild.editTag(this.state.deviceGroupInfo.labelList,this.state.deviceGroupInfo.id,'deviceGroupLabel')
    }
    goBackPreviousPage = () => {
        this.props.history.go(-1)
    }
    editGroup = () => {
        this.addGroupRefChild.showDrawer()
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
                        "path": "/user/device/group",
                        "pathName": "device-group",
                        "name": "设备分组",
                        "icon": "iconxiangmu",
                        "children": null,
                        "redirect": null
                    },
                    {
                        "path": "/user/device/group/info",
                        "pathName": "group-info",
                        "name": "分组详情",
                        "icon": "iconxiangmu",
                        "show": false,
                        "children": null,
                        "redirect": null
                    },

                ],
                "redirect": "/user/device/product"
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
                                    <span className='title-desc'>分组信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editGroup}> 编辑</span>
                                </div>
                            </div>
                            <div className='card-top-spilt-line'></div>
                            <div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>分组名称：{this.state.deviceGroupInfo.name}</div>
                                    <div>设备总数：{this.state.deviceGroupInfo.deviceCount}</div>
                                    <div>创建时间：{this.state.deviceGroupInfo.createTime}</div>
                                    <div>分组描述：{this.state.deviceGroupInfo.remark}</div>
                                </div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>分组层级：{"--"}</div>
                                    <div>激活设备：{this.state.deviceGroupInfo.activCount}</div>
                                    <div></div>
                                </div>
                                <div className='product-filed-item'>
                                    <div>分组ID：{this.state.deviceGroupInfo.id}</div>
                                    <div>当前在线：{this.state.deviceGroupInfo.onlineCount}</div>
                                </div>
                            </div>
                            <div style={{padding: '10px 0px'}}>
                                <div className='card-title tag-title' style={{float: 'unset'}}>
                                    <span className='title-desc'>标签信息</span>
                                    <IconFont style={{fontSize: '15px', color: '#2979E7', marginRight: '7px'}}
                                              type='icon-a-bianjicopy'/>
                                    <span className='edit-card-title-option' onClick={this.editTag}> 编辑</span>
                                </div>
                                <div style={{float: 'left', margin: '5px 0px'}}>分组标签：</div>
                                <div className='product-tag-list'>
                                    {
                                        this.state.deviceGroupInfo.labelList.map((item,index)=>{
                                            return   <div className='tag-name' >{item.key+' : '+item.value}</div>
                                        })

                                    }
                                    {
                                        this.state.deviceGroupInfo.labelList.length==0&&
                                        <div>无标签信息</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <Tabs id="product-info-tabs-id" className="product-info-tabs" type="card">
                    <TabPane tab="设备列表" key="1">
                        <GroupDeviceList deviceGroupInfo={this.state.deviceGroupInfo} onRef={this.groupDeviceListRef} getDeviceGroupInfo={()=>this.getDeviceGroupInfo({id:this.state.deviceGroupInfo.id})}></GroupDeviceList>
                    </TabPane>
                    <TabPane tab="分组订阅" key="2">
                        <GroupSubscrList></GroupSubscrList>
                    </TabPane>
                </Tabs>
                <AddGroup onRef={this.addGroupRef} title='编辑分组' deviceGroupInfo={this.state.deviceGroupInfo}></AddGroup>
                <AddLabel onRef={this.addLabelRef}
                          getProductLabelList={()=>this.getDeviceGroupInfo({id:this.state.deviceGroupInfo.id})}></AddLabel>
            </div>
        )
    }
}

