<template>
	<div id="app">
		<Header title="Site Name" />
		<Menu />
		<Content />
		<Footer />
	</div>
</template>

<script>
import Header from '@/components/templates/Header'
import Menu from '@/components/templates/Menu'
import Content from '@/components/templates/Content'
import Footer from '@/components/templates/Footer'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer }
}
</script>

<style>
	body {
		margin: 0px;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 80px 1fr 40px;
		grid-template-columns: 200px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
		
	}
</style>