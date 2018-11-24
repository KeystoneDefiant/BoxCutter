<template>
	<div id="app">
		<logo />
		<router-view />
		<navigation />
	</div>
</template>

<script>
	import Logo from "./components/Navigation/Logo";
	import Navigation from "./components/Navigation/Navigation.vue"
	export default {
		name: 'BoxCutter',
		components:{
			Logo,
			Navigation
		}
	}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
