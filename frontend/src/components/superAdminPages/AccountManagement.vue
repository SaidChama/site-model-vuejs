<template>
    <div class="account-management">
        <div class="table" v-if="mode === 'table'">
            <b-table hover striped :items="users" :fields=fields>
                <template slot="actions" slot-scope="data">
                    <b-button variant="warning" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button variant="danger" class="mr-2">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'AccountManagement',
    data() {
        return {
            mode: 'table',
            user: {},
            users: [],
            fields: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'actions', label: 'Actions'}
            ]
        }
    },
    methods: {
        loadUsers() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => {
                    this.users = res.data
                })
        },
        
    },
    mounted() {
            this.loadUsers()
    }

}
</script>

<style>
    .account-management {
        min-height: calc(var(--content-height) - 95px);
    }
</style>