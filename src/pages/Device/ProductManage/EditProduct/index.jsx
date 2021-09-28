import React from "react";
import {Card, Modal, Form, Input, Button, Select, Radio} from "antd";
import {handleCheckPhone, handleCheckValueLenght, messageGlobal} from "../../../../utils";
import {getProductList, updateOrPublishProduct} from "../../../../api/api";
const {TextArea} = Input
const FormItem = Form.Item

class EditProduct extends React.Component {
    fromModeRef = React.createRef();

    componentDidMount() {
        this.props.onRef(this)
    }

    handleSubmit = async (params) => {
        const form = this.fromModeRef.current
        form.validateFields().then((values) => {　　// 如果全部字段通过校验，会走then方法，里面可以打印出表单所有字段（一个object）
            values.id=this.props.detail.id
            updateOrPublishProduct(values).then(res => {
                this.props.closeSubmit();
                if(res.status==1){
                    messageGlobal('success',res.msg);
                    if(params=='list'){
                        this.props.requestList();
                    }else{
                        this.props.getProductDetails({productId:values.id})
                    }
                }else{
                    messageGlobal('error',res.msg);
                }
            })
        }).catch((errInfo) => {　　// 如果有字段没听过校验，会走catch，里面可以打印所有校验失败的信息

        })
    }
    closeSubmit = () => {
        const form = this.fromModeRef.current;
        form.resetFields();
    }
    render() {
        const formItemLayout = {
            // labelCol: {span: 10},
            // wrapperCol: {span: 16}
        }
        const detail = this.props.detail
        return (
            <Form ref={this.fromModeRef} layout="vertical">
                <FormItem label="产品名称"
                          name="name"
                          initialValue={detail.name}
                          rules={[
                              {required: true,label:'产品名称',lenght:20,validator:handleCheckValueLenght},
                          ]}{...formItemLayout}>
                    <Input type="text" placeholder="请输入产品名称"/>
                </FormItem>
                <FormItem label="产品描述"
                          name="productDesc"
                          initialValue={detail.productDesc}
                          rules={[
                              {required: false,label:'产品描述',lenght:100,validator:handleCheckValueLenght},
                          ]}{...formItemLayout}>
                    <TextArea id='textAreaId' rows={5} maxLength={100} showCount placeholder="请输入产品描述"></TextArea>
                </FormItem>
            </Form>
        )
    }
}

export default EditProduct;
