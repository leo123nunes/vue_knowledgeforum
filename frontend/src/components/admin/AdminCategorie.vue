<template>
    <div class="admin-categorie">
        <form>
            <div class="form-group">
                <b-row>
                    <b-form-group class="col-12" label="Name:">
                        <b-form-input :disabled="mode == 'save' ? false : true" placeholder="Enter the name" v-model="category.name" type="text"></b-form-input>
                    </b-form-group>
                </b-row>
                <b-row>
                    <b-form-group class="col-12" label="Father category:">
                        <b-dropdown :text="path ? path : 'None'" :items="categories" :disabled="mode =='delete' ? true : false">
                            <b-dropdown-item @click="selectPath(item)" v-for="(item, key) in categoriesPaths" :key="key">
                                {{ item }}
                            </b-dropdown-item>
                            <b-dropdown-item @click="selectPath(null)">
                                None
                            </b-dropdown-item>
                        </b-dropdown>
                    </b-form-group>
                </b-row>
            </div>
        </form>

        <b-row class="pl-3">
            <b-button @click="save()" v-show="mode == 'save'" variant="primary" class="mr-2">Save</b-button>
            <b-button @click="remove" v-show="mode == 'delete'" variant="danger" class="mr-2">Delete</b-button>
            <b-button @click="reset()">Cancel</b-button>    
        </b-row>
        <hr>
        <b-table striped hover :items="categories" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button @click="loadCategorie(data.item)" variant="warning" class="mr-2"><i class="fa fa-pencil"></i></b-button>
                <b-button @click="loadCategorie(data.item, 'delete')" variant="danger"><i class="fa fa-trash"></i></b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global.js'
import axios from 'axios'

export default {
    name: "AdminCategorie",
    data: function(){
        return {
            mode: "save",
            category: {},
            categories: [],
            fields: [
                { key: "id", label: "Code", sortable: true},
                { key: "name", label: "Name", sortable: true},
                { key: "path", label: "Path", sortable: true},
                { key: "actions", label: "Actions"}
            ],
            categoriesPaths : [],
            path: 'Select the path'
        }
    },
    methods: {
        loadCategorie(category, mode = 'save'){
            console.log(category)
            this.category = { ...category }
            this.path = this.category.path
            this.mode = mode
        },
        loadCategories(){
            const url = `${baseApiUrl}/categories`

            axios.get(url).then(result => {
                this.categories = result.data
            })
            .catch(showError)
        },
        save(){
            const url = this.category.id ? `${baseApiUrl}/categories/${this.category.id}` : `${baseApiUrl}/categories`

            const method = 'post'

            console.log(url)

            axios.post(url, this.category).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                this.loadCategories()
            })
            .catch(error => {
                showError(error)
                console.log(error)
            })

        },
        remove(){
            const url = `${baseApiUrl}/categories/${this.category.id}`

            axios['delete'](url).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                this.loadCategories()
            })
            .catch(showError)
            
        },
        reset(){
            this.category = {}
            this.path = "Select the path"
            this.mode = 'save'
            this.loadCategories()
            this.loadPaths()
        },
        async loadPaths(){

            const url = `${baseApiUrl}/categories`
            var categories = await axios.get(url).then(resp => resp.data)

            var paths = categories.map(categorie => categorie.path)

            this.categoriesPaths = paths
        },
        selectPath(path){
            this.path = path

            if(path !== null && path !== undefined){
                const url = `${baseApiUrl}/categories`
                var fatherName = path.split(' ')

                const length = fatherName.length

                fatherName = fatherName[length - 1]

                axios.get(url).then(resp => {
                    const cat = resp.data.filter(category => category.name == fatherName)[0]
                    this.category.parentId = cat.id
                }).catch(showError)
            }
        }
    },
    mounted(){
        this.loadCategories()
        this.loadPaths()
    }   
}
</script>

<style>

</style>