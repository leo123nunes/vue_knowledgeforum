<template>
    <header class="header">
        <a class="toggle" v-if="!hideToggle" @click="toggleMenu">
            <i class="fa fa-caret-left"></i>
        </a>

        <a class="title">
            {{ title }}
        </a>
    </header>
</template>

<script>
export default {
    name: "Header",
    props: {
        title: String,
        hideToggle: Boolean
    },
    computed: {
        icon(){
            return "fa fa-caret-down"
        }
    },
    methods: {
        toggleMenu(){

        }
    }
}
</script>

<style>
    .header{
        background: linear-gradient(to right, rgb(56, 81, 143), rgb(152, 191, 235));
        grid-area: header;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .title{
        color: #fff;
        font-weight: 100;
        text-decoration: none;
        flex-grow: 1;
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
    }
</style>