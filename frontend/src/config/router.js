import Vue from 'vue'
import VueRouter from 'vue-router'

import Auth from '@/components/auth/Auth'
import Home from '@/components/publicPages/Home'
import WhoWeAre from '@/components/publicPages/WhoWeAre'

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
    path: '/quem-somos',
    component: WhoWeAre
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router