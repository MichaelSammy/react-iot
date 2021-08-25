import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Tabs} from "antd";
import FunctionDefinition from "./functionDefinition";
import DataAnalysis from "./dataAnalysis";
import DataSubscribe from "./dataSubscribe";
import DefineTopicList from "./defineTopicList";
import BasicCommTopic from "./basicCommTopic";
import ModelCommTopic from "./modelCommTopic";

const {TextArea} = Input
const FormItem = Form.Item
const {TabPane} = Tabs;

class TopicListTab extends React.Component {
    formRefUser = React.createRef();

    componentDidMount() {
        // this.props.onRef(this)
    }

    handleSubmit = async () => {
        const form = this.formRefUser.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            console.log('成功')
            console.log(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    resetUserFrom = () => {
        const form = this.formRefUser.current;
        form.resetFields();
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 16}
        }
        const detail = this.props.detail
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
        return (
            <div>
                <Tabs id="product-info-tabs-id-child" className="product-info-tabs" type="card">
                    <TabPane tab="基础通信 Topic" key="1">
                        <BasicCommTopic></BasicCommTopic>
                    </TabPane>
                    <TabPane tab="物模型通信 Topic" key="2">
                        <ModelCommTopic></ModelCommTopic>
                    </TabPane>
                    <TabPane tab="自定义 Topic" key="3">
                        <DefineTopicList></DefineTopicList>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default TopicListTab;
