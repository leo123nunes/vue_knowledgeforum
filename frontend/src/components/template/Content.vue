<template>
    <div class="content">
        <router-view class="content-area"></router-view>
    </div>
</template>

<script>
export default {
    name: "Content"
}
</script>

<style>
    .content{
        background: rgb(235, 234, 234);
        grid-area: content;
    }

    .content-area{
        width: 100%;
    }
</style>