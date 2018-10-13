<template>
  <div class="ExportType container">
		<section class="loadBox">
			<p>Exporting your ROMs... This may take a bit. Get a coffee.</p>
			<p>Progress: {{filesComplete}} of {{filesTotal}}</p>
			<b-progress :value="pctComplete" variant="info" striped :animated="true" class="mb-2"></b-progress>

			<p>Exporting from {{platformStatus}}</p>
			<p>Now exporting {{ fileStatus }}</p>

		</section>
  </div>
</template>

<script>
var fs = require('fs');
const path = require('path');
var libxmljs = require("libxmljs");
const util = require('util');

export default {
  name: "ExportList",
	created: function() {
		var me = this;

		//Get total number of games
		this.selectedPlatforms.forEach(function (platform){
			me.filesTotal += platform.count;
		})
		
		this.startExport();
	},
	data: function() {
		return {
			exportPath: this.$store.getters.exportPath,
			selectedPlatforms: this.$store.getters.selectedList,
			platformStatus: "nowhere",
			fileStatus: "nothing",
			hasError: "",
			pctComplete: 0,
			filesTotal: 0,
			filesComplete: 0
		}
	},
	methods: {
		startExport: function(){
			var me = this;
			
			this.selectedPlatforms.forEach(function (platform){
				me.processPlatform(platform.path, platform.name)
			})
		},

		processPlatform: async function(platformXML, platformName){
			var me = this;
			fs.readFile(platformXML, 'utf8', function (err,platformData) {

				me.platformStatus = platformName
				var platformXMLObj = libxmljs.parseXml(platformData.toString(), {noBlanks: true});
				var games = platformXMLObj.find("//Favorite[text()='true']")

				//generate folder

				games.forEach(function (game){
					var gameXML = libxmljs.parseXml(game.parent().toString(), {noBlanks: true});
					me.processFile(gameXML.get('//ApplicationPath').text().toString(), gameXML.get('//Title').text().toString())
				})
			})
		},

		processFile: async function(gamePath, gameName){
			
			//convert backslashes to forwardslashes juuuuuust in case.
			gamePath = gamePath.replace(/\\/g, '/');
			var setPath = path.resolve(this.$store.getters.filePath, gamePath);
			this.fileStatus = gameName;

			//copy file
			//copy metadata
			//copy media

			this.filesComplete++;
			this.pctComplete = (this.filesComplete / this.filesTotal) * 100

		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
