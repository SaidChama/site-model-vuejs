<template>
    <div class="header">
        <h1>Header</h1>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style>
    .header {
        background: linear-gradient(to right, #000000, #771a1a);
        display: flex;
        justify-content: center;
        align-items: center;
        grid-area: header;
    }

    .header h1 {
        color: #FFF;
    }
</style>