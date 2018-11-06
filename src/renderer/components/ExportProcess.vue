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
const fs = require('fs');
const path = require('path');
const libxmljs = require("libxmljs");
const util = require('util');
const async = require('async')

export default {
  name: "ExportList",
	created: function() {
		
		if(this.$store.getters.exportPath == null){
			this.$router.push("FilePaths");
		}

		var me = this;

		//Get total number of games
		this.selectedPlatforms.forEach(function (platform){
			me.filesTotal += platform.count;
		})
		
		this.startExport();
	},
	data: function() {
		return {
			exportPath: this.$store.getters.exportPath + "/" + this.$store.getters.exportDirName,
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

			//generate folders
			fs.existsSync(me.exportPath) || fs.mkdirSync(me.exportPath);
			fs.existsSync(me.exportPath+"/roms") || fs.mkdirSync(me.exportPath+"/roms");
			
			this.selectedPlatforms.forEach(function (platform){
				me.processPlatform(platform.path, platform.name)
			})
		},

		processPlatform: async function(platformXML, platformName){
			var me = this;

			//Convert this path to whatever schema we're actually exporting to.
			var exportLocation = me.exportPath+"/roms/"+platformName

			//Make dirs
			fs.existsSync(exportLocation) || fs.mkdirSync(exportLocation);
			
			//Make Metadata file
			var exportMetadataFilename = exportLocation+"/"+this.$store.getters.exportMetadataFilename
			fs.writeFile(exportMetadataFilename, "", function(err){
				if (err) throw err;
			})

			fs.readFile(platformXML, 'utf8', function (err,platformData) {
				me.platformStatus = platformName
				var platformXMLObj = libxmljs.parseXml(platformData.toString(), {noBlanks: true});
				var games = platformXMLObj.find("//Favorite[text()='true']")

				async.eachSeries(games, function(game, callback){
					var gameXML = libxmljs.parseXml(game.parent().toString(), {noBlanks: true});

					me.processFile({
						gamePath: gameXML.get('//ApplicationPath').text().toString(),
						gameName: gameXML.get('//Title').text().toString(),
						gameXML: gameXML,
						exportLocation: exportLocation,
						exportMetadataFilename: exportMetadataFilename
					});

					callback();
				})
			})
		},

		processFile: async function(gameData){
			var me = this;
			//convert backslashes to forwardslashes juuuuuust in case.
			var gamePath = gameData.gamePath.replace(/\\/g, '/');

			//Set the path to the existing ROM
			var setPath = path.resolve(this.$store.getters.filePath, gamePath);

			//Get just the file name
			var fileName = path.basename(setPath);
			this.fileStatus = gameData.gameName;

			//copy file
			fs.copyFile(setPath, gameData.exportLocation+"/"+fileName, (err) => {
				if (err) throw err;
			});

			//copy metadata
			if (this.$store.setExportMetadata == true) this.processMetadata(gameData);
			
			//copy media
			if (this.$store.setExportImages == true) this.processImages(gameData);
			if (this.$store.setExportVideos == true) this.processVideos(gameData);

			this.filesComplete++;
			this.pctComplete = (this.filesComplete / this.filesTotal) * 100
		},

		processMetadata: async function(gameData){
			var exportXML = gameData.gameXML.get('//Title').text().toString()
			fs.appendFile(gameData.exportMetadataFilename, exportXML, function(err){
				if (err) throw err;
				console.log("MetaData saved", exportXML)
			})
		},

		processImages: async function(gameData){
			console.log("Images", gameData)
		},

		processVideos: async function(gameData){
			console.log("Videos", gameData)
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
