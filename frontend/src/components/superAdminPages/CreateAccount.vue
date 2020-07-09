<template>
    <div class="user-admin">
        <b-form>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Nome:" label-for="user-name">
                        <b-form-input id="user-name" type="text"
                            v-model="user.name" required
                            placeholder="Enter user's name..." />
                    </b-form-group>                    
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="E-mail:" label-for="user-email">
                        <b-form-input id="user-email" type="text"
                            v-model="user.email" required
                            placeholder="Enter user's e-mail..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="6" sm="12">
                    <b-form-group label="Password:" label-for="user-password">
                        <b-form-input id="user-password" type="password"
                        v-model="user.password" required
                        placeholder="Enter user's password..." />
                    </b-form-group>
                </b-col>
                <b-col md="6" sm="12">
                    <b-form-group label="Confirm Password:" label-for="user-confirmPassword">
                        <b-form-input id="user-confirmPassword" type="password"
                        v-model="user.confirmPassword" required
                        placeholder="Confirm user's password..." />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col md="3" sm="12">
                    <b-form-group label="Account Type:" label-for="user-type">
                        <b-form-select id="user-type" v-model="user.type" :options="types" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col xs="12">
                    <b-button variant="primary" @click="createAccount">Create</b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'CreateAccount',
    data() {
        return {
            mode: 'save',
            user: {
                name: '',
                type: 'common'
            },
            types: [
                { text: 'Select One', value: 'common' },
                { text: 'Common User', value: 'common' },
                { text: 'Builder', value: 'admin' },
                { text: 'Admin', value: 'superAdmin' },
            ]
        }      
    },
    methods: {
        createAccount() {
            axios.post(`${baseApiUrl}/users`, this.user)
                .then(() => {
                this.$toasted.global.defaultSuccess()
                this.user = {}
            })
            .catch(showError)
        }
    }
}
</script>

<style>
    .user-admin {
        min-height: calc(var(--content-height) - 95px);
    }
</style>