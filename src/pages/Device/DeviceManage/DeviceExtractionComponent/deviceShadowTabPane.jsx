import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import {updateSelectedItem} from "../../../../utils";
import request from "../../../../api/request";
import './../index.less'

const {TextArea} = Input
const FormItem = Form.Item

export default class DeviceShadowTabPane extends React.Component {
    // fromModeRef = React.createRef();
    state = {
        type: 'checkbox',
        list: [],
        detail: {},
        title: ''
    }

    componentDidMount() {
        // this.props.onRef(this);
        this.requestList();
    }

    //请求列表
    requestList() {
    }

    render() {
        return (
            <div>
                <TextArea className="data-analysis-code-content" placeholder={""} rows={10}></TextArea>
            </div>
        )
    }
}

