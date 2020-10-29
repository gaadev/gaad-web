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
            label: '代码仓库',
            span: 16,
            prop: 'gitUrl',
            formslot: true,
            required: true,
            rules: [{
                required: true,
                message: '请输入代码仓库'
            }]
        }, {
            type: 'input',
            label: '分支',
            span: 8,
            prop: 'gitBranch',
            // formslot:true,
            required: true,
            value: 'master',
            rules: [{
                required: true,
                message: '请输入分支'
            }]
        }, {
            type: 'select',
            label: '编码类型',
            dicData: [{
                label: 'java',
                value: 'java'
            }, {
                label: 'go',
                value: 'go'
            }, {
                label: 'python',
                value: 'python'
            }, {
                label: 'vue',
                value: 'vue'
            }],
            formslot: true,
            span: 12,
            prop: 'lang',
            value: 'java',
            rules: [{
                required: true,
                message: '请选择编码类型'
            }],
        }, {
            type: 'select',
            label: '所属项目',
            tip: '所属项目',
            span: 12,
            prop: 'projectId',
            rules: [{
                required: false,
                message: '请选择所属项目'
            }],
            props: {
                label: 'projectName',
                value: 'ID'
            },
            dicMethod: 'post',
            dicUrl: baseUrl + '/project/listProjects',
            required: true
        }, {
            type: 'input',
            label: '服务名称',
            span: 12,
            tip: '必须保持唯一',
            prop: 'serviceName',
            rules: [{
                required: true,
                message: '请输入服务名称'
            }],
            required: true
        }, {
            type: 'input',
            label: '服务标识',
            span: 12,
            tip: '必须保持唯一',
            prop: 'serviceCode',
            formslot: true,
            rules: [{
                required: true,
                message: '请输入服务标识'
            }],
            required: true
        }, {
            type: 'input',
            label: 'DockerFile',
            span: 12,
            prop: 'dockerfile',
            // value: 'default'
        }, {
            type: 'input',
            label: 'Template',
            span: 12,
            prop: 'template',
            // value: 'default'
        }, {
            type: 'select',
            label: '状态',
            disabled: true,
            display: false,
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
        }]
    }, {
        label: '参数配置',
        arrow: true,
        prop: 'devopsOpts',
        display: true,
        collapse: true,
        column: [{
            type: 'input',
            label: '自定义命令',
            span: 24,
            prop: 'buildCmds',
        }, {
            type: 'input',
            label: '启动参数',
            span: 12,
            prop: 'javaOpts',
        }, {
            type: 'select',
            label: '构建工具',
            span: 12,
            prop: 'buildTool',
            dicData: [{
                label: 'Maven',
                value: 'maven'
            }, {
                label: 'Gradle',
                value: 'gradle'
            }]
        }]
    }]
}
