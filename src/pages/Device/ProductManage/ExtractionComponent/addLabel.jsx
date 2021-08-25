import React from "react";
import {Card, Modal, Form, Input, Button, Select} from "antd";
import {updateSelectedItem} from '../../../../utils'
import request from '../../../../utils/request'
import IconFont from '../../../../utils/IconFont';

const FormItem = Form.Item

class AddLabel extends React.Component {
    formRefUser = React.createRef();

    componentDidMount() {
        this.props.onRef(this)
    }

    state = {
        roleVisible: false,
        perVisible: false,
        authVisible: false,
        checkedKeys: [],
        targetKeys: [],
        formList: [],
        title: ''
    }
    filterTag = () => {
        this.setState({
            roleVisible: true,
            title: '筛选标签'
        })
    }
    addTag = () => {
        this.setState({
            roleVisible: true,
            title: '编辑标签'
        })
    }
    editTag = (item) => {
        this.setState({
            formList: item,
            roleVisible: true,
            title: '编辑标签'
        })
    }
    saveUserSubmit = async () => {
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
        this.setState({
            roleVisible: false
        })
        form.resetFields();
    }
    addTagColumn = () => {
        alert('addTagColumn')
    }
    deleteTagColumn = () => {
        alert('deleteTagColumn')
    }

    render() {
        const formItemLayout = {
            labelCol: {span: 5},
            wrapperCol: {span: 16}
        }
        const formList = [{name: "1"}, {name: "2"}]
        return (
            <div>
                {this.state.roleVisible &&
                <Modal
                    title={this.state.title}
                    visible={this.state.roleVisible}
                    centered
                    okText="保存"
                    cancelText="取消"
                    onOk={this.saveUserSubmit}
                    onCancel={this.resetUserFrom}
                    footer={[
                        <Button key="submit" type="primary" onClick={this.saveUserSubmit}>确定</Button>,
                        <Button key="back" onClick={this.resetUserFrom}>取消</Button>
                    ]}
                >
                    <Form ref={this.formRefUser}>
                        {formList.map((item, index) => (
                            <FormItem label={index > 0 ? " " : "定义取值范围"} colon={index > 0 ? false : true} name="name"
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
                        <div style={{color: '#2979E7', textAlign: 'center', position: 'relative'}} >
                            <span onClick={this.addTagColumn} style={{cursor: 'pointer'}}>
                            <IconFont style={{marginRight: '8px'}} type='icon-jiahao'/> 新增标签
                            </span>
                        </div>
                    </Form>
                </Modal>
                }
            </div>
        )
    }
}

export default AddLabel
