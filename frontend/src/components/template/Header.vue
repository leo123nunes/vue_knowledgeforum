<template>
    <header class="header"></header>
</template>

<script>
export default {
    name: "Header"
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
</style>