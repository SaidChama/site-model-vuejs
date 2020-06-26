<template>
    <div class="header">
        <a href="" class="menu-toggle">
            <i class="menu-toggle fa fa-bars"></i>
        </a>
        <div class="title">
            {{ title }}
        </div>
        <a href="" class="signin">
            <i class="signin fa fa-users"> Employee Area</i>
        </a>
    </div>
</template>

<script>
export default {
    name: 'Header',
    props: {
        title: String
    }
}
</script>

<style>
    .header {
        background: linear-gradient(to right, #000000, #771a1a);
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        grid-area: header;
    }
    .header a.menu-toggle {
        background-color: #3f3c3c;
        padding: 0px 12px;
        border-radius: 10px;
        margin-left: 70px;
    }

    .header .menu-toggle {
        color: #DDD;
        font-size: 2.5rem;
    }

    .title {
        font-size: 4rem;
        font-weight: 100;
        color: #fff;
    }

    a.signin {
        text-decoration: none;
        margin-right: 15px;
    }

    i.signin {
        color: #fff;
        font-size: 2rem;
    }
</style>