import React from "react";
import BaseForm from '../../../../common/BaseForm'
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer,Checkbox} from "antd";
import './../index.less'
import IconFont from '../../../../utils/IconFont';
class AddStandardFeatures extends React.Component {
    state = {
        visible: false,
    }
    data = [
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '请选择产品标签',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '370px'
        }]
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
    onSubmit= () => {
        this.setState({
            visible: false,
        });
    };
    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    requestList() {

    }

    render() {
        return (
            <div>
                <Drawer
                    title="添加标准功能点"
                    width={860}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    footer={
                        <div
                            style={{
                                textAlign: 'right',
                            }}
                        >
                            <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}>
                                添加
                            </Button>
                            <Button onClick={this.onClose}>
                                关闭
                            </Button>

                        </div>
                    }
                >
                <div className="add-standard-function">
                    <div className="function-left-list">
                        <div className="to-be-add-function-list">功能点列表：</div>
                        <BaseForm
                            data={this.data}
                            show={false}
                            handleSearch={this.handleSearch}
                            clickSelect={this.clickSelect}
                        />
                        <div className="function-card">
                            <div className="add-function-list-title">
                                <div>
                                    <Checkbox className="function-checkbox"></Checkbox>
                                <div className="function-name">地理位置</div>
                                <div className="function-attribute">属性</div>
                                </div>
                                <div className="show-function-info">查看</div>
                            </div>
                            <div className="function-params">$GeoLocation</div>
                        </div>
                    </div>
                    <div className="function-right-list">
                        <div className="select-function-list flex-box">
                            <div>已选择要添加的功能点：</div>
                            <div className="show-function-info">全部取消选择</div>
                        </div>
                        <div className="function-card cancel-margin">
                            <div className="add-function-list-title">
                                <div>
                                    <Checkbox className="function-checkbox"></Checkbox>
                                    <div className="function-name">地理位置</div>
                                    <div className="function-attribute">属性</div>
                                </div>
                                <div>
                                    <div className="show-function-info"><span>查看</span>
                                    <IconFont
                                        style={{fontSize: '14px', color: '#666666',marginLeft:'12px'}}
                                        type='icon-guanbianniu'/></div>
                                </div>
                            </div>
                            <div className="function-params">$GeoLocation</div>
                        </div>
                    </div>
                </div>
                </Drawer>
            </div>
        )
    }
}

export default AddStandardFeatures
