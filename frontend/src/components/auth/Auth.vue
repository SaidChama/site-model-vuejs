<template>
    <div class="auth-content">
        <div class="auth-modal">
            <img src="@/assets/generic-logo.png" alt="Logo">
            <hr>
            <div class="auth-title">Login</div>
            <b-form @keyup.enter="signin">
                <input v-model="user.email" name="email" type="text" placeholder="E-mail"/>
                <input v-model="user.password" name="password" type="password" placeholder="Password" />
            </b-form>
            <button @click="signin">Log-in</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        width: 250px;
        padding: 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #BBB;
        border-radius: 12px;
        background-color: #fff;
        box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.1)
    }

    .auth-title {
        font-weight: 100;
        font-size: 1.4rem;
        margin-top: 5px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        box-sizing: border-box;
        width: 100%;
        margin-bottom: 20px;
        padding: 3px 8px;
        outline: none;
        font-size: 1.1rem;
        border-radius: 20px;
        box-shadow: 1px 0 0 1px rgba(60, 60, 60, 0.75)
    }

    .auth-modal button {
        align-self: flex-end;
        /*background: linear-gradient(to right, #000000, #771a1a);*/
        background-color: #606060;
        color: #FFF;
        padding: 5px 15px;
        font-size: 1.2rem;
        border-radius: 20px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
        rgba(120, 120, 120, 0),
        rgba(120, 120, 120, 0.75),
        rgba(120, 120, 120, 0));
    }

    .auth-modal img {
        width: 100%;
    }
</style>