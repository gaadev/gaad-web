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
    tabs: true,
    detail: false,
    group: [{
        label: '基础信息',
        prop: 'info',
        arrow: true,
        collapse: true,
        column: [{
            type: 'input',
            label: '项目名称',
            span: 12,
            prop: 'projectName',
            required: true,
            rules: [{
                required: true,
                message: '请输入项目名称'
            }]
        }, {
            type: 'input',
            label: '应用标识',
            span: 12,
            tip: '必须保持唯一',
            prop: 'wsCode',
            formslot: true,
            rules: [{
                required: true,
                message: '请输入应用标识'
            }],
            required: true
        }, {
            type: 'select',
            label: '目标集群',
            tip: '项目部署集群',
            span: 12,
            prop: 'clusterId',
            rules: [{
                required: true,
                message: '请选择目标集群'
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
            type: 'textarea',
            label: '描述信息',
            span: 24,
            display: true,
            prop: 'remark'
        }]
    }, {
        label: 'git账号配置',
        prop: 'git',
        arrow: true,
        collapse: true,
        column: [{
            type: 'input',
            label: '账号',
            span: 12,
            tip: '一般为管理员账号或拥有所有仓库访问权限账号',
            prop: 'gitAccount',
            required: true,
            rules: [{
                required: true,
                message: '请输入git账号'
            }]
        }, {
            type: 'password',
            label: '密码',
            span: 12,
            prop: 'gitPassword',
            rules: [{
                required: true,
                message: '请输入git账号密码'
            }],
            required: true
        }]
    }]
}
