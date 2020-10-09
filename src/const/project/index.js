export default {
    border: true,
    index: true,
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
        label: "项目名称",
        prop: "projectName",
        fixed: true,
        search: true
    }, {
        label: "应用标识",
        prop: "wsCode",
        fixed: true,
        // search: true,
        tip: 'Devops工作空间'
    }, {
        label: "状态",
        prop: "status",
        fixed: true,
        type: 'select',
        slot: true,
        dicData: [{
            label: '正常',
            value: 1
        }, {
            label: '禁止',
            value: 2
        }]
    }, {
        label: "描述信息",
        prop: "remark",
        fixed: true,
    }]
}
