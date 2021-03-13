<template>
    <div class="stats">
        <i v-if="this.$mq == 'lg'" :class="icon" :style="style()"></i>

        <div class="stats-info">
            <span class="stats-title">{{ title }}</span>
            <span class="stats-value">{{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Stats",
    props: ['icon', 'title', 'value', 'color'],
    methods: {
        style(){
            return 'color: ' + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stats{
        background-color: rgb(245, 245, 245);
        padding-right: 10px;
        border: 2px solid rgb(209, 209, 209);
        display: flex;
        padding: 10px 10px;
        flex: 1;
        margin: 10px 10px;
        border-radius: 10px;
        box-shadow: 1px 1px 1px 1px rgb(197, 197, 197);
    }

    .stats i{
        font-size: 4rem;
        display: flex;
        align-items: center;
    }

    .stats-info{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .stats-info .stats-value{
        font-size: 2rem;
    }

</style>