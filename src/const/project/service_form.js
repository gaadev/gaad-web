import {baseUrl} from "@/config/env";

export default {
    column: [],
    labelPosition: 'left',
    labelSuffix: '：',
    labelWidth: 120,
    gutter: 40,
    menuBtn: true,
    submitBtn: false,
    submitText: '提交',
    emptyBtn: false,
    emptyText: '清空',
    menuPosition: 'center',
    tabs: false,
    detail: false,
    group: [{
        label: '基础信息',
        prop: 'info',
        arrow: true,
        collapse: true,
        column: [{
            type: 'input',
            label: '服务名称',
            span: 12,
            prop: 'projectName',
            required: true,
            rules: [{
                required: true,
                message: '请输入服务名称'
            }]
        }, {
            type: 'input',
            label: '服务标识',
            span: 12,
            tip: '必须保持唯一',
            prop: 'wsCode',
            formslot: true,
            rules: [{
                required: true,
                message: '请输入服务标识'
            }],
            required: true
        }, {
            type: 'select',
            label: '所属项目',
            tip: '所属项目',
            span: 12,
            prop: 'clusterId',
            rules: [{
                required: true,
                message: '请选择所属项目'
            }],
            props: {
                label: 'clusterName',
                value: 'ID'
            },
            dicMethod: 'post',
            dicUrl: baseUrl + '/cluster/listClusters',
            required: true
        }, {
            type: 'select',
            label: '状态',
            disabled: true,
            dicData: [{
                label: '正常',
                value: 1
            }, {
                label: '禁止',
                value: 2
            }],
            formslot: true,
            span: 12,
            prop: 'status',
            value: 1
        }, {
            type: 'select',
            label: '编码类型',
            dicData: [{
                label: 'java',
                value: 'java'
            }, {
                label: 'golang',
                value: 'golang'
            }, {
                label: 'vue',
                value: 'vue'
            }],
            formslot: true,
            span: 12,
            prop: 'codeType',
        }, {
            type: 'textarea',
            label: '描述信息',
            span: 24,
            display: true,
            prop: 'remark'
        }]
    }, {
        label: 'git仓库配置',
        prop: 'git',
        arrow: true,
        // display: false,
        collapse: true,
        column: [{
            type: 'input',
            label: '代码仓库',
            span: 12,
            tip: '一般为管理员账号或拥有所有仓库访问权限账号',
            prop: 'gitAccount',
            required: true,
            rules: [{
                required: true,
                message: '请输入git账号'
            }]
        }, {
            type: 'input',
            label: '分支',
            span: 12,
            prop: 'gitPassword',
            rules: [{
                required: true,
                message: '请输入git账号密码'
            }],
            required: true
        }]
    }, {
        label: '参数配置',
        prop: 'java',
        arrow: true,
        display: false,
        collapse: true,
        column: []
    }]
}
