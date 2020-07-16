<template>
    <div class="super-admin-pages">
        <PageTitle icon="fa fa-cogs" main="System Administration" />
        <div class="super-admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Account Management" active>
                        <AccountManagement :parentUsers="parentUsers" :usersLimit="usersLimit" 
                            :usersCount="usersCount" @changeUsersPage="changeUsersPage" />  
                    </b-tab>
                    <b-tab title="Deleted Accounts" >
                        <DeletedAccounts :parentDeletedUsers="parentDeletedUsers"
                            :deletedUsersLimit="deletedUsersLimit"
                            :deletedUsersCount="deletedUsersCount"
                            @changeDeletedUsersPage="changeDeletedUsersPage" />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '../templates/PageTitle'
import AccountManagement from './AccountManagement'
import DeletedAccounts from './DeletedAccounts'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'SuperAdminPages',
    components: { PageTitle, AccountManagement, DeletedAccounts },
    data() {
        return {
            parentUsers: [],
            parentDeletedUsers: [],
            usersPage: 1,
            usersLimit: 0,
            usersCount: 0,
            deletedUsersPage: 1,
            deletedUsersLimit: 0,
            deletedUsersCount: 0
        }
    },
    methods: {
        loadUsers() {
            axios.get(`${baseApiUrl}/users?page=${this.usersPage}`)
                .then(res => {
                    this.parentUsers = res.data.data
                    this.usersCount = res.data.count
                    this.usersLimit = res.data.limit
                })
        },
        loadDeletedUsers() {
            axios.get(`${baseApiUrl}/deletedUsers?page=${this.deletedUsersPage}`)
                .then(res => {
                    this.parentDeletedUsers = res.data.data
                    this.deletedUsersCount = res.data.count
                    this.deletedUsersLimit = res.data.limit
                })
        },
        changeUsersPage(value) {
            this.usersPage = value
        },
        changeDeletedUsersPage(value) {
            this.deletedUsersPage = value
        }
    },
    watch: {
        parentDeletedUsers() {
            this.loadDeletedUsers()
        },
        parentUsers() {
            this.loadUsers()
        }
    },
    mounted() {
        this.loadUsers()
        this.loadDeletedUsers()
    }
}
</script>

<style>
    .super-admin-pages-tabs {
        margin: 2px 3px;
    }

    .card {
        height: 100%
    }
</style>