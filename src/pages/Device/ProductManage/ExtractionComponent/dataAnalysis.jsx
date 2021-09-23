import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import request from "../../../../api/request";
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
        title: '',
        selectTabIndex:1,
        showScript:true,
        showResult:false,
    }

    // componentDidMount() {
        // this.props.onRef(this);
        // this.requestList();
    // }
    editScript = (index) => {
        this.setState({
            selectTabIndex:index,
            showScript:true,
            showResult:false,
        })
    }
    runResult = (index) => {
        this.setState({
            selectTabIndex:index,
            showScript:false,
            showResult:true,
        })
    }
    //请求列表
    requestList() {
    }

    render() {
        return (
            <div>
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
                            <div className={this.state.selectTabIndex==1?'data-analysis-result-selected':'data-analysis-result-unselected'} onClick={()=>this.editScript('1')}>编辑脚本</div>
                            <div className={this.state.selectTabIndex==2?'data-analysis-result-selected':'data-analysis-result-unselected'}  onClick={()=>this.runResult('2')}>运行结果</div>
                        </div>
                    </div>
                    <div className="data-analysis-result-search">
                        {this.state.showScript && <BaseForm
                            data={this.data}
                            handleSearch={this.handleSearch}
                            show={false}
                        />
                        }
                        {this.state.showResult &&
                        <div style={{height:'32px',lineHeight:'32px'}}>输出Topic：""</div>
                        }
                    </div>
                    <div className="data-analysis-result-input">
                        {this.state.showScript &&   <TextArea className="data-analysis-code-content" placeholder={"* 将设备自定义topic数据转"} rows={10}></TextArea>
                        }
                        {this.state.showResult &&   <TextArea className="data-analysis-code-content" placeholder={""} rows={10}></TextArea>
                        }
                    </div>
                    <div className="data-analysis-operation-button">
                        <Button>提交</Button>
                        <Button>执行</Button>
                        <Button type="primary">保存</Button>
                    </div>
                </div>

            </div>
        )
    }
}

export default DataAnalysis
