<template>
    <div class="deleted-users">
        <div class="table" v-if="mode === 'table'">
            <b-table hover striped :items="users" :fields=fields>
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadUser(data.item)" variant="primary" class="mr-2">
                        <i class="fa fa-undo"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
        <div class="user" v-if="mode === 'user'">
            <h1>Recover Deleted User</h1>
            <hr>
            <div class="account-data">
                <h3>Name: {{ this.user.name }}</h3>
                <h3>E-Mail: {{ this.user.email }}</h3>
                <h3>Type: {{ this.user.type }}</h3>
                <h3>Deleted: {{ this.user.deleted }}</h3>
            </div>
            <div class="button-box">
                <b-button variant="primary" @click="restore">Restore</b-button>
                <b-button variant="secondary" @click="changeMode">Back</b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'DeletedAccounts',
    data() {
        return {
            mode: 'table',
            user: {
                deleted: null
            },
            users: [],
            fields: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'actions', label: 'Restore'}
            ],
        }
    },
    methods: {
        changeMode() {
            this.mode = this.mode === 'table' ? 'user' : 'table'
        },
        loadUser(user, mode = 'user') {
            this.mode = mode
            this.user.id = user.id
            this.user.name = user.name
            this.user.email = user.email
            this.user.type = user.type
        },
        loadDeletedUsers() {
            axios.get(`${baseApiUrl}/deletedUsers`)
                .then(res => {
                    this.users = res.data
                })
        },
        reset() {
            this.mode = 'table'
            this.user = {deleted: null}
            this.loadDeletedUsers()
        },
        restore() {
            axios.put(`${baseApiUrl}/deletedUsers/${this.user.id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    location.reload()
                    this.reset()
                })
                .catch(showError)
        }        
    },
    mounted() {
            this.loadDeletedUsers()
    }
}
</script>

<style>
    .deleted-users {
        min-height: calc(var(--content-height) - 95px);
    }

    .user {
        display: flex;
        flex-direction: column;
    }
</style>