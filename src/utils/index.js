import React from "react"
import {Menu, Icon, Breadcrumb, Select,message }from "antd"
import {Link} from "react-router-dom"
import request from '../api/request'
import IconFont from './../utils/IconFont';
import '../index.css'

const Option = Select.Option
const {SubMenu} = Menu
const MenuItem = Menu.Item

//获取侧边栏Item
export const getMenuItem = list => {
    return list.map((item, index) => {
        if (item.children && item.children.length > 0) {
            return (
                <SubMenu
                    key={item.path}
                    title={
                        <span>
                           <IconFont style={{fontSize: '16px'}} type={item.icon}/>
                            <span>{item.name}</span>
                        </span>
                    }
                >
                    {getMenuItem(item.children)}
                </SubMenu>
            )
        } else {
            return (
                item.show != false &&
                <MenuItem key={item.path}>
                    <Link to={item.path}>
                        <IconFont type={item.icon} style={{fontSize: '16px'}}/>
                        <span>{item.name}</span>
                    </Link>
                </MenuItem>
            )
        }
    })
}

//获取面包屑Item
export const getBreadItem = (list) => {
    const arr = [];

    function getItem(allList) {
        allList.forEach((item, index) => {
            if (item.children && item.children.length > 0) {
                arr.push(
                    <Breadcrumb.Item key={index}>
                        <Link to={item.redirect}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )
                getItem(item.children)

            } else {
                arr.push(
                    <Breadcrumb.Item key={index}>
                        <Link to={item.path}>
                            {item.name}
                        </Link>
                    </Breadcrumb.Item>
                )
            }

        })
    }

    getItem(list)
    return arr
}

//左侧栏默认展开项
export const filterRoutes = pathname => {
    let pathSnippets = pathname.split('/').filter(path => path)
    let paths = pathSnippets.map((path, index) => `/${pathSnippets.slice(0, index + 1).join('/')}`)
    paths.splice(0, 1)
    return paths
}

//获取options
export const getOptionsList = data => {
    if (!(data instanceof Array)) {
        return []
    }
    ;
    return data.map((item, index) => {
        return <Option key={item.id} value={item.value}>{item.label}</Option>
    })
}

//获取分页关键内容
export const pagination = (data, callback) => {
    return {
        current: data.page,
        pageSize: data.pageSize,
        total: data.total,
        showQuickJumper: false,
        onChange: (current) => {
            callback(current)
        },
        showTotal: () => {
            return `共${data.total}条`
        }
    }
}

//初始列表
export const getList = (_this, options) => {
    request(options)
        .then(res => {
            if (res && res.data && res.data.data) {
                let dataSource = res.data.data.map((item, index) => {
                    item.key = index;
                    return item;
                });
                _this.setState({
                    dataSource,
                    pagination: pagination(res.data, (current) => {
                        _this.params.page = current;
                        _this.requestList();
                    })
                })
            }
        })
}

//设置勾选后的内容
/**
 * @param {*选中行的索引} selectedRowKeys Array
 * @param {*选中行对象} selectedItem Array
 */
export const updateSelectedItem = (selectedRowKeys, selectedRows, that) => {
    const rowSelection = {
        selectedRowKeys, selectedRows
    }
    that.setState({
        rowSelection
    })
}

//获取localstorage
export const getLocal = item => {
    return localStorage.getItem(item)
}

//设置localstorage
export const setLocal = (key, value) => {
    localStorage.setItem(key, value)
}

//移除
export const removeLocal = (key) => {
    localStorage.removeItem(key)
}

//时间戳转换
export const formateDate = time => {
    if (!time) return '';
    let date = new Date(time);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
}

export const handleCheckPhone = (rule, value, callback) =>{
    const objRegExp = new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g")
    if(value && !objRegExp.test(value)){
        return Promise.reject('请输入正确的手机号');
    }
    return Promise.resolve()//因为新版的Antd使用了React的hooks，表单中的字段校验方法进行了一些修改，原来的回调方法改成了返回一个Promise对象
}

export const handleCheckValueLenght = (rule, value, callback) =>{
    if ((value == "" || value == undefined)&&rule.required) {
        return Promise.reject('请输入'+rule.label);
    }
    if (value!= undefined&&(rule.lenght < getLength(value))) {
        return Promise.reject(rule.label+'不能超过'+rule.lenght+'个字符！');
    }
    return Promise.resolve()
}
/* 获得字符串实际长度，中文2，英文1 */
const  getLength=(str)=> {
    //要获得长度的字符串
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            realLength += 1;
        } else {
            realLength += 2;
        }
    }
    return realLength;
}

export const messageGlobal=(type,messageInfo)=>{
    switch (type) {
        case 'success':
            message.success(messageInfo,1);
            break;
        case 'error':
            message.error(messageInfo,1);
            break;
        case 'warning':
            message.warning(messageInfo,1);
            break;
        default:
    }
}
