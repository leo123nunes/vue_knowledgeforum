<template>
    <div class="menu" v-show="isMenuVisible || !user">
        <div class="search-area">
            <i class="fa fa-search"></i>
            <input v-model="treeFilter" class="tree-filter-input" placeholder="Search"/>
        </div>
        <LiquorTree ref="tree" :filter="treeFilter" class="categorie-tree" :data="tree" :options="treeOptions" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import LiquorTree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: "Menu",
    computed: mapState(['isMenuVisible', 'user']),
    components: { LiquorTree },
    data: function(){
        return {
            treeFilter: '',
            tree: this.getTree(),
            test: [
                { text: "one"},
                { text: "two"},
                { text: "three"}
            ],
            treeOptions: {
                propertyNames: { 'text': 'name'},
                filter: {
                    emptyText: "Nothing found."
                }
            }
        }
    },
    methods: {
        getTree(){
            const url = `${baseApiUrl}/categories/three`
            return axios.get(url).then(resp => resp.data)
        },
        onNodeSelection(node){
            this.$router.push({
                name: "ArticlesByCategory",
                params: {id: node.id}
            })

            if(this.$mq == 'sm'){
                this.$store.commit('toggleMenu', false)
            }
        }
    },
    mounted(){
        this.$refs.tree.$on('node:selected', this.onNodeSelection)
    }
}
</script>

<style>
    .menu{
        background: linear-gradient(to right, rgb(36, 36, 36), rgb(88, 88, 88));
        display: flex;
        flex-direction: column;
        /* flex-wrap: wrap; */
        align-items: center;
        grid-area: menu;
    }

    .menu > .search-area > i{
        color: #fff;
        padding-right: 10px;
    }

    .search-area{
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        padding: 10px;
        border-bottom: 2px solid rgba(156, 156, 156, 0.315);
    }

    .tree-filter-input{
        background-color: transparent;
        max-width: fit-content;
        color: #fff;
        border: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content:center;
    }

    .categorie-tree{
        margin-top: 10px;
        width: 100%;
    }

    .tree-content .tree-anchor{
        color: #fff;
        background-color: transparent;
    }

    .tree-arrow.has-child{
        filter: brightness(2);
        
    }

    .tree-node.selected > .tree-content{
        background-color: rgba(255, 255, 255, 0.267);
    }

    .tree-root > .tree-node > .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.267);
    }

    .tree-root > .tree-node > .tree-content > a:hover,
    .tree-children > .tree-node > .tree-content > a:hover{
        text-decoration: none;
    }

    .tree-children > .tree-node > .tree-content:hover{
        background-color: rgba(255, 255, 255, 0.267);
    }

    .categorie-tree > .tree-filter-empty{
        display: flex;
        justify-content: center;
        color: rgba(0, 0, 0, 0.815);
    }

</style>