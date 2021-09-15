import Index from './pages/User/Home'

import AsyncComponent from './utils/asyncComponent'
import UserManage from './pages/User/Permission/UserManage'
import RoleManage from './pages/User/Permission/RoleManage'
import addRole from './pages/User/Permission/RoleManage/AddRole'
// import ProductManage from './pages/Device/ProductManage'
import AddProduct from './pages/Device/ProductManage/AddProduct'
import ProductInfo from './pages/Device/ProductManage/ProductInfo'
import DeviceInfo from './pages/Device/DeviceManage/DeviceInfo'
import GroupInfo from './pages/Device/DeviceGroup/GroupInfo'
const Home = AsyncComponent(() => import('./pages/Home'))
const Login = AsyncComponent(() => import('./pages/Login'))
const User = AsyncComponent(() => import('./pages/User'))
const ProductManage = AsyncComponent(() => import('./pages/Device/ProductManage'))
const DeviceGroup = AsyncComponent(() => import('./pages/Device/DeviceGroup'))
const DeviceManage = AsyncComponent(() => import('./pages/Device/DeviceManage'))
const NotFound = AsyncComponent(() => import('./pages/NotFound'))

const SecondLevelComponent = AsyncComponent(() => import('./common/SecondLevelComponent'))
const ThirdLevelComponent = AsyncComponent(() => import('./common/ThirdLevelComponent'))

const routes = [
    {
        path: '/',
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
        children: [
            {
                path: '/user/index',
                pathName: 'index',
                component: Index,
                name: '设备运行监控',
                icon: 'icon-shebeiyunhangjiankong'
            },
            {
                path: '/user/index',
                pathName: 'index',
                component: Index,
                name: '运维工作台',
                icon: 'icon-yunweigongzuotai'
            },
            // {
            //     path: '/user/permission',
            //     component: SecondLevelComponent,
            //     pathName: 'permission',
            //     name: '权限管理',
            //     icon: 'icon-xiugai1',
            //     children: [
            //         {
            //             path: '/user/permission/user',
            //             pathName: 'user-manage',
            //             component: UserManage,
            //             name: '用户管理',
            //             icon: 'icon-xiugai1',
            //         },
            //         //最细化的组件需要放置最上面，确保Switch 路由匹配时可以解析到对应的组件
            //         {
            //             path: '/user/permission/role/add',
            //             pathName: 'role/add',
            //             component: addRole,
            //             name: '角色添加',
            //             icon: 'icon-xiugai1',
            //             show: false
            //         },
            //
            //         {
            //             path: '/user/permission/role',
            //             pathName: 'role-manage',
            //             component: RoleManage,
            //             name: '角色管理',
            //             icon: 'icon-xiugai1',
            //         },
            //         // {
            //         //     path: '/user/permission/menu',
            //         //     pathName: 'menu-manage',
            //         //     component: MenuManage,
            //         //     name: '菜单管理',
            //         //     icon: 'eye'
            //         // }
            //     ]
            // },
            {
                path: '/user/device',
                component: SecondLevelComponent,
                pathName: 'device',
                name: '设备接入与管理',
                icon: 'icon-shebeijieruyuguanli',
                children: [
                    {
                        path: '/user/device/product/add',
                        pathName: 'add-product',
                        component: AddProduct,
                        name: '创建产品',
                        icon: 'icon-xiugai1',
                        show: false
                    },
                    {
                        path: '/user/device/product/info',
                        pathName: 'product-info',
                        component: ProductInfo,
                        name: '产品详情',
                        icon: 'icon-xiugai1',
                        show: false
                    },
                    {
                        path: '/user/device/product',
                        pathName: 'product-manage',
                        component: ProductManage,
                        name: '产品管理',
                    },
                    {
                        path: '/user/device/group/info',
                        pathName: 'group-info',
                        component: GroupInfo,
                        name: '设备分组详情',
                        show: false
                    },
                    {
                        path: '/user/device/group',
                        pathName: 'device-group',
                        component: DeviceGroup,
                        name: '设备分组',
                    },
                    {
                        path: '/user/device/managent/info',
                        pathName: 'device-info',
                        component: DeviceInfo,
                        name: '设备详情',
                        show: false
                    },
                    {
                        path: '/user/device/managent',
                        pathName: 'device-manage',
                        component: DeviceManage,
                        name: '设备管理',
                    },

                    {
                        path: '/user/device/plugin',
                        pathName: 'plugin-manage',
                        component: ProductManage,
                        name: '插件管理',
                    },
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
