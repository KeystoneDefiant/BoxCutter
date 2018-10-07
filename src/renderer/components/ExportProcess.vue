<template>
  <div class="ExportType">
    	<section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
            <h1 class="title">
              I'm doing stuff.
            </h1>
            <h2 class="subtitle">
              Weep not for your CPU and disk, but for the pixelated baddies you are going to soon smite.
            </h2>
            </div>
          </div>
        </section>

		<section class="loadBox">
			Exporting your ROMs... This may take a bit. Get a coffee.
		</section>
  </div>
</template>

<script>
export default {
  name: "ExportList",
  created: function() {
    this.getXML();
  },
  data() {
    const data = [
      { platform: "Arcade", name: "2-Player", gameCount: "5" },
      {
        platform: "Super Nintendo Entertainment System",
        name: "Favorites",
        gameCount: "5"
      }
    ];

    return {
      data,
      isEmpty: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
    };
  },
  methods: {
    getXML: function() {
		var convert = require('xml-js');
		// var VueResource = require('vue-resource');

		// this.$http.get('./static/test.xml').then((response) => {
		// 	console.log(response.body);

		// 	var data = convert.xml2js(response.body);
		// 	console.warn(data)
		// })

		this.drawTable();
    },

    drawTable: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
