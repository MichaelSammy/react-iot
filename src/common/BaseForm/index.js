import React from 'react'
import {getOptionsList} from '../../utils'
import {Input, Select, Form, Button, DatePicker} from 'antd'
import 'moment/locale/zh-cn';
import moment from 'moment'
import locale from 'antd/es/date-picker/locale/zh_CN';
const { Search } = Input;
const { RangePicker } = DatePicker;
const FormItem = Form.Item
class BaseForm extends React.Component {
    formRef = React.createRef();
    componentWillReceiveProps(nextProps){
        this.formRef.current.setFieldsValue({
            label:nextProps.label
        })
    }
    creatFormList = () => {
        const data = this.props.data;
        const list = [];
        data.forEach((item, index) => {
            const {type, field, label, initialValue, width,bordered, placeholder, showTime,open,startTime,endTime,noDropDown} = item;
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
                    let selectItem=""
                    if(noDropDown){
                         selectItem = <FormItem key={field} name={field} label={label}  initialValue={initialValue} onClick={this.clickSelect}>
                            {
                                <Select style={{width}} open={open} placeholder={placeholder} onChange={(value) => {
                                    this.changeSelect(value,field);
                                }}>
                                    {getOptionsList(item.list)}
                                </Select>
                            }
                        </FormItem>
                    }else{
                         selectItem = <FormItem key={field} name={field} label={label}  initialValue={initialValue}>
                            {
                                <Select style={{width}} open={open} placeholder={placeholder} onChange={(value) => {
                                    this.changeSelect(value,field);
                                }}>
                                    {getOptionsList(item.list)}
                                </Select>
                            }
                        </FormItem>
                    }

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
                case 'rangePicker':
                    const rangePickerItem=<FormItem>
                    <RangePicker showTime locale={locale}  format={"YYYY-MM-DD HH:mm:ss"}
                                         // value={[moment(new Date(startTime)), moment(new Date(endTime))]}
                                         onChange={(time, timeString) =>
                                             this.changeRangePicker( time, timeString)
                                         }/>
                    </FormItem>
                    list.push(rangePickerItem);
                default:
            }
        })
        console.log(list)
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
    }
    changeSelect=(item,field)=>{
        this.props.changeSelect&&this.props.changeSelect(item,field)
    }
    clickSelect=()=>{
        this.props.clickSelect&&this.props.clickSelect()
    }
    changeRangePicker = ( val, str) => {
        this.props.changeRangePicker&&this.props.changeRangePicker(val,str)
    }
    render() {
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
