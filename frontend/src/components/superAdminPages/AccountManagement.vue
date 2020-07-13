<template>
    <div class="account-management">
        <div class="table" v-if="mode === 'table'">
            <b-button variant="primary" @click="changeMode('create')">Create New Account</b-button>
            <b-table hover striped :items="users" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadUser(data.item)" variant="warning" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button @click="loadUser(data.item, 'delete')" variant="danger" class="mr-2">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
        </div>
        <div class="account" v-if="mode !== 'table'">
            <b-form>
                <input id="user-id" type="hidden" v-model="user.id" />
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Nome:" label-for="user-name">
                            <b-form-input id="user-name" type="text"
                                :disabled="mode==='delete'"
                                v-model="user.name" required
                                placeholder="Enter user's name..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="E-mail:" label-for="user-email">
                            <b-form-input id="user-email" type="text"
                                :disabled="mode==='delete'"
                                v-model="user.email" required
                                placeholder="Enter user's e-mail..." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Password:" label-for="user-password">
                            <b-form-input id="user-password" type="password"
                            v-if="mode!=='delete'"
                            v-model="user.password" required
                            placeholder="Enter user's password..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Confirm Password:" label-for="user-confirmPassword">
                            <b-form-input id="user-confirmPassword" type="password"
                            v-if="mode!=='delete'"
                            v-model="user.confirmPassword" required
                            placeholder="Confirm user's password..." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3" sm="12">
                        <b-form-group label="Account Type:" label-for="user-type">
                            <b-form-select id="user-type"                                
                                :disabled="mode==='delete'"
                                v-model="user.type" :options="types" />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-form>
            <b-row>
                <b-button variant="primary" @click="save" v-if="mode === 'create'">Create</b-button>
                <b-button variant="success" @click="save" v-if="mode === 'edit'">Save</b-button>
                <b-button variant="danger" @click="remove" v-if="mode === 'delete'">Delete</b-button>
                <b-button variant="secondary" @click="changeMode('table')">Back</b-button>
            </b-row>
        </div>
    </div>
</template>

<script>
import DeletedAccounts from './DeletedAccounts'
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'AccountManagement',
    data() {
        return {
            mode: 'table',
            user: {
                type: null
            },
            users: [],
            fields: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'actions', label: 'Actions'}
            ],
            types: [
                { text: 'Select One', value: null },
                { text: 'Common User', value: 'common' },
                { text: 'Builder', value: 'admin' },
                { text: 'Admin', value: 'superAdmin' },
            ]
        }
    },
    methods: {
        changeMode(mode) {
            if(mode==='create') this.user = { type: null}
            this.mode = mode
        },
        loadUsers() {
            axios.get(`${baseApiUrl}/users`)
                .then(res => {
                    this.users = res.data
                })
        },
        loadUser(user, mode = 'edit') {
            this.mode = mode
            this.user = { ...user }
        },
        save() {
            const method = this.user.id ? 'put' : 'post'
            const id = this.user.id ? this.user.id : ''
            axios[method](`${baseApiUrl}/users/${id}`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadDeletedUsers() {
            axios.get(`${baseApiUrl}/deletedUsers`)
                .then(res => {
                    DeletedAccounts.users = res.data
                })
        },
        reset() {
            this.mode = 'table'
            this.loadDeletedUsers()
            this.user = {}
            this.loadUsers()            
        },
        remove() {
            axios.delete(`${baseApiUrl}/users/${this.user.id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()                    
                })
                .catch(showError)
        }
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