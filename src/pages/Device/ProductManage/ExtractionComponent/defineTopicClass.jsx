import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import IconFont from '../../../../utils/IconFont';

const {Option} = Select
const {TextArea} = Input
const FormItem = Form.Item

class DefineTopicClass extends React.Component {
    fromModeRef = React.createRef();

    componentDidMount() {
        this.props.onRef(this)
    }

    state = {
        detail: {
            loginName: "",
        }
    }
    handleSubmit = async () => {
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
        form.resetFields();
    }

    render() {
        const formItemLayout = {
            // labelCol: {span: 10},
            // wrapperCol: {span: 16}
        }
        const detail = this.state.detail
        const nameList = [{id: '1', value: 'gold'}, {id: '2', value: 'lime'}, {id: '3', value: 'green'}, {
            id: '4',
            value: 'cyan'
        }];
        const info = " Topic 格式必须以“/”进行分层，区分每个类目。其中前三个类目已经规定好，第一个代表产品标识 ProductKey，第二个 \${deviceName} 通配 DeviceName，第三个 user" +
            "用来标识产品的自定义 Topic 类。简单来说，Topic 类：/a15T****dhK/${deviceName}/user/update 是具体" +
            " Topic：/a15T****dhK/mydevice1/user/update 和 /a15T****dhK/mydevice2/user/update 等的集合。"
        return (
            <div>
                <div className="define-topic-class-info">
                    <div style={{width: '7%', float: 'left'}}>
                        <IconFont style={{fontSize: '20px', color: '#2979E7'}}
                                  type='icon-gantanhao'/>
                    </div>
                    <div style={{width: '93%', float: 'right', wordBreak: 'break-all'}}>
                        {info}
                    </div>
                </div>
                <Form ref={this.fromModeRef} layout="vertical">
                    <FormItem label="设备操作权限"
                              name="name"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择设备操作权限'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择设备操作权限">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="Topic 类"
                              name="name"
                              rules={[
                                  {
                                      required: true,
                                      message: '请选择数据类型'
                                  },
                              ]}{...formItemLayout}>
                        <Select placeholder="请选择数据类型">
                            {nameList.map((item) => (
                                <Option value={item.id} key={item.id}>
                                    {item.value}
                                </Option>
                            ))}
                        </Select>
                    </FormItem>
                    <FormItem label="描述"
                              name="loginName"
                              initialValue={detail.loginName}
                              rules={[
                                  {
                                      required: false,
                                      message: '请输入描述信息'
                                  },
                              ]}{...formItemLayout}>
                        <TextArea id='textAreaId' rows={5} maxLength={100} showCount placeholder="请输入描述信息"></TextArea>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default DefineTopicClass;
