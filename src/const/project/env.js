export default {
    border: true,
    index: false,
    indexLabel: '序号',
    labelWidth: 120,
    selection: false,
    menuBtn: true,
    menuWidth: 300,
    align: 'center',
    menuAlign: 'center',
    columnBtn: false, //是否显示显影按钮
    delBtn: false,   //是否显示删除按钮
    addBtn: false,   //是否显示添加按钮
    addTitle: '新增项目',//添加弹窗标题
    editBtn: true,  //是否显示编辑按钮
    viewBtn: false, //是否显示查看按钮
    saveBtn: false,  //是否显示提交按钮
    updateBtn: true, //是否显示更新按钮
    cancelBtn: true, //是否显示取消按钮
    searchBtn: false,//是否显示搜索按钮
    emptyBtn: false, //是否显示清空按钮
    column: [{
        label: "图标",
        prop: 'icon',
        type: 'icon',
        fixed: true,
        slot: true,
        editDisplay: false,
    }, {
        label: "变量名称",
        prop: "name",
        fixed: true,
        span: 24,
        editDisabled: true,
    }, {
        label: "版本",
        prop: "version",
        fixed: true,
        span: 24
    }, {
        label: "路径配置",
        prop: "path",
        fixed: true,
        span: 24,
        rules: [{
            required: true,
            message: '请输入路径配置'
        }],
        required: true
    }]
}
