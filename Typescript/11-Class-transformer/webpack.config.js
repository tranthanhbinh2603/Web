const path = require("path");

module.exports = {
	mode: "development",
	entry: "./scripts.ts", //File Entry của dir ts
	devServer: {
		static: [
			{
				directory: path.join(__dirname),
			},
		],
		compress: true,
		port: 3000,
		hot: true,
		open: true,
	},
	output: {
		filename: "scripts.js", //Ten file mong muon chuyen thanh 1 file
		path: path.resolve(__dirname, ""), //Dir cua file do
		publicPath: "/", //Y chang dòng trên. Nhưng mà viết theo cách viết path bình thường
	},
	devtool: "inline-source-map",
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
};
