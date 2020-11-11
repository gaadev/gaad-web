import {baseUrl} from "@/config/env";

export default {
    border: true,
    index: false,
    indexLabel: '序号',
    labelWidth: 120,
    selection: true,
    menuBtn: true,
    menuWidth: 300,
    align: 'center',
    menuAlign: 'center',
    columnBtn: false, //是否显示显影按钮
    delBtn: false,   //是否显示删除按钮
    addBtn: false,   //是否显示添加按钮
    addTitle: '新增项目',//添加弹窗标题
    editBtn: false,  //是否显示编辑按钮
    viewBtn: false, //是否显示查看按钮
    saveBtn: true,  //是否显示提交按钮
    updateBtn: true, //是否显示更新按钮
    cancelBtn: true, //是否显示取消按钮
    column: [{
        label: "服务名称",
        prop: "serviceName",
        fixed: true,
        search: true
    }, {
        label: "服务标识",
        prop: "serviceCode",
        fixed: true,
        // search: true,
        tip: 'Devops工作空间'
    }, {
        label: "编码类型",
        prop: "lang",
        fixed: true,
        type: 'select',
        dicData: [{
            label: 'java',
            value: 'java'
        }, {
            label: 'golang',
            value: 'golang'
        }, {
            label: 'vue',
            value: 'vue'
        }]
    }, {
        label: "所属项目",
        prop: "projectId",
        fixed: true,
        search: true,
        type: 'select',
        props: {
            label: 'projectName',
            value: 'ID'
        },
        dicMethod: 'post',
        dicUrl: baseUrl + '/project/listProjects',
        required: true
    }, {
        label: "状态",
        prop: "status",
        fixed: true,
        type: 'select',
        slot: true,
        dicData: [{
            label: 'Running',
            value: 1
        }, {
            label: 'Down',
            value: 2
        }]
    }, {
        label: "描述信息",
        prop: "remark",
        fixed: true,
    }]
}
