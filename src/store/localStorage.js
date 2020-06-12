import {setBasicsDB, getBasicsDB} from '../../config/basicsStorageDB'

//用户信息
export const getApp_user = getBasicsDB('app_user')

//菜单模块
export const getApp_module = getBasicsDB('app_module')

//登录角色
export const getApp_role = getBasicsDB('app_role')

//token
export const getApp_token = getBasicsDB('app_token')

export const setApp_user = (val) => {
   setBasicsDB('app_user',val)
}

export const setApp_module = (val) => {
   setBasicsDB('app_module',val)
}

export const setApp_role = (val) => {
   setBasicsDB('app_role',val)
}

export const setApp_token = (val) => {
   setBasicsDB('app_token',val)
}

