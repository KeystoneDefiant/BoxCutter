<template>
	<div class="FilePaths">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h1 class="display-4">Let's get started!</h1>
				<p class="lead">First, let's talk about where your LaunchBox directory is.</p>
			</div>
		</div>

		<section class="filepath container-fluid">
			<b-form-file v-model="launchBoxDir" :state="Boolean(launchBoxDir)" directory placeholder="Choose your LaunchBox Directory"></b-form-file>

			<b-form-file v-model="exportDir" :state="Boolean(exportDir)" directory placeholder="Choose your Export Directory"></b-form-file>
			
			<b-button v-on:click="nextScreen()" :disabled="Boolean(launchBoxDir) && Boolean(exportDir) == false">Let's Go!</b-button>
		</section>
	</div>
</template>

<script>
export default {
	name: "FilePaths",
	created: function() {
		if(this.$store.getters.filePath != null){
			this.launchBoxDir = this.$store.getters.filePath;
		}
	},
	data: function(){
		return {
			launchBoxDir: this.$store.getters.filePath,
			exportDir: this.$store.getters.exportPath
		}
	},
	methods: {
		nextScreen: function() {
			//Add error handling here, check for launchbox.exe or Data directory
			this.$store.commit('setFilePath', this.launchBoxDir);
			this.$store.commit('setExportPath', this.exportDir);
			this.$router.push({ name: 'ExportList'})
		}
 	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filepath .btn{
	margin: 1em 0;
}
</style>
