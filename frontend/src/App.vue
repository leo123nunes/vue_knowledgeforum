<template>
	<div id="app" :class="{'withoutMenu': !isMenuVisible, 'withMenu': isMenuVisible}">
		<Header title="Knowledge Forum" :hideToggle="!user" :hideUserDropdown="!user"></Header>
		<Menu v-if="isMenuVisible"></Menu>
		<Content></Content>
		<Footer></Footer>
	</div>
</template>

<script>
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'
import Menu from '@/components/template/Menu.vue'
import Header from '@/components/template/Header.vue'
import { mapState } from 'vuex'

export default {
	name: "App",
	components: { Content, Footer, Menu, Header},
	computed: mapState(['isMenuVisible', 'user'])
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