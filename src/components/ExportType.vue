<template>
  <div class="ExportType">
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

        <section class="container">
			<b-table
				id="exportList"
				:data="isEmpty ? [] : data"
				:striped="isStriped"
				:narrowed="isNarrowed"
				:hoverable="isHoverable">

				<template slot-scope="props">
					<b-table-column field="platform" label="Platform">
						{{ props.row.platform }}
					</b-table-column>

					<b-table-column field="name" label="List Name">
						{{ props.row.name }}
					</b-table-column>

					<b-table-column field="gameCount" label="Games" centered>
						{{props.row.gameCount}}
					</b-table-column>
				</template>
			</b-table>
        </section>
  </div>
</template>

<script>
export default {
  name: "ExportType",
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
      this.drawTable();
    },

    drawTable: function() {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.column {
  height: 5em;
  background: $color-main;
  color: $color-textLight;
  padding: 1.25em;
  margin: 1em;
  font-size: 170%;
}
</style>
