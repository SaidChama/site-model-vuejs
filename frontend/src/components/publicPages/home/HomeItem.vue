<template>
    <div class="home-item">
        <router-link class="router-box" v-if="!homeItem.externalUrl || homeItem.extenalUrl === ''" to='/about'>
            <div class="item-box">
                <div class="thumbnail">
                    Photo
                </div>
                <div class="text-box">
                    <h3 class="item-title">{{ homeItem.title }}</h3>
                    <p class="item-description">{{ homeItem.description }}</p>
                </div>
            </div>
        </router-link>
        <a href="yotube.com" class="link-box" v-else>
            <div class="item-box">
                <div class="thumbnail">
                    Photo
                </div>
                <div class="text-box">
                    <h3 class="item-title">{{ homeItem.title }}</h3>
                    <p class="item-description">{{ homeItem.description }}</p>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    name: 'HomeItem',
    props: ['homeItem']
}
</script>

<style>
    .router-box:hover, .link-box:hover  {
        text-decoration: none;
    }
    .item-box {
        border: solid 4px rgb(80, 73, 73);
        width: 40vw;
        margin: 10px;
        border-radius: 10px;
        box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.2);
        background-color: rgb(241, 235, 235);

        display: flex;
    }

    .thumbnail {
        margin: 10px 10px;
        padding: 70px 60px;
        border: solid 1px #000;
        border-radius: 4px;
        left: 5px;
        background-color: #fff
    }

    .text-box {
        margin-top: 10px;
        margin-left: 15px;
    }
    
    .item-title, .text-box, .thumbnail {
        color: #000;
        text-decoration: none;
    }
</style>