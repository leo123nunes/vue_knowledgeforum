<template>
    <div class="page-title">
        <h1><i v-if="icon" :class="icon"></i>{{ title }}</h1>
        <h2>{{ subtitle }}</h2>
        <hr/>
    </div>
</template>

<script>
export default {
    name: "PageTitle",
    props: ['icon', 'title', 'subtitle']
}
</script>

<style>
    .page-title h1{
        margin-top: 10px;
        margin-left: 10px;
        margin-bottom: 0px;
        font-size: 1.5em;
    }

    .page-title h1 > i{
        margin-right: 5px;
    }

    .page-title h2{
        color: #777;
        font-size: 1.2em;
        margin-top: 0px;
        margin-left: 10px;
    }

</style>