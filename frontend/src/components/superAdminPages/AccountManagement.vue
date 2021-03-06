<template>
    <div class="account-management">
        <div class="table" v-if="mode === 'table'">
            <div class="table-title-box">
                <h3 class="table-title">Account List</h3>
                <b-button class="create-button" variant="primary" @click="changeMode('create')">Create New Account</b-button>
            </div>
            <b-table hover striped :items="parentUsers" :fields="fields">
                <template slot="actions" slot-scope="data">
                    <b-button @click="loadUser(data.item)" variant="warning" class="mr-2">
                        <i class="fa fa-pencil"></i>
                    </b-button>
                    <b-button @click="loadUser(data.item, 'delete')" variant="danger" class="mr-2">
                        <i class="fa fa-trash"></i>
                    </b-button>
                </template>
            </b-table>
            <b-pagination size="md" v-model="page" :total-rows="usersCount" :per-page="usersLimit" />
        </div>
        <div class="account" v-if="mode !== 'table'">
            <b-form @keyup.enter="save">
                <h3 class="edit-title" v-if="mode === 'edit'">Edit Account</h3>
                <h3 class="delete-title" v-if="mode === 'delete'">Delete Account</h3>
                <hr>
                <input id="user-id" type="hidden" v-model="user.id" />
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Name:" label-for="user-name">
                            <b-form-input id="user-name" type="text"
                                :disabled="mode==='delete'"
                                v-model="requestUser.name" required
                                placeholder="Enter user's name..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="E-mail:" label-for="user-email">
                            <b-form-input id="user-email" type="text"
                                :disabled="mode==='delete'"
                                v-model="requestUser.email" required
                                placeholder="Enter user's e-mail..." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="6" sm="12">
                        <b-form-group label="Password:" label-for="user-password" v-if="mode !== 'delete'">
                            <b-form-input id="user-password" type="password"
                            v-if="mode!=='delete'"
                            :disabled="mode==='delete'"
                            v-model="requestUser.password" required
                            placeholder="Enter user's password..." />
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Confirm Password:" label-for="user-confirmPassword" v-if="mode !== 'delete'">
                            <b-form-input id="user-confirmPassword" type="password"
                            v-if="mode!=='delete'"
                            :disabled="mode==='delete'"
                            v-model="requestUser.confirmPassword" required
                            placeholder="Confirm user's password..." />
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="3" sm="12">
                        <b-form-group label="Account Type:" label-for="user-type">
                            <b-form-select id="user-type"                                
                                :disabled="mode==='delete'"
                                v-model="requestUser.type" :options="types" />
                        </b-form-group>
                    </b-col>
                </b-row>
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
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'

export default {
    name: 'AccountManagement',
    props: ['parentUsers', 'usersCount', 'usersLimit'],
    computed: mapState(['user']),
    data() {
        return {
            mode: 'table',
            requestUser: {
                type: null,
            },
            page: 1,
            fields: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'E-mail', sortable: true },
                { key: 'type', label: 'Type', sortable: true },
                { key: 'actions', label: 'Actions'}
            ],
            types: [
                { text: 'Select One', value: null },
                { text: 'Common User', value: 'common' },
                { text: 'Admin', value: 'admin' },
                { text: 'Super Admin', value: 'superAdmin' },
            ]
        }
    },
    methods: {
        changeMode(mode) {
            if(mode==='create') this.requestUser = { type: null}
            this.mode = mode
        },
        loadUser(user, mode = 'edit') {
            this.mode = mode
            this.requestUser = { ...user }
        },
        save() {
            const method = this.requestUser.id ? 'put' : 'post'
            const id = this.requestUser.id ? this.requestUser.id : ''

            axios[method](`${baseApiUrl}/users/${id}`, this.requestUser)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    if(this.user.id === this.requestUser.id) {
                        this.user.name = this.requestUser.name
                        this.user.email = this.requestUser.email
                    }
                    this.reset()
                })
                .catch(showError)
        },
        reset() {
            this.mode = 'table'
            this.user = {} 
        },
        remove() {
            if(this.requestUser.type !== 'superAdmin' || this.requestUser.type !== 'admin') {
                axios.delete(`${baseApiUrl}/users/${this.requestUser.id}`)
                    .then(() => {
                        this.$toasted.global.defaultSuccess()                    
                        this.reset()
                    })
                    .catch(showError)
            }
        },
    },
    watch: {
        page() {
            this.$emit('changeUsersPage', this.page)
        }
    }
}
</script>

<style>
    .account-management {
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

    .account {
        min-height: calc(var(--content-height) - 95px);;
        display: flex;
        flex-direction: column;

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

    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>