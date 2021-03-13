<template>
    <div class="article-by-id">
        <PageTitle :title="article.name" :subtitle="article.description" icon="fa fa-file" />
    
        <div class="article-content" v-html="article.content">
        
        </div>
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import axios from 'axios'
import { baseApiUrl } from '@/global'
import PageTitle from '@/components/template/PageTitle'

export default {
    name: "ArticleById",
    components: { PageTitle },
    data: function(){
        return {
            article: {}
        }
    },
    mounted(){
        const url = `${baseApiUrl}/articles/${this.$route.params.id}`

        axios.get(url).then(resp => {
            this.article = resp.data
        })
    },
    updated(){
        document.querySelectorAll(".article-content pre").forEach(element => {
            hljs.highlightBlock(element)
        })
    }    
}
</script>

<style>
    .article-by-id .article-content{
        background-color: #fff;
        border-radius: 8px;
        margin: 15px;
        padding: 10px;
    }

    .article-by-id .article-content pre{
        background-color: rgb(53, 46, 46);
        color: #fff;
        border-radius: 8px;
    }

    .article-by-id .article-content img{
        max-width: 100%;
    }
</style>