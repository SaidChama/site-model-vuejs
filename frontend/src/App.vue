<template>
	<div id="app" :class="{'hide-menu': !isMenuVisible || $route.name === 'auth'}">
		<Header title="Site Name" />
		<Menu v-if="$route.name !== 'auth'" />
		<Loading v-if="validatingToken" />
		<Content v-if="!validatingToken" />
		<Footer />
	</div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from "@/global"
import { mapState } from 'vuex'
import Header from '@/components/templates/Header'
import Menu from '@/components/templates/Menu'
import Content from '@/components/templates/Content'
import Footer from '@/components/templates/Footer'
import Loading from '@/components/templates/Loading'

export default {
	name: "App",
	components: { Header, Menu, Content, Footer, Loading },
	computed: mapState(['isMenuVisible', 'user', 'userBool']),
	data() {
		return {
			validatingToken: true
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true
			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setUser', null)

			if(!userData) {
				this.validatingToken = false
				return this.$router.push({ name: 'home'})
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if(res.data) {
				this.$store.commit('setUser', userData)
			} else {
				localStorage.removeItem(userKey)
				this.$router.push({ name: 'auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
	* {
		font-family: 'Montserrat', sans-serif;
	}

	:root {
		--header-height: 60px;
		--footer-height: 40px;
		--content-height: calc(100vh - var(--header-height) - var(--footer-height) - 119px);
		--menu-width: 200px;
		--content-width: calc(100vw - var(--menu-width) - 6px)
	}

	body {
		margin: 0px;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		min-height: 100vh;
		display: grid;
		grid-template-rows: var(--header-height) 1fr var(--footer-height);
		grid-template-columns: var(--menu-width) 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";		
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";	
	}
</style>