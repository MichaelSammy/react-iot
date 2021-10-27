import React from 'react'
import {getOptionsList} from '../../utils'
import {Input, Select, Form, Button, DatePicker} from 'antd'
import {FormInstance} from 'antd/lib/form';
const { Search } = Input;
const FormItem = Form.Item

class BaseForm extends React.Component {
    formRef = React.createRef();
    componentWillReceiveProps(nextProps){
        this.formRef.current.setFieldsValue({
            productLabel:nextProps.productLabel
        })
    }
    creatFormList = () => {
        const data = this.props.data;
        const list = [];
        data.forEach((item, index) => {
            const {type, field, label, initialValue, width,bordered, placeholder, showTime,open} = item;
            switch (type) {
                case 'input':
                    const inputItem = <FormItem key={field} name={field} label={label} initialValue={initialValue}>
                        {
                            <Input style={{width}} type="text" placeholder={placeholder}  bordered={bordered} onSearch={this.onSearch}/>
                        }
                    </FormItem>
                    list.push(inputItem);
                    break;
                case 'search':
                    const searchItem = <FormItem key={field} name={field} label={label} initialValue={initialValue}>
                        {
                            <Search style={{width}} type="text" placeholder={placeholder} bordered={bordered} allowClear
                                   onSearch={this.onSearch}/>
                        }
                    </FormItem>
                    list.push(searchItem);
                    break;
                case 'select':
                    debugger
                    const selectItem = <FormItem key={field} name={field} label={label}  initialValue={initialValue} onClick={this.clickSelect}>
                        {
                            <Select style={{width}} open={open} placeholder={placeholder} onChange={(value) => {
                                this.changeSelect(value);
                            }}>
                                {getOptionsList(item.list)}
                            </Select>
                        }
                    </FormItem>
                    debugger
                    list.push(selectItem);
                    break;
                case 'chooseTime':
                    const beginTimeItem = <FormItem key={field} name={field} label={label}  initialValue={initialValue}>
                        {
                            <DatePicker showTime={showTime} style={{width}} placeholder={placeholder}
                                        format="YYYY-MM-DD HH:mm:ss"/>
                        }
                    </FormItem>
                    list.push(beginTimeItem);
                    break;
                default:
            }
        })
        //
        return list;
    }
    reset = () => {
        this.formRef.current.resetFields();
    }
    handleFilterSubmit = (values) => {
        this.props.handleSearch(values);
    }
    onSearch=(values)=>{
        this.props.handleSearch(values)
        console.log('123')
    }
    changeSelect=(item)=>{
        this.props.changeSelect&&this.props.changeSelect(item)
    }
    clickSelect=()=>{
        console.log('123')
        this.props.clickSelect&&this.props.clickSelect()
    }
    render() {
        debugger
        return (
            <Form onFinish={this.handleFilterSubmit} ref={this.formRef} layout='inline'>
                {this.creatFormList() }
                { this.props.show!=false&& <FormItem >
                    <Button type="primary" htmlType="submit" style={{margin: '0 20px'}}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </FormItem>
                }
            </Form>
        )
    }
}

export default BaseForm;
