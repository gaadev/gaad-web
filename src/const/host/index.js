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
        label: "主机类别类别",
        prop: "id",
        fixed: true,
        search: false,
        span: 24,
        formslot: true
    }, {
        label: "主机名称",
        prop: "name",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入主机名称",
            trigger: "blur"
        }]
    }, {
        label: "链接地址",
        prop: "enName",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入链接地址",
            trigger: "blur"
        }]
    }, {
        label: "端口",
        prop: "nickname",
        fixed: true,
        rules: [{
            required: false,
            message: "请输入端口",
            trigger: "blur"
        }]
    }, {
        label: "备注",
        prop: "formerName",
        fixed: true,
        rules: [{
            required: false,
            message: "请输入昵称",
            trigger: "blur"
        }]
    }]
}
