import request from '@/router/axios';
import {baseUrl} from '@/config/env';

/**
 * 添加主机
 * @returns {AxiosPromise}
 */
export const addHost = (params) => request({
    url: baseUrl + '/node/createNode',
    method: 'post',
    data: params
})

/**
 * 删除主机
 * @param params
 * @returns {*}
 */
export const deleteHost = (params) => request({
    url: baseUrl + '/node/deleteNode',
    method: 'delete',
    data: params
})

/**
 * 更新主机
 * @param params
 * @returns {AxiosPromise}
 */
export const updateHost = (params) => request({
    url: baseUrl + '/node/updateNode',
    method: 'put',
    data: params
})
/**
 * 获取主机列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getHostList = (params) => request({
    url: baseUrl + '/node/pageNodes',
    method: 'post',
    data: params
})


/**
 * 添加集群
 * @returns {AxiosPromise}
 */
export const addCluster = (params) => request({
    url: baseUrl + '/cluster/createCluster',
    method: 'post',
    data: params
})

/**
 * 删除集群
 * @param params
 * @returns {*}
 */
export const deleteCluster = (params) => request({
    url: baseUrl + '/cluster/deleteCluster',
    method: 'delete',
    data: params
})
/**
 * 更新集群信息
 * @param params
 * @returns {AxiosPromise}
 */
export const updateCluster = (params) => request({
    url: baseUrl + '/cluster/updateCluster',
    method: 'put',
    data: params
})
/**
 * 获取集群列表(分页)
 * @param params
 * @returns {AxiosPromise}
 */
export const getClusterPage = (params) => request({
    url: baseUrl + '/cluster/pageClusters',
    method: 'post',
    data: params
})

/**
 * 获取集群列表
 * @param params
 * @returns {AxiosPromise}
 */
export const getClusterList = (params) => request({
    url: baseUrl + '/cluster/listClusters',
    method: 'post',
    data: params
})

