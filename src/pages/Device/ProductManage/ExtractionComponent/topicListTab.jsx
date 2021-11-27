import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio, Tabs} from "antd";
import DefineTopicList from "./defineTopicList";
import BasicCommTopic from "./basicCommTopic";
import ModelCommTopic from "./modelCommTopic";

const {TextArea} = Input
const FormItem = Form.Item
const {TabPane} = Tabs;

class TopicListTab extends React.Component {
    fromModeRef = React.createRef();

    componentDidMount() {
        // this.props.onRef(this)
    }
    render() {
        return (
            <div>
                <Tabs id="product-info-tabs-id-child" className="product-info-tabs" type="card">
                    <TabPane tab="基础通信 Topic" key="1">
                        <BasicCommTopic  productInfo={this.props.productInfo}></BasicCommTopic>
                    </TabPane>
                    <TabPane tab="物模型通信 Topic" key="2">
                        <ModelCommTopic  productInfo={this.props.productInfo}></ModelCommTopic>
                    </TabPane>
                    <TabPane tab="自定义 Topic" key="3">
                        <DefineTopicList productInfo={this.props.productInfo}></DefineTopicList>
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}

export default TopicListTab;
