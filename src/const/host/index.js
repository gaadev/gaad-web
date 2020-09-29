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
    columnBtn: false, //是否显示显影按钮
    delBtn: false,   //是否显示删除按钮
    addBtn: true,   //是否显示添加按钮
    addTitle: '新增主机',//添加弹窗标题
    editBtn: true,  //是否显示编辑按钮
    viewBtn: false, //是否显示查看按钮
    saveBtn: false,  //是否显示提交按钮
    updateBtn: false, //是否显示更新按钮
    cancelBtn: false, //是否显示取消按钮
    column: [{
        label: "IP",
        prop: "ip",
        fixed: true,
        search: true,
        rules: [{
            required: true,
            message: "请输入IP",
            trigger: "blur"
        }]
    }, {
        label: "端口",
        prop: "port",
        fixed: true,
        value: 22,
        rules: [{
            required: true,
            message: "请输入端口",
            trigger: "blur"
        }, {
            pattern: /^[2-9]*[1-9][0-9]*$/,
            message: `请输入大于0的正整数`,
            trigger: 'blur'
        }]
    }, {
        label: "账号",
        prop: "username",
        fixed: true,
        value: "root",
        rules: [{
            required: true,
            message: "请输入账号",
            trigger: "blur"
        }]
    }, {
        label: "密码",
        prop: "password",
        type: 'password',
        fixed: true,
        hide: true,
        rules: [{
            required: true,
            message: "请输入密码",
            trigger: "blur"
        }]
    }, {
        label: "所属集群",
        prop: "clusterId",
        fixed: true,
    }, {
        label: "备注",
        prop: "remark",
        fixed: true,
        span: 24,
        type: 'textarea',
        minRows: 3
    }]
}
