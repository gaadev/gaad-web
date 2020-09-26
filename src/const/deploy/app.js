export default {
    border: true,
    index: true,
    indexLabel: '序号',
    labelWidth: 120,
    selection: true,
    menuBtn: true,
    menuWidth: 200,
    align: 'center',
    menuAlign: 'center',
    columnBtn: true,
    delBtn: false,
    addBtn: true,
    editBtn: false,
    viewBtn: false,
    column: [{
        label: "应用名称",
        prop: "id",
        fixed: true,
        search: false,
        addVisdiplay: false,
        editVisdiplay: false
    }, {
        label: "标识符",
        prop: "name",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入主机名称",
            trigger: "blur"
        }]
    }, {
        label: "描述信息",
        prop: "enName",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入链接地址",
            trigger: "blur"
        }]
    }]
}
