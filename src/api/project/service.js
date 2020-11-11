import request from "@/router/axios";
import {baseUrl} from "@/config/env";

/**
 * 新增服务
 * @param params
 * @returns {AxiosPromise}
 */
export const createService = (params) => request({
    url: baseUrl + '/service/createService',
    method: 'post',
    data: params
})
/**
 * 分页查询服务
 * @param params
 * @returns {AxiosPromise}
 */
export const pageService = (params) => request({
    url: baseUrl + '/service/pageServices',
    method: 'post',
    data: params
})
/**
 * 更新服务
 * @param params
 * @returns {AxiosPromise}
 */
export const updateService = (params) => request({
    url: baseUrl + '/service/updateService',
    method: 'put',
    data: params
})


/**
 * 删除服务
 * @param params
 * @returns {AxiosPromise}
 */
export const deleteService = (params) => request({
    url: baseUrl + '/service/deleteService',
    method: 'delete',
    data: params
})
/**
 * 构建项目
 * @param params
 * @returns {AxiosPromise}
 */
export const deployService = (params) => request({
    url: baseUrl + '/service/deploy',
    method: 'post',
    data: params
})
/**
 * look look  log
 * @param params
 * @returns {AxiosPromise}
 */
export const lookLog = (params) => request({
    url: baseUrl + '/service/display',
    method: 'get',
    params: params
})
/**
 * look look deploy record
 * @param params
 * @returns {AxiosPromise}
 */
export const lookDeployRecord = (params) => request({
    url: baseUrl + '/service/listDevops',
    method: 'get',
    params: params
})








