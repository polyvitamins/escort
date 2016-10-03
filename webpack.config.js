var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
module.exports = {
    context: path.join(__dirname, './'), // исходная директория
	entry: './src/escort.js', // файл для сборки, если несколько - указываем hash (entry name => filename)
	output: {
		path: path.join(__dirname, ''), // выходная директория
		filename: 'es5.js',
		libraryTarget: 'commonjs2'
	},
	plugins: [
		//new webpack.optimize.UglifyJsPlugin()
		new webpack.BannerPlugin(fs.readFileSync('LICENSE.md', 'utf-8'), {
			raw: false
		})
	],
	module: {
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader", query: {compact: false}}
	    ]
	}
	//externals: { angular: "angular" }
};