<template>
    <div class="menu" v-show="isMenuVisible">
        <MenuComponent class="item" path="/" component="Home"/>
        <MenuComponent class="item" path="/about" component="About"/>
    </div>

</template>

<script>
import MenuComponent from './MenuComponent'
import { mapState } from 'vuex'

export default {
    name: 'Menu',
    components: { MenuComponent },
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu {
        background: linear-gradient(to right, #232526, #414345);
        grid-area: menu;
    }

    .menu h2 {
        color: #fff
    }

    .item:hover {
        text-decoration: none;
    }    
</style>