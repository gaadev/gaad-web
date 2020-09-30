import request from '@/router/axios';
import { baseUrl } from '@/config/env';
export const loginByUsername = (username, password, code, redomStr) => request({
    url: baseUrl + '/user/login',
    method: 'post',
    meta: {
        isToken: false
    },
    data: {
        username,
        password,
        code,
        redomStr
    }
})


export const getUserInfo = () => request({
    url: baseUrl + '/user/getUserInfo',
    method: 'get'
});

export const refeshToken = () => request({
    url: baseUrl + '/user/refesh',
    method: 'post'
})

export const getMenu = (type = 0) => request({
    url: baseUrl + '/user/getMenu',
    method: 'get',
    data: {
        type
    }
});

export const getTopMenu = () => request({
    url: baseUrl + '/user/getTopMenu',
    method: 'get'
});

export const sendLogs = (list) => request({
    url: baseUrl + '/user/logout',
    method: 'post',
    data: list
})

export const logout = () => request({
    url: baseUrl + '/user/logout',
    meta: {
        isToken: false
    },
    method: 'get'
})