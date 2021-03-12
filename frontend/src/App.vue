<template>
	<div id="app" :class="{'withoutMenu': !isMenuVisible, 'withMenu': isMenuVisible}">
		<Header title="Knowledge Forum" :hideToggle="!user" :hideUserDropdown="!user"></Header>
		<Menu v-if="isMenuVisible"></Menu>
		<Loading v-if="validatingToken"></Loading>
		<Content v-else></Content>
		<Footer></Footer>
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey} from '@/global'
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'
import Menu from '@/components/template/Menu.vue'
import Header from '@/components/template/Header.vue'
import { mapState } from 'vuex'
import Loading from '@/components/template/Loading.vue'

export default {
	name: "App",
	components: { Content, Footer, Menu, Header, Loading},
	computed: mapState(['isMenuVisible', 'user']),
	data: function(){
		return {
			validatingToken: false
		}
	},
	methods: {
		async validateToken(){
			this.validatingToken = true

			const user = localStorage.getItem(userKey)
			const userData = JSON.parse(user)
			this.$store.commit('setUser', null)

			if(!userData){
				localStorage.removeItem(userKey)
				this.$router.push({ path: '/auth'})
				this.validatingToken = false
				return
			}

			const url = `${baseApiUrl}/validateToken`

			const validate = await axios.post(url, userData).then(resp => resp.data)

			if(validate){
				this.$store.commit('setUser', userData)
				this.$router.push({ path: '/'})
			}else{
				localStorage.removeItem(userKey)
				this.$routes.push({ path: '/auth'})
			}

			this.validatingToken = false
		}
	},
	created(){
		this.validateToken()
	}
}
</script>

<style>
*{
	font-family: 'Lato';
}

body{
	margin: 0px;
}

#app.withMenu{
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	display: grid;
	grid-template-rows: 40px 1fr 30px;
	grid-template-columns: 200px 1fr;
	grid-template-areas: 
		"header header"
		"menu content"
		"menu footer";
}

#app.withoutMenu{
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	height: 100vh;
	display: grid;
	grid-template-rows: 40px 1fr 30px;
	grid-template-columns: 1fr;
	grid-template-areas: 
		"header"
		"content"
		"footer";
}
</style>