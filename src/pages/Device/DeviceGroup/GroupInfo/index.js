import React from "react";
import {Card, Modal, Form, Input, Button, List, Breadcrumb, Tabs} from "antd";
import IconFont from '../../../../utils/IconFont';
import GroupDeviceList from "../GroupExtractionComponent/groupDeviceList"
import GroupSubscrList from "../GroupExtractionComponent/groupSubscrList"
import request from '../../../../utils/request'
import {filterRoutes, getBreadItem, updateSelectedItem} from "../../../../utils";
import AddGroup from '../AddGroup'
import AddGroupLabel from "../GroupExtractionComponent/addGroupLabel"
import '../../ProductManage/index.less'

const {TabPane} = Tabs;
const FormItem = Form.Item
export default class Permission extends React.Component {
    state = {
        detail: {},
    }

    componentDidMount() {
        // this.requestList()
    }

    addGroupRef = (ref) => {
        this.addGroupRefChild = ref
    }
    addGroupLabelRef = (ref) => {
        this.addGroupLabelRefChild = ref
    }
    addTag = () => {
        this.addGroupLabelRefChild.addTag()
    }
    editTag = (item) => {
        this.addGroupLabelRefChild.editTag(item)
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
                "name": "设备管理",
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
                                    <div>分组名称：华北一组</div>
                                    <div>设备总数：11</div>
                                    <div>创建时间：2021-07-11 10:3</div>
                                    <div>分组描述：-</div>
                                </div>
                                <div className='product-filed-item product-filed-item-border-right'>
                                    <div>分组层级：q3O63w26Fy</div>
                                    <div>激活设备：1</div>
                                    <div></div>
                                </div>
                                <div className='product-filed-item'>
                                    <div>分组ID：M16QXXmHokos3rj</div>
                                    <div>当前在线：0</div>
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
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    <div className='tag-name'>ncknsac</div>
                                    {/*<div className='tag-option'>*/}
                                        {/*<span onClick={this.editTag}> 编辑</span>*/}
                                        {/*/<span onClick={this.addTag}>添加</span></div>*/}
                                </div>
                            </div>
                        </div>
                    </div>

                </Card>
                <Tabs id="product-info-tabs-id" className="product-info-tabs" type="card">
                    <TabPane tab="设备列表" key="1">
                        <GroupDeviceList></GroupDeviceList>
                    </TabPane>
                    <TabPane tab="分组订阅" key="2">
                        <GroupSubscrList></GroupSubscrList>
                    </TabPane>
                </Tabs>
                <AddGroup onRef={this.addGroupRef} title='编辑分组'></AddGroup>
                <AddGroupLabel onRef={this.addGroupLabelRef}></AddGroupLabel>
            </div>
        )
    }
}

