﻿
    import Index from './pages/User/Home'

import AsyncComponent from './utils/asyncComponent'
import UserManage from './pages/User/Permission/UserManage'
import RoleManage from './pages/User/Permission/RoleManage'
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
            // {
            //     path: '/user/order',
            //     component: SecondLevelComponent,
            //     pathName: 'order-manage',
            //     name: '订单管理',
            //     icon: 'eye',
            //     children: [
            //         {
            //             path: '/user/order/list',
            //             pathName: 'order-list',
            //             component: OrderList,
            //             name: '订单列表',
            //             icon: 'table'
            //         },
            //         {
            //             path: '/user/order/product',
            //             pathName: 'product-manage',
            //             component: ThirdLevelComponent,
            //             name: '生产管理',
            //             icon: 'user',
            //             children: [
            //                 {
            //                     path: '/user/order/product/list',
            //                     pathName: 'product-list',
            //                     component: ProductionList,
            //                     name: '生产列表',
            //                     icon: 'table'
            //                 },
            //                 {
            //                     path: '/user/order/product/review',
            //                     pathName: 'review-manage',
            //                     component: ReviewManage,
            //                     name: '审核管理',
            //                     icon: 'eye'
            //                 }
            //             ]
            //         },
            //         {
            //             path: '/user/order/returnGoods',
            //             pathName: 'return-goods',
            //             component: ReturnGoods,
            //             name: '退货管理',
            //             icon: 'eye'
            //         }
            //     ]
            // },
            // {
            //     path: '/user/goods',
            //     component: SecondLevelComponent,
            //     pathName: 'goods',
            //     name: '产品管理',
            //     icon: 'user',
            //     children: [
            //         {
            //             path: '/user/goods/list',
            //             pathName: 'goods-list',
            //             component: GoodsList,
            //             name: '产品列表',
            //             icon: 'table'
            //         },
            //         {
            //             path: '/user/goods/classify',
            //             pathName: 'goods-classify',
            //             component: GoodsClassify,
            //             name: '产品分类',
            //             icon: 'eye'
            //         }
            //     ]
            // },
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
                        icon:'iconxiangmu'
                    },
                    {
                        path: '/user/permission/role',
                        pathName: 'role-manage',
                        component: RoleManage,
                        name: '角色管理',
                        icon: 'iconxiangmu'
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
