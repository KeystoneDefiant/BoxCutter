<template>
<transition	name="transition" enter-active-class="fadeInRight" leave-active-class="fadeOutLeft">
	<div class="FilePaths state">
		<div class="container">
			<div class="row align-items-center">
				<div class="col">
					<p>Show me where your base LaunchBox directory is here.</p>
					<b-form-file v-model="launchBoxDir" directory :state="Boolean(launchBoxDir)" placeholder="Choose your LaunchBox Directory" @input="checkStatus"></b-form-file>
				</div>
			</div>

			<div class="row align-items-center">
				<div class="col">
					<p>Tell me where you want me to put all the stuff we're going to export. I'll make a new directory called BoxCutter in the spot you specify below.</p>
					<b-form-file v-model="exportDir" directory :state="Boolean(exportDir)" placeholder="Choose your Export Directory" @input="checkStatus"></b-form-file>
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
		this.checkStatus();
		this.$store.dispatch('setNavigation', this.navigation);
		this.$store.dispatch('setHeader', "Set File Paths");
	},
	data: function(){
		var me = this;
		return {
			navigation: {
				left: [{id: 1, text:"Go Back", link:"Welcome", icon:"angle-left", show:true}],
				right: [{id: 2, text:"Let's Go!", link:"ExportList", icon:"angle-right", show: false}]
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
				return this.$store.getters.exportPath
			},
			set(value){
				this.$store.commit("setExportPath", value)
			}
		},
	},
	methods:{
		checkStatus: function(){
			this.navigation.right[0].show = Boolean(Boolean(this.$store.getters.filePath) && Boolean(this.$store.getters.exportPath))
			this.$store.dispatch('setNavigation', this.navigation);
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
