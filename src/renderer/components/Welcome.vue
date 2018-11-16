<template>
<transition name="stateTransition">
	<div class="welcome container">
		<p>Welcome to BoxCutter!</p>
		<b-button :to="{ name: 'FilePaths'}">Get Started</b-button>
	</div>
</transition>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
