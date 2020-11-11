export default {
    border: true,
    index: false,
    indexLabel: '序号',
    labelWidth: 120,
    selection: false,
    menuBtn: true,
    // menuWidth: 300,
    align: 'center',
    menuAlign: 'center',
    columnBtn: false, //是否显示显影按钮
    delBtn: false,   //是否显示删除按钮
    addBtn: false,   //是否显示添加按钮
    addTitle: '新增项目',//添加弹窗标题
    editBtn: false,  //是否显示编辑按钮
    viewBtn: false, //是否显示查看按钮
    saveBtn: false,  //是否显示提交按钮
    updateBtn: false, //是否显示更新按钮
    cancelBtn: false, //是否显示取消按钮
    refreshBtn: false,
    column: [{
        label: "构建版本",
        prop: "deployNum",
        fixed: true
    }, {
        label: "服务名称",
        prop: "serviceName",
        fixed: true,
    }, {
        label: "服务标识",
        prop: "serviceCode",
        fixed: true,
    }, {
        label: "构建时间",
        prop: "CreatedAt",
        fixed: true,
        width: 200,
        type: "datetime",
        format: "yyyy-MM-dd hh:mm:ss",
    }, {
        label: "状态",
        prop: "status",
        fixed: true,
        type: 'select',
        slot: true,
        dicData: [{
            label: '成功',
            value: 1
        }, {
            label: '失败',
            value: 2
        }]
    }]
}
