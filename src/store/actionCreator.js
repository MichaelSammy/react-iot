import { AUTH_CHANGE,PERMISSION_CHANGE, CURRENT_CHANGE } from './actionTypes'
import { createActions } from 'redux-actions';
import { recursionRouter } from '../utils/recursion-router'
import routes from '../router'
import request from '../utils/request'
import { filterRoutes } from '../utils'
import { recursionRouterThree } from '../utils/recursion-router'

// export const doAuthChangeAction = (res) => {
//     return {
//         type:AUTH_CHANGE,
//         authStatus:res
//     }
// }
export const doAuthChangeAction = createActions(
    {
        [AUTH_CHANGE]:(res) => {
            return {
                authStatus:res
            }
        },
        [PERMISSION_CHANGE]:(permissionList,currentList,avatar,name) => {
            return {
                permissionList,
                currentList,
                avatar,
                name
            }
        },
        [CURRENT_CHANGE]:(list) => {
            return {
                currentList:list
            }
        }
    }
)

export const authChangeAction = (token) =>{
    return (dispatch) =>{
            const action = doAuthChangeAction.authChange(token)
            dispatch(action)
    }
}

export const permissionAction = (path) =>{
    return (dispatch) =>{
        request({
            url: '/user/info',
            method: 'get',
        })
        .then(res =>{
            const allList = routes[2].children
            res.data.data.push('index')
            res.data.data.push('role/add')
            const permissionList = recursionRouter(res.data.data,allList)
          // var data={"code":1,"data":{"avatar":"https://randy168.com/1533262153771.gif","name":"admin","roles":["admin"],"data":["index","order-manage","order-list","product-manage","product-list","review-manage","return-goods","goods","goods-list","goods-classify","permission","user-manage","role-manage","menu-manage"]}};
          //   const permissionList = recursionRouter(data.data.data,allList)
            console.log('permissionList-start');
            console.log(permissionList);
            console.log('permissionList-end');
            const defaultOpenKeys = filterRoutes(path)
            const currentList = recursionRouterThree(defaultOpenKeys,permissionList)
            const action = doAuthChangeAction.permissionChange(permissionList,currentList,res.data.avatar,res.data.name)
            // const action = doAuthChangeAction.permissionChange(permissionList,currentList,data.data.avatar,data.data.name)
            dispatch(action)


        })
    }
}

export const currentAction = (list) =>{
    return (dispatch) =>{
            const action = doAuthChangeAction.currentChange(list)
            dispatch(action)
    }
}
