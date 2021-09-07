import {PoweroffOutlined, BellOutlined} from '@ant-design/icons';
import React from "react";
import {Route, Redirect, Switch} from "react-router-dom";
// import indexModule from './inde.module.less'
import './index.less'
import NotFound from '../NotFound'
import connect from '../../utils/connect'
import {getMenuItem, getBreadItem, filterRoutes} from '../../utils'
import {Layout, Menu, Breadcrumb} from 'antd'
import {recursionRouterTwo} from '../../utils/recursion-router'
import logo from '../../assets/images/logo.png'
import defaultUser from '../../assets/images/defaultUser.png'
import BaseForm from "../../common/BaseForm";
import IconFont from '../../utils/IconFont';
const {Header, Content, Footer, Sider} = Layout

@connect

class User extends React.Component {
    state = {
        collapsed: false,
        list: [123]
    };
    data = [
        {
            type: 'search',
            initialValue: '',
            label: '',
            placeholder: '请输入搜索内容',
            field: 'username',
            width: '336px',
            bordered: false,
        }
    ]
    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    getBreadList = (path) => {
        const pathList = path.slice(1).split("/")
        return pathList.map((item, index) => {
            return {
                name: item,
                path: index > 0 ? `/${pathList[index - 1]}/${item}` : `/${item}`
            }
        })
    }
    logOut = () => {
        const {dispatch, authChangeAction} = this.props
        localStorage.removeItem('authed')
        dispatch(authChangeAction(null))
    }

    componentDidMount() {
        const path = this.props.location.pathname
        const {dispatch, permissionAction} = this.props
        let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
        if (authed && this.props.state.permissionList.length === 1) {
            dispatch(permissionAction(path))
        }


    }

    componentDidUpdate(prevProps, prevState) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    render() {
        //默认进入子组件index
        if (this.props.location.pathname === '/user') {
            return (
                <Redirect path="/user" exact={true} to={{pathname: '/user/index'}}/>
            )
        }

        const {permissionList, name} = this.props.state
        var path = this.props.location.pathname
        const defaultOpenKeys = filterRoutes(path)
        const breadList = recursionRouterTwo(defaultOpenKeys, permissionList)
        console.log(breadList);
        //此处用于路由表单时，左侧菜单默认选中菜单路径
        var temp = path.split('/');
        var tampp = '/' + temp[1] + '/' + temp[2] + '/' + temp[3];
        path = path.split('/').length >= 5 ? tampp : path
        return (
            <Layout style={{minHeight: '100vh', background: '#fff'}}>
                {/*固定头部导航栏*/}
                <Header style={{
                    background: '#fff',
                    padding: 0,
                    position: 'fixed',
                    zIndex: 1,
                    height:'50px',
                    lineHeight:'50px',
                    width: '100%',
                    boxShadow: '0px 0px 10px 0px rgba(200, 200, 200, 0.5)'
                }}>
                    <IconFont  type='icon-logozheng' style={{fontSize: '150px',
                        position: 'absolute',
                        top: '-50px',
                        marginLeft: '20px'}}/>
                    {/*<img src={logo} style={{height: 25, width: 150, marginLeft: 20}} alt=""/>*/}
                    <span className="logoutIcon" onClick={this.logOut}>
                         <img src={defaultUser} style={{height: 30, width: 30}} alt=""/>
                        {/*< PoweroffOutlined></PoweroffOutlined>*/}
                        </span>
                    <span className="loginUser">{name}</span>
                    <span className="lingdangIcon">
                             {/*<BellOutlined/>*/}
                        <IconFont  type='icon-lingdang'/>
                    </span>
                    <span className="docCenter">文档中心</span>
                    <span className='title-search'>
                    <BaseForm
                        data={this.data}
                        show={false}
                    />
                    </span>
                </Header>

                <Layout>
                    {/*collapsible:Sider不可以被收起*/}
                    <Sider style={{
                        /*固定左侧菜单栏*/
                        background: '#F5F5F5', overflow: 'auto', height: '92vh', position: 'fixed', left: 0, top: '50px'
                    }}
                           collapsible={false} collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        {/*去掉Sider中的logo*/}
                        {/*<div className="logo" />*/}
                        <Menu id='menubar' onClick={this.menuClick} style={{background: '#F5F5F5',padding: '10px 0px'}}
                              defaultOpenKeys={defaultOpenKeys} selectedKeys={[path]} mode="inline">
                            {
                                getMenuItem(permissionList)
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{marginLeft: 200, marginTop: '50px'}}>
                        <Content>
                            {/*<Breadcrumb style={{ margin: '16px 16px' }}>*/}
                            {/*{*/}
                            {/*getBreadItem(breadList)*/}
                            {/*}*/}
                            {/*</Breadcrumb>*/}
                            <div style={{padding: 0, background: '#fff',maxHeight:'92vh',overflow:'auto'}}>
                                <Switch>
                                    {permissionList.map((value, key) => {
                                        return (
                                            <Route
                                                routes={value}
                                                key={key}
                                                exact={value.exact ? true : false}
                                                path={value.path}
                                                component={value.component}
                                                list={this.state.list}
                                            />
                                        );
                                    })}
                                    <Route component={NotFound}/>
                                </Switch>
                            </div>
                        </Content>
                        {/*<Footer style={{ textAlign: 'center' ,minHeight: 20 }}></Footer>*/}
                    </Layout>

                </Layout>
            </Layout>
        )
    }
}

export default User
