import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import Home from '@/components/publicPages/Home'
import WhoWeAre from '@/components/publicPages/WhoWeAre'
import MyAccount from '@/components/myAccount/MyAccount'
import SuperAdminPages from '@/components/superAdminPages/SuperAdminPages'
import AccountManagement from '@/components/superAdminPages/AccountManagement'

import { userKey } from '@/global.js'

Vue.use(VueRouter)

const routes = [{
    name: 'home',
    path: '/',
    component: Home
}, {
    name: 'auth',
    path: '/login',
    component: Auth
}, {
    name: 'whoWeAre',
    path: '/info',
    component: WhoWeAre
}, {
    name: 'myAccount',
    path: '/my-account',
    component: MyAccount
}, {
    name: 'administration',
    path: '/system-administration',
    component: SuperAdminPages,
    meta: { requiresAdmin: true }
}, {
    name: 'accountManagement',
    path: '/system-administration/account-management',
    component: AccountManagement,
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)

    if(to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(json)
        user && (user.type === 'admin' || user.type === 'superAdmin') ? next() : next({ path: '/' })
    } else {
        next()
    }
})

export default router