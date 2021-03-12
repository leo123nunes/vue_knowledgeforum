import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '../components/home/Home'
import AdminPages from '../components/admin/AdminPages'
import ArticlesByCategory from '../components/article/ArticlesByCategorie.vue'
import ArticleById from '../components/article/ArticleById.vue'
import AuthScreen from '../components/auth/Auth.vue'

const routes = [
    {
        name: "Home",
        path: "/",
        component: Home
    },
    {
        name: "AdminPages",
        path: "/admin",
        component: AdminPages
    },
    {
        name: "ArticlesByCategory",
        path: "/categories/:id/articles",
        component: ArticlesByCategory
    },
    {
        name: "ArticleById",
        path: "/article/:id",
        component: ArticleById
    },
    {
        name: "Auth",
        path: "/auth",
        component: AuthScreen
    }
]

export default new VueRouter({
    mode: "history",
    routes
})