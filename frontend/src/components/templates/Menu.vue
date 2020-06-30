<template>
    <div class="menu" v-show="isMenuVisible">
        <MenuComponent path="/" component="Início"/>
        <MenuComponent path="/quem-somos" component="Quem Somos"/>
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

    
</style>