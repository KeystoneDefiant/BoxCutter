<template>
	<div id="app container">
		<logo></logo>
		<router-view></router-view>
	</div>
</template>

<script>
import logo from "./components/logo";
export default {
	name: 'App',
	components:{
		logo
	}
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
