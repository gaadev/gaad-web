export default [{
    label: "工作台",
    path: '/dashboard',
    component: 'views/wel/dashboard',
    icon: 'fa fa-tachometer',
    children: []
}, {
    label: "节点管理",
    path: '/host',
    icon: 'fa fa-television',
    children: [{
        label: "主机管理",
        path: 'index',
        component: 'views/host/index',
        icon: 'fa fa-rocket',
        children: []
    }, {
        label: "集群管理",
        path: 'cluster',
        component: 'views/host/cluster',
        icon: 'fa fa-book',
        children: []
    }]
}, {
    label: "应用发布",
    path: '/deploy',
    icon: 'fa fa-cloud',
    children: [{
        label: "项目管理",
        path: 'project',
        component: 'views/project/index',
        icon: 'fa fa-book',
        children: []
    }, {
        label: "服务管理",
        path: 'service',
        component: 'views/project/service',
        icon: 'fa fa-rocket',
        children: []
    }]
}, {
    label: "配置中心",
    path: '/config',
    icon: 'fa fa-cogs',
    children: [{
        label: "环境管理",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    }, {
        label: "服务配置",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    }, {
        label: "应用配置",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    }, {
        label: "问题记录",
        path: 'question',
        component: 'views/question/index',
        icon: 'fa fa-server',
        children: []
    }]
}, {
    label: "插件管理",
    path: '/plugin',
    icon: 'fa fa-cloud',
    children: [{
        label: "插件列表",
        path: 'list',
        component: 'views/plugin/list',
        icon: 'fa fa-book',
        children: []
    }
    // ,{
    //     label: "插件市场",
    //     path: 'market',
    //     component: 'views/plugin/index',
    //     icon: 'fa fa-book',
    //     children: []
    // }
    ]
}]
const second = []

// export default ({mock}) => {
//     // if (!mock) return;
//     let menu = [first, second];
//     Mock.mock('/user/getMenu', 'get', (res) => {
//         let body = JSON.parse(res.body);
//         return {
//             data: menu[body.type] || []
//         }
//     })
//     Mock.mock('/user/getTopMenu', 'get', () => {
//         return {
//             data: []
//         }
//     })
//
// }