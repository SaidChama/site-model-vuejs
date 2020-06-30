<template>
    <router-link class='button' :to="path">
        <h2>{{ component }}</h2>
    </router-link>
</template>

<script>
export default {
    name: 'MenuCompoent',
    props: ['path', 'component']
}
</script>

<style>
    .button {
        text-decoration: none;        
    }

    .button h2 {
        margin: 0px;
        padding: 10px 15px;
    }

    .button h2:hover {
        background: linear-gradient(to right, #fff, #aaa);
        color: #303030;
    }

</style>