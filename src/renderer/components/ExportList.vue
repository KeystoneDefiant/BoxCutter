<template>
  <div class="ExportList">
    	<section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
            <h1 class="title">
              OK! Now, what do you want to export?
            </h1>
            <h2 class="subtitle">
              We can export specific playlists as well as favorites from your platforms.
            </h2>
            </div>
          </div>
        </section>

		<section class="error" v-show="this.$store.getters.filePath == null">
			<p>It doesn't look like you've specified your LaunchBox path.</p> 
			
			<router-link :to="{name: 'FilePaths'}">Set your path here</router-link>
		</section>
		<section class="loadBox" v-show="this.$store.getters.filePath != null">
			<p>Loading from {{ this.$store.getters.filePath }}</p>
			<router-link :to="{ name: 'FilePaths'}">Get Started</router-link> 
			<p>Loading... Gimme a sec.</p>

			Processing {{fileStatus}}
			<b-progress :value="0" variant="info" striped :animated="animate" class="mb-2"></b-progress>
		</section>

        <section class="container is-hidden listDisplay">

        </section>
  </div>
</template>

<script>
export default {
  name: "ExportList",
  created: function() {
    this.getXML();
  },
  data: function() {
    return {
	  fileStatus: "",
	  animate: true
    }
  },
  methods: {
    getXML: function() {
		var fs = require('fs');

		fs.readdir(this.$store.getters.filePath+"/Data/Platforms", (err, files) => {
			'use strict';
			if (err) throw err;
			for (let file of files) {
				var listItem = this.$store.getters.filePath+"/Data/Platforms/"+file
				this.processFile(listItem);
			}
		});

		this.drawTable();
	},
	
	processFile: function(listItem){
		var convert = require('xml-js');
		var fs = require('fs');

		var me = this;
		
		fs.readFile(listItem, 'utf8', function (err,data) {
			if (err) {
				return console.error("XML Error: ",err);
			}
			//var converted = convert.xml2js(data);

			me.$store.commit('addFilePath', {
				"path": listItem,
				"name": listItem.replace(".xml", ""),
				"data": data
			});
		});
	},

    drawTable: function() {
		console.log("DrawTable Called")
		console.log(this.$store.getters.lists)
	}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.progress{
		margin: 1em 0;
		height: 2em;
	}
</style>
