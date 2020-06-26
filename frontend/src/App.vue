<template>
	<div id="app">
		<Header />
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

</style>