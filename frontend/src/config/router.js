import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import Home from '@/components/publicPages/Home'
import WhoWeAre from '@/components/publicPages/WhoWeAre'
import MyAccount from '@/components/myAccount/MyAccount'
import SuperAdminPages from '@/components/superAdminPages/SuperAdminPages'

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
    component: SuperAdminPages 
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router