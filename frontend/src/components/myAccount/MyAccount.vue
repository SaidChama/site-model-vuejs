<template>
    <div class="my-account">
        <PageTitle icon="fa fa-user" main="My Account" />
        <div class="account-content" v-if="mode === 'acc-info'">
            <div class="account-info-box">
                <div>
                    <h2 class="subtitle">Account Info</h2>
                    <hr>
                    <p class="account-info">
                        <i class="fa fa-id-badge" /> Name: {{ this.user.name }}
                    </p>
                    <p class="account-info">
                        <i class="fa fa-envelope" /> E-Mail: {{ this.user.email }}
                    </p>
                    <p class="account-info">
                        <i class="fa fa-user-circle" /> Account Type: {{ this.user.type }}
                    </p>
                </div>
                <div class="button-box">
                    <b-button variant="primary" @click="changeMode" class="password-change">Change Password</b-button>
                </div>
            </div>
        </div>
        <div class="change-password" v-if="mode==='change-password'">
            <div class="change-password-box">
                <b-form @keyup.enter="changePassword">
                    <h2 class="subtitle">User: {{ user.name }}</h2>
                    <hr>
                    <b-col xl="3">
                        <b-form-group label="Password:" label-for="old-password">
                            <b-form-input id="old-password" v-model="passwordUpdate.oldPassword"
                                type="password" required placeholder="Enter current password" />
                        </b-form-group>
                        <b-form-group label="New Password:" label-for="new-password">
                            <b-form-input id="new-password" v-model="passwordUpdate.newPassword"
                                type="password" required placeholder="Enter new password" />
                        </b-form-group>
                        <b-form-group label="Confirm new password:" labelInfo-for="confirm-new-password">
                            <b-form-input xl-col="3" id="confirm-new-password" v-model="passwordUpdate.confirmNewPassword"
                                type="password" required placeholder="Enter new password again" />
                        </b-form-group>
                    </b-col>
                </b-form>
                <div class="button-box">
                    <b-button variant="success" @click="changePassword" class="button password-save">Save</b-button>
                    <b-button variant="secondary" @click="changeMode" class="button password-back">Back</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex'
import PageTitle from '../templates/PageTitle'

export default {
    name: 'MyAccount',
    components: { PageTitle },
    computed: mapState(['user']),
    data() {
        return {
            mode: 'acc-info',
            passwordUpdate: {}
        }
    },
    methods: {
        changeMode() {
            this.mode = this.mode === 'acc-info' ? 'change-password' : 'acc-info'
            this.passwordUpdate = {}
        },
        reset() {
            this.mode = 'acc-info'
            this.passwordUpdate = {}
        },
        changePassword() {
            axios.put(`${baseApiUrl}/changePassword/${this.user.id}`, this.passwordUpdate)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .account-content, .change-password {
        box-sizing: border-box;
        background-color: #fff;
        margin: 2px 3px;
        box-shadow: 0px 0px 14px 6px rgba(0, 0, 0, 0.2);
        min-height: var(--content-height);
        border-radius: 10px;
    }

    .account-info-box, .change-password-box {
        display: flex;
        min-height: var(--content-height);
        flex-direction: column;
        align-items: left;
        justify-content: space-between;
    }

    .change-password-box h2, .account-info-box h2{
        padding: 30px 0px 0px 100px;
    }

    .account-info-box i {
        font-size: 1.5rem;
    }

    .account-info-box .fa-id-badge {
        padding-left: 3.5px;
        padding-right: 13.5px;
    }

    .account-info-box .fa-envelope {
        padding-right: 10px;
    }

    .account-info-box .fa-user-circle {
        padding-left: 0.5px;
        padding-right: 10.5px;
    }

    .account-info, .b-form-group {
        padding-left: 100px;
    }

    .button-box {
        display: flex;
        margin: 0px 0px 20px 100px;
        padding: 10px;
        border-radius: 30px;
        color: #fff;
        font-weight: 1000;
        width: 180px;
    }


</style>