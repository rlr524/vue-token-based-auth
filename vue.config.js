const path = require("path");

module.exports = {
	pluginOptions: {
		"style-resources-loader": {
			preProcesser: "scss",
			patterns: [path.resolve(__dirname, "./src/styles/global.scss")],
		},
	},
	chainWebpack: (config) => {
		config.plugin("html").tap((args) => {
			args[0].title = "Vue Token Based Authentication";
			return args;
		});
	},
};
