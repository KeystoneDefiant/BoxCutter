<template>
	<div class="welcome">
		<p>Welcome to BoxCutter!</p>
		<router-link :to="{ name: 'FilePaths'}">Get Started</router-link>
	</div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
