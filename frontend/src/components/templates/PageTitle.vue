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
    margin: 3px 3px 3px 3px;
    padding: 15px;
    box-shadow: 0px 0px 14px 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
}
    .page-title h1 {
        margin: 0px;
    }
</style>