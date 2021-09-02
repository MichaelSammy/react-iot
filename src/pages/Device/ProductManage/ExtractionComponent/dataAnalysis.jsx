import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import request from "../../../../utils/request";
import './../index.less'

const {TextArea} = Input
const FormItem = Form.Item

class DataAnalysis extends React.Component {
    data = [
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '模拟类型：自定义',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '200px'
        },
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '设备：请选择设备',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '200px'
        },
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: 'Topic：请选择模拟输入Topic',
            list: [{id: '1', label: '超级管理员'}, {id: '2', label: '普通用户'}],
            field: 'power',
            width: '200px'
        }
    ]
    state = {
        detail: {},
        title: ''
    }

    componentDidMount() {
        // this.props.onRef(this);
        // this.requestList();
    }

    //请求列表
    requestList() {
    }

    render() {
        return (
            <div style={{marginBottom: "10%"}}>
                <div>
                    <div className="data-analysis-tab">
                        <div className='data-analysis-tab-edit'>
                            <div>编辑脚本</div>
                            <IconFont style={{lineHeight: '50px'}} type='icon-xiugai1'/>
                            <div>（当前展示为：草稿）</div>
                        </div>
                        <div className='data-analysis-tab-select-shell'>
                            <div>脚本语言：</div>
                            <IconFont style={{lineHeight: '50px'}} type='icon-xiugai1'/>
                            <IconFont style={{lineHeight: '50px'}} type='icon-xiugai1'/>
                        </div>
                    </div>
                    <div className="data-analysis-code-area">
                        <TextArea className="data-analysis-code-content" placeholder={"* 将设备自定义topic数据转"}></TextArea>
                    </div>
                </div>
                <div>
                    <div className="data-analysis-tab-result">
                        <div className='data-analysis-tab-edit'>
                            <div className="data-analysis-result-selected">编辑脚本</div>
                            <div>运行结果</div>
                        </div>
                    </div>
                    <div className="data-analysis-result-search">
                        <BaseForm
                            data={this.data}
                            handleSearch={this.handleSearch}
                            show={false}
                        />
                    </div>
                    <div className="data-analysis-result-input">
                        <TextArea className="data-analysis-code-content" placeholder={"* 将设备自定义topic数据转"}></TextArea>
                    </div>
                </div>
            </div>
        )
    }
}

export default DataAnalysis
