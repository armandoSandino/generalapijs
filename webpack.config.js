var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var liveReloadOption = {
	appendScriptTag: true
};
const sourcePath = __dirname + '/assets';
const destinationPath = __dirname + '/result/dist';

var config = module.exports = {
	context: sourcePath,
	watch: false,
	devtool: 'source-map',
	entry: {
		app: ["./main.js"]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
    	filename: 'dist/bundle.js',
    	publicPath: '/',
	},
	module:{
		loaders:[
			{
                test   : /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					useRelativePath:true,
					name: 'fonts/[name].[ext]'
				}
           	},
           	{
                test   : /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
				options: {
					useRelativePath:true,
					name: 'fonts/[name].[ext]'
				}
           	},
           	{
                test   : /\.(jpeg|jpg|png(2)?)(\?[a-z0-9=&.]+)?$/,
				loader: 'file-loader?name=img/[name].[ext]',
				options: {
					useRelativePath:true,
					name: 'img_inner/[name].[ext]'
				}
           	},
           	{ 
				test: /\.scss$/, 
				loader: "sass-loader"
			},
           	{
				test: /\.css$/, 
				loader: "style-loader"
			},
			{
				test: /\.css$/, 
				loader: "css-loader"
			},
		    { 
			  test: /\.js$/,
		      exclude: /(node_modules|bower_components)/,
		      include: __dirname + "/assets/libs",
		      loader: 'babel-loader', // 'babel-loader' is also a valid name to reference
		      query: {
		        presets: ['es2015']
		      }
		    }
		]
	},
	devServer: {
	  hot: true
	},
	plugins: [
		new LiveReloadPlugin(liveReloadOption),
		new HtmlWebpackPlugin({
      		title: 'App JS',
      		filename: 'index.html'
    	})
	]
};