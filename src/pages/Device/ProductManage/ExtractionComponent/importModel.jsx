import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio,Drawer,Upload} from "antd";
import IconFont from "../../../../utils/IconFont";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'

const FormItem = Form.Item

class ImportModel extends React.Component {
    state = {
        visible: false,
        list: [],
        detail: {},
        title: ''
    }
    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };
    onSubmit= () => {
        this.setState({
            visible: false,
        });
    }
    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
    }

    //请求列表
    requestList() {

    }
    render() {
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 16}
        }
        const detail ={
            loginName:''
        }
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
                            <Button onClick={this.onSubmit} type="primary" style={{marginRight: 8}}>
                                确定
                            </Button>
                            <Button onClick={this.onClose}>
                                取消
                            </Button>

                        </div>
                    }
                    id='selectProductCategory'
                >
                    <div className="product-drawer-topic-info" style={{lineHeight:'40px'}}>
                        <div style={{width: '7%', float: 'left'}}>
                            <IconFont style={{fontSize: '20px', color: '#2979E7'}}
                                      type='icon-gantanhao'/>
                        </div>
                        <div style={{width: '93%', float: 'right', wordBreak: 'break-all'}}>
                            导入物模型会覆盖原有的全部功能点
                        </div>

                    </div>
                    <div style={{width:'100%'}}>
                        <Form ref={this.fromModeRef} layout="vertical">
                            <FormItem label="产品名称"
                                      name="loginName"
                                      initialValue={detail.loginName}
                                      rules={[
                                          {
                                              required: true,
                                              message: '请输入产品名称'
                                          },
                                      ]}{...formItemLayout}>
                                <div  style={{float:'left',color:'#666666'}}>
                                    <Upload>
                                        <Button>上传文件</Button>
                                    </Upload>
                                </div>
                                    <div className="upload-button-desc">支持json格式：体积小于256KB</div>
                            </FormItem>
                        </Form>
                    </div>
                </Drawer>
            </div>
        )
    }
}

export default ImportModel
