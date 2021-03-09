<template>
    <div class="admin-article">
            <b-row>
                <b-form-group :disabled="mode == 'delete'" class="col-12" label="Name:">
                    <b-form-input v-model="article.name" placeholder="Enter the name" />
                </b-form-group>
            </b-row>

            <b-row>
                <b-form-group :disabled="mode == 'delete'" class="col-12" label="Description:">
                    <b-form-input v-model="article.description" placeholder="Enter the description"/>
                </b-form-group>
            </b-row>

            <b-row v-show="mode == 'save'">
                <b-form-group class="col-12" label="Image URL:">
                    <b-form-input v-model="article.imageUrl" placeholder="Enter the image url"/>
                </b-form-group>
            </b-row>

            <b-row v-show="mode == 'save'">
                <b-form-group class="col-12" label="Category:">
                    <b-form-select :options="categories" v-model="article.categoryId">
                    </b-form-select>
                </b-form-group>
            </b-row>

            <b-row v-show="mode == 'save'">
                <b-form-group class="col-12" label="Author:">
                    <b-form-select :options="authors" v-model="article.userId">
                    </b-form-select>
                </b-form-group>
            </b-row>

            <b-row v-show="mode == 'save'">
                <b-form-group class="col-12" label="Content:">
                    <vue-editor v-model="article.content"></vue-editor>
                </b-form-group>
            </b-row>

            <b-row class="col-12">
                <b-button v-on:click="saveArticle" v-show="mode == 'save'" variant="primary">Save</b-button>
                <b-button v-on:click="deleteArticle" v-show="mode == 'delete'" variant="danger">Delete</b-button>
                <b-button v-on:click="reset" class="ml-2">Cancel</b-button>
            </b-row>

            <hr>

            <b-table :items="articles" :fields="fields">
                <template slot="cell(actions)" slot-scope="data">
                    <b-button v-on:click="loadArticle(data.item)" class="mr-2" variant="warning"><i class="fa fa-pencil"></i></b-button>
                    <b-button v-on:click="loadArticle(data.item, 'delete')" variant="danger"><i class="fa fa-trash"></i></b-button>
                </template>
            </b-table>

            <b-pagination v-model="page" :items="articles" :per-page="limit" :total-rows="count"></b-pagination>
    </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, showError } from '@/global'
import { VueEditor } from 'vue2-editor'
export default {
    name: "AdminArticle",
    components: { VueEditor },
    data: function(){
        return {
            mode: "save",
            article: {},
            articles: [],
            categories: [],
            authors: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: "id", label: "Code", sortable: true },
                { key: "name", label: "Name", sortable: true},
                { key: "description", label: "Description", sortable: true},
                { key: "actions", label: "Actions"}
            ]
        }
    },
    methods: {
        reset(){
            this.mode = "save"
            this.article = {}
            this.loadArticles()
            this.loadCategories()
            this.loadAuthors()
        },
        loadArticles(){
            const url = `${baseApiUrl}/articles?page=${this.page}`

            axios.get(url).then(resp => {
                this.articles = resp.data.data
                this.count = resp.data.count
                this.limit = resp.data.limit
            }).catch(showError)

        },
        loadArticle(article, mode = "save"){
            this.article = { ...article }
            this.mode = mode

        },
        loadCategories(){
            const url = `${baseApiUrl}/categories`

            axios.get(url).then(resp => {
                this.categories = resp.data.map(categorie => {
                    return { value: categorie.id, text: categorie.path}
                })
            })
            .catch(showError)
        },
        loadAuthors(){
            const url = `${baseApiUrl}/users`

            axios.get(url).then(resp => {
                this.authors = resp.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}`}
                })
            })
            .catch(showError)
        },
        saveArticle(){
            const url = this.article.id ? `${baseApiUrl}/articles/${this.article.id}` : `${baseApiUrl}/articles`

            console.log(this.article)

            axios.post(url, { ...this.article }).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            }).catch(showError)
        },
        deleteArticle(){
            const url = `${baseApiUrl}/articles/${this.article.id}`

            axios.delete(url).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            }).catch(showError)
        }

    },
    watch: {
        page(){
            this.loadArticles()
        }
    },
    mounted(){
        this.reset()
        this.loadArticles()
        this.loadCategories()
        this.loadAuthors()
    }
}
</script>

<style>

</style>