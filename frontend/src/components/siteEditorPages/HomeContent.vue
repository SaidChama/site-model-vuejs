<template>
    <div>
        <div class="table" v-if="mode==='table'">
            <div>{{ this.content }}</div>
            <b-table hover striped :items="this.contentList" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadContent(data.item)" variant="warning" class="mr-2">
                            <i class="fa fa-pencil"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
        <div class="content" v-if="mode !=='table'">
            <b-form>
                <input id="content-id" type="hidden" v-model="content.id" />
                <b-row>
                    
                </b-row>
                <b-row></b-row>
                <b-row></b-row>
                <b-row></b-row>
                <b-row></b-row>
                <b-row></b-row>
            </b-form>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'HomeContent',
    data() {
        return {
            mode: 'table',
            contentList: [],
            content: {},
            fields: [
                { key: 'id', label: 'ID', sortable: true },
                { key: 'title', label: 'Title', sortable: true },
                { key: 'actions', label: 'Actions'}
            ],
        }
    },
    methods: {
        loadContentList() {
            axios.get(`${baseApiUrl}/homeContent`)
                .then(res => {
                    this.contentList = res.data
                })
        },
        loadContent(content, mode = 'edit') {
            this.mode = mode
            axios.get(`${baseApiUrl}/homeContent/${content.id}`)
                .then(res => {
                    this.content = res.data
                })
        }
    },
    mounted() {
        this.loadContentList()
    }    
}
</script>

<style>

</style>