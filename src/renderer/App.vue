<template>
	<div id="app">
		<logo></logo>
		<router-view></router-view>
	</div>
</template>

<script>
	import Logo from "./components/Logo";
	export default {
		name: 'vue-electron-test',
		components:{
			Logo
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
