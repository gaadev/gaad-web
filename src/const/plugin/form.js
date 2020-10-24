export default {
    column: [
        {
            type: 'input',
            label: '插件名称',
            span: 24,
            display: true,
            prop: 'plugin_name'
        }, {
            type: 'textarea',
            label: '插件描述',
            span: 24,
            display: true,
            prop: 'plugin_remark'
        }, {
            type: 'upload',
            label: '插件图标',
            span: 24,
            display: true,
            showFileList: true,
            multiple: true,
            limit: 1,
            propsHttp: {},
            canvasOption: {},
            prop: 'plugin_icon',
            drag: true,
            dataType: 'string'
        }, {
            type: 'input',
            label: '插件参数',
            span: 24,
            display: true,
            prop: 'pluginParams',
            formslot:true,
        }
    ],
    labelPosition: 'left',
    labelSuffix: '：',
    labelWidth: 120,
    gutter: 0,
    menuBtn: true,
    submitBtn: true,
    submitText: '提交',
    emptyBtn: true,
    emptyText: '清空',
    menuPosition: 'center'
}