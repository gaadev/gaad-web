import request from "@/router/axios";
import {baseUrl} from "@/config/env";

/**
 * 新增项目
 * @param params
 * @returns {AxiosPromise}
 */
export const createProject = (params) => request({
    url: baseUrl + '/project/createProject',
    method: 'post',
    data: params
})
/**
 * 分页查询项目
 * @param params
 * @returns {AxiosPromise}
 */
export const pageProjects = (params) => request({
    url: baseUrl + '/project/pageProjects',
    method: 'post',
    data: params
})
/**
 * 更新项目
 * @param params
 * @returns {AxiosPromise}
 */
export const updateProject = (params) => request({
    url: baseUrl + '/project/updateProject',
    method: 'put',
    data: params
})


/**
 * 删除项目
 * @param params
 * @returns {AxiosPromise}
 */
export const deleteProject = (params) => request({
    url: baseUrl + '/project/deleteProject',
    method: 'delete',
    data: params
})




