<template>
    <div class="text-area">
        <img class="logo-img" src="@/assets/logo.png" alt="User"/>
        <input v-if="showSignUp" v-model="user.name" type="text" placeholder="Name">
        <input v-model="user.email" type="text" placeholder="Email">
        <input v-model="user.password" type="password" placeholder="Password">
        <input v-if="showSignUp" v-model="user.confirmPassword" type="password" placeholder="Confirm password">

        <b-button @click="signIn" v-if="!showSignUp" variant="primary">Login</b-button>
        <b-button @click="signUp" v-if="showSignUp" variant="primary">Register</b-button>

        <a v-if="!showSignUp" @click.prevent="showSignUp = !showSignUp" href class="link-register">No have registration? Click here to register.</a>
        <a v-if="showSignUp" @click.prevent="showSignUp = !showSignUp" href class="link-register">Have registration? Click here to login.</a>
    </div>
</template>

<script>
import axios from 'axios'
import { userKey, baseApiUrl, showError} from '@/global'

export default {
    name: "AuthScreen",
    data: function(){
        return {
            showSignUp: false,
            user: {}
        }
    },
    methods: {
        signUp(){
            const url = `${baseApiUrl}/signup`

            axios.post(url, ...this.user).then(resp => {
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignUp = false
            }).catch(showError)
        },
        signIn(){
            const url = `${baseApiUrl}/signin`

            axios.post(url, this.user).then(resp => {
                this.$store.commit('setUser', resp.data)
                localStorage.setItem(userKey, JSON.stringify(resp.data))
                this.$router.push({ path: "/"})
            }).catch(showError)
        }
    }
}
</script>

<style>
    .text-area{
        background: linear-gradient(to right, #263a6b, rgb(124, 173, 230));
        width: fit-content;
        height: fit-content;
        display: flex;
        align-self: center;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .text-area > *{
        margin: 10px;
    }

    .text-area > a{
        text-decoration: none;
        color: #fff;
    }

    .content{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .logo-img{
        width: 100px;
        height: 100px;
    }

    .text-area > input{
        margin: 5px;
        text-decoration: none;
        border: none;
    }

    .text-area > input::selection{
        text-decoration: none;
    }
</style>