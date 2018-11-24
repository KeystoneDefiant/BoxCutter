<template>
<transition	name="transition" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">
	<div class="FilePaths state">

		<div class="container">
			<div class="row">
				<div class="col-12">
					<p>Show me where your base LaunchBox directory is here.</p>
					<b-form-file v-model="launchBoxDir" directory placeholder="Choose your LaunchBox Directory"></b-form-file>
				</div>
			</div>

			<div class="row">
				<div class="col-12">
					<p>Tell me where you want me to put all the stuff we're going to export. I'll make a new directory called BoxCutter in the spot you specify below.</p>
					<b-form-file v-model="exportDir" directory placeholder="Choose your Export Directory"></b-form-file>
				</div>
			</div>

		</div>
	</div>
</transition>
</template>

<script>
export default {
	name: "FilePaths",
	created: function() {
		this.$store.dispatch('setNavigation', this.navigation);
		this.$store.dispatch('setHeader', "Set File Paths");
	},
	data: function(){
		var me = this;
		return {
			navigation: {
				left: [{id: 1, text:"Go Back", link:"Welcome", icon:"angle-left", show:true}],
				right: [{id: 0, text:"Let's Go!", link:"ExportList", icon:"angle-right", show:true}]
			}
		}
	},
	computed: {
		launchBoxDir: {
			get(){
				return this.$store.getters.filePath
			},
			set(value) {
				this.$store.commit("setFilePath", value)
			}
		},
		exportDir:{
			get(){
				return this.$store.getters.exportPat
			},
			set(value){
				this.$store.commit("setExportPath", value)
			}
		},
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filepath .btn{
	margin: 1em 0;
}
</style>
