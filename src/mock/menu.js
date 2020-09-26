import Mock from 'mockjs'

const first = [{
    label: "工作台",
    path: '/dashboard',
    component: 'views/util/tags',
    icon: 'fa fa-tachometer',
    children: []
},{
    label: "主机管理",
    path: '/host',
    component: 'views/host/index',
    icon: 'fa fa-television',
    children: []
},{
    label: "应用发布",
    path: '/deploy',
    icon: 'fa fa-cloud',
    children: [{
        label: "应用管理",
        path: 'app',
        component: 'views/deploy/app',
        icon: 'fa fa-book',
        children: []
    },{
        label: "应用发布",
        path: 'deploy',
        component: 'views/deploy/deploy',
        icon: 'fa fa-rocket',
        children: []
    }]
},{
    label: "配置中心",
    path: '/config',
    icon: 'fa fa-cogs',
    children: [{
        label: "环境管理",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    },{
        label: "服务配置",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    },{
        label: "应用配置",
        path: 'error',
        component: 'components/error-page/403',
        icon: 'fa fa-server',
        children: []
    }]
}]
const second = []

export default ({mock}) => {
    if (!mock) return;
    let menu = [first, second];
    Mock.mock('/user/getMenu', 'get', (res) => {
        let body = JSON.parse(res.body);
        return {
            data: menu[body.type] || []
        }
    })
    Mock.mock('/user/getTopMenu', 'get', () => {
        return {
            data: []
        }
    })

}