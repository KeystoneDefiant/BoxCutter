module.exports = {
	css: {
	  loaderOptions: {
		sass: {
		  data: `
			@import "@/renderer/styles/_globals.scss";
		  `
		}
	  }
	},
	module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader",
                        options: { /* ... */ }
                    },
                    {
                        loader: "vue-svg-inline-loader",
                        options: { /* ... */ }
                    }
                ]
            }
        ]
    }
  };