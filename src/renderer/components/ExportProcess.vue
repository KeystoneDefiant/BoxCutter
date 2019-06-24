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
const sync = require('sync');
const find = require('find');
const escapeRegExp = require('lodash.escaperegexp');

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
			exportData: this.$store.getters.conversionMatrix(this.$store.getters.exportStructure),

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

		processPlatform: function(platformXML, platformName){
			var me = this;

			//Convert this path to whatever schema we're actually exporting to.
			var exportLocation = me.exportPath+"/roms/"+platformName

			//Make dirs
			fs.existsSync(exportLocation) || fs.mkdirSync(exportLocation);
			var exportMetadataFilename = exportLocation+"/"+this.$store.getters.exportMetadataFilename
			
			//Make Metadata file
			if (this.$store.getters.exportMetadata == true){
				fs.writeFile(exportMetadataFilename, "", function(err){
					if (err) throw err;
				})
			}

			fs.readFile(platformXML, 'utf8', function (err,platformData) {
				me.platformStatus = platformName
				var platformXMLObj = libxmljs.parseXml(platformData.toString(), {noBlanks: true});
				var games = platformXMLObj.find("//Favorite[text()='true']")

				async.waterfall([
					function(callback){
						//Write opening tags
						if (me.$store.getters.exportMetadata == true){
							fs.writeFileSync(exportMetadataFilename, me.exportData.metadata.header, function(err){
								if (err) throw err;
							})
						}

						callback(null)
					},

					function(callback){
						//Process each game
						async.eachSeries(games, function(game, gameCallback){
							var gameXML = libxmljs.parseXml(game.parent().toString(), {noBlanks: true}),
								gamePath = gameXML.get('//ApplicationPath').text().toString().replace(/\\/g, '/'),
								gameName = gameXML.get('//Title').text().toString(),
								romPath = path.resolve(me.$store.getters.filePath, gamePath),
								fileName = path.basename(path.resolve(me.$store.getters.filePath, gamePath)),
								exportMediaLocation = path.resolve(exportLocation, me.$store.getters.exportMediaLocation)

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

							gameCallback(null);
						});
					callback(null)
					},

					function(callback){
						//Write closing tags
						if (me.$store.getters.exportMetadata == true){
							fs.appendFileSync(exportMetadataFilename, me.exportData.metadata.footer, function(err){
								if (err) throw err;
							})
						}
						callback(null);
					},
				],
			function(err, data){
				console.warn("done?")
			})
			})
		},

		processFile: function(gameData){
			var me = this;

			this.fileStatus = gameData.gameName;

			var metadata = "";

			async.waterfall([
				function(callback){
					callback(null, gameData,"")
				},
				me.processRomFile,
				me.processImages,
				me.processVideos,
				me.writeMetadata
			],
			function(err,result){
				me.filesComplete++;
				me.pctComplete = (me.filesComplete / me.filesTotal) * 100
			})
		},

		processRomFile: function(gameData, metadata, callback){
			//copy file
			fs.copyFileSync(gameData.romPath, gameData.exportLocation+"/"+gameData.fileName, (err) => {
				if (err) throw err;
			});

			callback(null, gameData, metadata)
		},

		processImages: function(gameData, metadata, callback){
			var me = this; 

			var regions = this.$store.getters.exportPreferredRegion;
			var exportString = "";

			//Check image types
			var imageTypes = "";

			if (me.exportData.media.hasOwnProperty(gameData.gamePlatform)){
				imageTypes = me.exportData.media[gameData.gamePlatform];
			}else{
				imageTypes = me.exportData.media["default"];
			}

			//make sure directory exists
			fs.existsSync(gameData.exportMediaLocation) || fs.mkdirSync(gameData.exportMediaLocation);
			
			async.forEachOfSeries(imageTypes, function(sourceImageType, destImageType, imageCallback){
				// get image path based on type
				var basePath = path.resolve(me.$store.getters.filePath, "Images", gameData.gamePlatform, sourceImageType)

				var escapedGameName = gameData.gameName
				var regex = new RegExp(escapedGameName+'.*', 'g');

				console.log(regex)
				
				async.waterfall([
					function(waterfallCallback) {
						//Find Files, pass image Location
					
						var files = find.fileSync(regex, basePath);
						console.warn(files)

						if (files.length > 0){
							var extension = path.extname(files[0])
							var newImage = gameData.exportMediaLocation+"/"+gameData.gameName+"-"+destImageType+extension;
							var targetImage = files[0];

							waterfallCallback(null, newImage, targetImage);
						}else{
							waterfallCallback(null, null, null)
						}
						
					},

					function(newImage, file, waterfallCallback) {
						//copy files, pass image location

						if (file && newImage){
							fs.copyFile(file, newImage, (err) => {
								if (err) throw err;
							});

							waterfallCallback(null, newImage);
						}
						
					},

					function(newImage, waterfallCallback) {
						//Write Metadata
						if (newImage){
							exportString += "<"+destImageType+">";
							exportString += me.$store.getters.exportMediaLocation+"/"+path.basename(newImage);
							exportString += "</"+destImageType+">";
						}

						waterfallCallback(null, 'done');
					}

				], function (err, result) {
					imageCallback();
				});
				
				
				//callback();
			})

			metadata += exportString;
			callback(null, gameData, metadata)

		},

		processVideos: function(gameData, metadata, callback){
			//console.log("Videos", gameData)
			/*
				Get game name
					Get first match, add type to end of filename
					https://www.npmjs.com/package/handbrake-js - convert to 320x240 mp4
					copy to media location
					Add path and name to exportString for XML
			*/


			callback(null, gameData, metadata)
		},

		writeMetadata: function(gameData, metadata, callback){
			//Write opening node
			metadata += "<"+this.exportData.metadata.gameElement+">";


			//Write game Path
			metadata += "<"+this.exportData.metadata.pathToRomElement+">";
			metadata += gameData.fileName;
			metadata += "</"+this.exportData.metadata.pathToRomElement+">";

			//Write all elements from metadata element from conversionMatrix
			for (var node in this.exportData.metadata.elements){
				var nodeData = gameData.gameXML.get('//'+this.exportData.metadata.elements[node]).text().toString()

				metadata += "<"+node+">";
				metadata += nodeData;
				metadata += "</"+node+">";
			}

			//close node
			metadata += "</"+this.exportData.metadata.gameElement+">";

			//write game footer
			fs.appendFileSync(gameData.exportMetadataFilename, metadata , function(err){
				if (err) throw err;
				console.log("MetaData saved", metadata, gameData.exportMetadataFilename)
			})

			callback(null, gameData, metadata)
		}
	}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
