<template>
    <div class="menu" v-show="isMenuVisible">
        <h2>Menu</h2>
    </div>

</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Menu',
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