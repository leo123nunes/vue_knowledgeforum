<template>
    <aside class="menu"></aside>
</template>

<script>
export default {
    name: "Menu"
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