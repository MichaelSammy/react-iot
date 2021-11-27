import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from "../../../../utils/IconFont";
import BaseForm from "../../../../common/BaseForm";
import {fullScreen,exitFullScreen} from "../../../../utils";
import './../index.less'
const {TextArea} = Input
const FormItem = Form.Item

class DataAnalysis extends React.Component {
    data = [
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '脚本语言',
            list: [{id: 1, label: 'java'},{id: 2, label: 'javascript'},{id: 3, label: 'python'}],
            field: 'scriptLanguage',
            width: '200px'
        }
    ]
    data1=[
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '模拟类型',
            list: [{id: 1, label: '自定义'}],
            field:"simulationType",
            width: '200px'
        },
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: '请选择设备',
            list: [{id: 1, label: '设备1'}],
            field: "deviceId",
            width: '200px'
        },
        {
            type: 'select',
            // initialValue: '',
            label: '',
            placeholder: 'Topic：请选择模拟输入Topic',
            list: [],
            field: "topic",
            width: '200px',
            disabled:true
        }
    ]
    state = {
        detail: {},
        title: '',
        selectTabIndex:1,
        showScript:true,
        showResult:false,
        fullScreen:false,
    }

    componentDidMount() {
        window.onresize = ()=>{
            if(!this.checkFull()){
            }
        }
    }
    checkFull(){
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;
        if(isFull === undefined) isFull = false;
        return isFull;
    }
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
    enlarge=()=>{
         fullScreen()
        this.setState({
            fullScreen:true
        })
    }
    narrow=()=>{
        exitFullScreen()
        this.setState({
            fullScreen:false
        })
    }
    //请求列表
    requestList() {
    }

    render() {
        return (
            <div>
                <div className={this.state.fullScreen?'full-screen':''}>
                    <div className="data-analysis-tab">
                        <div className='data-analysis-tab-edit'>
                            <div>编辑脚本</div>
                            <IconFont style={{lineHeight: '50px',fontSize: '17px', color: '#D8D8D8'}} type='icon-wenhao'/>
                            <div>（当前展示为：草稿）</div>
                        </div>
                        <div className='data-analysis-tab-select-shell'>
                            <div>脚本语言：</div>
                            <div className="select-script-language">
                                <BaseForm
                                    data={this.data}
                                    handleSearch={this.handleSearch}
                                    show={false}
                                    changeSelect={this.changeSelect}
                                />
                            </div>
                            <IconFont style={{lineHeight: '50px',fontSize: '17px',marginRight:'27px'}} type='icon-wenhao'/>
                            {
                                this.state.fullScreen==false && <IconFont style={{lineHeight: '50px',fontSize: '17px',marginRight:'22px'}} title="放大" type='icon-fangdaanniu' onClick={this.enlarge}/>
                            }
                            {
                                this.state.fullScreen==true && <IconFont style={{lineHeight: '50px',fontSize: '17px',marginRight:'22px'}} type='icon-suoxiao' onClick={this.narrow}/>
                            }
                        </div>

                    </div>
                    <div className={this.state.fullScreen?'data-analysis-code-area-full-screen':'data-analysis-code-area'}>
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
                            data={this.data1}
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
