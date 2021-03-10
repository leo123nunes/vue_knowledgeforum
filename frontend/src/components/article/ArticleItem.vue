<template>
    <div class="article-item">
        <router-link :to="{name: 'ArticleById', params: {id: article.id}}" class="article-link">
            <div class="article-img">
                <img v-if="article.imageUrl" :src="article.imageUrl" alt="Article"/>
                <img v-else src="@/assets/article.png" alt="Article"/>
            </div>

            <div class="article-text">
                <h1 class="title">{{ article.name }}</h1>
                <p class="description"> {{ article.description }} </p>
                <span class="author"><strong>Author:</strong> {{ article.author}} </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "ArticleItem",
    props: ['article']
    
}
</script>

<style>
    .article-img img{
        width: 150px;
        height: 150px;
        border-radius: 8px;
    }

    .article-img{
       padding-right: 10px;
       border-right: 2px solid #dadada; 
    }

    .article-item{
        padding: 10px;
        border-radius: 15px;
        background-color: #fff;
        margin-bottom: 20px;
        border-radius: 8px;
        border: 2px solid #dadada;
        /* box-shadow: 1px 1px 2px 1px rgb(165, 165, 165); */
    }

    .article-link{
        color: #000;
        text-decoration: none;
        display: flex;
        flex-direction: row;
    }

    .article-link:hover{
        text-decoration: none;
        color: #000;
    }

    .article-text{
        display: flex;
        flex-direction: column;
        padding: 0px 10px 0px 10px;
        justify-content: space-around;
        flex-flow: column wrap;
    }

    .article-text .title{
        display: block;
        color: #000;
        font-size: 1.4rem;
        flex-grow: 0;
    }

    .article-text .description{
        display: flex;
        flex-grow: 1;
        margin: 0px;
        color: rgb(65, 65, 65);
        flex-grow: 2;
        padding: 10px 0px 10px 0px;
    }

    .article-text .author{
        font-size: 0.8rem;
        flex-grow: 0;
    }
</style>