const path = require('path')
const DefinePlugin = require('webpack').DefinePlugin
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'main.js',
		path: path.resolve('dist'),
		clean: true
	},
	devServer: {
		port: 5000,
		static: path.resolve('src', 'assets')
	},
	devtool: 'inline-source-map',
	// Import modules without file extension
	resolve: { extensions: ['.js', '.jsx'] },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: { presets: ['@babel/env'] }
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(sass|scss)$/i,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test: /\.svg$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			favicon: './src/assets/favicon-32x32.png'
		}),
		new DefinePlugin({
			// Disable devtools to remove console message about React browser extension
			// '__REACT_DEVTOOLS_GLOBAL_HOOK__': '({ isDisabled: true })'
		})
	]
}
