import request from '@/router/axios';
import {baseUrl} from '@/config/env';

/**
 * 添加主机
 * @returns {AxiosPromise}
 */
export const addHost = (params) => request({
    url: 'http://192.168.10.100:7779/node/createNode',
    method: 'post',
    data: params
})

/**
 * 更新主机
 * @param params
 * @returns {AxiosPromise}
 */
export const updateHost = (params) => request({
    // url: baseUrl + '/user/logout',
    // meta: {
    //     isToken: false
    // },
    // method: 'get'
})
/**
 * 获取主机列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getHostList = (params) => request({
    url: 'http://192.168.10.100:7779/node/listNodes',
    method: 'get',
    params: params
})


/**
 * 添加集群
 * @returns {AxiosPromise}
 */
export const addCluster = (params) => request({
    // url: baseUrl + '/user/logout',
    // meta: {
    //     isToken: false
    // },
    // method: 'get'
})
/**
 * 更新集群信息
 * @param params
 * @returns {AxiosPromise}
 */
export const updateCluster = (params) => request({
    // url: baseUrl + '/user/logout',
    // meta: {
    //     isToken: false
    // },
    // method: 'get'
})
/**
 * 获取集群列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getClusterList = (params) => request({
    // url: baseUrl + '/user/logout',
    // meta: {
    //     isToken: false
    // },
    // method: 'get'
})

