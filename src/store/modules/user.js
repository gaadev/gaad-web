import {setToken, removeToken} from '@/util/auth'
import {setStore, getStore} from '@/util/store'
import {isURL, validatenull} from '@/util/validate'
import {encryption, deepClone} from '@/util/util'
import menuAll from '@/mock/menu'
import webiste from '@/config/website'
import {loginByUsername, getUserInfo, getMenu, getTopMenu, logout, refeshToken} from '@/api/user'


function addPath(ele, first) {
    const menu = webiste.menu;
    const propsConfig = menu.props;
    const propsDefault = {
        label: propsConfig.label || 'label',
        path: propsConfig.path || 'path',
        icon: propsConfig.icon || 'icon',
        children: propsConfig.children || 'children'
    }
    const icon = ele[propsDefault.icon];
    ele[propsDefault.icon] = validatenull(icon) ? menu.iconDefault : icon;
    const isChild = ele[propsDefault.children] && ele[propsDefault.children].length !== 0;
    if (isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path].replace(/&/g, "$")
    }
    if (!isChild && first && !isURL(ele[propsDefault.path])) {
        ele[propsDefault.path] = ele[propsDefault.path] + '/index'
    } else {
        ele[propsDefault.children] && ele[propsDefault.children].forEach(child => {
            if (!isURL(child[propsDefault.path])) {
                child[propsDefault.path] = `${ele[propsDefault.path]}/${child[propsDefault.path] ? child[propsDefault.path] : 'index'}`
            }
            addPath(child);
        })
    }

}

const user = {
    state: {
        userInfo: {},
        permission: {},
        roles: [],
        menuId: getStore({name: 'menuId'}) || [],
        menu: getStore({name: 'menu'}) || [],
        menuAll: getStore({name: 'menuAll'}) || [],
        token: getStore({name: 'token'}) || '',
    },
    actions: {
        //根据用户名登录
        LoginByUsername({commit}, userInfo) {
            const user = encryption({
                data: userInfo,
                type: 'Aes',
                key: 'avue',
                param: ['useranme', 'password']
            });
            return new Promise((resolve) => {
                // loginByUsername(user.username, user.password, userInfo.code, userInfo.redomStr).then(res => {
                    const data = new Date().getTime() + '';
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                // })
            })
        },
        //根据手机号登录
        LoginByPhone({commit}, userInfo) {
            return new Promise((resolve) => {
                loginByUsername(userInfo.phone, userInfo.code).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    resolve();
                })
            })
        },
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                // getUserInfo().then((res) => {
                    const data = {
                        userInfo: {
                            username: 'admin',
                            name: 'avue',
                            avatar: 'https://gitee.com/uploads/61/632261_smallweigit.jpg',
                        },
                        roles: 'admin',
                        permission: [
                            'sys_crud_btn_add',
                            'sys_crud_btn_export',
                            'sys_menu_btn_add',
                            'sys_menu_btn_edit',
                            'sys_menu_btn_del',
                            'sys_role_btn1',
                            'sys_role_btn2',
                            'sys_role_btn3',
                            'sys_role_btn4',
                            'sys_role_btn5',
                            'sys_role_btn6',
                        ], //权限级别
                    };
                    // const data = res.data.data;
                    commit('SET_USERIFNO', data.userInfo);
                    commit('SET_ROLES', data.roles);
                    commit('SET_PERMISSION', data.permission)
                    resolve(data);
                // }).catch(err => {
                //     reject(err);
                // })
            })
        },
        //刷新token
        RefeshToken({state, commit}) {
            return new Promise((resolve, reject) => {
                refeshToken(state.refeshToken).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data);
                    resolve(data);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                // logout().then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_MENUID', {})
                    commit('SET_MENUALL', []);
                    commit('SET_MENU', [])
                    commit('SET_TAG_LIST', [])
                    commit('SET_ROLES', [])
                    commit('DEL_ALL_TAG');
                    commit('CLEAR_LOCK');
                    removeToken()
                    resolve()
                // }).catch(error => {
                //     reject(error)
                // })
            })
        },
        //注销session
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '')
                commit('SET_MENUID', {})
                commit('SET_MENUALL', []);
                commit('SET_MENU', [])
                commit('SET_TAG_LIST', [])
                commit('SET_ROLES', [])
                commit('DEL_ALL_TAG');
                commit('CLEAR_LOCK');
                removeToken()
                resolve()
            })
        },
        GetTopMenu() {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res.data.data || []
                    resolve(data)
                })
            })
        },
        //获取系统菜单
        GetMenu({commit}, parentId) {
            return new Promise(resolve => {
                // getMenu(parentId).then((res) => {
                const data = menuAll;
                    let menu = deepClone(data);
                    menu.forEach(ele => {
                        addPath(ele, true);
                    })
                    commit('SET_MENUALL', menu)
                    commit('SET_MENU', menu)
                    resolve(menu)
                // })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
            setStore({name: 'token', content: state.token})
        },
        SET_MENUID(state, menuId) {
            state.menuId = menuId;
            setStore({name: 'menuId', content: state.menuId, type: 'session'})
        },
        SET_USERIFNO: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        SET_MENUALL: (state, menuAll) => {
            state.menuAll = menuAll
            setStore({name: 'menuAll', content: state.menuAll})
        },
        SET_MENU: (state, menu) => {
            state.menu = menu
            setStore({name: 'menu', content: state.menu})
            if (validatenull(menu)) return
            //合并动态路由去重
            let menuAll = state.menuAll;
            menuAll = menuAll.concat(menu).reverse();
            let newMenu = [];
            for (let item1 of menuAll) {
                let flag = true;
                for (let item2 of newMenu) {
                    if (item1.label == item2.label || item1.path == item2.path) {
                        flag = false;
                    }
                }
                if (flag) newMenu.push(item1);
            }
            state.menuAll = newMenu
            setStore({name: 'menuAll', content: state.menuAll, type: 'session'})
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        SET_PERMISSION: (state, permission) => {
            state.permission = {};
            permission.forEach(ele => {
                state.permission[ele] = true;
            });
        }
    }

}
export default user