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
            <h3>ID: {{ this.user.id }}</h3>
            <h3>Name: {{ this.user.name }}</h3>
            <h3>E-Mail: {{ this.user.email }}</h3>
            <h3>Type: {{ this.user.type }}</h3>
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
        loadUsers() {
            axios.get(`${baseApiUrl}/deletedUsers`)
                .then(res => {
                    this.users = res.data
                })
        },
        restore() {
            const id = this.user.id
            axios.put(`${baseApiUrl}/deletedUsers/${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        reset() {
            this.mode = 'table'
            this.user = {}
            this.loadUsers()
        }
    },
    mounted() {
            this.loadUsers()
    }
}
</script>

<style>
    .deleted-users {
        min-height: calc(var(--content-height) - 95px);
    }
</style>