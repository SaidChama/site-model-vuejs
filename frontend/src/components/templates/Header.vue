<template>
    <div class="header">
        <a class="menu-toggle" @click="toggleMenu" v-if="!hideToggle && $route.name !== 'auth'" >
            <i class="menu-toggle fa-lg" :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link class="title-name" to="/" >{{ title }}</router-link>
        </h1>
        <router-link to ="/login" class="signin" v-if="$route.name !== 'auth' && !this.$store.state.user">
            <i class="signin fa fa-users" /><span class="signin"> Employee Area</span>
        </router-link>
        <UserDropdown v-if="$route.name !== 'auth' && this.$store.state.user"/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import UserDropdown from './UserDropdown'

export default {
    name: 'Header',
    components: { UserDropdown },
    computed: {
        icon() {
            return this.$store.state.isMenuVisible ? 'fa fa-angle-left' : 'fa fa-angle-down'
        }
    },
    props: {
        title: String,
        hideToggle: Boolean,
        toggleButton: String
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
    .header .menu-toggle {
        width: 60px;
        height: 100%;
        display: flex;
        color: #DDD;
        font-size: 1.8rem;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
    .menu-toggle:hover {
        background-color: rgba(138, 119, 119, 0.808);
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