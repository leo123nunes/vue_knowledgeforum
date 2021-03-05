<template>
    <div class="home">
        <PageTitle icon="fa fa-home" title="Dashboard" subtitle="Knowledge base"/>

        <div class="stats-area">
            <Stats icon="fa fa-folder" title="Categories" color="#b91e1e" :value="this.stats.categories"/>
            <Stats icon="fa fa-file" title="Articles" color="#118f22" :value="this.stats.articles"/>
            <Stats icon="fa fa-user" title="Users" color="#2055a2" :value="this.stats.users"/>
        </div>
        
    </div>
</template>

<script>
import PageTitle from '../template/PageTitle'
import Stats from './Stats'
import axios from 'axios'
import { baseApiUrl } from '@/global.js'

export default {
    name: "Home",
    components: { PageTitle, Stats },
    data: function(){
        return {
            stats: ""
        }
    },
    methods: {
        getStats(){
            axios.get(baseApiUrl + "/stats").then(resp => {
                this.stats = resp.data
            })
        }
    },
    mounted(){
        this.getStats()
    }
}
</script>

<style>
    .stats-area{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
        margin: 10px 10px;
    }

</style>