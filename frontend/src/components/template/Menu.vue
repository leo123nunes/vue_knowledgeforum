<template>
    <aside class="menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: "Menu",
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu{
        background: linear-gradient(to right, rgb(36, 36, 36), rgb(88, 88, 88));
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: center;
        grid-area: menu;
    }
</style>