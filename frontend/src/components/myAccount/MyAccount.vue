<template>
    <div class="my-account">
        <PageTitle icon="fa fa-user" main="My Account" />
        <div class="account-content" v-if="mode === 'acc-info'">
            <h2 class="subtitle">Account Info</h2>
            <hr class="line">
            <div class="account-info-box">
                <p class="account-info">
                    <i class="fa fa-id-badge" /> Name: {{ user.name }}
                </p>
                <p class="account-info">
                    <i class="fa fa-envelope" /> E-Mail: {{ user.email }}
                </p>
                <p class="account-info">
                    <i class="fa fa-user-circle" /> Account Type: {{ accountStatus() }}
                </p>
                <b-button variant="primary" @click=changeMode() class="password-change">Change Password</b-button>
            </div>
        </div>
        <div class="change-password" v-if="mode==='change-password'">
            <h2 class="subtitle">User: {{ user.name }}</h2>
            <hr class="line">
            <div class="change-password-box">
                <b-form>
                    <b-col xl="3">
                        <b-form-group label="Password:" label-for="old-password">
                            <b-form-input id="old-password" v-model="user.oldPassword"
                                type="password" required placeholder="Enter current password" />
                        </b-form-group>
                        <b-form-group label="New Password:" label-for="new-password">
                            <b-form-input id="new-password" v-model="user.newPassword"
                                type="password" required placeholder="Enter new password" />
                        </b-form-group>
                        <b-form-group label="Confirm new password:" label-for="confirm-new-password">
                            <b-form-input xl-col="3" id="confirm-new-password" v-model="user.confirmNewPassword"
                                type="password" required placeholder="Enter new password again" />
                        </b-form-group>
                    </b-col>
                </b-form>
                <div class="button-box">
                    <b-button variant="success" class="button password-save">Save</b-button>
                    <b-button variant="secondary" @click=changeMode() class="button password-back">Back</b-button>
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
        }
    },
    methods: {
        accountStatus() {
            return this.user.admin ? 'Admin' : 'Common'
        },
        changeMode() {
            this.mode = this.mode === 'acc-info' ? 'change-password' : 'acc-info'
        },
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
    }

    .line {
        margin: 0px 15px;
        padding: 0px 30px 30px 30px;
    }

    .subtitle {
        padding-left: 75px;
    }

    .account-info-box {
        display: flex;
        flex-direction: column;
        align-items: left;
        justify-content: center;
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

    .account-info {
        padding-left: 100px;
    }

    .password-change {
        margin: 200px 0px 20px 100px;
        padding: 10px;
        border-radius: 30px;
        color: #fff;
        font-weight: 1000;
        width: 180px;
    }

    .button-box .button {
        margin: 60px 0px 20px 20px;
        padding: 10px;
        border-radius: 30px;
        color: #fff;
        font-weight: 1000;
        width: 100px;
    }

    .change-password-box {
        box-sizing: border-box;
        padding: 0px 100px;
    }
</style>