<template>
    <div class="admin-user">

        <form>
            <div class="form-group">
                <b-row class="row">
                    <b-col md="6" sm="12">
                        <b-form-group label="Name:">
                            <b-form-input :disabled="mode == 'save' ? false : true" v-model="user.name" placeholder="Enter the name" type="text">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group label="Email:">
                            <b-form-input :disabled="mode == 'save' ? false : true" v-model="user.email" placeholder="Enter the email" type="text">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-form-checkbox v-show="mode == 'save'" class="mt-3 mb-3" v-model="user.admin">Admin?</b-form-checkbox>
                <b-row class="row">
                    <b-col md="6" sm="12">
                        <b-form-group v-show="mode == 'save'" label="Password:">
                            <b-form-input v-model="user.password" placeholder="Enter the password" type="password">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                    <b-col md="6" sm="12">
                        <b-form-group v-show="mode == 'save'" label="Confirm password:">
                            <b-form-input v-model="user.confirmPassword" placeholder="Confirm the password" type="password">
                            </b-form-input>
                        </b-form-group>
                    </b-col>
                </b-row>
                <b-row class="pl-3">
                    <b-button @click="save" v-if="this.mode == 'save'" variant="primary">Save</b-button>
                    <b-button @click="remove()" v-if="this.mode == 'delete'" variant="danger">Delete</b-button>
                    <b-button @click="reset()" class="ml-2">Cancel</b-button>
                </b-row>
            </div>
        </form>
    <hr>
        <b-table hover striped :items="users" :fields="fields">
            <template slot="cell(actions)" slot-scope="data">
                <b-button @click="loadUser(data.item)" class="mr-2" variant="warning"><i class="fa fa-pencil"></i></b-button>
                <b-button @click="loadUser(data.item, 'delete')" variant="danger"><i class="fa fa-trash"></i></b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import { showError } from '@/global'

export default {
    name: "AdminUser",
    data: function(){
        return {
            mode: "save",
            user: {},
            users: [],
            fields: [{
                key: "id", label: "Code", sortable: true
            },{
                key: "name", label: "Name", sortable: true
            },{
                key: "email", label: "Email", sortable: true
            },{
                key: "admin", label: "Admin", sortable: true, formatter: value => value ? "Yes" : "No"
            },{
                key: "actions", label: "Actions"
            }]
        }
    },
    methods: {
        loadUsers(){
            const url = `${baseApiUrl}/users`
            axios.get(url).then(resp => {
                this.users = resp.data
            })
            .catch(showError)
        },
        save(){
            const url = this.user.id ? `${baseApiUrl}/users/${this.user.id}` : `${baseApiUrl}/users`

            const method = 'post'

            axios[method](url, this.user).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                this.loadUsers()
            })
            .catch(showError)
        },
        reset(){
            this.user = {}
            this.mode = 'save'
            this.loadUsers()
        },
        loadUser(user, mode = "save"){
            this.user = { ...user }
            console.log(this.user)
            this.mode = mode
        },
        remove(){
            const url = `${baseApiUrl}/users/${this.user.id}`

            axios['delete'](url).then(_ => {
                this.$toasted.global.defaultSuccess()
                this.reset()
            })
            .catch(showError)
        }
    },
    mounted(){
        this.loadUsers()
    }
}
</script>

<style>

</style>