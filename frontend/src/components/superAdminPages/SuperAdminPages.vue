<template>
    <div class="super-admin-pages">
        <PageTitle icon="fa fa-cogs" main="System Administration" />
        <div class="super-admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Account Management" active>
                        <AccountManagement :parentUsers="parentUsers" />  
                    </b-tab>
                    <b-tab title="Deleted Accounts" >
                        <DeletedAccounts :parentDeletedUsers="parentDeletedUsers" />
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
            parentDeletedUsers: []
        }
    },
    methods: {
        loadUsers() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => {
                    this.parentUsers = res.data
                })
        },
        loadDeletedUsers() {
            axios.get(`${baseApiUrl}/deletedUsers`)
                .then(res => {
                    this.parentDeletedUsers = res.data
                })
        },
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