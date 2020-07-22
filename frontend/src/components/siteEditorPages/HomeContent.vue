<template>
    <div class="home-management">
        <div class="table" v-if="mode==='table'">
            <div class="table-title-box">
                <h3 class="table-title">Home Content Editor</h3>
                <b-button class="create-button" variant="primary" @click="changeMode('create')">Create New Article</b-button>
            </div>
            <b-table hover striped :items="this.contentList" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadContent(data.item)" variant="warning" class="mr-2">
                            <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button @click="loadContent(data.item, 'delete')" variant="danger" class="mr-2">
                            <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
        <div class="content" v-if="mode !=='table'">
            <b-form>
                <input id="content-id" type="hidden" v-model="content.id" />
                <b-form-group label="Title" label-for="content-title">
                    <b-form-input id="content-title" type="text"
                        :disabled="mode==='delete'" v-model="content.title" />
                </b-form-group>
                <b-form-group label="Description" label-for="content-description">
                    <b-form-input id="content-description" type="text"
                        :disabled="mode==='delete'" v-model="content.description" />
                </b-form-group>
                <b-form-group label="Thumbnail" label-for="content-thumbnail">
                    <b-form-input id="content-thumbnail" type="file"
                        :disabled="mode==='delete'" v-model="content.thumbnail" />
                </b-form-group>
                <b-form-group label="Link" label-for="content-link">
                    <b-form-input id="content-link" type="text"
                        :disabled="mode==='delete'" v-model="content.externalUrl" />
                </b-form-group>
                <b-form-group label="Main content" label-for="content-main">
                    <VueEditor id="content-main"
                        :disabled="mode==='delete'" v-model="content.content" />
                </b-form-group>
            </b-form>
            <b-row class="button-box">
                <b-button variant="primary" @click="save" v-if="mode === 'create'">Create</b-button>
                <b-button variant="success" @click="save" v-if="mode === 'edit'">Save</b-button>
                <b-button variant="danger" @click="remove" v-if="mode === 'delete'">Delete</b-button>
                <b-button variant="secondary" @click="changeMode('table')">Back</b-button>
            </b-row>
        </div>
    </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'HomeContent',
    components: { VueEditor },
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
        changeMode(mode) {
            if(mode==='create') this.content = {}
            this.mode = mode
        },
        loadContentList() {
            axios.get(`${baseApiUrl}/homeContent`)
                .then(res => {
                    this.contentList = res.data
                })
        },
        loadContent(content, mode = 'edit') {
            this.mode = mode
            // axios.get(`${baseApiUrl}/homeContent/${content.id}`)
            //     .then(res => this.content = res.data)
            this.content = { ...content }
        },
        save() {
            const method = this.content.id ? 'put' : 'post'
            const id = this.content.id ? this.content.id : ''

            axios[method](`${baseApiUrl}/homeContent/${id}`, this.content)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            axios.delete(`${baseApiUrl}/homeContent/${this.content.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        reset() {
            this.mode = 'table'
            this.content = {}
            this.loadContentList()
        }
    },
    mounted() {
        this.loadContentList()
    }    
}
</script>

<style>
    .home-management {
        min-height: calc(var(--content-height) - 95px);
    }

    .table-title-box {
        display: flex;
        justify-content: space-between;
        align-items: center;

        padding-bottom: 15px;
    }

    .table-title {
        margin: 0px;
        margin-left: 3vw;
        font-weight: 1000;
    }

    .create-button {
        margin: 0px;
        margin-right: 5vw;
    }

    .content {
        min-height: calc(var(--content-height) - 95px);;
        display: flex;
        flex-direction: column;
        background-color: #fff;

        justify-content: space-between;
    }

    .button-box {
        display: flex;
        width: auto;
    }

    .button-box button {
        padding: 5px 15px;
        margin-right: 10px;
        font-size: 1.2rem;
    }
</style>