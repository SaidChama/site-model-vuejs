<template>
    <div class="deleted-users">
        <div class="table" v-if="mode === 'table'">
            <div class="table-title-box">
                <h3 class="table-title">Deleted Account List</h3>
            </div>
            <b-table hover striped :items="parentDeletedUsers" :fields=fields>
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadUser(data.item)" variant="primary" class="mr-2">
                        <i class="fa fa-undo"></i>
                    </b-button>
                </template>
            </b-table>
            <b-pagination size="md" v-model="page" :total-rows="deletedUsersCount" :per-page="deletedUsersLimit" />
        </div>
        <div class="user" v-if="mode === 'user'">
            <div class="account-data">
                <h1>Recover Deleted User</h1>
                <hr>
                <h3>Name: {{ this.user.name }}</h3>
                <h3>E-Mail: {{ this.user.email }}</h3>
                <h3>Type: {{ this.user.type }}</h3>
                <h3>Deleted: {{ this.user.deleted }}</h3>
            </div>
            <div class="button-box">
                <b-button variant="primary" @click="restore(); usersToParent()">Restore</b-button>
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
    props: ['parentDeletedUsers', 'deletedUsersCount', 'deletedUsersLimit'],
    data() {
        return {
            mode: 'table',
            user: {
                deleted: null,
            },
            parentUsers: [],
            page: 1,
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
        reset() {
            this.mode = 'table'
            this.user = {deleted: null}
        },
        restore() {
            axios.put(`${baseApiUrl}/deletedUsers/${this.user.id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }        
    },
    watch: {
        page() {
            this.$emit('changeDeletedUsersPage', this.page)
        }
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
        min-height: calc(var(--content-height) - 95px);
        justify-content: space-between;
        align-items: left;
    }

    .account-data hr {
        padding-bottom: 10px;
    }

    .account-data h3 {
        padding-left: 20px;
    }

    .button-box {
        padding-left: 15px;
    }

    .button-box button {
        padding: 5px 15px;
        margin-right: 10px;
        font-size: 1.2rem;
    }

    .pagination {
        display: flex;
        justify-content: center;
    }
</style>