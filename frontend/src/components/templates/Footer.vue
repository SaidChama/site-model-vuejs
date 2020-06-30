<template>
    <div class="footer">
        <h2>Company Name</h2>
    </div>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>
    .footer {
        display: flex;
        justify-content: right;
        align-items: center;


        background-color: #CCC;
        margin: 0px;
        grid-area: footer;
        box-shadow: 15px 0px 0px 0px;
    }

    .footer h2 {
        margin: 0px 15px 0px 0px;
        font-weight: 100;
        font-size: 1.3rem;
    }
</style>