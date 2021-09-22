import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Drawer} from "antd";
import './../index.less'

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

export  default class InstructIssueInfo extends React.Component {
    fromModeRef = React.createRef();
    state = {
        visible: false,
        detail: {}
    }

    componentDidMount() {
        this.props.onRef(this);
        this.requestList()
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
        const form = this.fromModeRef.current;
        form.resetFields();
    };

    requestList() {

    }

    render() {
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 10}
        }
        const detail = {
            loginName: '',
            name: '',
            mobile: '',
            address: '',
            email: ''
        }
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
        return (
            <div>
                <Modal
                    title={this.props.title}
                    visible={this.state.visible}
                    onCancel={this.onClose}
                    onOk={this.onSubmit}
                    centered
                    footer={[
                        <Button key="back" onClick={this.onClose}>关闭</Button>
                    ]}
                >
                    <Form ref={this.fromModeRef} layout="horizontal">
                        <FormItem label="指令ID"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  {...formItemLayout}>
                            S2359N
                        </FormItem>
                        <FormItem label="指令内容"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                 {...formItemLayout}>
                            S2359N
                        </FormItem>
                        <FormItem label="返回内容"
                                  name="loginName"
                                  initialValue={detail.loginName}
                                  {...formItemLayout}>
                            S2359N
                        </FormItem>
                        <FormItem label="ttl"
                                  name="loginName"
                                  initialValue={detail.loginName}
                             {...formItemLayout}>
                            S2359N
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        )
    }
}

