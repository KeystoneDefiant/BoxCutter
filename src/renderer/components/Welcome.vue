<template>
	<transition	name="transition" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">

		<div class="welcome state">
			<div class="heading">
				<h1>Welcome to BoxCutter</h1>
				<p class="lead">We're going to go through a few questions to make sure you get exactly what you want, where you want, how you want it. Savvy?</p>
			</div>
		</div>

	</transition>
</template>

<script>
export default {
	name: 'Welcome',
	data: function(){
		return {
			navigation: {
				left: [{id: 1, text:"Go Back", link:"Welcome", icon:"angle-double-left"}],
				right: [{id: 0, text:"Get Started", link:"FilePaths", icon:"angle-right"}]
			}
		}
	},
  	created: function() {
		// this.$store.dispatch('setNavigation', {navSide: "left", navArray: [{id: 1, text:"Go Back", link:"Welcome"}]})
		// this.$store.dispatch('setNavigation', {navSide: "right", navArray: [{id: 0, text:"Get Started", link:"FilePaths"}]})
		this.$store.dispatch('setNavigation', this.navigation);
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
