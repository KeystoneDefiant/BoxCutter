<template>
<transition
	name="transition"
	enter-active-class="fadeInRight"
	leave-active-class="fadeOutLeft">
	<div class="FilePaths state">
		<div class="jumbotron jumbotron-fluid">
			<div class="container">
				<h1 class="display-4">Let's get started!</h1>
				<p class="lead">First, let's talk about where your LaunchBox directory is.</p>
			</div>
		</div>

		<section class="filepath">
			<div class="container">
				<div class="row">
					<div class="col-12">
						<b-form-file v-model="launchBoxDir" :state="Boolean(launchBoxDir)" directory placeholder="Choose your LaunchBox Directory"></b-form-file>
					</div>
				</div>

				<div class="row">
					<div class="col-12">
						<b-form-file v-model="exportDir" :state="Boolean(exportDir)" directory placeholder="Choose your Export Directory"></b-form-file>
					</div>
				</div>
				
				<div class="row">
					<div class="col-12">
						<b-button v-on:click="nextScreen()" v-show="Boolean(launchBoxDir) && Boolean(exportDir) == false">Let's Go!</b-button>
					</div>
				</div>
			</div>
		</section>
	</div>
</transition>
</template>

<script>
export default {
	name: "FilePaths",
	created: function() {
		if(this.$store.getters.filePath != null){
			this.launchBoxDir = this.$store.getters.filePath;
		}

		this.$store.dispatch('setNavigation', this.navigation);
	},
	data: function(){
		return {
			launchBoxDir: this.$store.getters.filePath,
			exportDir: this.$store.getters.exportPath,
			navigation: {
				left: [{id: "left1", text:"Go Back", link:"Welcome"}],
				right: [{id: 0, text:"Let's Go!", click:"nextScreen()", show:"Boolean(launchBoxDir) && Boolean(exportDir) == false"}]
			}
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
