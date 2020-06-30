<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i> {{ main }}</h1>
        <hr>
    </div>
</template>

<script>
export default {
    name: 'PageTitle',
    props: ['icon', 'main']
}
</script>

<style>
.page-title {
    background-color: #fff;
    margin: 3px 3px 0px 3px;
    padding: 15px;
    box-shadow: (15px, 0, 1px, 3px, 0.3);
}
    .page-title h1 {
        margin: 0px;
    }
</style>