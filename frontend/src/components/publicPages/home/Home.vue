<template>
    <div class="home">
        <PageTitle icon="fa fa-home" main="Home" />
        <div class="home-content">
            <ul>
                <li v-for="homeItem in homeItems" :key="homeItem.id">
                    <HomeItem :homeItem="homeItem" />
                </li>
            </ul>
            
        </div>
    </div>
</template>

<script>
import PageTitle from '../../templates/PageTitle'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import HomeItem from './HomeItem'

export default {
    name: 'Home',
    components: { PageTitle, HomeItem, baseApiUrl },
    data() {
        return {
            homeItems: []
        }
    },
    methods: {
        getHomeItem() {
            const url = `${baseApiUrl}/homeContent`
            axios(url).then(res => {
                this.homeItems = res.data
            })
        }
    },
    mounted() {
        this.getHomeItem()
    }

}
</script>

<style>
    .home-content {
        background-color: #fff;
        min-height: var(--content-height);
    }
</style>