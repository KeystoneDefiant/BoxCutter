module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
					@import "@/style/variables.scss";
					@import "@/style/globals.scss";
				`
      }
    }
  }
};
