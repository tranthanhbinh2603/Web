const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
	mode: "production",
	entry: "./src/app.ts", //File Entry của dir ts
	devServer: {
		static: [
			{
				directory: path.join(__dirname),
			},
		],
	},
	output: {
		filename: "scripts.js", //Ten file mong muon chuyen thanh 1 file
		path: path.resolve(__dirname, "dist"), //Dir cua file do
		publicPath: "/dist/", //Y chang dòng trên. Nhưng mà viết theo cách viết path bình thường
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
