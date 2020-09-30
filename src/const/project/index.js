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
        label: "应用名称",
        prop: "clusterName",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入应用名称",
            trigger: "blur"
        }]
    }, {
        label: "应用标识",
        prop: "clusterName",
        fixed: true,
        search: true,
        tip: 'Devops工作空间',
        rules: [{
            required: true,
            message: "请输入应用标识",
            trigger: "blur"
        }]
    }, {
        label: "状态",
        prop: "status",
        fixed: true,
    }, {
        label: "描述信息",
        prop: "remake",
        fixed: true,
    }]
}
