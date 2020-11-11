// 配置编译环境和线上环境之间的切换

let baseUrl = '';
let wsUrl = '';
let iconfontVersion = ['567566_pwc3oottzol','2183860_nt1gvbnh4u'];
let iconfontUrl = `//at.alicdn.com/t/font_$key.css`;
let codeUrl = `${baseUrl}/code`
const env = process.env
if (env.NODE_ENV == 'development') {
    baseUrl = `http://192.168.10.18:7779`; // 开发环境地址
    wsUrl = 'ws://192.168.10.18:7779'
} else if (env.NODE_ENV == 'production') {
    baseUrl = ``; //生产环境地址
    wsUrl = ``; //生产环境地址
} else if (env.NODE_ENV == 'test') {
    baseUrl = ``; //测试环境地址
    wsUrl = ``; //测试环境地址
}
export {
    baseUrl,
    iconfontUrl,
    iconfontVersion,
    codeUrl,
    env,
    wsUrl
}
