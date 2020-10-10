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
 * 集群分配主机-查询主机列表
 * @param params
 * @returns {{method: string, data: *, url: string}}
 */
export const getHostListForCluster = (params) => request({
    url: baseUrl + '/cluster/pageNodesForCluster',
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
/**
 * 分配主机>设置主从节点
 * @param params
 * @returns {AxiosPromise}
 */
export const setNodeForCluster = (params) => request({
    url: baseUrl + '/cluster/setNode',
    method: 'put',
    data: params
})
/**
 * 查看集群详情-获取集群主机
 * @param params
 * @returns {AxiosPromise}
 */
export const getNodesForCluster = (params) => request({
    url: baseUrl + '/cluster/listNodes',
    method: 'post',
    data: params
})
/**
 * 查看进群详情-移除节点
 * @param params
 * @returns {AxiosPromise}
 */
export const removeNodeForCluster = (params) => request({
    url: baseUrl + '/cluster/removeNode',
    method: 'delete',
    data: params
})
/**
 * 初始化集群
 * @param params
 * @returns {AxiosPromise}
 */
export const initCluster = (params) => request({
    url: baseUrl + '/cluster/initCluster',
    method: 'post',
    data: params
})






