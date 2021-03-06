import React from 'react'
import {getOptionsList} from '../../utils'
import {Input, Select, Form, Button, DatePicker} from 'antd'
import {FormInstance} from 'antd/lib/form';

const FormItem = Form.Item

class BaseForm extends React.Component {
    formRef = React.createRef();
    creatFormList = () => {
        const data = this.props.data;
        const list = [];
        data.forEach((item, index) => {
            const {type, field, label, initialValue, width, placeholder, showTime} = item;
            switch (type) {
                case 'input':
                    const inputItem = <FormItem key={field} name={field} label={label} initialValue={initialValue}>
                        {
                            <Input style={{width}} type="text" placeholder={placeholder}/>
                        }
                    </FormItem>
                    list.push(inputItem);
                    break;
                case 'select':
                    const selectItem = <FormItem key={field} name={field} label={label} initialValue={initialValue}>
                        {
                            <Select style={{width}}>
                                {getOptionsList(item.list)}
                            </Select>
                        }
                    </FormItem>
                    list.push(selectItem);
                    break;
                case 'chooseTime':
                    const beginTimeItem = <FormItem key={field} name={field} label={label} initialValue={initialValue}>
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
        return list;
    }
    reset = () => {
        this.formRef.current.resetFields();
    }
    handleFilterSubmit = (values) => {
        this.props.handleSearch(values);
    }

    render() {
        return (
            <Form onFinish={this.handleFilterSubmit} ref={this.formRef} layout='inline'>
                {this.creatFormList()}
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{margin: '0 20px'}}>??????</Button>
                    <Button onClick={this.reset}>??????</Button>
                </FormItem>
            </Form>
        )
    }
}

export default BaseForm;
