import {PoweroffOutlined} from '@ant-design/icons';
import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import './index.less'
import NotFound from '../NotFound'
import connect from '../../utils/connect'
import { getMenuItem, getBreadItem, filterRoutes } from '../../utils'
import { Layout, Menu, Breadcrumb } from 'antd'
import { recursionRouterTwo } from '../../utils/recursion-router'
const { Header, Content, Footer, Sider } = Layout

@connect

class User extends React.Component {
    state = {
        collapsed: false,
        list:[123]
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    getBreadList = (path)=>{
        const pathList = path.slice(1).split("/")
        return pathList.map((item,index) => {
            return {
                name:item,
                path:index>0?`/${pathList[index-1]}/${item}`:`/${item}`
            }
        })
    }
    logOut = ()=> {
        const {dispatch,authChangeAction} = this.props
        localStorage.removeItem('authed')
        dispatch(authChangeAction(null))
    }

    componentDidMount(){
        const path = this.props.location.pathname
        const {dispatch,permissionAction} = this.props
        let authed = this.props.state.authed || localStorage.getItem('authed') // 如果登陆之后可以利用redux修改该值
        if(authed && this.props.state.permissionList.length === 1){
            dispatch(permissionAction(path))
        }


    }
    componentDidUpdate(prevProps, prevState){

    }
    shouldComponentUpdate(nextProps, nextState) {
        return true
    }
    render() {
        //默认进入子组件index
        if(this.props.location.pathname === '/user'){
            return (
                <Redirect path="/user"  exact={true} to={{pathname: '/user/index'}} />
            )
        }

        const { permissionList, name } = this.props.state
        var path = this.props.location.pathname
        const defaultOpenKeys = filterRoutes(path)

        const breadList = recursionRouterTwo(defaultOpenKeys,permissionList)
        //此处用于路由表单时，左侧菜单默认选中菜单路径
        // var temp=path.split('/');
        // var tampp='/'+temp[1]+'/'+temp[2]+'/'+temp[3];
        // path=path.split('/').length>=5?tampp:path
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Header style={{ background: '#fff', padding: 0 }}>
                    {/* <img src={avatar} alt=""/> */}
                    <span className="logoutIcon" onClick={this.logOut}>
                            < PoweroffOutlined></PoweroffOutlined>
                        </span>
                    <span className="loginUser">{name}</span>
                </Header>

                <Layout>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <div className="logo" />

                        <Menu onClick={this.menuClick} theme="dark" defaultOpenKeys={defaultOpenKeys} selectedKeys={[path]} mode="inline">
                            {
                                getMenuItem(permissionList)
                            }
                        </Menu>
                    </Sider>
                <Layout>
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            {
                                getBreadItem(breadList)
                            }
                        </Breadcrumb>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
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
                    <Footer style={{ textAlign: 'center' ,minHeight: 20 }}></Footer>
                </Layout>

                </Layout>
            </Layout>
        )
    }
}

export default User
