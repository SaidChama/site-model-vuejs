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
        font-size: 1.8rem;
    }

    .button h2:hover {
        /* text-decoration: none; */
        background: linear-gradient(to right, #fff, #aaa);
        color: #303030;
    }

</style>