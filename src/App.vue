<template>
  <div id="app">
	<Logo/>
	<FilePaths/>
	<ExportType/>
  </div>
</template>

<script>
import Logo from "./components/Logo.vue";
import FilePaths from "./components/FilePaths.vue";
import ExportType from "./components/ExportType.vue";

export default {
  name: "app",
  components: {
    Logo,
    FilePaths,
    ExportType
  },
  created: function() {
    this.$root.settings = {};
  },
  methods: {}
};
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-textDark;
}
</style>
