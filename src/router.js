
    import Index from './pages/User/Home'

import AsyncComponent from './utils/asyncComponent'
import UserManage from './pages/User/Permission/UserManage'
import RoleManage from './pages/User/Permission/RoleManage'
import addRole from './pages/User/Permission/RoleManage/AddRole'
const Home = AsyncComponent(()=>import('./pages/Home'))
const Login = AsyncComponent(()=>import('./pages/Login'))
const User = AsyncComponent(()=>import('./pages/User'))
const NotFound = AsyncComponent(()=>import('./pages/NotFound'))

const SecondLevelComponent = AsyncComponent(()=>import('./common/SecondLevelComponent'))
const ThirdLevelComponent = AsyncComponent(()=>import('./common/ThirdLevelComponent'))

const routes = [
    { path: '/',
        exact: true,
        component: Home,
        requiresAuth: false
    },
    {
        path: '/login',
        component: Login,
        requiresAuth: false,

    },
    {
        path: '/user',
        component: User,
        requiresAuth: true, //需要登陆后才能跳转的页面

        children:[
            {
                path: '/user/index',
                pathName:'index',
                component:Index,
                name: '首页',
                icon:'iconrenwuguanli1'
            },
            {
                path: '/user/permission',
                component: SecondLevelComponent,
                pathName: 'permission',
                name: '权限管理',
                icon:'iconxiangmu',
                children: [
                    {
                        path: '/user/permission/user',
                        pathName: 'user-manage',
                        component: UserManage,
                        name: '用户管理',
                        icon:'iconxiangmu',
                    },
                    //最细化的组件需要放置最上面，确保Switch 路由匹配时可以解析到对应的组件
                    {
                        path: '/user/permission/role/add',
                        pathName: 'role/add',
                        component: addRole,
                        name: '角色添加',
                        icon: 'iconxiangmu',
                        show:false
                    },
                    {
                        path: '/user/permission/role',
                        pathName: 'role-manage',
                        component: RoleManage,
                        name: '角色管理',
                        icon: 'iconxiangmu',
                    },
                    // {
                    //     path: '/user/permission/menu',
                    //     pathName: 'menu-manage',
                    //     component: MenuManage,
                    //     name: '菜单管理',
                    //     icon: 'eye'
                    // }
                ]
            }
        ]

    },
    {
        path: '*',
        component: NotFound,
        requiresAuth: false,
    }
]

export default routes
