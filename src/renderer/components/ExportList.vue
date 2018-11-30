<template>
<transition
	name="transition"
	enter-active-class="fadeInRight"
	leave-active-class="fadeOutLeft">
  <div class="ExportList state">

		<section class="danger" v-show="hasError">
			<p>It looks like there was an error with your XML files. Here's what I know:</p> 
			{{ hasError }}
		</section>

		<section class="loadBox container" v-show="this.$store.getters.filePath != null && !showList">
			<div class="row">
				<p>Loading from {{ this.$store.getters.filePath }}</p>
				<p>Now Processing: {{fileStatus}}</p>
				<b-progress :value="pctComplete" variant="info" striped :animated="true" class="mb-2"></b-progress>
			</div>
		</section>

        <section class="container is-hidden listDisplay" v-show="showList">
			<div class="row">
				<b-table striped hover :items="this.$store.getters.lists" :fields="fields" v-on:row-clicked="toggleRow"></b-table>
			</div>
        </section>
  </div>
</transition>
</template>

<script>
const fs = require('fs');
const libxmljs = require("libxmljs");
const util = require('util');

export default {
	name: "ExportList",
	created: function() {
		this.$store.dispatch('setNavigation', this.navigation);
		this.$store.dispatch('setHeader', "Pick Lists to Export");
	},
	mounted: function() {
		if(typeof this.$store.getters.exportPathObject == 'undefined' && typeof this.$store.getters.filePathObject == 'undefined'){
			this.$router.push('FilePaths');
		}else{
			this.getXML();
		}	
	},
	data: function() {
		return {
			fileStatus: "",
			hasError: "",
			pctComplete: 0,
			showList: false,
			hasSelections: false,
			fields: {
				name: {
					label: 'List Name',
					sortable: true
				},
				count: {
					label: 'Games In List',
					sortable: true
				},
			},
			navigation: {
				left: [{id: 100, text:"Start Over", link:"Welcome", icon:"angle-double-left", show:true},{id: 200, text:"Go Back", link:"FilePaths", icon:"angle-left", show:true}],
				right: [{id: 3, text:"Export!", link:"ExportProcess", icon:"angle-right", show: false}]
			}
		}
	},
  methods: {
    getXML: function() {
		var async = require('async')

		this.$store.commit('clearLists');
		this.showList = false;

		var me = this;
		fs.readdir(this.$store.getters.filePath+"/Data/Platforms", (err, files) => {
			'use strict';
			if (err) {
				throw err
				this.hasError = true;
			};

			var filesProcessed = 0;
			var totalFiles = files.length;
			me.pctComplete = 0;

			async.eachSeries(files, function(file, callback){
				var listItem = me.$store.getters.filePath+"/Data/Platforms/"+file;
				me.fileStatus = listItem.split("/").slice(-1)[0].replace(".xml", "")

				me.processFile(listItem)
					.then(pathData =>{
						filesProcessed++;
						me.pctComplete = (filesProcessed / totalFiles) * 100;
						me.$store.commit('addList', pathData);
						callback();
					})
					.catch(err => {
						console.error(err)
						// callback(err);
					})
			}, function(err){
				if(err){
					console.error("Error reading file: ", err)
				}else{
					me.fileStatus = "Done!"
					me.hasError = false;
					me.buildTable();
				}
			})
		});
	},
	
	processFile: async function(listItem){
		var me = this;
		return new Promise(function(resolve, reject) {
			fs.readFile(listItem, 'utf8', function (err,data) {
				if (err) {
					reject(err);
				}else{
					var xmlDoc = libxmljs.parseXml(data);
					var gameCount = xmlDoc.find("//Favorite[text()='true']").length;
					var platformName = listItem.split("/").slice(-1)[0].replace(".xml", "")
					
					var returnObj = {
						"path": listItem,
						"name": platformName,
						"count": gameCount
					}

					if (gameCount < 1){
						returnObj._cellVariants = 'danger'
					}

					resolve(returnObj)
				}	
			});
		})
	},

	buildTable: function(){
		this.showList = true;
	},

	toggleRow: function(item, index, evt){
		evt.target.parentNode.classList.toggle("selected");

		var myList = this.$store.getters.list(item.name)

		//If our object doesn't have the selected property, make it;
		myList.selected = myList.selected || null;

		//Toggle the selected property and assign it
		var isSelected = (!myList.selected) ? true : false;
		myList.selected = isSelected;

		this.$store.commit('toggleListSelection', myList);

		var currentList = this.$store.getters.selectedList;
		this.hasSelections = (currentList.length > 0) ? true : false;

		this.navigation.right[0].show = this.hasSelections;
	}

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
