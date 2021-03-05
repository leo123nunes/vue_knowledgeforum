<template>
    <header class="header">
        <a class="toggle" v-if="!hideToggle" @click="toggleMenu">
            <i :class="icon"></i>
        </a>
        <h1 class="title">
            <router-link to="/"><a href="/home" class="title">{{ title }}</a></router-link>
        </h1>
        
        <UserDropdown v-if="!hideUserDropdown"/>
    </header>
</template>

<script>

import UserDropdown from './UserDropdown'

export default {
    name: "Header",
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hideUserDropdown: Boolean
    },
    computed: {
        icon(){
            return this.$store.state.isMenuVisible ? "fa fa-caret-left" : "fa fa-caret-down"
        }
    },
    methods: {
        toggleMenu(){
            this.$store.commit('toggleMenu')
        }
        
        
    }
}
</script>

<style>
    .header{
        background: linear-gradient(to right, #263a6b, rgb(124, 173, 230));
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    a.title:hover{
        color: #fff;
        text-decoration: none;
    }

    .title{
        color: #fff;
        font-weight: 100;
        text-decoration: none;
        flex-grow: 1;
        margin: 0px;
        font-size: 1em;
        display: flex;
        justify-content: center;
    }

    header.header > a.toggle{
        color: #fff;
        height: 100%;
        width: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    header.header > a.toggle:hover{
        background-color: rgba(0, 0, 0, 0.322);
        text-decoration: none;
    }
</style>