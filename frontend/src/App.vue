<template>
	<div id="app">
		<Header></Header>
		<Menu></Menu>
		<Content></Content>
		<Footer></Footer>
	</div>
</template>

<script>
import Content from '@/components/template/Content.vue'
import Footer from '@/components/template/Footer.vue'
import Menu from '@/components/template/Menu.vue'
import Header from '@/components/template/Header.vue'

export default {
	name: "App",
	components: { Content, Footer, Menu, Header}
}
</script>

<style>
*{
	font-family: 'Lato';
}

body{
	margin: 0px;
}

#app{
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
</style>