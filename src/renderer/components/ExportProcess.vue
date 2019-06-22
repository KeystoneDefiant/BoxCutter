<template>
  <div class="ExportType state">
		<section class="container">
			<div class="row">
				<div class="col-12 lead">Exporting your ROMs... This may take a bit. Get a coffee.</div>
			</div>

			<div class="row">
				<div class="col-6">Exporting from {{platformStatus}}</div>
				<div class="col-6">Progress: {{filesComplete}} of {{filesTotal}}</div>
			</div>

			<div class="row">
				<b-progress :value="pctComplete" variant="info" striped :animated="true" class="mb-2"></b-progress>
			</div>

			<div class="row">
				<div class="col-12">Now exporting {{ fileStatus }}</div>
			</div>

		</section>
  </div>
</template>

<script>
const fs = require('fs');
const path = require('path');
const libxmljs = require("libxmljs");
const util = require('util');
const async = require('async');

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

		this.$store.dispatch('setNavigation', this.navigation);
		this.$store.dispatch('setHeader', "Exporting your files");
		
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
			filesComplete: 0,
			exportData: this.$store.getters.conversionMatrix[this.$store.exportStructure],

			navigation: {
				left: [{id: 100, text:"Start Over", link:"Welcome", icon:"angle-double-left", show:true},{id: 200, text:"Go Back", link:"FilePaths", icon:"angle-left", show:true}],
				right: [{id: 3, text:"Export!", link:"ExportProcess", icon:"angle-right", show: false}]
			}
		}
	},
	methods: {
		startExport: function(){
			var me = this;

			//generate folders
			fs.existsSync(me.exportPath) || fs.mkdirSync(me.exportPath);
			fs.existsSync(me.exportPath+"/roms") || fs.mkdirSync(me.exportPath+"/roms");
			
			//Process all selected platforms
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
			var exportMetadataFilename = exportLocation+"/"+this.$store.getters.exportMetadataFilename
			
			//Make Metadata file
			if (this.$store.setExportMetadata == true){
				fs.writeFile(exportMetadataFilename, "", function(err){
					if (err) throw err;
				})
			}

			fs.readFile(platformXML, 'utf8', function (err,platformData) {
				me.platformStatus = platformName
				var platformXMLObj = libxmljs.parseXml(platformData.toString(), {noBlanks: true});
				var games = platformXMLObj.find("//Favorite[text()='true']")
				
				//Write opening tags
				if (this.$store.setExportMetadata == true){
					fs.appendFile(gameData.exportMetadataFilename, me.exportData.metadata.header, function(err){
						if (err) throw err;
						console.log("MetaData header saved", exportXML)
					})
				}

				//Process each game
				async.eachSeries(games, function(game, callback){
					var gameXML = libxmljs.parseXml(game.parent().toString(), {noBlanks: true}),
						gamePath = gameXML.get('//ApplicationPath').text().toString(),
						gameName = gameXML.get('//Title').text().toString(),
						romPath = path.resolve(this.$store.getters.filePath, gamePath),
						fileName = path.basename(romPath),
						exportMediaLocation = this.$store.getters.exportMediaLocation

					var gameData = {
						"gamePath":gamePath,
						"gameName":gameName,
						"gameXML":gameXML,
						"gamePlatform":platformName,
						"exportLocation":exportLocation,
						"exportMetadataFilename":exportMetadataFilename,
						"romPath":romPath,
						"fileName":fileName,
						"exportMediaLocation":exportMediaLocation,
						"exportString":""
					}

					me.processFile(gameData);

					callback();
				});


				//Write closing tags
				if (this.$store.setExportMetadata == true){
					fs.appendFile(gameData.exportMetadataFilename, me.exportData.metadata.footer, function(err){
						if (err) throw err;
						console.log("MetaData footer saved", exportXML)
					})
				}
			})
		},

		processFile: async function(gameData){
			var me = this;

			//copy file
			fs.copyFile(gameData.romPath, gameData.exportLocation+"/"+gameData.fileName, (err) => {
				if (err) throw err;
			});

			//copy metadata
			if (this.$store.setExportMetadata == true) gameData = this.processMetadata(gameData);
			
			//copy media
			if (this.$store.setExportImages == true) gameData = this.processImages(gameData);
			if (this.$store.setExportVideos == true) gameData = this.processVideos(gameData);

			//write metadata
			if (this.$store.setExportMetadata == true) this.writeMetadata(gameData);

			this.filesComplete++;
			this.pctComplete = (this.filesComplete / this.filesTotal) * 100
		},

		processMetadata: async function(gameData){
			//var exportXML = gameData.gameXML.get('//Title').text().toString();
			var me = this;
			var conversionSettings = exportData.metadata;

			var exportString = "";

			//Write all elements from metadata element from conversionMatrix
			for (var node in this.exportData.metadata.elements){
				exportString += "<"+node+">";
				exportString += this.exportData.metadata.elements[node];
				exportString += "</"+node+">";
			}

			gameData.exportString += exportString;
			return gameData;
		},

		processImages: async function(gameData){
			
			var regions = this.$store.getters.exportPreferredRegion;

			//Check image types
			var imageTypes = "";
			if (exportData.media[gameData.platformName].length > -1){
				imageTypes = exportData.media[gameData.platformName];
			}else{
				imageTypes = exportData.media["default"];
			}

			for (var imgType in imageTypes){
				/*"default":{
					"image":"Box - Front", 
					"marquee":"Clear Logo"
					key - imgType 
					value - imageTypes[imgType]
				}, */

				// get image path based on type
				var basePath = path.resolve(this.$store.getters.filePath, "Images", gameData.platformName, imageTypes[imgType])

				// loop through regions to find game name (will look like gamename-01.png or gamename-01.jpg)

				find.file(/\.*$/, basePath, function(files) {
					console.log(files.length, files);

					fs.copyFile(files, gameData.exportLocation+"/"+gameData.exportMediaLocation+"/"+gameData.gameName+"-"+imgType, (err) => {
						if (err) throw err;
					});
					// copy image to media location, adding image type indentifier: replacing -01 with -image or -marquee
					// Add path to export string in gameData object
				}).error(function(err) {
					if (err) {
						console.log(err, "Couldn't find image for ", gameData.gameName)
					}
				})
				
				return gameData;


			}

			gameData.exportString += exportString;
			return gameData;

		},

		processVideos: async function(gameData){
			console.log("Videos", gameData)

			/*
				Get game name
					Get first match, add type to end of filename
					https://www.npmjs.com/package/handbrake-js - convert to 320x240 mp4
					copy to media location
					Add path and name to exportString for XML
			*/

		},

		writeMetaData: function(gameData){

			var exportString = "";

			//Write opening node
			exportString += "<"+this.exportData.metadata.gameElement+">";

			exportString += gameData.exportString;

			//close node
			exportString += "</"+this.exportData.metadata.gameElement+">";

			//write game footer
			fs.appendFile(gameData.exportMetadataFilename, exportString , function(err){
				if (err) throw err;
				console.log("MetaData saved", exportString)
			})
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
