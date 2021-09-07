import React from "react";
import {Card, Modal, Form, Input, Button, Select} from "antd";
import BaseModel from "../../../../common/BaseModel";
import request from '../../../../utils/request'
import IconFont from '../../../../utils/IconFont';

const FormItem = Form.Item

class AddGroupLabel extends React.Component {
    fromModeRef = React.createRef();
    state = {
        addGroupLabelModel: false,
        formList: [],
        title: '',
        visibleBaseModel: false,
        baseModelContent: '是否删除？'
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    filterTag = () => {
        this.setState({
            addGroupLabelModel: true,
            title: '筛选标签'
        })
    }
    deleteTagColumn = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否删除？'
        })
    }
    resetCoordinate = () => {
        this.setState({
            visibleBaseModel: true,
            baseModelContent: '是否重置？'
        })
    }
    submitOk = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    submitCancel = () => {
        this.setState({
            visibleBaseModel: false
        })
    }
    addTag = () => {
        this.setState({
            addGroupLabelModel: true,
            title: '新增标签'
        })
    }
    editTag = (item) => {
        this.setState({
            formList: item,
            addGroupLabelModel: true,
            title: '编辑标签'
        })
    }
    saveUserSubmit = async () => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            console.log('成功')
            console.log(values)
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息
            console.log('失败')
            console.log(errInfo)
        })
    }
    resetUserFrom = () => {
        const form = this.fromModeRef.current;
        this.setState({
            addGroupLabelModel: false
        })
        form.resetFields();
    }
    addTagColumn = () => {
        alert('addTagColumn')
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        const formList = [{name: "1"}, {name: "2"}]
        return (
            <div>
                {this.state.addGroupLabelModel &&
                <Modal
                    title={this.state.title}
                    visible={this.state.addGroupLabelModel}
                    centered
                    onOk={this.saveUserSubmit}
                    onCancel={this.resetUserFrom}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.saveUserSubmit}>确定</Button>,
                        <Button key="back" onClick={this.resetUserFrom}>取消</Button>
                    ]}
                >
                    <Form ref={this.fromModeRef}>
                        <FormItem label="地理位置标签" colon={true} name="name"
                                  rules={[{required: false}]} style={{marginBottom: -16}} {...formItemLayout}>
                            <FormItem
                                name="name"
                                rules={[{required: false}]}
                                style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                            >
                                <Input placeholder="coordinate"/>
                            </FormItem>
                            <FormItem
                                name="name"
                                rules={[{required: false}]}
                                style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                            >
                                <Input placeholder="无坐标信息"/>
                            </FormItem>
                            <div style={{
                                position: 'absolute',
                                cursor: 'pointer',
                                marginLeft: '103%',
                                wordBreak: 'keep-all',
                                marginTop: '-48px',
                                color: '#2979E7',
                            }} onClick={this.resetCoordinate}>重置
                            </div>
                        </FormItem>
                        {formList.map((item, index) => (
                            <FormItem label={index > 0 ? " " : "分组标签"} colon={index > 0 ? false : true} name="name"
                                      rules={[{required: false}]} style={{marginBottom: -16}} {...formItemLayout}>
                                <FormItem
                                    name="name"
                                    rules={[{required: false}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                                >
                                    <Input placeholder="请输入标签key"/>
                                </FormItem>
                                <FormItem
                                    name="name"
                                    rules={[{required: false}]}
                                    style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                                >
                                    <Input placeholder="请输入标签value"/>
                                </FormItem>
                                <div style={{
                                    position: 'absolute',
                                    cursor: 'pointer',
                                    marginLeft: '103%',
                                    wordBreak: 'keep-all',
                                    marginTop: '-48px',
                                    color: '#2979E7',
                                }} onClick={this.deleteTagColumn}>删除
                                </div>
                            </FormItem>
                        ))}
                        <div style={{color: '#2979E7', textAlign: 'center', position: 'relative'}}>
                            <span onClick={this.addTagColumn} style={{cursor: 'pointer'}}>
                            <IconFont style={{marginRight: '8px'}} type='icon-jiahao'/> 新增标签
                            </span>
                        </div>
                    </Form>
                </Modal>
                }
                <BaseModel that={this}
                           visible={this.state.visibleBaseModel}
                           submitOk={this.submitOk}
                           submitCancel={this.submitCancel}
                           content={this.state.baseModelContent}
                ></BaseModel>
            </div>
        )
    }
}

export default AddGroupLabel
