<template>
    <div class="articles-by-category">
        <PageTitle :title="category.name" icon="fa fa-folder-o" :subtitle="`Subtitle of ${category.name}`"></PageTitle>

        <ul class="articles-list">
            <li v-for="article in articles" :key="article.id">
                <ArticleItem :article="article"></ArticleItem>
            </li>
        </ul>

        <div class="area-button-show-more" v-show="showMore">
            <button @click="getArticles" class="button-show-more btn btn-lg btn-outline-primary">Show more</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import PageTitle from '@/components/template/PageTitle.vue'
import ArticleItem from '@/components/article/ArticleItem.vue'

export default {
    name: "ArticlesByCategory",
    components: { PageTitle, ArticleItem },
    data: function(){
        return {
            category: {},
            articles: [],
            showMore: true,
            page: 1
        }
    },
    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.$route.params.id}`

            axios.get(url).then(resp => {
                this.category = resp.data
            })
            .catch(showError)
        },
        getArticles(){

            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`

            axios.get(url).then(resp => {
                this.articles = this.articles.concat(resp.data)

                this.page++

                if(resp.data.length == 0){
                    this.showMore = false
                }

            }).catch(showError)
        }
    },
    mounted(){
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
    .articles-by-category .area-button-show-more{
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .area-button-show-more .button-show-more{
        margin-top: 0px;
        margin-bottom: 20px;
    }

    .articles-by-category .articles-list{
        list-style-type: none;
        padding-left: 0px;
        margin: 10px;
    }
    
</style>