<template>
    <div class="header">
        <a class="menu-toggle" @click="toggleMenu" v-if="!hideToggle && $route.name !== 'auth'" >
            <i class="menu-toggle fa fa-bars"></i>
        </a>
        <h1 class="title">
            <router-link class="title-name" to="/" >{{ title }}</router-link>
        </h1>
        <router-link to ="/login" class="signin" v-if="$route.name !== 'auth' && !user">
            <i class="signin fa fa-users" /><span class="signin"> Employee Area</span>
        </router-link>
        <UserDropdown v-if="$route.name !== 'auth' && user"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    computed: mapState(['user']),
    props: {
        title: String,
        hideToggle: Boolean
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        background: linear-gradient(to right, #000000, #771a1a);
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        grid-area: header;
    }
    .header a.menu-toggle {
        background-color: #3f3c3c;
        padding: 0px 12px;
        border-radius: 10px;
        margin-left: 15px;
    }

    .header .menu-toggle {
        cursor: pointer;
        color: #DDD;
        font-size: 1.8rem;
    }

    .title {        
        flex-grow: 1;
        text-align: center;
        font-size: 1.5rem;
    }

    .title .title-name {
        text-decoration: none;
        font-weight: 100;
        color: #fff;
    }

    a.signin {
        padding-right: 15px;
    }

    a.signin:hover {
        text-decoration: none;
    }

    .header .signin {
        color: #fff;
        font-size: 1.3rem;
    }
</style>