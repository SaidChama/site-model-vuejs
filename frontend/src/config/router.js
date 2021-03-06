import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import Home from '@/components/publicPages/home/Home'
import About from '@/components/publicPages/About'
import MyAccount from '@/components/myAccount/MyAccount'
import SuperAdminPages from '@/components/superAdminPages/SuperAdminPages'
import SiteEditorPages from '@/components/siteEditorPages/SiteEditorPages'

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
    name: 'about',
    path: '/about',
    component: About
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
    name: 'siteEditor',
    path: '/site-editor',
    component: SiteEditorPages,
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